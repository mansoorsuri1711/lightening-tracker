import { NextRequest, NextResponse } from "next/server";
import { parseBBox } from "@/lib/strike";
import { getStrikesSince, getWorkerHeartbeat } from "@/lib/strikesStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const minutes = Math.min(
    60,
    Math.max(1, Number.parseInt(sp.get("minutes") || "15", 10) || 15)
  );
  const bboxRaw = sp.get("bbox");
  const bbox = bboxRaw ? parseBBox(bboxRaw) : null;
  if (bboxRaw && !bbox) {
    return NextResponse.json(
      { error: "Invalid bbox. Use west,south,east,north" },
      { status: 400 }
    );
  }

  const strikes = await getStrikesSince(minutes, bbox);
  const heartbeat = await getWorkerHeartbeat();

  return NextResponse.json(
    {
      strikes,
      count: strikes.length,
      minutes,
      workerHeartbeat: heartbeat,
      source: "goes-glm",
      disclaimer:
        "For information only. Do not rely on this site for life-safety decisions. Follow official weather warnings.",
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
