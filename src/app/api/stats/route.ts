import { NextRequest, NextResponse } from "next/server";
import { getStats, getWorkerHeartbeat } from "@/lib/strikesStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const lat = Number.parseFloat(sp.get("lat") || "");
  const lon = Number.parseFloat(sp.get("lon") || "");
  const radiusKm = Math.min(
    500,
    Math.max(1, Number.parseFloat(sp.get("radiusKm") || "50") || 50)
  );

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const stats = await getStats({ lat, lon }, radiusKm);
  const heartbeat = await getWorkerHeartbeat();

  return NextResponse.json(
    { ...stats, workerHeartbeat: heartbeat },
    { headers: { "Cache-Control": "no-store" } }
  );
}
