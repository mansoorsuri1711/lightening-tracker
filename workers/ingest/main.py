#!/usr/bin/env python3
"""Free lightning ingest — NOAA GOES-East/West GLM → Redis and/or Next.js HTTP ingest."""

from __future__ import annotations

import json
import logging
import os
import signal
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv

sys.path.insert(0, str(Path(__file__).resolve().parent))

from providers.goes_glm import GoesGlmProvider
from providers.base import Strike
from providers.memory_cursor import MemoryCursorStore

load_dotenv(Path(__file__).resolve().parents[2] / ".env")
load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
log = logging.getLogger("ingest")

RETENTION_SECONDS = 60 * 60
POLL_SECONDS = int(os.environ.get("INGEST_POLL_SECONDS", "20"))
STRIKES_DATA = "strikes:data"
STRIKES_BY_TIME = "strikes:by_time"
STRIKES_GEO = "strikes:geo"
STRIKES_CHANNEL = "strikes:new"
WORKER_HEARTBEAT = "worker:last_run"


class GracefulExit(Exception):
    pass


def _handle_signal(signum, frame):  # noqa: ARG001
    raise GracefulExit()


def connect_redis():
    url = os.environ.get("REDIS_URL", "redis://127.0.0.1:6379")
    try:
        import redis

        client = redis.from_url(url, decode_responses=True)
        client.ping()
        log.info("Redis connected (%s)", url)
        return client
    except Exception as exc:  # noqa: BLE001
        log.warning("Redis unavailable (%s) — using file cursors + HTTP ingest", exc)
        return None


def connect_pg():
    dsn = os.environ.get("DATABASE_URL")
    if not dsn:
        return None
    try:
        import psycopg

        conn = psycopg.connect(dsn)
        conn.autocommit = True
        return conn
    except Exception as exc:  # noqa: BLE001
        log.warning("Postgres unavailable (%s)", exc)
        return None


def persist_postgres(conn, strikes: list[Strike]) -> None:
    if not conn or not strikes:
        return
    with conn.cursor() as cur:
        for s in strikes:
            cur.execute(
                """
                INSERT INTO strikes (id, time, geom, type, energy, source)
                VALUES (
                  %s, %s::timestamptz,
                  ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography,
                  %s, %s, %s
                )
                ON CONFLICT (id) DO NOTHING
                """,
                (
                    s["id"],
                    s["time"],
                    s["lon"],
                    s["lat"],
                    s.get("type", "unknown"),
                    s.get("energy"),
                    s["source"],
                ),
            )


def store_redis(r, strikes: list[Strike]) -> None:
    if not r or not strikes:
        return
    pipe = r.pipeline()
    for s in strikes:
        ts = datetime.fromisoformat(s["time"].replace("Z", "+00:00")).timestamp()
        payload = json.dumps(s, separators=(",", ":"))
        pipe.hset(STRIKES_DATA, s["id"], payload)
        pipe.zadd(STRIKES_BY_TIME, {s["id"]: ts})
        pipe.geoadd(STRIKES_GEO, (s["lon"], s["lat"], s["id"]))
    pipe.publish(STRIKES_CHANNEL, json.dumps(strikes, separators=(",", ":")))
    pipe.execute()


def prune_old(r) -> int:
    if not r:
        return 0
    cutoff = time.time() - RETENTION_SECONDS
    old_ids = r.zrangebyscore(STRIKES_BY_TIME, "-inf", cutoff)
    if not old_ids:
        return 0
    pipe = r.pipeline()
    pipe.zremrangebyscore(STRIKES_BY_TIME, "-inf", cutoff)
    pipe.hdel(STRIKES_DATA, *old_ids)
    for sid in old_ids:
        pipe.zrem(STRIKES_GEO, sid)
    pipe.execute()
    return len(old_ids)


def heartbeat(r) -> None:
    if not r:
        return
    r.set(WORKER_HEARTBEAT, datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))


def push_http(strikes: list[Strike]) -> None:
    """Push to Next.js so the map works even when Redis is empty/unavailable."""
    if not strikes:
        return
    base = os.environ.get("INGEST_HTTP_URL", "http://127.0.0.1:3000/api/internal/ingest")
    secret = os.environ.get("INGEST_SECRET", "dev-ingest-secret")
    payload = json.dumps({"strikes": strikes}).encode("utf-8")
    req = urllib.request.Request(
        base,
        data=payload,
        headers={
            "Content-Type": "application/json",
            "x-ingest-secret": secret,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            log.info("HTTP ingest %s → %s", resp.status, body[:160])
    except urllib.error.URLError as exc:
        log.warning("HTTP ingest failed (%s). Is `npm run dev` running?", exc)


def main() -> int:
    signal.signal(signal.SIGINT, _handle_signal)
    signal.signal(signal.SIGTERM, _handle_signal)

    r = connect_redis()
    cursor_store = r if r is not None else MemoryCursorStore()
    pg = connect_pg()
    provider = GoesGlmProvider(cursor_store)

    log.info(
        "Free GLM ingest started (GOES-18 + GOES-19, poll=%ss). Coverage: Americas.",
        POLL_SECONDS,
    )

    backoff = POLL_SECONDS
    try:
        while True:
            try:
                strikes = provider.fetch_new()
                if strikes:
                    store_redis(r, strikes)
                    persist_postgres(pg, strikes)
                    push_http(strikes)
                    log.info("Ingested %s new GLM flashes", len(strikes))
                else:
                    heartbeat(r)
                removed = prune_old(r)
                if removed:
                    log.info("Pruned %s old strikes", removed)
                heartbeat(r)
                backoff = POLL_SECONDS
            except GracefulExit:
                raise
            except Exception as exc:  # noqa: BLE001
                log.exception("Poll failed: %s", exc)
                backoff = min(backoff * 2, 120)
            time.sleep(backoff)
    except GracefulExit:
        log.info("Shutting down")
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
