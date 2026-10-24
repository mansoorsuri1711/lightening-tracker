import Redis from "ioredis";

const STRIKES_DATA = "strikes:data";
const STRIKES_BY_TIME = "strikes:by_time";
const WORKER_HEARTBEAT = "worker:last_run";

let client: Redis | null = null;
let unavailableUntil = 0;
let loggedDown = false;

export function getRedis(): Redis | null {
  const url = process.env.REDIS_URL;
  if (!url) return null;
  if (Date.now() < unavailableUntil) return null;

  if (!client) {
    client = new Redis(url, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
      lazyConnect: true,
      enableOfflineQueue: false,
      retryStrategy: () => null,
      reconnectOnError: () => false,
    });
    client.on("error", (err) => {
      if (!loggedDown) {
        loggedDown = true;
        console.warn("[redis] unavailable — using in-memory demo strikes:", err.message);
      }
      unavailableUntil = Date.now() + 15_000;
    });
  }
  return client;
}

export async function ensureRedis(): Promise<Redis | null> {
  if (Date.now() < unavailableUntil) return null;
  const r = getRedis();
  if (!r) return null;
  if (r.status === "wait" || r.status === "end") {
    try {
      await r.connect();
    } catch {
      unavailableUntil = Date.now() + 15_000;
      return null;
    }
  }
  try {
    await r.ping();
    loggedDown = false;
    return r;
  } catch {
    unavailableUntil = Date.now() + 15_000;
    return null;
  }
}

export { STRIKES_DATA, STRIKES_BY_TIME, WORKER_HEARTBEAT };
