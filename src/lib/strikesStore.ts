import type { BBox, LatLon, Strike } from "@/lib/strike";
import {
  bearingDeg,
  bearingToCompass,
  haversineKm,
  kmToMiles,
  pointInBBox,
} from "@/lib/strike";
import {
  STRIKES_BY_TIME,
  STRIKES_DATA,
  WORKER_HEARTBEAT,
  ensureRedis,
} from "@/lib/redis";
import {
  memoryGetHeartbeat,
  memoryGetStrikesSince,
  memorySeedDemo,
} from "@/lib/memoryStrikes";

function parseStrike(raw: string | null): Strike | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Strike;
  } catch {
    return null;
  }
}

function fromMemory(minutes: number, bbox?: BBox | null): Strike[] {
  let list = memoryGetStrikesSince(minutes);
  // Demo dots only when explicitly enabled — prefer real GLM ingest.
  if (
    !list.length &&
    process.env.ENABLE_DEMO_STRIKES === "1" &&
    process.env.NODE_ENV !== "production"
  ) {
    memorySeedDemo();
    list = memoryGetStrikesSince(minutes);
  }
  if (bbox) list = list.filter((s) => pointInBBox(s, bbox));
  return list;
}

export async function getWorkerHeartbeat(): Promise<string | null> {
  const r = await ensureRedis();
  if (!r) return memoryGetHeartbeat();
  try {
    return (await r.get(WORKER_HEARTBEAT)) || memoryGetHeartbeat();
  } catch {
    return memoryGetHeartbeat();
  }
}

export async function getStrikesSince(
  minutes: number,
  bbox?: BBox | null
): Promise<Strike[]> {
  const r = await ensureRedis();
  if (!r) return fromMemory(minutes, bbox);

  try {
    const cutoff = Date.now() / 1000 - minutes * 60;
    const ids = await r.zrangebyscore(STRIKES_BY_TIME, cutoff, "+inf");
    if (!ids.length) return fromMemory(minutes, bbox);
    const rows = await r.hmget(STRIKES_DATA, ...ids);
    const out: Strike[] = [];
    for (const row of rows) {
      const s = parseStrike(row);
      if (!s) continue;
      if (bbox && !pointInBBox(s, bbox)) continue;
      out.push(s);
    }
    out.sort((a, b) => (a.time < b.time ? 1 : -1));
    return out.length ? out : fromMemory(minutes, bbox);
  } catch {
    return fromMemory(minutes, bbox);
  }
}

export async function getNearestStrike(
  point: LatLon,
  minutes: number
): Promise<{
  strike: Strike;
  distanceKm: number;
  distanceMiles: number;
  bearing: number;
  bearingLabel: string;
  ageSeconds: number;
} | null> {
  const strikes = await getStrikesSince(minutes);
  if (!strikes.length) return null;
  let best: Strike | null = null;
  let bestKm = Infinity;
  for (const s of strikes) {
    const km = haversineKm(point, s);
    if (km < bestKm) {
      bestKm = km;
      best = s;
    }
  }
  if (!best) return null;
  const bearing = bearingDeg(point, best);
  const ageSeconds = Math.max(
    0,
    Math.round((Date.now() - Date.parse(best.time)) / 1000)
  );
  return {
    strike: best,
    distanceKm: bestKm,
    distanceMiles: kmToMiles(bestKm),
    bearing,
    bearingLabel: bearingToCompass(bearing),
    ageSeconds,
  };
}

export async function getStats(point: LatLon, radiusKm: number) {
  const recent = await getStrikesSince(20);
  const in15 = recent.filter(
    (s) => Date.parse(s.time) >= Date.now() - 15 * 60 * 1000
  );
  const nearby = in15.filter((s) => haversineKm(point, s) <= radiusKm);
  const nearest = await getNearestStrike(point, 30);

  const young = recent.filter(
    (s) => Date.parse(s.time) >= Date.now() - 10 * 60 * 1000
  );
  const older = recent.filter((s) => {
    const t = Date.parse(s.time);
    return t < Date.now() - 10 * 60 * 1000 && t >= Date.now() - 20 * 60 * 1000;
  });

  let stormDirection: string | null = null;
  if (young.length >= 3 && older.length >= 3) {
    const centroid = (list: Strike[]): LatLon => ({
      lat: list.reduce((a, s) => a + s.lat, 0) / list.length,
      lon: list.reduce((a, s) => a + s.lon, 0) / list.length,
    });
    const from = centroid(older);
    const to = centroid(young);
    stormDirection = bearingToCompass(bearingDeg(from, to));
  }

  return {
    strikesLast15Min: in15.length,
    strikesInRadius: nearby.length,
    radiusKm,
    nearest,
    stormDirection,
  };
}
