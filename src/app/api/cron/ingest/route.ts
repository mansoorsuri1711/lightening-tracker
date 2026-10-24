import { NextRequest, NextResponse } from "next/server";
import { runIngestOnce } from "@/lib/glm/ingest";
import { remoteEnabled } from "@/lib/glm/remote";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Pulls new lightning files into shared storage. Call it from Vercel Cron (which sends
 * `Authorization: Bearer $CRON_SECRET`) or any external scheduler (`?secret=` also accepted).
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const given = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? req.nextUrl.searchParams.get("secret");
  if (!secret || given !== secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!remoteEnabled()) return NextResponse.json({ error: "Redis is not configured" }, { status: 400 });
  const t0 = Date.now();
  const res = await runIngestOnce();
  return NextResponse.json({ ok: true, ...res, ms: Date.now() - t0 });
}
