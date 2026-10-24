import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { addChunk, getStore, hasChunk, type FlashChunk } from "./store";
import { pollEumetsat } from "./eumetsat";
import {
  remoteAddChunk,
  remoteEnabled,
  remoteKnown,
  remoteLastRun,
  remoteLock,
  remoteSetLastRun,
  remoteSetSats,
  remoteUnlock,
} from "./remote";

type SatId = "G19" | "G18";

/**
 * NOAA GOES GLM (Geostationary Lightning Mapper) ingest straight from the
 * public AWS buckets — no keys, no Python worker, no Redis.
 */

const PRODUCT = "GLM-L2-LCFA";
const BUCKETS: Record<SatId, string> = { G19: "noaa-goes19", G18: "noaa-goes18" };
const POLL_MS = 10_000;
const BACKFILL_MIN = Number(process.env.GLM_BACKFILL_MINUTES || 60);
const CONCURRENCY = 6;

type H5 = typeof import("h5wasm/node");
let h5Promise: Promise<H5> | null = null;
function loadH5(): Promise<H5> {
  if (!h5Promise) {
    h5Promise = import("h5wasm/node").then(async (m) => {
      await m.ready;
      return m;
    });
  }
  return h5Promise;
}

function pad(n: number, w: number) {
  return String(n).padStart(w, "0");
}

function hourPrefix(ms: number): string {
  const d = new Date(ms);
  const start = Date.UTC(d.getUTCFullYear(), 0, 1);
  const doy = Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - start) / 86_400_000) + 1;
  return `${PRODUCT}/${d.getUTCFullYear()}/${pad(doy, 3)}/${pad(d.getUTCHours(), 2)}/`;
}

/** s20262972155400 → epoch ms */
function keyStartMs(key: string): number | null {
  const m = /_s(\d{4})(\d{3})(\d{2})(\d{2})(\d{2})(\d)/.exec(key);
  if (!m) return null;
  const [, y, doy, hh, mm, ss, tenth] = m;
  return (
    Date.UTC(+y, 0, 1) +
    (+doy - 1) * 86_400_000 +
    +hh * 3_600_000 +
    +mm * 60_000 +
    +ss * 1000 +
    +tenth * 100
  );
}

