CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS strikes (
  id          text PRIMARY KEY,
  time        timestamptz NOT NULL,
  geom        geography(Point, 4326) NOT NULL,
  type        text NOT NULL DEFAULT 'unknown',
  energy      double precision,
  source      text NOT NULL
);
CREATE INDEX IF NOT EXISTS strikes_time_idx ON strikes (time DESC);
CREATE INDEX IF NOT EXISTS strikes_geom_idx ON strikes USING GIST (geom);

CREATE TABLE IF NOT EXISTS alert_subscriptions (
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
CREATE INDEX IF NOT EXISTS alert_geom_idx ON alert_subscriptions USING GIST (geom);
