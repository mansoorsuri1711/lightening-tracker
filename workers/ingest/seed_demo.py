#!/usr/bin/env python3
"""Inject demo strikes into Redis so the map UI can be tested without an active storm."""

from __future__ import annotations

import json
import os
import random
import time
from datetime import datetime, timezone
from pathlib import Path

import redis
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / ".env")

# Rough Gulf / SE US area for demo dots
CENTER_LAT = 28.5
CENTER_LON = -90.0


def main() -> None:
    r = redis.from_url(os.environ.get("REDIS_URL", "redis://127.0.0.1:6379"), decode_responses=True)
    r.ping()
    now = time.time()
    strikes = []
    for i in range(40):
        age = random.uniform(0, 50 * 60)
        lat = CENTER_LAT + random.uniform(-6, 6)
        lon = CENTER_LON + random.uniform(-10, 10)
        t = datetime.fromtimestamp(now - age, tz=timezone.utc).isoformat().replace("+00:00", "Z")
        sid = f"demo{i:03d}{int(now)}"
        s = {
            "id": sid,
            "time": t,
            "lat": lat,
            "lon": lon,
            "type": "unknown",
            "source": "goes-glm",
            "energy": random.random() * 1e-12,
        }
        strikes.append(s)
        r.hset("strikes:data", sid, json.dumps(s))
        r.zadd("strikes:by_time", {sid: now - age})
        r.geoadd("strikes:geo", (lon, lat, sid))

    r.set("worker:last_run", datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"))
    r.publish("strikes:new", json.dumps(strikes))
    print(f"Seeded {len(strikes)} demo strikes around {CENTER_LAT},{CENTER_LON}")


if __name__ == "__main__":
    main()
