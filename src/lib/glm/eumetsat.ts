import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { unzipSync } from "fflate";
import { addChunk, getStore, hasChunk, type FlashChunk } from "./store";
import { remoteAddChunk, remoteEnabled, remoteFlag } from "./remote";

/**
 * EUMETSAT Meteosat Third Generation Lightning Imager (MTG-I1 / "MTI1"),
 * Level-2 Lightning Flashes (LI-2-LFL, collection EO:EUM:DAT:0691).
 * Covers Europe, Africa, the Middle East and the Atlantic.
 *
 * Needs a free EUMETSAT Data Store API key (EUMETSAT_CONSUMER_KEY / EUMETSAT_CONSUMER_SECRET).
 * Granules are 10-minute files published ~1 minute after the window closes, so this
 * feed is minutes behind rather than seconds.
 */

const COLLECTION = "EO:EUM:DAT:0691";
const API = "https://api.eumetsat.int";
const LI_EPOCH_MS = Date.UTC(2000, 0, 1);

const creds = () => {
  const key = process.env.EUMETSAT_CONSUMER_KEY;
  const secret = process.env.EUMETSAT_CONSUMER_SECRET;
  return key && secret ? { key, secret } : null;
};

export const eumetsatConfigured = () => !!creds();

let token: { value: string; exp: number } | null = null;
async function getToken(): Promise<string> {
  if (token && token.exp > Date.now() + 60_000) return token.value;
  const c = creds();
  if (!c) throw new Error("EUMETSAT credentials not set");
  const res = await fetch(`${API}/token`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${c.key}:${c.secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`EUMETSAT token ${res.status}`);
  const j = (await res.json()) as { access_token: string; expires_in: number };
  token = { value: j.access_token, exp: Date.now() + j.expires_in * 1000 };
  return token.value;
}

type Granule = { id: string; startMs: number; endMs: number };

async function search(fromMs: number): Promise<Granule[]> {
  const iso = (ms: number) => new Date(ms).toISOString().replace(/\.\d+Z$/, "Z");
  const url =
    `${API}/data/search-products/1.0.0/os?pi=${COLLECTION}&format=json&c=30&sort=start,time,0` +
    `&dtstart=${iso(fromMs)}&dtend=${iso(Date.now() + 60_000)}`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`EUMETSAT search ${res.status}`);
  const j = (await res.json()) as {
    features?: Array<{ id: string; properties: { date: string } }>;
  };
  const out: Granule[] = [];
  for (const f of j.features ?? []) {
    const [a, b] = f.properties.date.split("/");
    const startMs = Date.parse(a);
    const endMs = Date.parse(b || a);
    if (Number.isFinite(startMs)) out.push({ id: f.id, startMs, endMs: Number.isFinite(endMs) ? endMs : startMs + 600_000 });
  }
  return out;
}

type Ds = {
  value: ArrayLike<number>;
  attrs: Record<string, { value: unknown }>;
};

/** Apply CF packing (scale_factor/add_offset/_FillValue/_Unsigned) to a variable. */
function readScaled(f: { get(name: string): unknown }, name: string): { v: Float64Array; units: string } | null {
  const ds = f.get(name) as Ds | null;
  if (!ds) return null;
  const num = (a: string) => {
    const x = ds.attrs?.[a]?.value;
    if (x == null) return undefined;
    const n = Number((x as ArrayLike<number>)[0] ?? x);
    return Number.isFinite(n) ? n : undefined;
  };
  const scale = num("scale_factor") ?? 1;
  const off = num("add_offset") ?? 0;
  const fill = num("_FillValue");
  const unsigned = String(ds.attrs?._Unsigned?.value ?? "") === "true";
  const raw = ds.value;
  const out = new Float64Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    let r = Number(raw[i]);
    if (unsigned && r < 0) r += r >= -128 ? 256 : 65536;
    out[i] = fill !== undefined && Number(raw[i]) === fill ? NaN : r * scale + off;
  }
  return { v: out, units: String(ds.attrs?.units?.value ?? "") };
}

