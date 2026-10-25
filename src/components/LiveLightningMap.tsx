"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Strike } from "@/lib/strike";
import { haversineKm, kmToMiles } from "@/lib/strike";
import { SITE_NAME } from "@/lib/siteConfig";

type MinutesFilter = 15 | 30 | 60;

type NearestInfo = {
  strike: Strike;
  distanceKm: number;
  distanceMiles: number;
  bearing: number;
  bearingLabel: string;
  ageSeconds: number;
};

type StatsPayload = {
  strikesLast15Min: number;
  strikesInRadius: number;
  radiusKm: number;
  nearest: NearestInfo | null;
  stormDirection: string | null;
  workerHeartbeat?: string | null;
};

type LeafletModule = typeof import("leaflet");
type LeafletMap = import("leaflet").Map;
type LeafletLayerGroup = import("leaflet").LayerGroup;

const DISCLAIMER =
  "Info only — not for life-safety decisions. Follow official weather warnings.";

/** Free dark basemap — no API key (Esri World Dark Gray Canvas). */
const DARK_TILES =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const DARK_LABELS =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}";

function ageMinutes(iso: string): number {
  return (Date.now() - Date.parse(iso)) / 60000;
}

function strikeColor(iso: string): string {
  const m = ageMinutes(iso);
  if (m <= 5) return "#FFD60A";
  if (m <= 10) return "#F97316";
  return "#EF4444";
}

function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

function riskHint(miles: number | null): { label: string; tone: string } {
  if (miles == null) return { label: "Share location to check risk near you", tone: "text-white/60" };
  if (miles < 6) return { label: "Very close — seek solid shelter now", tone: "text-[#F97316]" };
  if (miles < 15) return { label: "Nearby storm — stay alert outdoors", tone: "text-[#FFD60A]" };
  if (miles < 50) return { label: "Storm in the region — keep watching", tone: "text-[#93C5FD]" };
  return { label: "Nearest flash is far from you right now", tone: "text-white/55" };
}

type Props = {
  fullBleed?: boolean;
};

