import { NextResponse } from "next/server";
import { ensureIngest } from "@/lib/glm/ingest";
import { remoteEnabled, remoteGetSats, remoteLastRun } from "@/lib/glm/remote";
import { getStore } from "@/lib/glm/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (remoteEnabled()) {
    const [sats, last] = await Promise.all([remoteGetSats(), remoteLastRun()]);
    return NextResponse.json(
      { now: Date.now(), mode: "poll", lastIngestMs: last || null, sats },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
  ensureIngest();
  const s = getStore();
  const flashes = s.chunks.reduce((n, c) => n + c.t.length, 0);
  return NextResponse.json(
    { now: Date.now(), mode: "sse", flashes, chunks: s.chunks.length, backfillDone: s.backfillDone, sats: s.sats },
    { headers: { "Cache-Control": "no-store" } }
  );
}
