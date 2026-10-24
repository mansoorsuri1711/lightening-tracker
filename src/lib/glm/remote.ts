import { Redis } from "@upstash/redis";
import type { FlashChunk, SatStatus } from "./store";

/**
 * Shared storage for serverless hosting (Vercel). When an Upstash Redis REST URL/token is
 * present, ingest runs as short cron/lazy invocations and every instance reads the same data.
 * Without it the app keeps everything in process memory (local dev / long-running Node host).
 */

const URL_ENV = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN_ENV = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

export const remoteEnabled = () => !!(URL_ENV && TOKEN_ENV);

let client: Redis | null = null;
const r = () =>
  (client ??= new Redis({ url: URL_ENV!, token: TOKEN_ENV!, automaticDeserialization: false }));

const IDX = "lt:idx"; // zset: member = part key, score = ingest order
const PFX = "lt:c:";
const SATS = "lt:sats";
const LOCK = "lt:lock";
const LAST = "lt:lastrun";
const RETAIN_MS = 65 * 60_000;
const PART_MAX = 8000; // keeps each Redis value well under REST request limits

let seq = 0;
const nextScore = () => {
  seq = (seq + 1) % 1000;
  return Date.now() * 1000 + seq;
};

export async function remoteAddChunk(c: FlashChunk): Promise<void> {
  const endMs = c.endMs ?? c.startMs + 25_000;
  const ttl = Math.max(120, Math.ceil((endMs + RETAIN_MS + 60_000 - Date.now()) / 1000));
  const n = c.t.length;
  const parts = Math.max(1, Math.ceil(n / PART_MAX));
  const p = r().pipeline();
  for (let i = 0; i < parts; i++) {
    const lo = i * PART_MAX;
    const hi = Math.min(n, lo + PART_MAX);
    const d: number[] = [];
    for (let j = lo; j < hi; j++) {
      d.push(Math.round(c.t[j] - c.startMs), Math.round(c.lat[j] * 1000), Math.round(c.lon[j] * 1000), Math.round(c.e[j]));
    }
    const key = `${c.key}~${i}`;
    p.set(PFX + key, JSON.stringify({ base: c.startMs, d }), { ex: ttl });
    p.zadd(IDX, { score: nextScore(), member: key });
  }
  p.zremrangebyscore(IDX, 0, (Date.now() - 75 * 60_000) * 1000);
  await p.exec();
}

/** Which source-file keys have already been stored? */
export async function remoteKnown(keys: string[]): Promise<Set<string>> {
  const known = new Set<string>();
  if (!keys.length) return known;
  const scores = (await r().zmscore(IDX, keys.map((k) => `${k}~0`))) as (number | string | null)[] | null;
  scores?.forEach((s, i) => {
    if (s !== null && s !== undefined) known.add(keys[i]);
  });
  return known;
}

export async function remoteFlag(key: string, set = false): Promise<boolean> {
  if (set) {
    await r().set(`lt:flag:${key}`, "1", { ex: 4000 });
    return true;
  }
  return (await r().exists(`lt:flag:${key}`)) === 1;
}

export type RemoteQuery = {
  base: number;
  d: number[];
  keys: string[];
  count: number;
  now: number;
  cursor: number;
};

export async function remoteQuery(minutes: number, after: number): Promise<RemoteQuery> {
  const now = Date.now();
  const since = now - minutes * 60_000;
  const min = after > 0 ? `(${after}` : String((now - 75 * 60_000) * 1000);
  // the client's typings only model lexicographic bounds; BYSCORE with "(x" / "+inf" is valid Redis
  const zrange = r().zrange as unknown as (...args: unknown[]) => Promise<(string | number)[]>;
  const flat = (await zrange.call(r(), IDX, min, "+inf", { byScore: true, withScores: true })).flat();
  const members: { key: string; score: number }[] = [];
  for (let i = 0; i + 1 < flat.length; i += 2) members.push({ key: String(flat[i]), score: Number(flat[i + 1]) });

  const d: number[] = [];
  const keys: string[] = [];
  let cursor = after;
  if (members.length) {
    const raw = (await r().mget(...members.map((m) => PFX + m.key))) as (string | null)[];
    members.forEach((m, i) => {
      cursor = Math.max(cursor, m.score);
      const s = raw[i];
      if (!s) return;
      const obj = JSON.parse(s) as { base: number; d: number[] };
      keys.push(m.key);
      for (let k = 0; k + 3 < obj.d.length; k += 4) {
        const t = obj.base + obj.d[k];
        if (t < since) continue;
        d.push(t - since, obj.d[k + 1], obj.d[k + 2], obj.d[k + 3]);
      }
    });
  }
  return { base: since, d, keys, count: d.length / 4, now, cursor };
}

export async function remoteSetSats(sats: Record<string, SatStatus>): Promise<void> {
  const entries = Object.entries(sats);
  if (!entries.length) return;
  await r().hset(SATS, Object.fromEntries(entries.map(([k, v]) => [k, JSON.stringify(v)])));
}

export async function remoteGetSats(): Promise<Record<string, SatStatus>> {
  // depending on client settings this arrives as an object or a flat [field, value, ...] list
  const raw = (await r().hgetall(SATS)) as Record<string, string> | string[] | null;
  const h: Record<string, string> = {};
  if (Array.isArray(raw)) for (let i = 0; i + 1 < raw.length; i += 2) h[raw[i]] = raw[i + 1];
  else Object.assign(h, raw ?? {});
  const out: Record<string, SatStatus> = {};
  for (const [k, v] of Object.entries(h)) {
    try {
      out[k] = JSON.parse(v) as SatStatus;
    } catch {
      /* skip corrupt entry */
    }
  }
  return out;
}

export async function remoteLock(ttlSec: number): Promise<boolean> {
  return (await r().set(LOCK, "1", { nx: true, ex: ttlSec })) === "OK";
}
export async function remoteUnlock(): Promise<void> {
  await r().del(LOCK);
}
export async function remoteSetLastRun(): Promise<void> {
  await r().set(LAST, String(Date.now()));
}
export async function remoteLastRun(): Promise<number> {
  const v = (await r().get(LAST)) as string | null;
  return v ? Number(v) : 0;
}
