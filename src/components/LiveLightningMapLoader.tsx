"use client";

import dynamic from "next/dynamic";

type Props = {
  /** Edge-to-edge hero mode (no rounded card chrome). */
  fullBleed?: boolean;
};

function LoadingShell({ fullBleed }: { fullBleed: boolean }) {
  return (
    <div
      className={`relative flex w-full flex-col justify-end overflow-hidden bg-[#070A1A] ${
        fullBleed
          ? "h-[calc(100svh-3.5rem)] min-h-[640px]"
          : "h-[min(72vh,640px)] min-h-[420px] rounded-3xl border border-white/10"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(ellipse_at_70%_60%,rgba(248,216,80,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="relative z-10 px-5 pb-8">
        <div className="mb-3 h-3 w-24 animate-pulse rounded-full bg-white/10" />
        <div className="mb-2 h-8 w-56 animate-pulse rounded-lg bg-white/10" />
        <p className="text-sm text-white/50">Loading live map…</p>
      </div>
    </div>
  );
}

const LiveLightningMap = dynamic(() => import("@/components/tracker/TrackerApp"), {
  ssr: false,
  loading: () => <LoadingShell fullBleed={false} />,
});

const LiveLightningMapFullBleed = dynamic(() => import("@/components/tracker/TrackerApp"), {
  ssr: false,
  loading: () => <LoadingShell fullBleed />,
});

export default function LiveLightningMapLoader({ fullBleed = false }: Props) {
  if (fullBleed) {
    return <LiveLightningMapFullBleed fullBleed />;
  }
  return <LiveLightningMap fullBleed={false} />;
}
