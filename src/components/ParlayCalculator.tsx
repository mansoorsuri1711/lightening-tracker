"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  OddsFormat,
  calculateParlay,
  formatAmerican,
  formatMoney,
  parseOddsToDecimal,
} from "@/lib/parlayMath";

type Leg = { id: string; odds: string; label: string };

type ParlayCalculatorProps = {
  title?: string;
  subtitle?: string;
  titleAs?: "h1" | "h2";
  /** When false, no card chrome — tool sits on the page background. */
  framed?: boolean;
  /** Hide the built-in title block (use page headings instead). */
  showHeader?: boolean;
  defaultFormat?: OddsFormat;
  defaultStake?: string;
  defaultLegs?: string[];
  minLegs?: number;
  maxLegs?: number;
  showLabels?: boolean;
};

const FORMAT_HELP: Record<OddsFormat, string> = {
  american: "Examples: -110, +150, -200",
  decimal: "Examples: 1.91, 2.50, 3.00",
  fractional: "Examples: 10/11, 3/2, 2/1",
};

export default function ParlayCalculator({
  title = "Parlay calculator",
  subtitle = "Add legs, set your stake, and get combined odds, profit, and total payout instantly.",
  titleAs = "h2",
  framed = false,
  showHeader = false,
  defaultFormat = "american",
  defaultStake = "100",
  defaultLegs = ["-110", "-110", "-110"],
  minLegs = 2,
  maxLegs = 12,
  showLabels = true,
}: ParlayCalculatorProps) {
  const formId = useId();
  const nextLegId = useRef(defaultLegs.length);
  const [format, setFormat] = useState<OddsFormat>(defaultFormat);
  const [stake, setStake] = useState(defaultStake);
  const [legs, setLegs] = useState<Leg[]>(() =>
    defaultLegs.map((odds, i) => ({
      id: `leg-${i}`,
      odds,
      label: `Leg ${i + 1}`,
    }))
  );

  const TitleTag = titleAs;

  const parsed = useMemo(() => {
    const stakeNum = Number(stake);
    const decimals = legs.map((leg) => parseOddsToDecimal(leg.odds, format));
    const valid = decimals.every((d) => d !== null) && Number.isFinite(stakeNum) && stakeNum > 0;
    const result =
      valid && decimals.every((d): d is number => d !== null)
        ? calculateParlay(stakeNum, decimals)
        : null;
    return { stakeNum, decimals, result, valid };
  }, [legs, format, stake]);

  const updateLeg = (id: string, patch: Partial<Leg>) => {
    setLegs((prev) => prev.map((leg) => (leg.id === id ? { ...leg, ...patch } : leg)));
  };

  const addLeg = () => {
    if (legs.length >= maxLegs) return;
    const id = `leg-${nextLegId.current++}`;
    setLegs((prev) => [
      ...prev,
      {
        id,
        odds: format === "american" ? "-110" : format === "decimal" ? "1.91" : "10/11",
        label: `Leg ${prev.length + 1}`,
      },
    ]);
  };

  const removeLeg = (id: string) => {
    if (legs.length <= minLegs) return;
    setLegs((prev) => prev.filter((leg) => leg.id !== id));
  };

  const shellClass = framed
    ? "overflow-hidden rounded-2xl border border-white/10 bg-brand-soft/90 shadow-[0_24px_60px_-28px_rgba(198,244,50,0.35)]"
    : "";

  return (
    <div className={shellClass}>
      {showHeader && (
        <div className={framed ? "border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4" : "mb-4"}>
          <TitleTag
            className={`font-display font-bold tracking-tight ${
              titleAs === "h1"
                ? "text-2xl brand-gradient-text sm:text-3xl md:text-4xl"
                : "text-xl text-white sm:text-2xl"
            }`}
          >
            {title}
          </TitleTag>
          <p className="mt-1 text-sm text-white/65">{subtitle}</p>
        </div>
      )}

      <div className={`grid gap-5 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr] ${framed ? "p-3 sm:p-6" : ""}`}>
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2" role="group" aria-label="Odds format">
            {(["american", "decimal", "fractional"] as OddsFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold capitalize transition sm:px-3 sm:py-2 sm:text-sm ${
                  format === f
                    ? "bg-violet text-brand-deep"
                    : "bg-white/5 text-white/75 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
            <span className="text-[11px] text-white/45 sm:ml-1">{FORMAT_HELP[format]}</span>
          </div>

          <div className="mb-3">
            <label className="calc-label" htmlFor={`${formId}-stake`}>
              Stake
            </label>
            <input
              id={`${formId}-stake`}
              className="calc-input"
              inputMode="decimal"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="100"
            />
          </div>

          <ul className="space-y-2">
            {legs.map((leg, index) => (
              <li
                key={leg.id}
                className={`grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 ${
                  showLabels
                    ? "grid-cols-[1fr_auto] sm:grid-cols-[1.2fr_1fr_auto]"
                    : "grid-cols-[auto_1fr_auto]"
                }`}
              >
                {showLabels ? (
                  <div>
                    <label className="calc-label" htmlFor={`${formId}-label-${leg.id}`}>
                      Leg {index + 1} label
                    </label>
                    <input
                      id={`${formId}-label-${leg.id}`}
                      className="calc-input"
                      value={leg.label}
                      onChange={(e) => updateLeg(leg.id, { label: e.target.value })}
                      placeholder={`Leg ${index + 1}`}
                    />
                  </div>
                ) : (
                  <span className="flex items-center text-xs font-semibold text-white/50">
                    #{index + 1}
                  </span>
                )}
                <div>
                  {showLabels && (
                    <label className="calc-label" htmlFor={`${formId}-odds-${leg.id}`}>
                      Odds
                    </label>
                  )}
                  <input
                    id={`${formId}-odds-${leg.id}`}
                    className="calc-input"
                    value={leg.odds}
                    onChange={(e) => updateLeg(leg.id, { odds: e.target.value })}
                    placeholder={
                      format === "american" ? "-110" : format === "decimal" ? "1.91" : "10/11"
                    }
                    aria-label={showLabels ? undefined : `Leg ${index + 1} odds`}
                    aria-invalid={parsed.decimals[index] === null}
                  />
                </div>
                <div className={showLabels ? "flex items-end" : "flex items-center"}>
                  <button
                    type="button"
                    onClick={() => removeLeg(leg.id)}
                    disabled={legs.length <= minLegs}
                    className="rounded-lg border border-white/15 px-2.5 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove leg ${index + 1}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={addLeg}
            disabled={legs.length >= maxLegs}
            className="mt-3 w-full rounded-xl border border-dashed border-violet/40 bg-violet/10 py-2.5 text-sm font-semibold text-violet-soft transition hover:bg-violet/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Add leg ({legs.length}/{maxLegs})
          </button>
        </div>

        <div
          className="border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-soft">Results</p>
          {parsed.result ? (
            <dl className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4">
              <div className="col-span-2">
                <dt className="text-sm text-white/55">Combined American odds</dt>
                <dd className="font-display text-3xl font-bold text-violet">
                  {formatAmerican(parsed.result.combinedAmerican)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Decimal</dt>
                <dd className="text-lg font-semibold text-white">
                  {parsed.result.combinedDecimal.toFixed(3)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Win prob.</dt>
                <dd className="text-lg font-medium text-white/90">
                  {(parsed.result.impliedProbability * 100).toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Profit</dt>
                <dd className="text-lg font-semibold text-teal">
                  {formatMoney(parsed.result.profit)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Total payout</dt>
                <dd className="font-display text-xl font-bold text-white">
                  {formatMoney(parsed.result.payout)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              Enter a stake above $0 and valid odds for every leg to see your parlay payout.
            </p>
          )}
          <p className="mt-4 text-[11px] leading-relaxed text-white/40">
            Estimates use standard odds conversion. Sportsbook parlays may include juice or house
            rules that change the final ticket price.
          </p>
        </div>
      </div>
    </div>
  );
}
