import { CITIES } from "./cities";

export type LatLon = { lat: number; lon: number };

const R = 6371;
const rad = (d: number) => (d * Math.PI) / 180;

export function distKm(a: LatLon, b: LatLon): number {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export function bearing(a: LatLon, b: LatLon): number {
  const y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
  const x =
    Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) -
    Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const COMPASS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
export const compass = (deg: number) => COMPASS[Math.round(deg / 22.5) % 16];

/** Geodesic circle as a GeoJSON ring. */
export function circlePolygon(c: LatLon, km: number, steps = 72): [number, number][] {
  const out: [number, number][] = [];
  const d = km / R;
  const lat1 = rad(c.lat);
  const lon1 = rad(c.lon);
  for (let i = 0; i <= steps; i++) {
    const brg = (i / steps) * 2 * Math.PI;
    const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brg));
    const lon2 =
      lon1 +
      Math.atan2(Math.sin(brg) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
    out.push([(lon2 * 180) / Math.PI, (lat2 * 180) / Math.PI]);
  }
  return out;
}

export function nearestCity(p: LatLon): { label: string; km: number; lat: number; lon: number } | null {
  let best: (typeof CITIES)[number] | null = null;
  let bestKm = Infinity;
  for (const c of CITIES) {
    const k = distKm(p, c);
    if (k < bestKm) {
      bestKm = k;
      best = c;
    }
  }
  if (!best || bestKm > 350) return null;
  return { label: `${best.name}, ${best.region}`, km: bestKm, lat: best.lat, lon: best.lon };
}

/** Growable columnar flash buffer (newest-last, mostly time-ordered). */
export class FlashBuf {
  n = 0;
  t = new Float64Array(1 << 16);
  lat = new Float32Array(1 << 16);
  lon = new Float32Array(1 << 16);
  e = new Float32Array(1 << 16);

  clear() {
    this.n = 0;
  }

  private grow() {
    const cap = this.t.length * 2;
    const g = <T extends Float32Array | Float64Array>(a: T, C: new (n: number) => T): T => {
      const b = new C(cap);
      b.set(a);
      return b;
    };
    this.t = g(this.t, Float64Array);
    this.lat = g(this.lat, Float32Array);
    this.lon = g(this.lon, Float32Array);
    this.e = g(this.e, Float32Array);
  }

  push(t: number, lat: number, lon: number, e: number) {
    if (this.n >= this.t.length) this.grow();
    const i = this.n++;
    this.t[i] = t;
    this.lat[i] = lat;
    this.lon[i] = lon;
    this.e[i] = e;
  }

  /** Drop everything older than minT. */
  prune(minT: number) {
    let w = 0;
    for (let r = 0; r < this.n; r++) {
      if (this.t[r] < minT) continue;
      if (w !== r) {
        this.t[w] = this.t[r];
        this.lat[w] = this.lat[r];
        this.lon[w] = this.lon[r];
        this.e[w] = this.e[r];
      }
      w++;
    }
    this.n = w;
  }
}

export type WireBatch = { base: number; d: number[]; keys?: string[] };

export function* iterWire(w: WireBatch) {
  for (let i = 0; i + 3 < w.d.length; i += 4) {
    yield { t: w.base + w.d[i], lat: w.d[i + 1] / 1000, lon: w.d[i + 2] / 1000, e: w.d[i + 3] };
  }
}

export type Storm = {
  id: string;
  lat: number;
  lon: number;
  n15: number;
  rate: number; // flashes/min over the last 5 minutes
  trend: "rising" | "falling" | "steady";
  radiusKm: number;
  motion: { speedKmh: number; heading: number } | null;
  place: string;
};