async function parseNc(g: Granule, name: string, buf: Uint8Array): Promise<FlashChunk | null> {
  const h5 = await import("h5wasm/node");
  await h5.ready;
  const dir = await mkdtemp(path.join(tmpdir(), "li-"));
  const file = path.join(dir, "f.nc");
  try {
    await writeFile(file, buf);
    const f = new h5.File(file, "r");
    try {
      const lat = readScaled(f, "latitude");
      const lon = readScaled(f, "longitude");
      const time = readScaled(f, "flash_time");
      if (!lat || !lon || !time) throw new Error("LFL variables not found (latitude/longitude/flash_time)");
      const m = /since (\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?/.exec(time.units);
      const base = m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0), +(m[6] ?? 0)) : LI_EPOCH_MS;

      const t: number[] = [];
      const la: number[] = [];
      const lo: number[] = [];
      for (let i = 0; i < lat.v.length; i++) {
        let x = lon.v[i];
        const y = lat.v[i];
        const ms = base + time.v[i] * 1000;
        if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(ms)) continue;
        if (x > 180) x -= 360;
        if (Math.abs(y) > 90 || Math.abs(x) > 180) continue;
        t.push(ms);
        la.push(y);
        lo.push(x);
      }
      return {
        key: `${g.id}#${name}`,
        sat: "MTI1",
        startMs: g.startMs,
        endMs: g.endMs,
        t: Float64Array.from(t),
        lat: Float32Array.from(la),
        lon: Float32Array.from(lo),
        e: new Float32Array(t.length), // MTG radiance is not comparable to GLM energy
      };
    } finally {
      f.close();
    }
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

const inflight = new Set<string>();
const done = new Set<string>();

async function processGranule(g: Granule): Promise<void> {
  if (done.has(g.id) || inflight.has(g.id)) return;
  inflight.add(g.id);
  try {
    if (remoteEnabled() && (await remoteFlag(g.id))) {
      done.add(g.id);
      return;
    }
    const res = await fetch(
      `${API}/data/download/1.0.0/collections/${encodeURIComponent(COLLECTION)}/products/${encodeURIComponent(g.id)}`,
      { headers: { Authorization: `Bearer ${await getToken()}` }, signal: AbortSignal.timeout(90_000) }
    );
    if (!res.ok) throw new Error(`EUMETSAT download ${res.status}`);
    const files = unzipSync(new Uint8Array(await res.arrayBuffer()), {
      filter: (f) => f.name.includes("CHK-BODY") && f.name.endsWith(".nc"),
    });
    let n = 0;
    for (const [name, data] of Object.entries(files)) {
      if (hasChunk(`${g.id}#${name}`)) continue;
      const chunk = await parseNc(g, name, data);
      if (chunk) {
        addChunk(chunk);
        if (remoteEnabled()) await remoteAddChunk(chunk);
        n += chunk.t.length;
      }
    }
    done.add(g.id);
    if (remoteEnabled()) await remoteFlag(g.id, true);
    const st = getStore().sats.MTI1;
    st.files++;
    st.lastFileMs = Math.max(st.lastFileMs ?? 0, g.endMs);
    st.error = null;
    if (!n) console.warn(`[li] granule ${g.id} contained no flashes`);
  } catch (e) {
    getStore().sats.MTI1.error = e instanceof Error ? e.message : String(e);
    console.warn("[li]", getStore().sats.MTI1.error);
  } finally {
    inflight.delete(g.id);
  }
}

export async function pollEumetsat(backfillMinutes: number, deadline = Infinity): Promise<void> {
  const st = getStore().sats.MTI1;
  st.configured = eumetsatConfigured();
  if (!st.configured) {
    st.error = "Add EUMETSAT_CONSUMER_KEY and EUMETSAT_CONSUMER_SECRET to .env to enable Europe/Africa";
    return;
  }
  try {
    const grans = await search(Date.now() - (backfillMinutes + 12) * 60_000);
    st.lastPollMs = Date.now();
    // newest first
    for (const g of grans.sort((a, b) => b.startMs - a.startMs)) {
      if (Date.now() >= deadline) break;
      await processGranule(g);
    }
  } catch (e) {
    st.error = e instanceof Error ? e.message : String(e);
  }
}