async function listKeys(bucket: string, prefix: string): Promise<string[]> {
  const url = `https://${bucket}.s3.amazonaws.com/?list-type=2&prefix=${encodeURIComponent(prefix)}&max-keys=1000`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`S3 list ${bucket} ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<Key>([^<]+)<\/Key>/g)].map((m) => m[1]);
}

async function parseFile(sat: SatId, key: string, buf: Uint8Array): Promise<FlashChunk | null> {
  const h5 = await loadH5();
  const dir = await mkdtemp(path.join(tmpdir(), "glm-"));
  const file = path.join(dir, "f.nc");
  try {
    await writeFile(file, buf);
    const f = new h5.File(file, "r");
    try {
      const num = (name: string) => {
        const ds = f.get(name) as unknown as {
          value: ArrayLike<number>;
          attrs: Record<string, { value: unknown }>;
          dtype: string;
        } | null;
        return ds;
      };
      const latDs = num("flash_lat");
      const lonDs = num("flash_lon");
      const toDs = num("flash_time_offset_of_first_event");
      if (!latDs || !lonDs || !toDs) return null;

      const lat = Array.from(latDs.value as ArrayLike<number>);
      const lon = Array.from(lonDs.value as ArrayLike<number>);
      const n = lat.length;
      const startMs = keyStartMs(key) ?? Date.now();
      if (!n) return { key, sat, startMs, t: new Float64Array(0), lat: new Float32Array(0), lon: new Float32Array(0), e: new Float32Array(0) };

      const attr = (ds: typeof toDs, a: string): number | undefined => {
        const v = ds?.attrs?.[a]?.value;
        if (v == null) return undefined;
        return Number((v as ArrayLike<number>)[0] ?? v);
      };

      // time offset: packed unsigned short, base time given in the units string
      const unitsStr = String(toDs.attrs?.units?.value ?? "");
      const um = /since (\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}(?:\.\d+)?)/.exec(unitsStr);
      const baseMs = um
        ? Date.UTC(+um[1], +um[2] - 1, +um[3], +um[4], +um[5], 0) + parseFloat(um[6]) * 1000
        : startMs;
      const tScale = attr(toDs, "scale_factor") ?? 1;
      const tOff = attr(toDs, "add_offset") ?? 0;
      const tRaw = toDs.value as ArrayLike<number>;
      const unsignedT = String(toDs.attrs?._Unsigned?.value ?? "") === "true";

      const eDs = num("flash_energy");
      const eScale = eDs ? attr(eDs, "scale_factor") ?? 1 : 1;
      const eOff = eDs ? attr(eDs, "add_offset") ?? 0 : 0;
      const eUnsigned = eDs ? String(eDs.attrs?._Unsigned?.value ?? "") === "true" : false;
      const eRaw = eDs ? (eDs.value as ArrayLike<number>) : null;

      const qDs = num("flash_quality_flag");
      const qRaw = qDs ? (qDs.value as ArrayLike<number>) : null;

      const t: number[] = [];
      const la: number[] = [];
      const lo: number[] = [];
      const en: number[] = [];
      for (let i = 0; i < n; i++) {
        const y = lat[i];
        const x = lon[i];
        if (!Number.isFinite(y) || !Number.isFinite(x) || Math.abs(y) > 90 || Math.abs(x) > 180) continue;
        if (qRaw && qRaw[i] !== 0) continue; // 0 = good quality
        let raw = tRaw[i];
        if (unsignedT && raw < 0) raw += 65536;
        const ms = baseMs + (raw * tScale + tOff) * 1000;
        if (!Number.isFinite(ms)) continue;
        let eFj = 0;
        if (eRaw) {
          let r = eRaw[i];
          if (eUnsigned && r < 0) r += 65536;
          if (r !== 65535) eFj = (r * eScale + eOff) * 1e15;
        }
        t.push(ms);
        la.push(y);
        lo.push(x);
        en.push(Number.isFinite(eFj) ? eFj : 0);
      }
      return {
        key,
        sat,
        startMs,
        t: Float64Array.from(t),
        lat: Float32Array.from(la),
        lon: Float32Array.from(lo),
        e: Float32Array.from(en),
      };
    } finally {
      f.close();
    }
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

/** Remove flashes in `c` that another satellite already reported (overlap zone). */
function dedupeAgainstOthers(c: FlashChunk): FlashChunk {
  const others = getStore().chunks.filter(
    (o) => o.sat !== c.sat && Math.abs(o.startMs - c.startMs) < 45_000
  );
  if (!others.length || !c.t.length) return c;
  const grid = new Map<string, Array<[number, number, number]>>();
  const cell = (la: number, lo: number) => `${Math.floor(la / 0.5)}:${Math.floor(lo / 0.5)}`;
  for (const o of others) {
    for (let i = 0; i < o.t.length; i++) {
      const k = cell(o.lat[i], o.lon[i]);
      const arr = grid.get(k);
      if (arr) arr.push([o.t[i], o.lat[i], o.lon[i]]);
      else grid.set(k, [[o.t[i], o.lat[i], o.lon[i]]]);
    }
  }
  if (!grid.size) return c;
  const keep: number[] = [];
  for (let i = 0; i < c.t.length; i++) {
    const ci = Math.floor(c.lat[i] / 0.5);
    const cj = Math.floor(c.lon[i] / 0.5);
    let dup = false;
    for (let di = -1; di <= 1 && !dup; di++) {
      for (let dj = -1; dj <= 1 && !dup; dj++) {
        const arr = grid.get(`${ci + di}:${cj + dj}`);
        if (!arr) continue;
        for (const [ot, ola, olo] of arr) {
          if (Math.abs(ot - c.t[i]) <= 1000 && Math.abs(ola - c.lat[i]) < 0.2 && Math.abs(olo - c.lon[i]) < 0.25) {
            dup = true;
            break;
          }
        }
      }
    }
    if (!dup) keep.push(i);
  }
  if (keep.length === c.t.length) return c;
  return {
    ...c,
    t: Float64Array.from(keep, (i) => c.t[i]),
    lat: Float32Array.from(keep, (i) => c.lat[i]),
    lon: Float32Array.from(keep, (i) => c.lon[i]),
    e: Float32Array.from(keep, (i) => c.e[i]),
  };
}

const inflight = new Set<string>();

async function processKey(sat: SatId, key: string): Promise<void> {
  if (hasChunk(key) || inflight.has(key)) return;
  inflight.add(key);
  try {
    const res = await fetch(`https://${BUCKETS[sat]}.s3.amazonaws.com/${key}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`GET ${res.status}`);
    const chunk = await parseFile(sat, key, new Uint8Array(await res.arrayBuffer()));
    if (!chunk) return;
    const kept = dedupeAgainstOthers(chunk);
    addChunk(kept);
    if (remoteEnabled()) await remoteAddChunk(kept);
    const st = getStore().sats[sat];
    st.files++;
    st.lastFileMs = Math.max(st.lastFileMs ?? 0, chunk.startMs + 20_000);
    st.error = null;
  } catch (e) {
    getStore().sats[sat].error = e instanceof Error ? e.message : String(e);
  } finally {
    inflight.delete(key);
  }
}

