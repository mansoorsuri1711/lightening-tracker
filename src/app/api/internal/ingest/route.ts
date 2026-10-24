import { NextRequest, NextResponse } from "next/server";
import type { Strike } from "@/lib/strike";
import { memoryUpsertStrikes } from "@/lib/memoryStrikes";
import { ensureRedis, STRIKES_BY_TIME, STRIKES_DATA, WORKER_HEARTBEAT } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const expected = process.env.INGEST_SECRET || "dev-ingest-secret";
  const got = req.headers.get("x-ingest-secret") || "";
  return got === expected;
}

function isStrike(v: unknown): v is Strike {
  if (!v || typeof v !== "object") return false;
  const s = v as Strike;
  return (
    typeof s.id === "string" &&
    typeof s.time === "string" &&
    typeof s.lat === "number" &&
    typeof s.lon === "number" &&
    typeof s.source === "string"
  );
}

/** Ingest worker posts strike batches here (works without Redis). */
export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const strikes = Array.isArray(body)
    ? body
    : Array.isArray((body as { strikes?: unknown }).strikes)
      ? (body as { strikes: unknown[] }).strikes
      : null;

  if (!strikes) {
    return NextResponse.json({ error: "Expected { strikes: Strike[] }" }, { status: 400 });
  }

  const valid = strikes.filter(isStrike) as Strike[];
  if (!valid.length) {
    return NextResponse.json({ ok: true, accepted: 0 });
  }

  memoryUpsertStrikes(valid);

  const r = await ensureRedis();
  if (r) {
    try {
      const pipe = r.pipeline();
      for (const s of valid) {
        const ts = Date.parse(s.time) / 1000;
        pipe.hset(STRIKES_DATA, s.id, JSON.stringify(s));
        pipe.zadd(STRIKES_BY_TIME, ts, s.id);
        pipe.geoadd("strikes:geo", s.lon, s.lat, s.id);
      }
      pipe.set(WORKER_HEARTBEAT, new Date().toISOString());
      await pipe.exec();
    } catch {
      /* memory already updated */
    }
  }

  return NextResponse.json({
    ok: true,
    accepted: valid.length,
    sources: [...new Set(valid.map((s) => s.source))],
  });
}
