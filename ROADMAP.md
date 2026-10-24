# lightningtracker.net — Build Roadmap

A real-time web app where visitors see lightning strikes on a live map, check how far the nearest strike is from them, and get alerts when lightning comes within a chosen radius.

> **How to use this file in Cursor:** save it as `ROADMAP.md` in the root of an empty project. Then work phase by phase: open Cursor chat, say *"Read ROADMAP.md and do Phase 1"*, review the result, test it, commit, then move to the next phase. Don't ask Cursor to build everything at once.

---

## 0. The one decision that matters most: where the lightning data comes from

You cannot detect lightning yourself. You need a data source. Pick one before writing code.

| Source | Coverage | Cost | Notes |
|---|---|---|---|
| **NOAA GOES GLM** (Geostationary Lightning Mapper) | The Americas + nearby oceans | Free, public | Satellite data published as NetCDF files roughly every 20 seconds on the public AWS buckets (`noaa-goes19` for GOES-East, `noaa-goes18` for GOES-West), product `GLM-L2-LCFA`. Detects *total* lightning (mostly in-cloud), ~8–10 km location accuracy. Best free starting point. |
| **EUMETSAT MTG Lightning Imager** | Europe, Africa, Middle East, Atlantic | Free with registration | Similar satellite data for the other side of the world, via the EUMETSAT Data Store. Check its current operational status and licence before relying on it. |
| **Commercial API** (e.g. Xweather Lightning API, The Weather Company) | Global, ground-based networks | Paid (free trial / dev keys usually available) | Most accurate (sub-km), includes cloud-to-ground vs in-cloud, simple REST endpoints. Needed if you want full global coverage. |
| **Blitzortung.org** (community network) | Global (dense in Europe/US) | Free for private use | Do **not** scrape it. Their data is generally for private, non-commercial use, and there's no public API for third-party sites. Contact them for permission if you want to use it. |

**Recommended path:**
1. **MVP:** NOAA GOES GLM (free, legal, the Americas).
2. **Global:** add a commercial API behind the same internal interface, so the frontend doesn't change.

Build the ingestion layer behind a `LightningProvider` interface from day one, so you can swap or combine sources.

---

## 1. Architecture

```
┌──────────────────────┐     ┌────────────────────┐     ┌──────────────────────┐
│  Ingestion worker    │     │   Redis            │     │  Realtime API        │
│  (Python)            │────▶│  - last 60 min     │────▶│  (Node / Fastify)    │
│  - polls NOAA S3     │     │    strikes (GEO)   │     │  - REST: /strikes    │
│  - parses NetCDF     │     │  - pub/sub channel │     │  - WebSocket push    │
│  - normalizes flashes│     └────────────────────┘     │  - alert matcher     │
└─────────┬────────────┘                                └─────────┬────────────┘
          │                                                       │
          ▼                                                       ▼
┌──────────────────────┐                               ┌──────────────────────┐
│  Postgres + PostGIS  │                               │  Next.js frontend    │
│  - strike history    │                               │  - MapLibre GL map   │
│  - alert subscriptions│                              │  - geolocation       │
└──────────────────────┘                               │  - Web Push alerts   │
                                                       └──────────────────────┘
```

**Why this shape:** the worker is the only part that talks to data providers. Everything downstream uses one normalized strike format. Redis holds "now" (fast); Postgres holds history and user alert settings.

### Normalized strike format (use everywhere)

```ts
type Strike = {
  id: string;          // provider + timestamp + lat/lon hash
  time: string;        // ISO 8601 UTC
  lat: number;
  lon: number;
  type: "cg" | "ic" | "unknown";   // cloud-to-ground / in-cloud
  energy?: number;     // provider-specific, optional
  source: "goes-glm" | "mtg-li" | "xweather";
};
```

---

## 2. Tech stack

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind CSS
- **Map:** MapLibre GL JS (free, WebGL, handles thousands of points). Basemap tiles from MapTiler, Stadia Maps or self-hosted Protomaps (dark style to match the brand).
- **Realtime API:** Node.js + Fastify + `ws` (or Socket.IO)
- **Ingestion worker:** Python 3.11+ with `boto3` (anonymous S3 access), `xarray` + `netCDF4`, `redis`
- **Data:** Redis (Upstash or self-hosted) + Postgres with PostGIS (Supabase or Neon)
- **Push alerts:** Web Push API with a service worker + VAPID keys (`web-push` npm package)
- **Hosting:** frontend on Vercel. Worker + realtime API need **long-running processes**, so put them on Fly.io, Railway, Render or a small VPS (not serverless functions).

### Project structure

```
lightningtracker/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # Fastify REST + WebSocket server
├── workers/
│   └── ingest/           # Python ingestion worker
│       ├── providers/
│       │   ├── base.py           # LightningProvider interface
│       │   ├── goes_glm.py
│       │   └── xweather.py       # later
│       └── main.py
├── packages/
│   └── shared/           # Strike type, geo helpers (haversine, bearing)
├── docker-compose.yml    # redis + postgis for local dev
└── ROADMAP.md
```

