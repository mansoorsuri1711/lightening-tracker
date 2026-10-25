"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.setWorkerUrl("/maplibre-gl-worker.mjs");
import {
  FlashBuf,
  bearing,
  circlePolygon,
  compass,
  detectStorms,
  distKm,
  iterWire,
  threatFor,
  THREAT_COLOR,
  type LatLon,
  type Storm,
  type WireBatch,
} from "@/lib/tracker/analysis";
import { AGE_COLOR_EXPR, AGE_STOPS, RADIUS_EXPR, styleFor, type Basemap } from "./mapStyle";
import Sparkline from "./Sparkline";

type Units = "km" | "mi";
type Conn = "connecting" | "live" | "reconnecting";

type Settings = {
  basemap: Basemap;
  radar: boolean;
  heat: boolean;
  windowMin: 5 | 15 | 30 | 60;
  units: Units;
  alertKm: number;
  notify: boolean;
  user: LatLon | null;
  view: { lng: number; lat: number; zoom: number } | null;
  collapsed: Record<string, boolean>;
};

const DEFAULTS: Settings = {
  basemap: "satellite",
  radar: false,
  heat: false,
  windowMin: 30,
  units: "km",
  alertKm: 25,
  notify: false,
  user: null,
  view: null,
  collapsed: {},
};
const LS_KEY = "lt.settings.v2";
const PANEL_W = 372; // px of map hidden behind the floating panel on desktop

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const base: Settings = { ...DEFAULTS };
    if (typeof navigator !== "undefined" && /^en-US/.test(navigator.language)) base.units = "mi";
    return raw ? { ...base, ...JSON.parse(raw) } : base;
  } catch {
    return { ...DEFAULTS };
  }
}

type Pending = { play: number; t: number; lat: number; lon: number; e: number };
type Pulse = { lat: number; lon: number; start: number; strong: boolean };
type SatStatus = { sat: string; lastFileMs: number | null; error: string | null; configured?: boolean };
type Near = {
  km: number;
  brg: number;
  ageSec: number;
  lat: number;
  lon: number;
  c10: number;
  c25: number;
  c50: number;
};

const MAX_FEATURES = 120_000;
const HISTORY_MIN = 60;

const fmtN = (n: number) => n.toLocaleString("en-US");
const fmtCompact = (n: number) => (n >= 100_000 ? `${Math.round(n / 1000)}k` : n.toLocaleString("en-US"));
function fmtDist(km: number, u: Units) {
  const v = u === "mi" ? km * 0.621371 : km;
  return `${v < 10 ? v.toFixed(1) : Math.round(v)} ${u}`;
}
function fmtAgo(sec: number) {
  if (sec < 5) return "just now";
  if (sec < 90) return `${Math.round(sec)}s ago`;
  return `${Math.round(sec / 60)} min ago`;
}

