import type { Strike } from "@/lib/strike";

/**
 * Process-local strike buffer used when Redis is unavailable (no Docker).
 * The seed endpoint and optional demo mode write here so the map still works.
 */
const store = new Map<string, Strike>();
let heartbeat: string | null = null;

export function memorySetHeartbeat(iso: string) {
  heartbeat = iso;
}

export function memoryGetHeartbeat() {
  return heartbeat;
}

export function memoryUpsertStrikes(strikes: Strike[]) {
  const now = Date.now();
  for (const s of strikes) {
    store.set(s.id, s);
  }
  // prune > 60 min
  for (const [id, s] of store) {
    if (now - Date.parse(s.time) > 60 * 60 * 1000) store.delete(id);
  }
  if (strikes.length) {
    heartbeat = new Date().toISOString();
  }
}

export function memoryCount(): number {
  return store.size;
}

export function memoryGetStrikesSince(minutes: number): Strike[] {
  const cutoff = Date.now() - minutes * 60 * 1000;
  return [...store.values()]
    .filter((s) => Date.parse(s.time) >= cutoff)
    .sort((a, b) => (a.time < b.time ? 1 : -1));
}

export function memoryClear() {
  store.clear();
  heartbeat = null;
}

/** Deterministic demo cluster over the Gulf / SE US for local UI testing. */
export function memorySeedDemo(count = 40): Strike[] {
  const center = { lat: 28.5, lon: -90 };
  const now = Date.now();
  const strikes: Strike[] = [];
  for (let i = 0; i < count; i++) {
    const ageMs = (i / count) * 50 * 60 * 1000;
    const strike: Strike = {
      id: `mem-demo-${i}-${Math.floor(now / 60000)}`,
      time: new Date(now - ageMs).toISOString(),
      lat: center.lat + Math.sin(i * 1.7) * 5.5,
      lon: center.lon + Math.cos(i * 1.3) * 9.5,
      type: "unknown",
      source: "goes-glm",
    };
    strikes.push(strike);
  }
  memoryUpsertStrikes(strikes);
  return strikes;
}