---

## 3. Phases

Each phase ends with something you can see working. Commit after each one.

### Phase 1 — Project setup
- Create the monorepo structure above (pnpm workspaces).
- `docker-compose.yml` with Redis and Postgres+PostGIS for local dev.
- `packages/shared`: the `Strike` type plus `haversineKm(a, b)`, `kmToMiles()` and `bearingDeg(a, b)` with unit tests.
- `.env.example` listing every variable (Redis URL, DB URL, map tiles key, VAPID keys, provider API keys).

**Done when:** `docker compose up` runs and `pnpm test` passes for the geo helpers.

### Phase 2 — Ingestion worker (NOAA GOES GLM)
- `providers/base.py`: abstract `LightningProvider` with `fetch_new() -> list[Strike]`.
- `providers/goes_glm.py`:
  - Anonymous S3 client (`botocore.UNSIGNED`) for the `noaa-goes19` and `noaa-goes18` buckets.
  - List `GLM-L2-LCFA/{year}/{day_of_year}/{hour}/` and pick files newer than the last one processed. Store the last processed key in Redis.
  - Open each NetCDF file and read `flash_lat`, `flash_lon`, `flash_time_offset_of_first_event` (+ `product_time`), `flash_energy`. Output `Strike` records with `type: "unknown"` (GLM doesn't split CG vs IC).
  - De-duplicate the overlap between GOES-East and GOES-West (same flash within ~10 km and ~1 s).
- `main.py` loop every 20 seconds:
  - `GEOADD strikes:live` + a sorted set by timestamp; remove anything older than 60 minutes.
  - `PUBLISH strikes:new` with the batch as JSON.
  - Batch insert into the Postgres `strikes` table (PostGIS `geography(Point)`).
- Logging + retry with backoff; never crash on one bad file.

**Done when:** the worker runs locally and you see new strikes appearing in Redis every ~20 seconds during active storms in the Americas.

### Phase 3 — Realtime API
- `GET /strikes?bbox=w,s,e,n&minutes=15` → strikes from Redis inside the map view.
- `GET /strikes/nearest?lat=&lon=&minutes=30` → nearest strike, distance (km + miles), bearing, time ago.
- `GET /stats?lat=&lon=&radiusKm=` → strike count in the last 15 min, nearest distance, rough storm direction (compare the centroid of strikes 0–10 min old vs 10–20 min old).
- WebSocket `/live`: the client sends its current bbox; the server subscribes to `strikes:new` and pushes only the strikes inside that bbox.
- Rate limiting, CORS for the web domain, health check endpoint.

**Done when:** opening two browser tabs on a test WebSocket page shows strikes arriving live.

### Phase 4 — Live map frontend
- Full-screen MapLibre map, dark basemap, brand colours (yellow `#FFD60A`, blue `#5CC8FF`, background `#070A1A`).
- Strikes drawn as a GeoJSON source + circle/symbol layer, coloured by age: 0–5 min yellow, 5–10 min orange, 10–15 min red. Fade old strikes out.
- New strikes "flash" (short pulse animation) when they arrive over the WebSocket.
- "Use my location" button (browser Geolocation API) → blue dot, dashed line to the nearest strike, stats panel: strikes in 15 min / nearest strike / storm direction.
- Time filter: 15 min / 30 min / 60 min.
- Legend, attribution (map tiles + "Lightning data: NOAA GOES GLM").
- Mobile-first layout; the stats panel becomes a bottom sheet on phones.

**Done when:** the map shows live strikes, and your location panel updates without refreshing.

### Phase 5 — Distance calculator + safety pages
- `/distance` — flash-to-thunder calculator: seconds × 343 m/s → km and miles (about 5 seconds per mile, 3 seconds per km). Include a stopwatch button: tap at the flash, tap at the thunder.
- `/safety` — lightning safety guide (when thunder roars, go indoors; wait 30 minutes after the last thunder; avoid open ground, water and lone trees; avoid plumbing and corded electronics indoors). Link to the official national weather service.
- Clear disclaimer on every page: *"For information only. Do not rely on this site for life-safety decisions. Follow official weather warnings."*

**Done when:** both pages work offline-fast and pass Lighthouse checks.

### Phase 6 — Proximity alerts (Web Push)
- Service worker + Web Push subscription (VAPID). Ask for notification permission only after the user clicks "Turn on alerts", never on page load.
- Alert settings: location (current or saved), radius (5 / 10 / 20 / 30 miles), quiet hours.
- Store subscriptions in Postgres (`alert_subscriptions`: endpoint, keys, location `geography`, radius_km, last_alert_at).
- In the realtime API, on each `strikes:new` batch: find subscriptions within range using PostGIS `ST_DWithin`. Send "Lightning X mi away" pushes, throttled to 1 per subscription per 15 min.
- "All clear" push when no strikes have been inside the radius for 30 minutes.
- Unsubscribe link in every alert.

**Done when:** you get a real push on your phone (Android Chrome, or iOS Safari after "Add to Home Screen") when a strike is inside your test radius.

### Phase 7 — Global coverage (paid provider)
- `providers/xweather.py` (or another commercial API) implementing the same `LightningProvider` interface.
- Run it alongside GLM. Prefer the ground-network source where both overlap (better accuracy, has CG/IC type).
- Cache aggressively and only query areas with active viewers/alerts, to control API costs.
- Update the attribution text per source.

**Done when:** strikes show worldwide and the frontend needed zero changes.

### Phase 8 — SEO, performance, launch
- Static, indexable pages: home, `/distance`, `/safety`, plus city pages (`/lightning-map/[city]`) that open the map centred on the city, with unique text for each.
- Use the existing brand assets: `/favicon/*`, `/logo/*`, `/featured-images/*`, plus the `<head>` tags from `head-tags.html`.
- Server-render the page shell; load the map client-side only (`dynamic(() => import(...), { ssr: false })`).
- Monitoring: uptime check on the worker heartbeat (write `worker:last_run` to Redis; alert if older than 2 minutes). Error tracking with Sentry.
- Privacy policy (location + push data), cookie notice if using analytics/ads.

**Done when:** Lighthouse ≥ 90 on mobile for the home page, and the worker has run for 48 hours without manual restarts.

---

## 4. Database schema (Postgres + PostGIS)

```sql
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE strikes (
  id          text PRIMARY KEY,
  time        timestamptz NOT NULL,
  geom        geography(Point, 4326) NOT NULL,
  type        text NOT NULL DEFAULT 'unknown',
  energy      double precision,
  source      text NOT NULL
);
CREATE INDEX strikes_time_idx ON strikes (time DESC);
CREATE INDEX strikes_geom_idx ON strikes USING GIST (geom);

CREATE TABLE alert_subscriptions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint      text UNIQUE NOT NULL,
  p256dh        text NOT NULL,
  auth          text NOT NULL,
  geom          geography(Point, 4326) NOT NULL,
  radius_km     real NOT NULL DEFAULT 16,
  quiet_start   time,
  quiet_end     time,
  last_alert_at timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX alert_geom_idx ON alert_subscriptions USING GIST (geom);
```

Keep strike history for 30 days, then delete older rows with a nightly job (or use TimescaleDB with a retention policy).

---

## 5. Rough monthly cost (MVP, GLM only)

| Item | Estimate |
|---|---|
| Vercel (frontend) | Free – $20 |
| Worker + API on Fly.io / Railway / VPS | $5 – $20 |
| Redis (Upstash or self-hosted) | Free – $10 |
| Postgres (Supabase / Neon) | Free – $25 |
| Map tiles (MapTiler / Stadia free tiers) | Free until traffic grows |
| NOAA GLM data | Free |
| Commercial lightning API (Phase 7) | Varies a lot by vendor and volume; get a quote |

---

## 6. Rules for Cursor (paste these into `.cursor/rules` or keep them in this file)

- TypeScript strict mode everywhere in `apps/` and `packages/`.
- Every provider returns the shared `Strike` type. No provider-specific fields leak to the frontend.
- No secrets in code. Read everything from environment variables and keep `.env.example` updated.
- Never scrape third-party lightning maps or use data without a licence.
- Every user-facing page shows the "not for life-safety decisions" disclaimer.
- Write unit tests for geo math (distance, bearing, bbox filtering) and the alert throttling logic.
- Keep each phase in its own branch / PR.

---

## 7. Phase prompts to paste into Cursor

1. `Read ROADMAP.md. Do Phase 1 only. Set up the monorepo, docker-compose, shared Strike type and geo helpers with tests.`
2. `Read ROADMAP.md. Do Phase 2. Build the Python ingestion worker with the GOES GLM provider. Show me how to run it locally.`
3. `Read ROADMAP.md. Do Phase 3. Build the Fastify REST + WebSocket API reading from Redis.`
4. `Read ROADMAP.md. Do Phase 4. Build the Next.js live map with MapLibre, age-coloured strikes, live updates and the location panel.`
5. `Read ROADMAP.md. Do Phase 5. Add the /distance calculator with stopwatch and the /safety page.`
6. `Read ROADMAP.md. Do Phase 6. Add Web Push proximity alerts with PostGIS matching and throttling.`
7. `Read ROADMAP.md. Do Phase 7. Add a commercial global provider behind the LightningProvider interface.`
8. `Read ROADMAP.md. Do Phase 8. SEO pages, brand assets, performance, monitoring and launch checklist.`