// `fullBleed` is accepted for the loader's API; the tracker is always full-bleed now.
export default function TrackerApp(_props: { fullBleed?: boolean } = {}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mapElRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapReadyRef = useRef(false);
  const markersRef = useRef<maplibregl.Marker[]>([]);

  const bufRef = useRef(new FlashBuf());
  const keysRef = useRef(new Set<string>());
  const pendingRef = useRef<Pending[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const dirtyRef = useRef(true);
  const lastRefreshRef = useRef(0);
  const cursorRef = useRef<number | null>(null);
  const playingRef = useRef<{ on: boolean; speed: number }>({ on: false, speed: 60 });
  const radarUrlRef = useRef<string | null>(null);
  const lastAlertRef = useRef(0);
  const audioRef = useRef<AudioContext | null>(null);
  const pickRef = useRef(false);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const countInViewRef = useRef<() => void>(() => {});

  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const [hydrated, setHydrated] = useState(false);

  const [conn, setConn] = useState<Conn>("connecting");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [latencySec, setLatencySec] = useState<number | null>(null);
  const [rate, setRate] = useState(0);
  const [bins, setBins] = useState<number[]>(() => new Array(HISTORY_MIN).fill(0));
  const [totalWindow, setTotalWindow] = useState(0);
  const [inView, setInView] = useState(0);
  const [storms, setStorms] = useState<Storm[]>([]);
  const [near, setNear] = useState<Near | null>(null);
  const [scrubMin, setScrubMin] = useState<number | null>(null); // null = live
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(60);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [picking, setPicking] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [radarNote, setRadarNote] = useState<string | null>(null);
  const [outside, setOutside] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [sats, setSats] = useState<Record<string, SatStatus> | null>(null);
  const [nowTick, setNowTick] = useState(() => Date.now());

  const live = scrubMin === null;
  const { basemap, radar, heat, windowMin, units, alertKm, notify, user } = settings;

  const patch = useCallback((p: Partial<Settings>) => setSettings((s) => ({ ...s, ...p })), []);

  /* ---------- persistence ---------- */
  useEffect(() => {
    setSettings(loadSettings());
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(settings));
    } catch {
      /* private mode */
    }
  }, [settings, hydrated]);

  /* ---------- map layer plumbing ---------- */
  const refreshMapData = useCallback(() => {
    const map = mapRef.current;
    if (!map || !mapReadyRef.current) return;
    const src = map.getSource("flashes") as maplibregl.GeoJSONSource | undefined;
    if (!src) return;
    const buf = bufRef.current;
    const ref = cursorRef.current ?? Date.now();
    const winMs = settingsRef.current.windowMin * 60_000;
    const lo = ref - winMs;
    const feats: GeoJSON.Feature<GeoJSON.Point>[] = [];
    // newest first so the cap drops the oldest
    for (let i = buf.n - 1; i >= 0 && feats.length < MAX_FEATURES; i--) {
      const t = buf.t[i];
      if (t > ref || t < lo) continue;
      feats.push({
        type: "Feature",
        properties: { age: Math.round(((ref - t) / 60_000) * 10) / 10, e: Math.round(buf.e[i]) },
        geometry: { type: "Point", coordinates: [buf.lon[i], buf.lat[i]] },
      });
    }
    src.setData({ type: "FeatureCollection", features: feats });
    setTotalWindow(feats.length);
    dirtyRef.current = false;
    lastRefreshRef.current = performance.now();
  }, []);

  const updateMe = useCallback((u: LatLon | null, km: number, n: Near | null) => {
    const map = mapRef.current;
    if (!map || !mapReadyRef.current) return;
    const src = map.getSource("me") as maplibregl.GeoJSONSource | undefined;
    if (!src) return;
    const features: GeoJSON.Feature[] = [];
    if (u) {
      features.push({ type: "Feature", properties: { k: "pt" }, geometry: { type: "Point", coordinates: [u.lon, u.lat] } });
      features.push({
        type: "Feature",
        properties: { k: "ring" },
        geometry: { type: "Polygon", coordinates: [circlePolygon(u, km)] },
      });
      if (n)
        features.push({
          type: "Feature",
          properties: { k: "line" },
          geometry: { type: "LineString", coordinates: [[u.lon, u.lat], [n.lon, n.lat]] },
        });
    }
    src.setData({ type: "FeatureCollection", features });
  }, []);

  const syncRadar = useCallback(() => {
    const map = mapRef.current;
    if (!map || !mapReadyRef.current) return;
    const want = settingsRef.current.radar && radarUrlRef.current;
    if (map.getLayer("radar")) map.removeLayer("radar");
    if (map.getSource("radar")) map.removeSource("radar");
    if (!want) return;
    map.addSource("radar", {
      type: "raster",
      tiles: [radarUrlRef.current as string],
      tileSize: 256,
      maxzoom: 7,
      attribution: "Radar © RainViewer",
    });
    map.addLayer(
      { id: "radar", type: "raster", source: "radar", paint: { "raster-opacity": 0.6, "raster-fade-duration": 0 } },
      map.getLayer("flash-heat") ? "flash-heat" : undefined
    );
  }, []);

  const installLayers = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const s = settingsRef.current;
    if (!map.getSource("flashes")) {
      map.addSource("flashes", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
        maxzoom: 10,
        tolerance: 0.2,
        buffer: 16,
      });
    }
    if (!map.getLayer("flash-heat")) {
      map.addLayer({
        id: "flash-heat",
        type: "heatmap",
        source: "flashes",
        layout: { visibility: s.heat ? "visible" : "none" },
        paint: {
          "heatmap-weight": ["interpolate", ["linear"], ["get", "age"], 0, 1, 60, 0.35],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 2, 0.6, 9, 2.2],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 2, 6, 6, 18, 10, 36],
          "heatmap-color": [
            "interpolate", ["linear"], ["heatmap-density"],
            0, "rgba(10,16,40,0)",
            0.12, "rgba(50,80,200,0.45)",
            0.35, "rgba(40,190,230,0.65)",
            0.55, "rgba(120,235,150,0.78)",
            0.75, "rgba(255,214,70,0.88)",
            0.9, "rgba(255,120,40,0.94)",
            1, "rgba(255,255,255,1)",
          ],
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.95, 9, 0.5],
        },
      });
    }
    if (!map.getLayer("flash-glow")) {
      map.addLayer({
        id: "flash-glow",
        type: "circle",
        source: "flashes",
        filter: ["<", ["get", "age"], 2],
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["zoom"], 2, 7, 6, 14, 10, 24],
          "circle-color": "#ffd84a",
          "circle-opacity": ["interpolate", ["linear"], ["get", "age"], 0, 0.35, 2, 0],
          "circle-blur": 1,
          "circle-pitch-alignment": "map",
        },
      });
    }
    if (!map.getLayer("flash-dots")) {
      map.addLayer({
        id: "flash-dots",
        type: "circle",
        source: "flashes",
        minzoom: s.heat ? 7 : 0,
        paint: {
          "circle-radius": RADIUS_EXPR,
          "circle-color": AGE_COLOR_EXPR,
          "circle-opacity": ["interpolate", ["linear"], ["get", "age"], 0, 1, 60, 0.6],
          "circle-stroke-width": ["interpolate", ["linear"], ["get", "age"], 0, 0.8, 3, 0],
          "circle-stroke-color": "rgba(255,255,255,0.55)",
        },
      });
    }
    if (!map.getSource("me")) {
      map.addSource("me", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
      map.addLayer({
        id: "me-ring",
        type: "fill",
        source: "me",
        filter: ["==", ["get", "k"], "ring"],
        paint: { "fill-color": "#38bdf8", "fill-opacity": 0.07 },
      });
      map.addLayer({
        id: "me-ring-line",
        type: "line",
        source: "me",
        filter: ["==", ["get", "k"], "ring"],
        paint: { "line-color": "#38bdf8", "line-width": 1.5, "line-dasharray": [2, 2], "line-opacity": 0.8 },
      });
      map.addLayer({
        id: "me-line",
        type: "line",
        source: "me",
        filter: ["==", ["get", "k"], "line"],
        paint: { "line-color": "#ffffff", "line-width": 1.5, "line-dasharray": [1, 2], "line-opacity": 0.85 },
      });
      map.addLayer({
        id: "me-pt",
        type: "circle",
        source: "me",
        filter: ["==", ["get", "k"], "pt"],
        paint: {
          "circle-radius": 7,
          "circle-color": "#38bdf8",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 2.5,
        },
      });
    }
    syncRadar();
  }, [syncRadar]);

  /* ---------- map init ---------- */
  useEffect(() => {
    if (!hydrated || !mapElRef.current || mapRef.current) return;
    const s = settingsRef.current;

    // MapLibre needs WebGL2; fail soft so the stats panel keeps working.
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = document.createElement("canvas").getContext("webgl2");
    } catch {
      gl = null;
    }
    if (!gl) {
      setMapError("Your browser can't create a WebGL2 context, which the live map needs.");
      return;
    }

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container: mapElRef.current,
        style: styleFor(s.basemap),
        center: s.view ? [s.view.lng, s.view.lat] : s.user ? [s.user.lon, s.user.lat] : [-96, 34],
        zoom: s.view?.zoom ?? (s.user ? 6 : 3.4),
        minZoom: 1.5,
        maxZoom: 15,
        attributionControl: false,
        renderWorldCopies: true,
        dragRotate: false,
        pitchWithRotate: false,
      });
    } catch (e) {
      setMapError(e instanceof Error ? e.message : "The map failed to start.");
      return;
    }
    if (window.innerWidth >= 1024) map.setPadding({ left: PANEL_W, top: 0, right: 0, bottom: 0 });
    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }), "bottom-left");
    mapRef.current = map;

    const countInView = () => {
      const b = map.getBounds();
      const w = b.getWest(), e = b.getEast(), so = b.getSouth(), no = b.getNorth();
      const buf = bufRef.current;
      const ref = cursorRef.current ?? Date.now();
      const lo = ref - settingsRef.current.windowMin * 60_000;
      let c = 0;
      for (let i = 0; i < buf.n; i++) {
        const t = buf.t[i];
        if (t > ref || t < lo) continue;
        const la = buf.lat[i], lo2 = buf.lon[i];
        if (la >= so && la <= no && lo2 >= w && lo2 <= e) c++;
      }
      setInView(c);
      const ctr = map.getCenter();
      const americas = ctr.lng > -175 && ctr.lng < -5 && ctr.lat > -62 && ctr.lat < 62;
      const euAfrica = ctr.lng > -40 && ctr.lng < 75 && ctr.lat > -40 && ctr.lat < 68;
      setOutside(!(americas || euAfrica));
    };
    countInViewRef.current = countInView;

    map.on("style.load", () => {
      mapReadyRef.current = true;
      installLayers();
      dirtyRef.current = true;
      refreshMapData();
      updateMe(settingsRef.current.user, settingsRef.current.alertKm, null);
    });
    map.on("moveend", () => {
      const c = map.getCenter();
      patch({ view: { lng: +c.lng.toFixed(3), lat: +c.lat.toFixed(3), zoom: +map.getZoom().toFixed(2) } });
      countInView();
    });
    map.on("click", (ev) => {
      if (pickRef.current) {
        pickRef.current = false;
        setPicking(false);
        patch({ user: { lat: ev.lngLat.lat, lon: ev.lngLat.lng } });
        return;
      }
      if (!map.getLayer("flash-dots")) return;
      const pad = 7;
      const feats = map.queryRenderedFeatures(
        [[ev.point.x - pad, ev.point.y - pad], [ev.point.x + pad, ev.point.y + pad]],
        { layers: ["flash-dots"] }
      );
      if (!feats.length) return;
      const f = feats.reduce((a, b) => ((a.properties?.age ?? 99) < (b.properties?.age ?? 99) ? a : b));
      const [lng, lat] = (f.geometry as GeoJSON.Point).coordinates;
      const ageMin = Number(f.properties?.age ?? 0);
      const ref = cursorRef.current ?? Date.now();
      const when = new Date(ref - ageMin * 60_000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      const energy = Number(f.properties?.e ?? 0);
      popupRef.current?.remove();
      popupRef.current = new maplibregl.Popup({ closeButton: false, offset: 10, className: "lt-popup" })
        .setLngLat([lng, lat])
        .setHTML(
          `<div class="lt-pop"><b>${ageMin < 1 ? "Just now" : ageMin.toFixed(1) + " min ago"}</b>` +
            `<span>${when}</span><span>${lat.toFixed(3)}°, ${lng.toFixed(3)}°</span>` +
            (energy ? `<span>${energy.toLocaleString("en-US")} fJ optical energy</span>` : "") +
            `</div>`
        )
        .addTo(map);
    });
    map.on("mousemove", (ev) => {
      if (!map.getLayer("flash-dots")) return;
      const hit = map.queryRenderedFeatures(ev.point, { layers: ["flash-dots"] }).length > 0;
      map.getCanvas().style.cursor = pickRef.current ? "crosshair" : hit ? "pointer" : "";
    });

    const ro = new ResizeObserver(() => {
      map.resize();
      const c = canvasRef.current;
      if (c && mapElRef.current) {
        const dpr = window.devicePixelRatio || 1;
        const r = mapElRef.current.getBoundingClientRect();
        c.width = r.width * dpr;
        c.height = r.height * dpr;
        c.style.width = r.width + "px";
        c.style.height = r.height + "px";
      }
    });
    ro.observe(mapElRef.current);

    return () => {
      ro.disconnect();
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
      mapReadyRef.current = false;
    };
  }, [hydrated, installLayers, refreshMapData, updateMe, patch]);

  /* keep the visual centre clear of the floating panel */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const wide = window.innerWidth >= 1024;
    map.easeTo({ padding: { left: wide && panelOpen ? PANEL_W : 0, top: 0, right: 0, bottom: 0 }, duration: 250 });
  }, [panelOpen]);

  /* basemap swap (style.load re-installs the data layers) */
  const firstBase = useRef(true);
  useEffect(() => {
    if (firstBase.current) {
      firstBase.current = false;
      return;
    }
    const map = mapRef.current;
    if (!map) return;
    mapReadyRef.current = false;
    map.setStyle(styleFor(basemap));
  }, [basemap]);

  /* toggles that only touch layers */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReadyRef.current || !map.getLayer("flash-heat")) return;
    map.setLayoutProperty("flash-heat", "visibility", heat ? "visible" : "none");
    map.setLayerZoomRange("flash-dots", heat ? 7 : 0, 24);
  }, [heat, basemap]);

  useEffect(() => {
    syncRadar();
  }, [radar, syncRadar]);

  useEffect(() => {
    dirtyRef.current = true;
    refreshMapData();
  }, [windowMin, refreshMapData]);

  /* ---------- radar frames ---------- */
  useEffect(() => {
    if (!radar) return;
    let dead = false;
    const load = async () => {
      try {
        const r = await fetch("https://api.rainviewer.com/public/weather-maps.json", { cache: "no-store" });
        const j = await r.json();
        const last = j?.radar?.past?.at(-1);
        if (!last) throw new Error("no frames");
        radarUrlRef.current = `${j.host}${last.path}/256/{z}/{x}/{y}/4/1_1.png`;
        if (!dead) {
          setRadarNote(null);
          syncRadar();
        }
      } catch {
        if (!dead) setRadarNote("Radar overlay unavailable right now.");
      }
    };
    void load();
    const id = window.setInterval(load, 5 * 60_000);
    return () => {
      dead = true;
      window.clearInterval(id);
    };
  }, [radar, syncRadar]);

  /* ---------- data: history + SSE ---------- */
  const scheduleBatch = useCallback((w: WireBatch) => {
    const items = [...iterWire(w)].sort((a, b) => a.t - b.t);
    if (!items.length) return;
    // Meteosat delivers 10-minute granules: show them as history instead of replaying in "real time".
    if (items[items.length - 1].t - items[0].t > 60_000) {
      for (const it of items) bufRef.current.push(it.t, it.lat, it.lon, it.e);
      dirtyRef.current = true;
      return;
    }
    const perfNow = performance.now();
    const t0 = items[0].t;
    for (const it of items) pendingRef.current.push({ play: perfNow + (it.t - t0), ...it });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    let es: EventSource | null = null;
    let poll: number | undefined;
    let dead = false;

    const ingestNow = (w: WireBatch, animate: boolean) => {
      if (w.keys?.length && w.keys.every((k) => keysRef.current.has(k))) return;
      w.keys?.forEach((k) => keysRef.current.add(k));
      if (animate) scheduleBatch(w);
      else for (const it of iterWire(w)) bufRef.current.push(it.t, it.lat, it.lon, it.e);
      dirtyRef.current = true;
    };

    const startSse = () => {
      es = new EventSource("/api/stream");
      const onStatus = (ev: Event) => {
        try {
          setSats((JSON.parse((ev as MessageEvent).data) as { sats: Record<string, SatStatus> }).sats);
        } catch {
          /* ignore */
        }
        setConn("live");
      };
      es.addEventListener("hello", onStatus);
      es.addEventListener("beat", onStatus);
      es.addEventListener("flashes", (ev) => {
        ingestNow(JSON.parse((ev as MessageEvent).data) as WireBatch, true);
        setConn("live");
      });
      es.onerror = () => setConn("reconnecting");
    };

    type Resp = WireBatch & { mode?: "sse" | "poll"; cursor?: number; sats?: Record<string, SatStatus> };
    const startPolling = (first: Resp) => {
      let cursor = first.cursor ?? 0;
      const tick = async () => {
        try {
          const r = await fetch(`/api/flashes?minutes=${HISTORY_MIN}&after=${cursor}`, { cache: "no-store" });
          const w = (await r.json()) as Resp;
          if (dead) return;
          if (w.sats) setSats(w.sats);
          if (w.d.length) ingestNow(w, true);
          cursor = Math.max(cursor, w.cursor ?? cursor);
          setConn("live");
        } catch {
          if (!dead) setConn("reconnecting");
        }
      };
      poll = window.setInterval(tick, 15_000);
    };

    (async () => {
      let first: Resp | null = null;
      try {
        const r = await fetch(`/api/flashes?minutes=${HISTORY_MIN}`, { cache: "no-store" });
        first = (await r.json()) as Resp;
        bufRef.current.clear();
        keysRef.current.clear();
        ingestNow(first, false);
        if (first.sats) setSats(first.sats);
      } catch {
        /* fall through to live updates */
      }
      if (dead) return;
      setLoadingHistory(false);
      refreshMapData();
      if (first?.mode === "poll") {
        setConn("live");
        startPolling(first);
      } else {
        startSse();
      }
    })();

    return () => {
      dead = true;
      es?.close();
      if (poll) window.clearInterval(poll);
    };
  }, [hydrated, scheduleBatch, refreshMapData]);

  /* ---------- alerts ---------- */
  const beep = useCallback(() => {
    try {
      const ctx = audioRef.current;
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 880;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.55);
    } catch {
      /* audio blocked */
    }
  }, []);

  const fireAlert = useCallback(
    (km: number) => {
      const s = settingsRef.current;
      const msg = `Lightning detected ${fmtDist(km, s.units)} from your location`;
      setToast(msg);
      window.setTimeout(() => setToast(null), 9000);
      beep();
      try {
        if (s.notify && "Notification" in window && Notification.permission === "granted") {
          new Notification("⚡ Lightning nearby", { body: msg, tag: "lt-alert" });
        }
      } catch {
        /* ignore */
      }
    },
    [beep]
  );

  /* ---------- animation / playback loop ---------- */
  useEffect(() => {
    if (!hydrated) return;
    let raf = 0;
    let lastFrame = performance.now();
    let lastScrubUi = 0;

    const loop = (nowP: number) => {
      raf = requestAnimationFrame(loop);
      const dt = nowP - lastFrame;
      lastFrame = nowP;
      const map = mapRef.current;
      const buf = bufRef.current;

      // release scheduled flashes whose time has come
      const pend = pendingRef.current;
      if (pend.length) {
        pend.sort((a, b) => a.play - b.play);
        let k = 0;
        while (k < pend.length && pend[k].play <= nowP) {
          const p = pend[k++];
          buf.push(p.t, p.lat, p.lon, p.e);
          dirtyRef.current = true;
          if (cursorRef.current === null && nowP - p.play < 1200) {
            pulsesRef.current.push({ lat: p.lat, lon: p.lon, start: nowP, strong: true });
          }
          const u = settingsRef.current.user;
          if (u && nowP - lastAlertRef.current > 45_000) {
            const km = distKm(u, p);
            if (km <= settingsRef.current.alertKm) {
              lastAlertRef.current = nowP;
              fireAlert(km);
            }
          }
        }
        if (k) pend.splice(0, k);
        if (pulsesRef.current.length > 500) pulsesRef.current.splice(0, pulsesRef.current.length - 500);
      }

      // time-lapse
      if (playingRef.current.on && cursorRef.current !== null) {
        const next = cursorRef.current + dt * playingRef.current.speed;
        if (next >= Date.now() - 1000) {
          cursorRef.current = null;
          playingRef.current.on = false;
          setPlaying(false);
          setScrubMin(null);
        } else {
          cursorRef.current = next;
        }
        dirtyRef.current = true;
        if (nowP - lastScrubUi > 250 && cursorRef.current !== null) {
          lastScrubUi = nowP;
          setScrubMin((Date.now() - cursorRef.current) / 60_000);
        }
      }

      // push data to the map: ~1/s live, ~6/s while scrubbing
      const every = cursorRef.current === null ? 1000 : 160;
      if ((dirtyRef.current && nowP - lastRefreshRef.current > every) || nowP - lastRefreshRef.current > 6000) {
        refreshMapData();
      }

      // pulses
      const cv = canvasRef.current;
      if (cv && map) {
        const ctx = cv.getContext("2d");
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, cv.width, cv.height);
          const ps = pulsesRef.current;
          if (ps.length && cursorRef.current === null) {
            ctx.globalCompositeOperation = "lighter";
            let w = 0;
            for (let i = 0; i < ps.length; i++) {
              const p = ps[i];
              const a = (nowP - p.start) / 1300;
              if (a >= 1) continue;
              ps[w++] = p;
              const pt = map.project([p.lon, p.lat]);
              const ease = 1 - (1 - a) ** 3;
              const rad = 3 + ease * 30;
              const alpha = (1 - a) ** 1.6;
              const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, rad);
              g.addColorStop(0, `rgba(255,255,235,${alpha})`);
              g.addColorStop(0.25, `rgba(255,224,90,${alpha * 0.65})`);
              g.addColorStop(1, "rgba(255,160,40,0)");
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
              ctx.fill();
            }
            ps.length = w;
            ctx.globalCompositeOperation = "source-over";
          } else if (ps.length) {
            ps.length = 0;
          }
        }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hydrated, refreshMapData, fireAlert]);

  /* ---------- derived stats (1 Hz) ---------- */
  useEffect(() => {
    if (!hydrated) return;
    let tick = 0;
    const compute = () => {
      const buf = bufRef.current;
      const now = Date.now();
      buf.prune(now - (HISTORY_MIN + 3) * 60_000);

      const nextBins = new Array(HISTORY_MIN).fill(0);
      let newest = 0;
      let last5 = 0;
      for (let i = 0; i < buf.n; i++) {
        const t = buf.t[i];
        if (t > newest) newest = t;
        const m = Math.floor((now - t) / 60_000);
        if (m >= 0 && m < HISTORY_MIN) nextBins[HISTORY_MIN - 1 - m]++;
        if (now - t <= 5 * 60_000) last5++;
      }
      setBins(nextBins);
      setRate(last5 / 5);
      setLatencySec(newest ? Math.max(0, (now - newest) / 1000) : null);

      if (tick % 8 === 0) setStorms(detectStorms(buf, now));
      if (tick % 3 === 0) countInViewRef.current();

      const u = settingsRef.current.user;
      if (u) {
        let best: Near | null = null;
        let bestKm = Infinity;
        const mi = settingsRef.current.units === "mi";
        const r1 = mi ? 8.047 : 10;
        const r2 = mi ? 48.28 : 50;
        let c10 = 0, c25 = 0, c50 = 0;
        for (let i = 0; i < buf.n; i++) {
          const t = buf.t[i];
          if (now - t > 30 * 60_000) continue;
          const dLat = Math.abs(buf.lat[i] - u.lat);
          if (dLat > 5) continue; // quick reject (~550 km)
          const km = distKm(u, { lat: buf.lat[i], lon: buf.lon[i] });
          if (now - t <= 15 * 60_000) {
            if (km <= r1) c10++;
            if (km <= r2) c50++;
          }
          if (km < bestKm) {
            bestKm = km;
            best = { km, brg: 0, ageSec: (now - t) / 1000, lat: buf.lat[i], lon: buf.lon[i], c10: 0, c25: 0, c50: 0 };
          }
        }
        if (best) {
          best.brg = bearing(u, best);
          best.c10 = c10;
          best.c25 = c25;
          best.c50 = c50;
        }
        setNear(best ?? { km: Infinity, brg: 0, ageSec: 0, lat: u.lat, lon: u.lon, c10, c25, c50 });
      } else {
        setNear(null);
      }
      if (tick % 5 === 0) setNowTick(now);
      tick++;
    };
    compute();
    const id = window.setInterval(compute, 1000);
    return () => window.clearInterval(id);
  }, [hydrated, user, units]);

  /* user layer + view */
  useEffect(() => {
    updateMe(user, alertKm, near && Number.isFinite(near.km) ? near : null);
  }, [user, alertKm, near, updateMe]);

  /* storm markers (live view only) */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = (live ? storms.slice(0, 8) : []).map((s) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "lt-storm-marker";
      el.setAttribute("aria-label", `Storm cell: ${s.place}`);
      el.innerHTML =
        `<span class="lt-storm-n">${s.n15 >= 1000 ? (s.n15 / 1000).toFixed(1) + "k" : s.n15}</span>` +
        (s.motion
          ? `<svg class="lt-storm-arrow" style="transform:rotate(${s.motion.heading}deg)" width="30" height="30" viewBox="0 0 30 30"><path d="M15 1 L20 9 L15 6.5 L10 9 Z" fill="#fff"/></svg>`
          : "");
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        map.flyTo({ center: [s.lon, s.lat], zoom: Math.max(map.getZoom(), 7), duration: 900 });
      });
      return new maplibregl.Marker({ element: el }).setLngLat([s.lon, s.lat]).addTo(map);
    });
  }, [storms, live]);

  /* ---------- actions ---------- */
  const locate = () => {
    setLocError(null);
    if (!navigator.geolocation) return setLocError("This browser can't share location.");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const u = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        patch({ user: u });
        setLocating(false);
        mapRef.current?.flyTo({ center: [u.lon, u.lat], zoom: 7.5, duration: 1200 });
      },
      () => {
        setLocating(false);
        setLocError("Location blocked. Allow it in your browser, or drop a pin on the map instead.");
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const togglePick = () => {
    pickRef.current = !pickRef.current;
    setPicking(pickRef.current);
    if (mapRef.current) mapRef.current.getCanvas().style.cursor = pickRef.current ? "crosshair" : "";
  };

  const toggleNotify = async () => {
    if (!notify) {
      try {
        audioRef.current = audioRef.current ?? new AudioContext();
        void audioRef.current.resume();
        if ("Notification" in window && Notification.permission === "default") await Notification.requestPermission();
      } catch {
        /* ignore */
      }
      beep();
    }
    patch({ notify: !notify });
  };

  const setLive = () => {
    cursorRef.current = null;
    playingRef.current.on = false;
    setPlaying(false);
    setScrubMin(null);
    dirtyRef.current = true;
  };
  const scrubTo = (minAgo: number) => {
    if (minAgo < 0.3) return setLive();
    cursorRef.current = Date.now() - minAgo * 60_000;
    setScrubMin(minAgo);
    dirtyRef.current = true;
  };
  const togglePlay = () => {
    if (playingRef.current.on) {
      playingRef.current.on = false;
      setPlaying(false);
      return;
    }
    if (cursorRef.current === null) {
      cursorRef.current = Date.now() - 58 * 60_000; // start a replay from ~an hour ago
      setScrubMin(58);
    }
    playingRef.current = { on: true, speed };
    setPlaying(true);
  };
  useEffect(() => {
    playingRef.current.speed = speed;
  }, [speed]);

  /* ---------- derived UI values ---------- */
  const threat = useMemo(() => (near ? threatFor(Number.isFinite(near.km) ? near.km : null) : null), [near]);

  const approaching = useMemo(() => {
    if (!user) return null;
    let best: { storm: Storm; eta: number; km: number } | null = null;
    for (const s of storms) {
      if (!s.motion) continue;
      const km = distKm(user, s);
      if (km > 250) continue;
      const toUser = bearing(s, user);
      const diff = Math.abs(((s.motion.heading - toUser + 540) % 360) - 180);
      const closing = s.motion.speedKmh * Math.cos((diff * Math.PI) / 180);
      if (closing < 8 || diff > 55) continue;
      const eta = (Math.max(0, km - s.radiusKm * 0.5) / closing) * 60;
      if (!best || eta < best.eta) best = { storm: s, eta, km };
    }
    return best;
  }, [storms, user]);

  const sortedStorms = useMemo(() => {
    if (!user) return storms;
    return [...storms].sort((a, b) => distKm(user, a) - distKm(user, b));
  }, [storms, user]);

  const flyTo = (lat: number, lon: number, z = 7) =>
    mapRef.current?.flyTo({ center: [lon, lat], zoom: Math.max(mapRef.current.getZoom(), z), duration: 900 });

  const isOpen = (k: string) => !settings.collapsed?.[k];
  const toggle = (k: string) => patch({ collapsed: { ...settings.collapsed, [k]: isOpen(k) } });

  /* ---------- render ---------- */
  const statusDot = conn === "live" ? "bg-emerald-400" : conn === "connecting" ? "bg-amber-400" : "bg-red-400";
  const statusText =
    conn === "connecting" ? "Connecting" : conn === "reconnecting" ? "Reconnecting" : live ? "Live" : "Replay";

  return (
    <div
      ref={wrapRef}
      className="relative h-[calc(100svh-3.5rem)] min-h-[560px] w-full overflow-hidden bg-[#070A1A] text-white"
    >
      {/* MAP — full bleed, like lightningmaps.org */}
      <div className="absolute inset-0 z-0">
        <div ref={mapElRef} className="h-full w-full" aria-label="Live lightning map" />
      </div>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-[5]" />

      {mapError && (
        <div className="absolute inset-0 z-[8] grid place-items-center p-6">
          <div className="max-w-md rounded-2xl border border-white/15 bg-[#0A1020]/95 p-5 text-sm leading-relaxed text-white/75 shadow-2xl">
            <p className="font-display text-base font-bold text-white">The map can&apos;t start in this browser</p>
            <p className="mt-2">{mapError} Live stats, storm list and alerts still work in the panel.</p>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-white/65">
              <li>In Chrome open Settings → System and turn on “Use graphics acceleration when available”, then restart the browser.</li>
              <li>Open <code className="rounded bg-white/10 px-1">chrome://gpu</code> and check that WebGL2 says “Hardware accelerated”.</li>
              <li>Try another browser (Safari, Firefox, Edge) or update this one. Remote desktops and VMs often lack WebGL2.</li>
            </ol>
          </div>
        </div>
      )}

      {/* reopen pill when the desktop panel is hidden */}
      {!panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="absolute left-3 top-3 z-20 hidden items-center gap-2 rounded-xl border border-white/10 bg-[#0A1020]/90 px-3 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-[#10193a] lg:flex"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {fmtN(Math.round(rate))} flashes/min · Stats ›
        </button>
      )}

      {/* TOP CONTROLS */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 flex flex-wrap items-start justify-end gap-2 p-3 max-lg:left-0 max-lg:justify-start">
        <Seg
          label="Map"
          value={basemap}
          onChange={(v) => patch({ basemap: v as Basemap })}
          options={[["dark", "Dark"], ["satellite", "Satellite"], ["light", "Light"]]}
        />
        <Seg
          label="Show last"
          value={String(windowMin)}
          onChange={(v) => patch({ windowMin: Number(v) as Settings["windowMin"] })}
          options={[["5", "5m"], ["15", "15m"], ["30", "30m"], ["60", "60m"]]}
        />
        <div className="pointer-events-auto flex items-center gap-1 rounded-xl border border-white/25 bg-[#070A1A]/95 p-1 shadow-[0_6px_24px_rgba(0,0,0,0.65)]">
          <Chip on={heat} onClick={() => patch({ heat: !heat })}>Density</Chip>
          <Chip on={radar} onClick={() => patch({ radar: !radar })}>Radar</Chip>
        </div>
      </div>

      {outside && (
        <div className="pointer-events-none absolute left-1/2 top-16 z-10 w-[min(92%,26rem)] -translate-x-1/2 rounded-xl border border-amber-300/25 bg-[#1b1405]/90 px-3.5 py-2.5 text-center text-xs text-amber-100 backdrop-blur-md">
          Satellite lightning data covers the Americas, Europe, Africa and nearby oceans. Pan there to see strikes.
        </div>
      )}
      {radarNote && (
        <div className="pointer-events-none absolute right-3 top-14 z-10 rounded-lg bg-black/60 px-2.5 py-1 text-[11px] text-white/70">
          {radarNote}
        </div>
      )}
      {loadingHistory && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0A1020]/90 px-5 py-3 text-sm text-white/80 backdrop-blur-md">
          Loading the last hour of lightning…
        </div>
      )}

      {/* ALERT TOAST */}
      {toast && (
        <div
          role="alert"
          className="absolute left-1/2 top-16 z-30 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-red-400/40 bg-red-950/90 px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-md"
        >
          <span className="text-lg">⚡</span>
          {toast}
          <button type="button" onClick={() => setToast(null)} className="ml-1 text-white/60 hover:text-white" aria-label="Dismiss">✕</button>
        </div>
      )}

      {/* TIMELAPSE BAR */}
      <div className="absolute inset-x-3 z-10 flex justify-center max-lg:bottom-[9.5rem] lg:bottom-4">
        <div className={`pointer-events-auto flex w-full max-w-2xl items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0A1020]/90 px-3 py-2 backdrop-blur-md ${sheetOpen ? "max-lg:hidden" : ""}`}>
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-white transition hover:bg-white/20"
            aria-label={playing ? "Pause replay" : "Replay the last hour"}
          >
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 14 14"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor"/></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>
            )}
          </button>
          <div className="min-w-0 flex-1">
            <input
              type="range"
              min={0}
              max={60}
              step={0.25}
              value={60 - (scrubMin ?? 0)}
              onChange={(e) => scrubTo(60 - Number(e.target.value))}
              className="lt-range w-full"
              aria-label="Time travel through the last hour"
            />
            <div className="mt-0.5 flex justify-between gap-2 whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-white/40">
              <span>−60 min</span>
              <span>−30</span>
              <span>now</span>
            </div>
          </div>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="hidden rounded-lg border border-white/10 bg-white/5 px-1.5 py-1 text-xs text-white/80 sm:block"
            aria-label="Replay speed"
          >
            <option value={30}>30×</option>
            <option value={60}>60×</option>
            <option value={120}>120×</option>
            <option value={300}>300×</option>
          </select>
          <button
            type="button"
            onClick={setLive}
            className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
              live ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400 text-black hover:bg-amber-300"
            }`}
          >
            {live ? "● Live" : `−${Math.round(scrubMin ?? 0)}m · Go live`}
          </button>
        </div>
      </div>

      {/* FLOATING PANEL (desktop) / BOTTOM SHEET (mobile) */}
      <aside
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col overflow-hidden border-white/10 bg-[#080C1C]/92 backdrop-blur-xl transition-[height] duration-300 max-lg:rounded-t-3xl max-lg:border-t lg:inset-y-3 lg:bottom-3 lg:left-3 lg:right-auto lg:w-[360px] lg:rounded-2xl lg:border lg:shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9)] ${
          panelOpen ? "" : "lg:hidden"
        } ${sheetOpen ? "max-lg:h-[72%]" : "max-lg:h-[9rem]"}`}
      >
        <button
          type="button"
          onClick={() => setSheetOpen((v) => !v)}
          className="flex w-full justify-center pb-1 pt-2 lg:hidden"
          aria-label={sheetOpen ? "Collapse panel" : "Expand panel"}
        >
          <span className="h-1.5 w-10 rounded-full bg-white/25" />
        </button>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 max-lg:pt-1 lg:pt-4">
          {/* header */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                {conn === "live" && live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />}
                <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusDot}`} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">{statusText}</span>
              <span className="text-[11px] text-white/40">
                {latencySec == null ? "waiting for data" : `data ${latencySec < 90 ? Math.round(latencySec) + "s" : Math.round(latencySec / 60) + "m"} behind`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="hidden rounded-lg border border-white/10 px-2 py-1 text-[11px] font-semibold text-white/60 hover:text-white lg:block"
                aria-label="Hide panel"
              >
                Hide ‹
              </button>
              <div className="flex overflow-hidden rounded-lg border border-white/10 text-[11px] font-semibold">
                {(["km", "mi"] as Units[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => patch({ units: u })}
                    className={`px-2 py-1 ${units === u ? "bg-white/15 text-white" : "text-white/45 hover:text-white"}`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* data sources */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            <SourceChip
              name="Americas"
              ok={!!sats && !sats.G19?.error && !!sats.G19?.lastFileMs}
              detail={sats?.G19?.lastFileMs ? lagLabel(nowTick - sats.G19.lastFileMs) : sats?.G19?.error ? "error" : "…"}
            />
            <SourceChip
              name="Europe / Africa"
              ok={!!sats?.MTI1?.lastFileMs && !sats.MTI1.error}
              detail={
                sats?.MTI1?.configured === false
                  ? "needs API key"
                  : sats?.MTI1?.lastFileMs
                    ? lagLabel(nowTick - sats.MTI1.lastFileMs)
                    : sats?.MTI1?.error
                      ? "error"
                      : "…"
              }
              title={sats?.MTI1?.error ?? undefined}
            />
          </div>

          {/* headline numbers */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <Big label="Flashes / min" value={rate >= 10 ? Math.round(rate).toString() : rate.toFixed(1)} accent="#ffd84a" />
            <Big label={`In last ${windowMin}m`} value={fmtCompact(totalWindow)} accent="#fff" />
            <Big label="In view" value={fmtCompact(inView)} accent="#7dd3fc" />
          </div>

          {/* activity chart */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
            <SectionHead title="Activity · per minute" open={isOpen("activity")} onToggle={() => toggle("activity")} hint="last hour" />
            {isOpen("activity") && (
              <div className="mt-1">
                <Sparkline bins={bins} marker={scrubMin == null ? null : Math.max(0, Math.min(59, 59 - Math.round(scrubMin)))} />
              </div>
            )}
          </div>

          {/* near me */}
          <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
            <SectionHead
              title="Near you"
              accent
              open={isOpen("near")}
              onToggle={() => toggle("near")}
              action={user ? { label: "Clear", onClick: () => patch({ user: null }) } : undefined}
            />
            {isOpen("near") && (!user ? (
              <>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  Measure the nearest flash, see storm arrival estimates and get an alert when lightning comes close.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={locate}
                    disabled={locating}
                    className="rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#38BDF8] px-3 py-2.5 text-sm font-semibold shadow-lg transition hover:brightness-110 disabled:opacity-60"
                  >
                    {locating ? "Locating…" : "Use my location"}
                  </button>
                  <button
                    type="button"
                    onClick={togglePick}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                      picking ? "border-[#7dd3fc] bg-[#38bdf8]/15 text-[#bae6fd]" : "border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    {picking ? "Tap the map…" : "Drop a pin"}
                  </button>
                </div>
                {locError && <p className="mt-2 text-xs text-red-300">{locError}</p>}
              </>
            ) : (
              <>
                {threat && (
                  <div
                    className="mt-2.5 rounded-xl border px-3 py-2.5"
                    style={{ borderColor: THREAT_COLOR[threat.level] + "66", background: THREAT_COLOR[threat.level] + "14" }}
                  >
                    <p className="text-sm font-bold" style={{ color: THREAT_COLOR[threat.level] }}>{threat.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-white/70">{threat.text}</p>
                  </div>
                )}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Mini
                    label="Nearest flash"
                    value={near && Number.isFinite(near.km) ? fmtDist(near.km, units) : "—"}
                    sub={near && Number.isFinite(near.km) ? `${compass(near.brg)} · ${fmtAgo(near.ageSec)}` : "none in 30 min"}
                  />
                  <Mini
                    label={`Within ${units === "mi" ? "30 mi" : "50 km"}`}
                    value={near ? fmtN(near.c50) : "—"}
                    sub={`${near ? fmtN(near.c10) : 0} within ${units === "mi" ? "5 mi" : "10 km"} · 15 min`}
                  />
                </div>
                {approaching && (
                  <button
                    type="button"
                    onClick={() => flyTo(approaching.storm.lat, approaching.storm.lon, 6)}
                    className="mt-2.5 w-full rounded-xl border border-amber-300/30 bg-amber-300/10 px-3 py-2 text-left text-xs text-amber-100 hover:bg-amber-300/15"
                  >
                    <b>Storm heading your way</b> · {fmtDist(approaching.km, units)} away, moving {compass(approaching.storm.motion!.heading)} at{" "}
                    {fmtDist(approaching.storm.motion!.speedKmh, units)}/h · ETA ≈ {approaching.eta < 5 ? "now" : `${Math.round(approaching.eta)} min`}
                  </button>
                )}

                <div className="mt-3.5 border-t border-white/10 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <label htmlFor="alertkm" className="font-semibold text-white/80">Alert radius</label>
                    <span className="tabular-nums text-[#7dd3fc]">{fmtDist(alertKm, units)}</span>
                  </div>
                  <input
                    id="alertkm"
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={alertKm}
                    onChange={(e) => patch({ alertKm: Number(e.target.value) })}
                    className="lt-range mt-1 w-full"
                  />
                  <button
                    type="button"
                    onClick={toggleNotify}
                    className={`mt-2 flex w-full items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                      notify ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10"
                    }`}
                  >
                    <span>Sound + browser notification</span>
                    <span>{notify ? "ON" : "OFF"}</span>
                  </button>
                  <p className="mt-1.5 text-[11px] leading-snug text-white/35">Alerts fire while this tab is open. Not a substitute for official warnings.</p>
                </div>
              </>
            ))}
          </section>

          {/* storms */}
          <section className="mt-4">
            <SectionHead
              title={`Active storms · ${user ? "closest first" : "most active first"}`}
              open={isOpen("storms")}
              onToggle={() => toggle("storms")}
              hint={sortedStorms.length ? String(sortedStorms.length) : undefined}
            />
            {isOpen("storms") && (sortedStorms.length === 0 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-white/50">
                {loadingHistory ? "Scanning…" : "No organised storm cells in the last 15 minutes."}
              </p>
            ) : (
              <ul className="space-y-2">
                {sortedStorms.slice(0, 8).map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => flyTo(s.lat, s.lon, 7)}
                      className="group w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:border-white/25 hover:bg-white/[0.06]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold leading-tight text-white">{s.place}</p>
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                            s.trend === "rising"
                              ? "bg-red-500/20 text-red-300"
                              : s.trend === "falling"
                                ? "bg-[#0ea5e9]/20 text-[#7dd3fc]"
                                : "bg-white/10 text-white/60"
                          }`}
                        >
                          {s.trend === "rising" ? "▲ intensifying" : s.trend === "falling" ? "▼ weakening" : "steady"}
                        </span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-white/55">
                        <span><b className="text-yellow-300">{fmtN(s.n15)}</b> flashes / 15m</span>
                        <span>{s.rate.toFixed(1)}/min</span>
                        <span>⌀ {fmtDist(s.radiusKm * 2, units)}</span>
                        {s.motion && (
                          <span>→ {compass(s.motion.heading)} {fmtDist(s.motion.speedKmh, units)}/h</span>
                        )}
                        {user && <span className="text-[#7dd3fc]">{fmtDist(distKm(user, s), units)} from you</span>}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </section>

          {/* legend */}
          <section className="mt-5">
            <SectionHead title="Flash age" open={isOpen("legend")} onToggle={() => toggle("legend")} />
            {isOpen("legend") && (
              <>
            <div
              className="mt-2 h-2.5 rounded-full"
              style={{ background: `linear-gradient(90deg, ${AGE_STOPS.map(([m, c]) => `${c} ${(Math.sqrt(m / 60) * 100).toFixed(1)}%`).join(",")})` }}
            />
            <div className="mt-1 flex justify-between text-[10px] text-white/40">
              <span>now</span><span>5 min</span><span>15 min</span><span>30 min</span><span>60 min</span>
            </div>
              </>
            )}
          </section>

          <p className="mt-5 text-[11px] leading-relaxed text-white/35">
            Sources: NOAA GOES-East &amp; West Geostationary Lightning Mapper (Americas, ~20–40 s latency) and
            EUMETSAT Meteosat MTG Lightning Imager (Europe/Africa, delivered in 10-minute batches, © EUMETSAT).
            Both detect total lightning incl. in-cloud, ~10 km accuracy. Radar: RainViewer. For information only —
            follow official weather warnings and the 30-30 rule.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ---------- small presentational helpers ---------- */

