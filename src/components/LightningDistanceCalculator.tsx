"use client";

import { useId, useMemo, useState } from "react";
import {
  estimateLightningDistance,
  formatDistance,
  type DistanceUnit,
} from "@/lib/lightningDistance";

type Props = {
  className?: string;
};

export default function LightningDistanceCalculator({ className = "" }: Props) {
  const baseId = useId();
  const [seconds, setSeconds] = useState("5");
  const [unit, setUnit] = useState<DistanceUnit>("miles");

  const result = useMemo(() => {
    const n = Number.parseFloat(seconds);
    return estimateLightningDistance(Number.isFinite(n) ? n : -1);
  }, [seconds]);

  const primary =
    result == null
      ? null
      : unit === "miles"
        ? `${formatDistance(result.miles)} mi`
        : `${formatDistance(result.kilometers)} km`;

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_50px_-28px_rgba(59,130,246,0.55)] sm:p-6 ${className}`}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
            Lightning distance calculator
          </h2>
          <p className="mt-1 text-sm text-white/65">
            Count the seconds from flash to thunder, then estimate how far the strike was.
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-white/15 bg-brand-soft p-1 text-sm">
          {(["miles", "kilometers"] as DistanceUnit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              className={`rounded-md px-3 py-1.5 capitalize transition ${
                unit === u
                  ? "bg-violet text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
        <div>
          <label htmlFor={`${baseId}-seconds`} className="calc-label">
            Seconds after flash
          </label>
          <input
            id={`${baseId}-seconds`}
            className="calc-input"
            type="number"
            min={0}
            max={600}
            step={0.5}
            inputMode="decimal"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
          <input
            className="mt-3 w-full accent-violet"
            type="range"
            min={0}
            max={60}
            step={0.5}
            value={Math.min(Number.parseFloat(seconds) || 0, 60)}
            onChange={(e) => setSeconds(e.target.value)}
            aria-label="Seconds after flash slider"
          />
          <p className="mt-2 text-xs text-white/50">
            Tip: start counting when you see the flash; stop when you hear thunder.
          </p>
        </div>

        <div className="rounded-xl border border-violet/30 bg-brand-soft/80 p-4 sm:p-5">
          {result ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-white/55">
                Estimated distance
              </p>
              <p className="mt-1 font-display text-3xl font-bold text-gold sm:text-4xl">
                {primary}
              </p>
              <p className="mt-2 text-sm text-white/70">
                Rule of five ≈ {formatDistance(result.ruleOfFiveMiles)} miles · sound travel ≈{" "}
                {formatDistance(result.kilometers)} km ({Math.round(result.meters)} m)
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
                <p className="text-sm font-semibold text-violet-soft">{result.riskLabel}</p>
                <p className="mt-1 text-sm text-white/75">{result.riskHint}</p>
              </div>
            </>
          ) : (
            <p className="text-sm text-white/70">Enter a valid number of seconds (0–600).</p>
          )}
        </div>
      </div>
    </div>
  );
}
