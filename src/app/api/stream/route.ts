import { ensureIngest } from "@/lib/glm/ingest";
import { remoteEnabled } from "@/lib/glm/remote";
import { getStore, subscribe, wireFromChunk } from "@/lib/glm/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Server-Sent Events: pushes each new GLM file's flashes the moment it is parsed. */
export async function GET(req: Request) {
  // Serverless hosting can't hold streams open; clients poll /api/flashes instead.
  if (remoteEnabled()) return new Response(null, { status: 204 });
  ensureIngest();
  const enc = new TextEncoder();
  let cleanup = () => {};

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: unknown) => {
        try {
          controller.enqueue(enc.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch {
          cleanup();
        }
      };
      send("hello", { now: Date.now(), sats: getStore().sats });

      const unsub = subscribe((chunk) => {
        if (!chunk.t.length) return;
        send("flashes", { ...wireFromChunk(chunk), sat: chunk.sat, now: Date.now() });
      });
      const beat = setInterval(() => send("beat", { now: Date.now(), sats: getStore().sats }), 10_000);

      cleanup = () => {
        clearInterval(beat);
        unsub();
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };
      req.signal.addEventListener("abort", cleanup);
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
