import { NextRequest, NextResponse } from "next/server";
import { getNearestStrike } from "@/lib/strikesStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const lat = Number.parseFloat(sp.get("lat") || "");
  const lon = Number.parseFloat(sp.get("lon") || "");
  const minutes = Math.min(
    60,
    Math.max(1, Number.parseInt(sp.get("minutes") || "30", 10) || 30)
  );

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const nearest = await getNearestStrike({ lat, lon }, minutes);
  return NextResponse.json(
    { nearest, minutes },
    { headers: { "Cache-Control": "no-store" } }
  );
}
