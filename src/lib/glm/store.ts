/**
 * In-process flash store for GLM detections. Lives on globalThis so route
 * handlers and instrumentation (separate module graphs in dev) share one copy.
 */

export type SatId = "G19" | "G18" | "MTI1";

export type FlashChunk = {
  key: string;
  sat: SatId;
  /** observation start (ms) of the source file */
  startMs: number;
  /** end of the observation window; defaults to start + 25 s (GLM files are 20 s long) */
  endMs?: number;
  t: Float64Array;
  lat: Float32Array;
  lon: Float32Array;
  /** radiant energy in femtojoules (0 when unknown) */
  e: Float32Array;
};

export type SatStatus = {
  sat: SatId;
  lastFileMs: number | null;
  lastPollMs: number | null;
  files: number;
  error: string | null;
  /** false when the source needs credentials that are not set */
  configured?: boolean;
};

const endOf = (c: FlashChunk) => c.endMs ?? c.startMs + 25_000;

type Listener = (chunk: FlashChunk) => void;

type StoreState = {
  chunks: FlashChunk[];
  listeners: Set<Listener>;
  sats: Record<SatId, SatStatus>;
  startedAtMs: number;
  backfillDone: boolean;
};

const RETENTION_MS = 65 * 60 * 1000;

declare global {
  // eslint-disable-next-line no-var
  var __ltGlmStore: StoreState | undefined;
}

export function getStore(): StoreState {
  if (!globalThis.__ltGlmStore) {
    globalThis.__ltGlmStore = {
      chunks: [],
      listeners: new Set(),
      sats: {
        G19: { sat: "G19", lastFileMs: null, lastPollMs: null, files: 0, error: null },
        G18: { sat: "G18", lastFileMs: null, lastPollMs: null, files: 0, error: null },
        MTI1: { sat: "MTI1", lastFileMs: null, lastPollMs: null, files: 0, error: null, configured: false },
      },
      startedAtMs: Date.now(),
      backfillDone: false,
    };
  }
  return globalThis.__ltGlmStore;
}

export function hasChunk(key: string): boolean {
  return getStore().chunks.some((c) => c.key === key);
}

export function addChunk(chunk: FlashChunk): void {
  const s = getStore();
  s.chunks.push(chunk);
  s.chunks.sort((a, b) => a.startMs - b.startMs);
  const cutoff = Date.now() - RETENTION_MS;
  s.chunks = s.chunks.filter((c) => endOf(c) >= cutoff);
  for (const l of s.listeners) {
    try {
      l(chunk);
    } catch {
      /* listener errors must not break ingest */
    }
  }
}

export function subscribe(l: Listener): () => void {
  const s = getStore();
  s.listeners.add(l);
  return () => s.listeners.delete(l);
}

/** Flat int wire format: [dtMs, lat*1000, lon*1000, energyFj] per flash. */
export type WireBatch = { base: number; d: number[]; keys?: string[] };

export function encodeChunk(chunk: FlashChunk, sinceMs = 0, base = 0): number[] {
  const out: number[] = [];
  for (let i = 0; i < chunk.t.length; i++) {
    if (chunk.t[i] < sinceMs) continue;
    out.push(
      Math.round(chunk.t[i] - base),
      Math.round(chunk.lat[i] * 1000),
      Math.round(chunk.lon[i] * 1000),
      Math.round(chunk.e[i])
    );
  }
  return out;
}

export function queryWire(minutes: number, afterMs = 0): WireBatch & { count: number; now: number } {
  const now = Date.now();
  const since = Math.max(afterMs, now - minutes * 60_000);
  const base = since;
  const d: number[] = [];
  const keys: string[] = [];
  for (const c of getStore().chunks) {
    if (endOf(c) < since) continue;
    keys.push(c.key);
    for (const v of encodeChunk(c, since, base)) d.push(v);
  }
  return { base, d, keys, count: d.length / 4, now };
}

export function wireFromChunk(chunk: FlashChunk): WireBatch {
  const base = chunk.startMs;
  return { base, d: encodeChunk(chunk, 0, base), keys: [chunk.key] };
}