/** Cluster the last 15 min of flashes into storm cells and estimate rate/trend/motion. */
export function detectStorms(buf: FlashBuf, now: number): Storm[] {
  const CELL = 0.25;
  const from = now - 15 * 60_000;
  const cells = new Map<string, { i: number; j: number; idx: number[] }>();
  for (let k = 0; k < buf.n; k++) {
    if (buf.t[k] < from || buf.t[k] > now + 5000) continue;
    const i = Math.floor(buf.lat[k] / CELL);
    const j = Math.floor(buf.lon[k] / CELL);
    const key = i + ":" + j;
    const c = cells.get(key);
    if (c) c.idx.push(k);
    else cells.set(key, { i, j, idx: [k] });
  }
  const active = new Set<string>();
  for (const [key, c] of cells) if (c.idx.length >= 3) active.add(key);

  const seen = new Set<string>();
  const storms: Storm[] = [];
  for (const start of active) {
    if (seen.has(start)) continue;
    const queue = [start];
    seen.add(start);
    const members: number[] = [];
    while (queue.length) {
      const key = queue.pop()!;
      const c = cells.get(key)!;
      for (const k of c.idx) members.push(k);
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (!di && !dj) continue;
          const nk = c.i + di + ":" + (c.j + dj);
          if (active.has(nk) && !seen.has(nk)) {
            seen.add(nk);
            queue.push(nk);
          }
        }
      }
    }
    if (members.length < 25) continue;

    let sLat = 0;
    let sLon = 0;
    for (const k of members) {
      sLat += buf.lat[k];
      sLon += buf.lon[k];
    }
    const lat = sLat / members.length;
    const lon = sLon / members.length;

    let last5 = 0;
    let prev5 = 0;
    const mid = now - 7.5 * 60_000;
    const A = { n: 0, lat: 0, lon: 0, t: 0 }; // recent half
    const B = { n: 0, lat: 0, lon: 0, t: 0 }; // older half
    const dists: number[] = [];
    for (const k of members) {
      const age = now - buf.t[k];
      if (age <= 5 * 60_000) last5++;
      else if (age <= 10 * 60_000) prev5++;
      const g = buf.t[k] >= mid ? A : B;
      g.n++;
      g.lat += buf.lat[k];
      g.lon += buf.lon[k];
      g.t += buf.t[k];
      dists.push(distKm({ lat, lon }, { lat: buf.lat[k], lon: buf.lon[k] }));
    }
    dists.sort((a, b) => a - b);
    const radiusKm = Math.max(5, dists[Math.floor(dists.length * 0.9)] || 5);

    let trend: Storm["trend"] = "steady";
    if (last5 > prev5 * 1.35 + 3) trend = "rising";
    else if (last5 < prev5 * 0.65 - 3) trend = "falling";

    let motion: Storm["motion"] = null;
    if (A.n >= 15 && B.n >= 15) {
      const a = { lat: A.lat / A.n, lon: A.lon / A.n };
      const b = { lat: B.lat / B.n, lon: B.lon / B.n };
      const hours = (A.t / A.n - B.t / B.n) / 3_600_000;
      const km = distKm(b, a);
      if (hours > 0.03 && km > 1.5) {
        const speedKmh = km / hours;
        if (speedKmh < 140) motion = { speedKmh, heading: bearing(b, a) };
      }
    }

    const city = nearestCity({ lat, lon });
    storms.push({
      id: `${Math.round(lat * 4)}:${Math.round(lon * 4)}`,
      lat,
      lon,
      n15: members.length,
      rate: last5 / 5,
      trend,
      radiusKm,
      motion,
      place: city
        ? city.km < 25
          ? `Over ${city.label}`
          : `${Math.round(city.km)} km ${compass(bearing(city, { lat, lon }))} of ${city.label}`
        : `${lat.toFixed(1)}°, ${lon.toFixed(1)}°`,
    });
  }
  storms.sort((a, b) => b.n15 - a.n15);
  return storms.slice(0, 14);
}

export type ThreatLevel = "danger" | "warning" | "watch" | "nearby" | "clear";

export function threatFor(nearestKm: number | null): { level: ThreatLevel; title: string; text: string } {
  if (nearestKm == null) return { level: "clear", title: "All clear", text: "No lightning detected near you in the last 30 minutes." };
  if (nearestKm < 8)
    return { level: "danger", title: "Danger — lightning overhead", text: "Get inside a solid building or hard-topped vehicle now." };
  if (nearestKm < 16)
    return { level: "warning", title: "Lightning very close", text: "You are within strike range. Move indoors and stay away from windows." };
  if (nearestKm < 32)
    return { level: "watch", title: "Storm approaching range", text: "Lightning within 32 km. Be ready to take shelter quickly." };
  if (nearestKm < 64) return { level: "nearby", title: "Storm in your area", text: "Lightning within 64 km. Keep watching the trend." };
  return { level: "clear", title: "No close lightning", text: "Nearest flash is more than 64 km away." };
}

export const THREAT_COLOR: Record<ThreatLevel, string> = {
  danger: "#ff3b4e",
  warning: "#ff8a1f",
  watch: "#ffc233",
  nearby: "#5aa9ff",
  clear: "#34d399",
};
