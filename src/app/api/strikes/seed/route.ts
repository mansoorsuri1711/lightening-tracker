import { NextResponse } from "next/server";
import { memorySeedDemo } from "@/lib/memoryStrikes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Dev helper: seed in-memory demo strikes when Redis/worker are not running. */
export async function POST() {
  if (process.env.NODE_ENV === "production" && process.env.ALLOW_DEMO_SEED !== "1") {
    return NextResponse.json({ error: "Disabled in production" }, { status: 403 });
  }
  const strikes = memorySeedDemo(48);
  return NextResponse.json({ ok: true, count: strikes.length });
}
