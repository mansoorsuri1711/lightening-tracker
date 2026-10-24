# Lightning ingest worker (NOAA GOES GLM)

Polls public NOAA GOES-East/West GLM NetCDF files on AWS S3 (~every 20s), normalizes flashes into the shared `Strike` shape, and writes them to Redis (last 60 minutes). Optional Postgres/PostGIS history when `DATABASE_URL` is set.

## Prerequisites

1. Docker Redis (or Upstash):

```bash
npm run docker:up
```

2. Python 3.11+ deps:

```bash
npm run worker:install
# or: python3 -m venv .venv && source .venv/bin/activate && pip install -r workers/ingest/requirements.txt
```

3. `.env` in the project root:

```bash
REDIS_URL=redis://127.0.0.1:6379
# optional:
# DATABASE_URL=postgresql://lightning:lightning@127.0.0.1:5432/lightning
```

## Run

```bash
npm run worker
```

You should see heartbeats in Redis (`worker:last_run`) and, during storms over the Americas, `Ingested N new strikes` logs.

## Coverage note

GOES GLM covers the Americas and nearby oceans only. Europe/Africa need MTG LI or a commercial provider (ROADMAP Phase 7).
