import { NextResponse } from "next/server";
import { ensureRedis, WORKER_HEARTBEAT } from "@/lib/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const r = await ensureRedis();
  let redis = false;
  let heartbeat: string | null = null;
  if (r) {
    try {
      await r.ping();
      redis = true;
      heartbeat = await r.get(WORKER_HEARTBEAT);
    } catch {
      redis = false;
    }
  }

  const stale =
    !heartbeat || Date.now() - Date.parse(heartbeat) > 2 * 60 * 1000;

  return NextResponse.json({
    ok: redis && !stale,
    redis,
    workerHeartbeat: heartbeat,
    workerStale: stale,
  });
}
