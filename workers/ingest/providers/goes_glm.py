from __future__ import annotations

import hashlib
import logging
import tempfile
from datetime import datetime, timezone
from typing import Iterable

import boto3
import numpy as np
from botocore import UNSIGNED
from botocore.config import Config

from .base import LightningProvider, Strike

log = logging.getLogger("goes_glm")

BUCKETS = ("noaa-goes19", "noaa-goes18")
PRODUCT = "GLM-L2-LCFA"
REDIS_CURSOR_KEY = "ingest:goes_glm:last_keys"


def _strike_id(source: str, time_iso: str, lat: float, lon: float) -> str:
    raw = f"{source}|{time_iso}|{lat:.4f}|{lon:.4f}"
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()[:24]


def _doy_prefix(now: datetime) -> tuple[str, str, str]:
    """Return year, day-of-year, hour zero-padded strings in UTC."""
    year = f"{now.year:04d}"
    doy = f"{now.timetuple().tm_yday:03d}"
    hour = f"{now.hour:02d}"
    return year, doy, hour


class GoesGlmProvider(LightningProvider):
    name = "goes-glm"

    def __init__(self, redis_client):
        self.redis = redis_client
        self.s3 = boto3.client("s3", config=Config(signature_version=UNSIGNED))

    def _load_cursors(self) -> set[str]:
        raw = self.redis.smembers(REDIS_CURSOR_KEY)
        return {x.decode() if isinstance(x, bytes) else x for x in raw}

    def _save_cursors(self, keys: Iterable[str]) -> None:
        keys = list(keys)
        if not keys:
            return
        pipe = self.redis.pipeline()
        pipe.sadd(REDIS_CURSOR_KEY, *keys)
        # keep the set from growing forever — trim by replacing with last 200
        pipe.scard(REDIS_CURSOR_KEY)
        results = pipe.execute()
        count = results[-1]
        if count and count > 200:
            members = list(self._load_cursors())
            # drop oldest-looking lexical keys (GOES keys are time-ordered)
            members.sort()
            drop = members[: max(0, len(members) - 150)]
            if drop:
                self.redis.srem(REDIS_CURSOR_KEY, *drop)

    def _list_recent_objects(self, bucket: str, max_keys: int = 30) -> list[str]:
        now = datetime.now(timezone.utc)
        year, doy, hour = _doy_prefix(now)
        prefix = f"{PRODUCT}/{year}/{doy}/{hour}/"
        keys: list[str] = []
        try:
            paginator = self.s3.get_paginator("list_objects_v2")
            for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
                for obj in page.get("Contents", []):
                    keys.append(obj["Key"])
        except Exception as exc:  # noqa: BLE001
            log.warning("list_objects failed for %s/%s: %s", bucket, prefix, exc)
            return []

        # Also check previous hour near the boundary
        if now.minute < 5:
            prev = datetime.fromtimestamp(now.timestamp() - 3600, tz=timezone.utc)
            y2, d2, h2 = _doy_prefix(prev)
            prefix2 = f"{PRODUCT}/{y2}/{d2}/{h2}/"
            try:
                resp = self.s3.list_objects_v2(Bucket=bucket, Prefix=prefix2, MaxKeys=20)
                for obj in resp.get("Contents", []):
                    keys.append(obj["Key"])
            except Exception as exc:  # noqa: BLE001
                log.warning("list_objects failed for %s/%s: %s", bucket, prefix2, exc)

        keys = sorted(set(keys))
        return keys[-max_keys:]

    def _parse_netcdf(self, bucket: str, key: str) -> list[Strike]:
        import xarray as xr

        try:
            obj = self.s3.get_object(Bucket=bucket, Key=key)
            data = obj["Body"].read()
        except Exception as exc:  # noqa: BLE001
            log.warning("get_object failed %s/%s: %s", bucket, key, exc)
            return []

        strikes: list[Strike] = []
        try:
            with tempfile.NamedTemporaryFile(suffix=".nc") as tmp:
                tmp.write(data)
                tmp.flush()
                ds = xr.open_dataset(tmp.name)
                try:
                    lats = np.asarray(ds["flash_lat"].values).ravel()
                    lons = np.asarray(ds["flash_lon"].values).ravel()
                    # product_time is typically a scalar datetime64
                    product_time = np.asarray(ds["product_time"].values).ravel()[0]
                    flash_times = np.asarray(
                        ds["flash_time_offset_of_first_event"].values
                    ).ravel()
                    energy = None
                    if "flash_energy" in ds:
                        energy = np.asarray(ds["flash_energy"].values).ravel()

                    # product_time → epoch ms UTC (fallback when flash times missing)
                    pt = np.datetime64(product_time, "ms")
                    base_ms = int(pt.astype("int64"))

                    # NOAA GLM ships flash_*_offset as absolute datetime64[ns], not a delta.
                    # Older docs / some readers expose timedelta or numeric seconds — handle both.
                    def flash_ms(i: int) -> int:
                        if i >= len(flash_times):
                            return base_ms
                        raw = flash_times[i]
                        if np.issubdtype(type(raw), np.datetime64) or isinstance(
                            raw, np.datetime64
                        ):
                            return int(np.datetime64(raw, "ms").astype("int64"))
                        if np.issubdtype(flash_times.dtype, np.datetime64):
                            return int(np.datetime64(raw, "ms").astype("int64"))
                        if np.issubdtype(flash_times.dtype, np.timedelta64):
                            return base_ms + int(np.timedelta64(raw, "ms").astype("int64"))
                        # numeric seconds relative to product_time
                        return base_ms + int(float(raw) * 1000.0)

                    for i in range(len(lats)):
                        lat = float(lats[i])
                        lon = float(lons[i])
                        if not np.isfinite(lat) or not np.isfinite(lon):
                            continue
                        if lat < -90 or lat > 90 or lon < -180 or lon > 180:
                            continue
                        t_ms = flash_ms(i)
                        # Guard against corrupt timestamps (year outside sane range)
                        if t_ms < 1_000_000_000_000 or t_ms > 4_000_000_000_000:
                            t_ms = base_ms
                        time_iso = (
                            datetime.fromtimestamp(t_ms / 1000.0, tz=timezone.utc)
                            .isoformat()
                            .replace("+00:00", "Z")
                        )
                        item: Strike = {
                            "id": _strike_id("goes-glm", time_iso, lat, lon),
                            "time": time_iso,
                            "lat": lat,
                            "lon": lon,
                            "type": "unknown",
                            "source": "goes-glm",
                        }
                        if energy is not None and i < len(energy) and np.isfinite(energy[i]):
                            item["energy"] = float(energy[i])
                        strikes.append(item)
                finally:
                    ds.close()
        except Exception as exc:  # noqa: BLE001
            # Re-raise so fetch_new does not mark the key as processed.
            log.warning("parse failed %s/%s: %s", bucket, key, exc)
            raise

        return strikes

    @staticmethod
    def _dedupe(strikes: list[Strike], km: float = 10.0, seconds: float = 1.0) -> list[Strike]:
        """Drop near-duplicate flashes across GOES-East / GOES-West overlap."""
        if len(strikes) < 2:
            return strikes

        def hav_km(a: Strike, b: Strike) -> float:
            # cheap equirectangular for short distances
            import math

            lat1, lon1 = math.radians(a["lat"]), math.radians(a["lon"])
            lat2, lon2 = math.radians(b["lat"]), math.radians(b["lon"])
            x = (lon2 - lon1) * math.cos((lat1 + lat2) / 2)
            y = lat2 - lat1
            return 6371.0 * math.sqrt(x * x + y * y)

        def parse_t(s: str) -> float:
            return datetime.fromisoformat(s.replace("Z", "+00:00")).timestamp()

        kept: list[Strike] = []
        for s in sorted(strikes, key=lambda x: x["time"]):
            dup = False
            for k in kept[-40:]:  # only compare recent kept
                if abs(parse_t(s["time"]) - parse_t(k["time"])) <= seconds and hav_km(s, k) <= km:
                    dup = True
                    break
            if not dup:
                kept.append(s)
        return kept

    def fetch_new(self) -> list[Strike]:
        seen = self._load_cursors()
        new_keys: list[tuple[str, str]] = []
        for bucket in BUCKETS:
            for key in self._list_recent_objects(bucket):
                cursor = f"{bucket}:{key}"
                if cursor not in seen:
                    new_keys.append((bucket, key))

        if not new_keys:
            return []

        batch: list[Strike] = []
        processed: list[str] = []
        for bucket, key in new_keys:
            cursor = f"{bucket}:{key}"
            try:
                batch.extend(self._parse_netcdf(bucket, key))
                processed.append(cursor)
            except Exception as exc:  # noqa: BLE001
                log.exception("failed processing %s: %s", cursor, exc)

        if processed:
            self._save_cursors(processed)

        return self._dedupe(batch)