function SectionHead({
  title,
  open,
  onToggle,
  hint,
  accent,
  action,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  hint?: string;
  accent?: boolean;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex min-w-0 flex-1 items-center gap-1.5 py-0.5 text-left"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`shrink-0 text-white/50 transition-transform group-hover:text-white ${open ? "rotate-90" : ""}`}
          aria-hidden
        >
          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span
          className={`truncate text-[11px] font-bold uppercase tracking-[0.14em] ${accent ? "text-[#7dd3fc]" : "text-white/55"} group-hover:text-white`}
        >
          {title}
        </span>
        {hint && <span className="shrink-0 text-[11px] font-medium normal-case tracking-normal text-white/35">{hint}</span>}
      </button>
      {action && (
        <button type="button" onClick={action.onClick} className="text-[11px] text-white/40 hover:text-white">
          {action.label}
        </button>
      )}
    </div>
  );
}

function lagLabel(ms: number) {
  const s = Math.max(0, ms / 1000);
  return s < 90 ? `${Math.round(s)}s behind` : `${Math.round(s / 60)}m behind`;
}

function SourceChip({ name, ok, detail, title }: { name: string; ok: boolean; detail: string; title?: string }) {
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/65"
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-emerald-400" : "bg-white/30"}`} />
      <b className="font-semibold text-white/85">{name}</b>
      {detail}
    </span>
  );
}

function Seg({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div
      className="pointer-events-auto flex items-center gap-1 rounded-xl border border-white/25 bg-[#070A1A]/95 p-1 shadow-[0_6px_24px_rgba(0,0,0,0.65)]"
      role="group"
      aria-label={label}
    >
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          className={`rounded-lg px-3 py-2 text-[13px] font-bold transition ${
            value === v ? "bg-white text-[#0A1020] shadow" : "text-white hover:bg-white/15"
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-lg px-3 py-2 text-[13px] font-bold transition ${
        on ? "bg-[#38bdf8] text-[#06101f] shadow" : "text-white hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

function Big({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <p className="truncate font-display text-xl font-bold leading-none tabular-nums sm:text-2xl" style={{ color: accent }}>{value}</p>
      <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
    </div>
  );
}

function Mini({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/45">{label}</p>
      <p className="mt-1 font-display text-xl font-bold leading-none tabular-nums text-white">{value}</p>
      {sub && <p className="mt-1 text-[11px] text-white/45">{sub}</p>}
    </div>
  );
}
