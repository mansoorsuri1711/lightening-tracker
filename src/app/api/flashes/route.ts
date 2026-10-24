import { NextRequest, NextResponse, after } from "next/server";
import { ensureIngest, runIngestOnce } from "@/lib/glm/ingest";
import { remoteEnabled, remoteGetSats, remoteLastRun, remoteQuery } from "@/lib/glm/remote";
import { getStore, queryWire } from "@/lib/glm/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Compact flash history: d = [dtMs, lat*1000, lon*1000, energyFj] repeated, relative to base.
 * Serverless mode (Redis configured): supports `after=<cursor>` for cheap polling and kicks off a
 * background ingest when the data is stale, so it keeps working even without a cron job.
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const minutes = Math.min(60, Math.max(1, Number.parseInt(sp.get("minutes") || "60", 10) || 60));

  if (remoteEnabled()) {
    const cursorIn = Number(sp.get("after") || 0) || 0;
    const [q, sats, last] = await Promise.all([remoteQuery(minutes, cursorIn), remoteGetSats(), remoteLastRun()]);
    if (Date.now() - last > 45_000) after(() => runIngestOnce().then(() => undefined));
    return NextResponse.json(
      { ...q, sats, mode: "poll" },
      { headers: { "Cache-Control": "public, s-maxage=8, stale-while-revalidate=15" } }
    );
  }

  ensureIngest();
  const wire = queryWire(minutes);
  return NextResponse.json(
    { ...wire, sats: getStore().sats, mode: "sse", cursor: 0 },
    { headers: { "Cache-Control": "no-store" } }
  );
}
