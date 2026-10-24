# Lightning Tracker

Brand site for **Lightning Tracker** at [lightningtracker.net](https://lightningtracker.net) — free lightning distance tools, live map guidance, alert tips, and SERP-backed storm safety guides.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static-friendly pages with JSON-LD, sitemap index, and Content-Signal robots

## Develop (site only)

```bash
npm install
npm run dev
```

## Real-time lightning map (free stack)

Best free setup today: **NOAA GOES-18 + GOES-19 GLM** (near real-time over the Americas) → Redis and/or HTTP push into Next.js → Leaflet map on the homepage hero.

```bash
cp .env.example .env

# Terminal A — Redis (Homebrew or Docker)
brew services start redis   # or: npm run docker:up

# Terminal B — Next.js
npm run dev

# Terminal C — GLM ingest worker (uses .venv if present)
source .venv/bin/activate   # optional but recommended (netCDF4)
npm run worker
```

Without Redis, the worker still posts to `/api/internal/ingest` (set `INGEST_SECRET` in `.env`). Demo dots only if `ENABLE_DEMO_STRIKES=1`.

Coverage: GLM is Americas-focused. Europe/Africa LI and commercial APIs are later (see `ROADMAP.md`).

## Build

```bash
npm run build
npm start
```

## Tests

```bash
npm run test:geo
```


## Live tracker (MapLibre + NOAA GOES GLM)

`npm run dev` is all you need — no Python worker, Redis or Docker.

- `src/lib/glm/ingest.ts` polls the public NOAA GOES-19/18 GLM buckets every 10 s, parses the NetCDF with `h5wasm`, de-duplicates the East/West overlap and keeps 60 min in memory (`src/lib/glm/store.ts`).
- `/api/flashes` returns the compact history, `/api/stream` pushes each new satellite file over Server-Sent Events, `/api/status` shows ingest health.
- UI: `src/components/tracker/TrackerApp.tsx`.
- Needs a long-running Node host (not serverless) because the ingest loop lives in the server process. Set `GLM_BACKFILL_MINUTES` to change the startup backfill.
- `scripts/copy-maplibre-worker.mjs` runs before `dev`/`build` and copies MapLibre's worker files into `public/`.

## Deploying on Vercel

Serverless functions can't run a background loop, so on Vercel the ingest is driven by short
invocations that write to **Upstash Redis**, and the browser polls every 15 s instead of using SSE.
Redis is detected from the environment; without it the app runs in the local in-memory mode.

1. Vercel dashboard → Storage → add **Upstash Redis** and connect it to the project
   (adds `KV_REST_API_URL` / `KV_REST_API_TOKEN`).
2. Project → Settings → Environment Variables:
   `EUMETSAT_CONSUMER_KEY`, `EUMETSAT_CONSUMER_SECRET`, `NEXT_PUBLIC_SITE_ORIGIN`,
   `CRON_SECRET` (any long random string), optionally `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
3. Deploy. Data stays fresh in two ways:
   - **Lazy refresh (works on every plan):** when someone loads the map and the data is older than
     45 s, `/api/flashes` starts an ingest in the background (`after()`), guarded by a Redis lock.
   - **Scheduled (recommended):** call `GET /api/cron/ingest` every minute.
     - Vercel Pro: add a `vercel.json` with
       `{ "crons": [{ "path": "/api/cron/ingest", "schedule": "* * * * *" }] }`.
       Hobby plans only allow daily crons and the deploy fails on faster schedules.
     - Any plan: point a free external scheduler (e.g. cron-job.org) at
       `https://YOUR_DOMAIN/api/cron/ingest` with header `Authorization: Bearer <CRON_SECRET>`.
