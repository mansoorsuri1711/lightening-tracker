"use client";

import {
  useEffect,
  useState,
  type ComponentType,
} from "react";

type Props = {
  /** Edge-to-edge hero mode (no rounded card chrome). */
  fullBleed?: boolean;
};

type TrackerProps = { fullBleed?: boolean };

function LoadingShell({ fullBleed }: { fullBleed: boolean }) {
  return (
    <div
      className={`relative flex w-full flex-col justify-end overflow-hidden bg-[#070A1A] ${
        fullBleed
          ? "h-[calc(100svh-3.5rem)] min-h-[640px]"
          : "h-[min(72vh,640px)] min-h-[420px] rounded-3xl border border-white/10"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Live lightning map loading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(59,130,246,0.22),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(248,216,80,0.1),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10 px-5 pb-8 sm:px-8">
        <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="mb-2 h-8 w-56 animate-pulse rounded-lg bg-white/10" />
        <p className="text-sm text-white/50">Loading live map...</p>
      </div>
    </div>
  );
}

/**
 * Auto-load MapLibre after first paint. Import is deferred (no webpack prefetch)
 * so the initial HTML/CSS can paint before the ~300KB tracker chunk starts.
 */
export default function LiveLightningMapLoader({ fullBleed = false }: Props) {
  const [Tracker, setTracker] = useState<ComponentType<TrackerProps> | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    let raf1 = 0;
    let raf2 = 0;

    const startImport = () => {
      if (cancelled) return;
      void import(
        /* webpackPrefetch: false, webpackPreload: false */ "@/components/tracker/TrackerApp",
      ).then((mod) => {
        if (!cancelled) setTracker(() => mod.default);
      });
    };

    const armIdle = () => {
      if (cancelled) return;
      const ric = window.requestIdleCallback;
      if (typeof ric === "function") {
        // Short idle window so real users get the map quickly after paint.
        idleId = ric(startImport, { timeout: 900 });
      } else {
        timeoutId = window.setTimeout(startImport, 100);
      }
    };

    // Two rAFs ≈ after first paint, then idle before pulling MapLibre.
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(armIdle);
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (Tracker) {
    return <Tracker fullBleed={fullBleed} />;
  }

  return <LoadingShell fullBleed={fullBleed} />;
}
