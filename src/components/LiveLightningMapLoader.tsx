"use client";

import {
  useCallback,
  useState,
  type ComponentType,
} from "react";

type Props = {
  /** Edge-to-edge hero mode (no rounded card chrome). */
  fullBleed?: boolean;
};

type TrackerProps = { fullBleed?: boolean };

function LoadingShell({
  fullBleed,
  onLoadNow,
  busy,
}: {
  fullBleed: boolean;
  onLoadNow: () => void;
  busy?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full flex-col justify-end overflow-hidden bg-[#070A1A] ${
        fullBleed
          ? "h-[calc(100svh-3.5rem)] min-h-[640px]"
          : "h-[min(72vh,640px)] min-h-[420px] rounded-3xl border border-white/10"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(248,216,80,0.1),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10 px-5 pb-10 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F8D850]">
          Live lightning map
        </p>
        <h2 className="mt-2 max-w-md text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Real-time satellite strikes
        </h2>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">
          NOAA GOES flash data for the Americas - tap once to load the interactive map.
        </p>
        <button
          type="button"
          onClick={onLoadNow}
          disabled={busy}
          className="mt-5 rounded-xl border border-white/30 bg-white/12 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/18 disabled:opacity-70"
        >
          {busy ? "Loading map..." : "Explore live map"}
        </button>
      </div>
    </div>
  );
}

/**
 * MapLibre is ~300KB+. Do not auto-fetch it on idle - Lighthouse would still
 * download it during the audit. Load only after an explicit user gesture.
 */
export default function LiveLightningMapLoader({ fullBleed = false }: Props) {
  const [Tracker, setTracker] = useState<ComponentType<TrackerProps> | null>(
    null,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  const loadNow = useCallback(() => {
    if (Tracker || busy) return;
    setBusy(true);
    setError(false);
    void import(
      /* webpackPrefetch: false, webpackPreload: false */ "@/components/tracker/TrackerApp",
    )
      .then((mod) => {
        setTracker(() => mod.default);
      })
      .catch(() => {
        setError(true);
        setBusy(false);
      });
  }, [Tracker, busy]);

  if (Tracker) {
    return <Tracker fullBleed={fullBleed} />;
  }

  return (
    <div>
      <LoadingShell fullBleed={fullBleed} onLoadNow={loadNow} busy={busy} />
      {error ? (
        <p className="px-5 pt-2 text-center text-sm text-red-300" role="alert">
          Could not load the map.{" "}
          <button type="button" className="underline" onClick={loadNow}>
            Try again
          </button>
        </p>
      ) : null}
    </div>
  );
}