async function runPool<T>(items: T[], worker: (x: T) => Promise<void>, deadline = Infinity) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (i < items.length && Date.now() < deadline) {
        const item = items[i++];
        await worker(item);
      }
    })
  );
}

async function pollSat(sat: SatId, minutes: number, deadline = Infinity): Promise<number> {
  const now = Date.now();
  const cutoff = now - minutes * 60_000;
  const prefixes = new Set<string>();
  for (let t = cutoff; t <= now + 60_000; t += 30 * 60_000) prefixes.add(hourPrefix(t));
  prefixes.add(hourPrefix(now));
  const keys: string[] = [];
  try {
    for (const p of prefixes) keys.push(...(await listKeys(BUCKETS[sat], p)));
    getStore().sats[sat].error = null;
  } catch (e) {
    getStore().sats[sat].error = e instanceof Error ? e.message : String(e);
  }
  getStore().sats[sat].lastPollMs = Date.now();
  let fresh = keys
    .filter((k) => (keyStartMs(k) ?? 0) >= cutoff && !hasChunk(k))
    .sort()
    .reverse(); // newest first so the map fills from "now" backwards
  if (remoteEnabled() && fresh.length) {
    const known = await remoteKnown(fresh);
    fresh = fresh.filter((k) => !known.has(k));
  }
  await runPool(fresh, (k) => processKey(sat, k), deadline);
  return fresh.length;
}

declare global {
  // eslint-disable-next-line no-var
  var __ltGlmTimer: ReturnType<typeof setInterval> | undefined;
}

export function ensureIngest(): void {
  // Serverless: ingest is driven by cron / lazy triggers (runIngestOnce), not a background loop.
  if (remoteEnabled() || globalThis.__ltGlmTimer) return;
  const store = getStore();
  let busy = false;
  const tick = async (minutes: number) => {
    if (busy) return;
    busy = true;
    try {
      await Promise.all((["G19", "G18"] as SatId[]).map((s) => pollSat(s, minutes)));
    } finally {
      busy = false;
    }
  };
  globalThis.__ltGlmTimer = setInterval(() => void tick(6), POLL_MS);
  void tick(BACKFILL_MIN).then(() => {
    store.backfillDone = true;
  });

  // Meteosat (Europe/Africa): 10-minute granules, so a slower poll is enough.
  let liBusy = false;
  const liTick = async (minutes: number) => {
    if (liBusy) return;
    liBusy = true;
    try {
      await pollEumetsat(minutes);
    } finally {
      liBusy = false;
    }
  };
  void liTick(BACKFILL_MIN);
  setInterval(() => void liTick(25), 60_000);
}

/**
 * One bounded ingest pass for serverless hosts. Guarded by a Redis lock so overlapping
 * cron/lazy invocations don't duplicate work. Newest files are processed first.
 */
export async function runIngestOnce(budgetMs = 45_000): Promise<{ skipped: boolean }> {
  if (!remoteEnabled()) return { skipped: true };
  if (!(await remoteLock(55))) return { skipped: true };
  const deadline = Date.now() + budgetMs;
  try {
    await Promise.all([
      pollSat("G19", BACKFILL_MIN, deadline),
      pollSat("G18", BACKFILL_MIN, deadline),
      pollEumetsat(BACKFILL_MIN, deadline),
    ]);
  } finally {
    try {
      await remoteSetSats(getStore().sats);
      await remoteSetLastRun();
    } finally {
      await remoteUnlock();
    }
  }
  return { skipped: false };
}

export { remoteLastRun };
