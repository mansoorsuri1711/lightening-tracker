"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

type Props = {
  /** Edge-to-edge hero mode (no rounded card chrome). */
  fullBleed?: boolean;
};

function LoadingShell({
  fullBleed,
  onLoadNow,
}: {
  fullBleed: boolean;
  onLoadNow?: () => void;
}) {
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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(248,216,80,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10 px-5 pb-8">
        <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="mb-2 h-8 w-56 animate-pulse rounded-lg bg-white/10" />
        <p className="text-sm text-white/50">Loading live map…</p>
        {onLoadNow ? (
          <button
            type="button"
            onClick={onLoadNow}
            className="mt-4 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15"
          >
            Load map now
          </button>
        ) : null}
      </div>
    </div>
  );
}

const TrackerApp = dynamic(() => import("@/components/tracker/TrackerApp"), {
  ssr: false,
  loading: () => <LoadingShell fullBleed />,
});

/**
 * Defer MapLibre (~300KB+) until after first paint / idle so LCP and unused-JS
 * audits are not blocked by the tracker chunk on initial navigation.
 */
export default function LiveLightningMapLoader({ fullBleed = false }: Props) {
  const [ready, setReady] = useState(false);
  const loadNow = useCallback(() => setReady(true), []);

  useEffect(() => {
    if (ready) return;

    let cancelled = false;
    let idleId: number | undefined;
    let safetyId: number | undefined;

    const start = () => {
      if (cancelled || ready) return;
      setReady(true);
    };

    const armIdle = () => {
      if (cancelled) return;
      const ric = window.requestIdleCallback;
      if (typeof ric === "function") {
        idleId = ric(start, { timeout: 1600 });
      } else {
        idleId = window.setTimeout(start, 150) as unknown as number;
      }
    };

    if (document.readyState === "complete") {
      armIdle();
    } else {
      const onLoad = () => armIdle();
      window.addEventListener("load", onLoad, { once: true });
      // Cap wait so slow `load` (tiles, etc.) cannot block the map forever.
      safetyId = window.setTimeout(armIdle, 2200);
      return () => {
        cancelled = true;
        window.removeEventListener("load", onLoad);
        if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        }
        if (safetyId !== undefined) window.clearTimeout(safetyId);
      };
    }

    return () => {
      cancelled = true;
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (typeof idleId === "number") window.clearTimeout(idleId);
    };
  }, [ready]);

  if (!ready) {
    return <LoadingShell fullBleed={fullBleed} onLoadNow={loadNow} />;
  }

  return <TrackerApp fullBleed={fullBleed} />;
}