export default function LiveLightningMap({ fullBleed = false }: Props) {
  const mapElId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const strikesLayerRef = useRef<LeafletLayerGroup | null>(null);
  const userLayerRef = useRef<LeafletLayerGroup | null>(null);
  const leafletRef = useRef<LeafletModule | null>(null);

  const [minutes, setMinutes] = useState<MinutesFilter>(60);
  const [strikes, setStrikes] = useState<Strike[]>([]);
  const [userLoc, setUserLoc] = useState<{ lat: number; lon: number } | null>(null);
  const [stats, setStats] = useState<StatsPayload | null>(null);
  const [status, setStatus] = useState<"loading" | "live" | "empty" | "offline">("loading");
  const [error, setError] = useState<string | null>(null);
  const [locError, setLocError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const refreshStrikes = useCallback(
    async (mapBbox?: string) => {
      try {
        const params = new URLSearchParams({ minutes: String(minutes) });
        if (mapBbox) params.set("bbox", mapBbox);
        const res = await fetch(`/api/strikes?${params.toString()}`, { cache: "no-store" });
        if (!res.ok) throw new Error(`API ${res.status}`);
        const data = (await res.json()) as {
          strikes: Strike[];
          workerHeartbeat: string | null;
        };
        const list = data.strikes || [];
        setStrikes(list);

        const hb = data.workerHeartbeat;
        const stale = !hb || Date.now() - Date.parse(hb) > 2 * 60 * 1000;
        if (!hb) setStatus(list.length ? "live" : "empty");
        else if (stale && !list.length) setStatus("offline");
        else setStatus(list.length ? "live" : "empty");
        setError(null);
        return list;
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load strikes");
        setStatus("offline");
        return [] as Strike[];
      }
    },
    [minutes]
  );

  const refreshStats = useCallback(async (loc: { lat: number; lon: number }) => {
    try {
      const params = new URLSearchParams({
        lat: String(loc.lat),
        lon: String(loc.lon),
        radiusKm: "50",
      });
      const res = await fetch(`/api/stats?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) return;
      setStats((await res.json()) as StatsPayload);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMap | null = null;

    async function boot() {
      const L = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current) return;

      leafletRef.current = L;
      map = L.map(containerRef.current, {
        worldCopyJump: true,
        zoomControl: false,
        attributionControl: true,
      }).setView([28, -90], 4);

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer(DARK_TILES, {
        attribution:
          'Tiles &copy; <a href="https://www.esri.com/">Esri</a> · Lightning: NOAA GOES GLM',
        maxZoom: 16,
      }).addTo(map);

      L.tileLayer(DARK_LABELS, {
        maxZoom: 16,
        opacity: 0.85,
      }).addTo(map);

      strikesLayerRef.current = L.layerGroup().addTo(map);
      userLayerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      setMapReady(true);

      const resize = () => map?.invalidateSize({ animate: false });
      requestAnimationFrame(resize);
      window.setTimeout(resize, 80);
      window.setTimeout(resize, 320);
      window.addEventListener("resize", resize);
      const ro =
        typeof ResizeObserver !== "undefined" && containerRef.current
          ? new ResizeObserver(resize)
          : null;
      if (containerRef.current && ro) ro.observe(containerRef.current);

      (map as unknown as { __ltCleanup?: () => void }).__ltCleanup = () => {
        window.removeEventListener("resize", resize);
        ro?.disconnect();
      };
    }

    void boot().catch((err) => {
      if (!cancelled) setError(err instanceof Error ? err.message : "Map failed to load");
    });

    return () => {
      cancelled = true;
      const cleanup = (map as unknown as { __ltCleanup?: () => void } | null)?.__ltCleanup;
      cleanup?.();
      map?.remove();
      mapRef.current = null;
      strikesLayerRef.current = null;
      userLayerRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const layer = strikesLayerRef.current;
    if (!L || !layer || !mapReady) return;

    layer.clearLayers();
    // Cap markers for snappy pan/zoom — newest first
    const visible = strikes.slice(0, 2500);
    for (const s of visible) {
      const age = ageMinutes(s.time);
      const color = strikeColor(s.time);
      const fresh = age <= 5;
      const marker = L.circleMarker([s.lat, s.lon], {
        radius: fresh ? 7 : age <= 10 ? 5.5 : 4.5,
        color: "#0B1228",
        weight: 1.25,
        fillColor: color,
        fillOpacity: fresh ? 1 : 0.82,
        className: fresh ? "lt-strike-fresh" : undefined,
      });
      marker.bindTooltip(
        `<div style="font:600 12px/1.35 system-ui,sans-serif">
          <div style="color:${color}">${age < 1 ? "Just now" : `${age.toFixed(0)} min ago`}</div>
          <div style="opacity:.7;font-weight:500;margin-top:2px">${s.lat.toFixed(2)}°, ${s.lon.toFixed(2)}°</div>
        </div>`,
        { direction: "top", opacity: 0.96, className: "lt-tip" }
      );
      marker.addTo(layer);
    }
  }, [strikes, mapReady]);

  useEffect(() => {
    const L = leafletRef.current;
    const layer = userLayerRef.current;
    if (!L || !layer || !mapReady) return;
    layer.clearLayers();
    if (!userLoc) return;

    L.circleMarker([userLoc.lat, userLoc.lon], {
      radius: 10,
      color: "#ffffff",
      weight: 2.5,
      fillColor: "#38BDF8",
      fillOpacity: 1,
      className: "lt-you-here",
    })
      .bindTooltip("You are here", { direction: "top", className: "lt-tip" })
      .addTo(layer);

    const nearest = stats?.nearest?.strike;
    if (nearest) {
      L.polyline(
        [
          [userLoc.lat, userLoc.lon],
          [nearest.lat, nearest.lon],
        ],
        {
          color: "#38BDF8",
          weight: 2.5,
          dashArray: "6 8",
          opacity: 0.85,
        }
      ).addTo(layer);
    }
  }, [userLoc, stats, mapReady]);

  useEffect(() => {
    if (!mapReady) return;
    let alive = true;

    async function tick() {
      if (!alive) return;
      const map = mapRef.current;
      let bbox: string | undefined;
      if (map) {
        const b = map.getBounds();
        bbox = `${b.getWest()},${b.getSouth()},${b.getEast()},${b.getNorth()}`;
      }
      await refreshStrikes(bbox);
      if (userLoc) await refreshStats(userLoc);
    }

    void tick();
    const id = window.setInterval(() => void tick(), 12000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [minutes, refreshStrikes, refreshStats, userLoc, mapReady]);

  const useMyLocation = () => {
    setLocError(null);
    if (!navigator.geolocation) {
      setLocError("This browser can’t share location. Try Chrome or Safari.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        setUserLoc(loc);
        setLocating(false);
        mapRef.current?.flyTo([loc.lat, loc.lon], 7, { duration: 1.15 });
        void refreshStats(loc);
      },
      () => {
        setLocating(false);
        setLocError("Location blocked — allow it in the browser prompt, then try again.");
      },
      { enableHighAccuracy: true, timeout: 14000 }
    );
  };

  const localNearest = userLoc ? nearestFromList(userLoc, strikes) : null;
  const nearestMiles =
    stats?.nearest?.distanceMiles ?? (localNearest ? kmToMiles(localNearest.km) : null);

  const risk = riskHint(nearestMiles);
  const isLive = status === "live" || status === "empty";

  const shellClass = fullBleed
    ? "lt-map-shell lt-map-friendly relative h-[calc(100svh-3.5rem)] min-h-[640px] w-full overflow-hidden bg-[#070A1A]"
    : "lt-map-shell lt-map-friendly relative h-[min(72vh,640px)] min-h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070A1A] shadow-[0_28px_80px_-36px_rgba(59,130,246,0.55)]";

  return (
    <div className={shellClass}>
      {/* Map fills the entire shell — chrome floats on top */}
      <div
        ref={containerRef}
        id={`lt-map-${mapElId}`}
        className="lt-leaflet absolute inset-0 z-0 h-full w-full bg-[#0A1024]"
        role="img"
        aria-label="Live lightning strike map"
      />

      <div
        className="pointer-events-none absolute inset-0 z-[400] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(7,10,26,0.55)_100%)]"
        aria-hidden
      />

      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[500] bg-gradient-to-b from-[#070A1A] via-[#070A1A]/80 to-transparent px-3 pb-16 pt-3 sm:px-5 sm:pt-4">
        <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                  isLive
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-white/10 bg-white/5 text-white/45"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isLive ? "animate-pulse bg-emerald-400" : "bg-white/30"}`}
                />
                {status === "loading" ? "Connecting" : isLive ? "Live" : "Offline"}
              </span>
              {status === "live" && (
                <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/65 backdrop-blur-md">
                  {formatCount(strikes.length)} flashes · last {minutes} min
                </span>
              )}
            </div>
            {fullBleed ? (
              <>
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-[2.15rem]">
                  <span className="brand-gradient-text">{SITE_NAME}</span>
                </h1>
                <p className="mt-1 max-w-md text-sm text-white/70 sm:text-base">
                  Tap the map, zoom into storms, or jump to your location in one tap.
                </p>
              </>
            ) : (
              <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Live lightning map</h2>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex items-center gap-1 rounded-2xl border border-white/12 bg-[#070A1A]/75 p-1 shadow-lg backdrop-blur-xl"
              role="group"
              aria-label="Show strikes from the last"
            >
              <span className="hidden pl-2 pr-1 text-[10px] font-semibold uppercase tracking-wide text-white/40 sm:inline">
                Show
              </span>
              {([15, 30, 60] as MinutesFilter[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMinutes(m)}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                    minutes === m
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] text-white shadow-[0_8px_22px_-10px_rgba(59,130,246,0.95)]"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {m} min
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Friendly near-you / CTA panel */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[500] bg-gradient-to-t from-[#070A1A] via-[#070A1A]/75 to-transparent px-3 pb-3 pt-20 sm:px-5 sm:pb-4">
        <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="lt-panel-in w-full max-w-md rounded-2xl border border-white/12 bg-[#0C1230]/90 p-4 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:p-5">
            {!userLoc ? (
              <>
                <p className="font-display text-lg font-semibold text-white">How close is the storm?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  Allow location once — we’ll measure the nearest flash and fly the map to you.
                </p>
                <button
                  type="button"
                  onClick={useMyLocation}
                  disabled={locating}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_rgba(59,130,246,0.95)] transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 100 8 4 4 0 000-8z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {locating ? "Finding you…" : "Find storms near me"}
                </button>
                {locError && <p className="mt-2 text-xs text-red-300">{locError}</p>}
              </>
            ) : (
              <>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#38BDF8]">
                      Near you
                    </p>
                    <p className={`mt-1 text-sm font-medium ${risk.tone}`}>{risk.label}</p>
                  </div>
                  <button
                    type="button"
                    onClick={useMyLocation}
                    className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
                  >
                    Refresh
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  <StatTile
                    label="Nearest flash"
                    value={
                      nearestMiles != null
                        ? `${nearestMiles < 100 ? nearestMiles.toFixed(1) : Math.round(nearestMiles)} mi`
                        : "—"
                    }
                    hint={stats?.nearest?.bearingLabel ? stats.nearest.bearingLabel : undefined}
                    accent="#38BDF8"
                  />
                  <StatTile
                    label="Within 50 km"
                    value={
                      stats?.strikesInRadius != null ? formatCount(stats.strikesInRadius) : "—"
                    }
                    hint="last 15 min"
                    accent="#FFD60A"
                  />
                  <StatTile
                    label="Region (15m)"
                    value={
                      stats?.strikesLast15Min != null
                        ? formatCount(stats.strikesLast15Min)
                        : "—"
                    }
                    hint="all flashes"
                    accent="#F8D850"
                  />
                  <StatTile
                    label="Storm drift"
                    value={stats?.stormDirection ?? "—"}
                    hint="rough trend"
                    accent="#93C5FD"
                  />
                </div>
                {locError && <p className="mt-2 text-xs text-red-300">{locError}</p>}
              </>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-white/10 bg-[#070A1A]/70 px-3.5 py-2.5 text-xs text-white/65 backdrop-blur-md lg:mb-1">
            <span className="font-semibold text-white/80">Age</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FFD60A] shadow-[0_0_10px_#FFD60A]" />
              Fresh (0–5m)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]" />
              5–10m
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
              Older
            </span>
            <span className="hidden text-white/35 sm:inline">·</span>
            <span className="max-w-xs text-[11px] leading-snug text-white/40 sm:max-w-sm">
              Free NOAA GOES GLM (Americas). {DISCLAIMER}
            </span>
          </div>
        </div>
      </div>

      {status === "empty" && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[450] w-[min(90vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#070A1A]/85 px-4 py-3 text-center text-sm text-white/70 backdrop-blur-md">
          No flashes in this view — pan toward the Americas or widen to 60 min.
        </div>
      )}

      {error && (
        <p className="absolute left-3 right-3 top-[4.5rem] z-[520] rounded-xl border border-red-500/30 bg-red-500/15 px-3 py-2 text-xs text-red-100 backdrop-blur-md sm:left-auto sm:right-5 sm:w-80">
          {error}
        </p>
      )}
    </div>
  );
}

function nearestFromList(userLoc: { lat: number; lon: number }, strikes: Strike[]) {
  if (!strikes.length) return null;
  return strikes.reduce<{ s: Strike; km: number } | null>((best, s) => {
    const km = haversineKm(userLoc, s);
    if (!best || km < best.km) return { s, km };
    return best;
  }, null);
}

function StatTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/25 px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40">{label}</p>
      <p className="mt-1 font-display text-lg font-semibold tabular-nums leading-none" style={{ color: accent }}>
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] text-white/40">{hint}</p>}
    </div>
  );
}
