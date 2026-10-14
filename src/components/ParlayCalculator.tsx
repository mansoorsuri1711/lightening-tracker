"use client";

import { useId, useMemo, useState } from "react";
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
  defaultFormat?: OddsFormat;
  defaultStake?: string;
  defaultLegs?: string[];
  minLegs?: number;
  maxLegs?: number;
};

const FORMAT_HELP: Record<OddsFormat, string> = {
  american: "Examples: -110, +150, -200",
  decimal: "Examples: 1.91, 2.50, 3.00",
  fractional: "Examples: 10/11, 3/2, 2/1",
};

function newLeg(odds = "-110", label = ""): Leg {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    odds,
    label,
  };
}

export default function ParlayCalculator({
  title = "Parlay calculator",
  defaultFormat = "american",
  defaultStake = "100",
  defaultLegs = ["-110", "-110", "-110"],
  minLegs = 2,
  maxLegs = 12,
}: ParlayCalculatorProps) {
  const formId = useId();
  const [format, setFormat] = useState<OddsFormat>(defaultFormat);
  const [stake, setStake] = useState(defaultStake);
  const [legs, setLegs] = useState<Leg[]>(() =>
    defaultLegs.map((odds, i) => newLeg(odds, `Leg ${i + 1}`))
  );

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
    setLegs((prev) => [...prev, newLeg(format === "american" ? "-110" : format === "decimal" ? "1.91" : "10/11", `Leg ${prev.length + 1}`)]);
  };

  const removeLeg = (id: string) => {
    if (legs.length <= minLegs) return;
    setLegs((prev) => prev.filter((leg) => leg.id !== id));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-soft/80 shadow-[0_24px_60px_-28px_rgba(198,244,50,0.35)]">
      <div className="border-b border-white/10 bg-gradient-to-r from-brand-deep via-brand-soft to-brand-deep px-4 py-4 sm:px-6">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm text-white/65">
          Add legs, set your stake, and get combined odds, profit, and total payout instantly.
        </p>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Odds format">
            {(["american", "decimal", "fractional"] as OddsFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize transition ${
                  format === f
                    ? "bg-violet text-brand-deep"
                    : "bg-white/5 text-white/75 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="mb-4 text-xs text-white/50">{FORMAT_HELP[format]}</p>

          <div className="mb-4">
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
              aria-describedby={`${formId}-stake-hint`}
            />
            <p id={`${formId}-stake-hint`} className="mt-1 text-xs text-white/45">
              Enter the amount you plan to wager on the full parlay.
            </p>
          </div>

          <ul className="space-y-3">
            {legs.map((leg, index) => (
              <li
                key={leg.id}
                className="grid grid-cols-[1fr_auto] gap-2 rounded-xl border border-white/10 bg-brand-deep/50 p-3 sm:grid-cols-[1.2fr_1fr_auto]"
              >
                <div className="sm:col-span-1">
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
                <div>
                  <label className="calc-label" htmlFor={`${formId}-odds-${leg.id}`}>
                    Odds
                  </label>
                  <input
                    id={`${formId}-odds-${leg.id}`}
                    className="calc-input"
                    value={leg.odds}
                    onChange={(e) => updateLeg(leg.id, { odds: e.target.value })}
                    placeholder={format === "american" ? "-110" : format === "decimal" ? "1.91" : "10/11"}
                    aria-invalid={parsed.decimals[index] === null}
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() => removeLeg(leg.id)}
                    disabled={legs.length <= minLegs}
                    className="rounded-lg border border-white/15 px-3 py-2.5 text-sm text-white/70 transition hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove leg ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={addLeg}
            disabled={legs.length >= maxLegs}
            className="mt-4 w-full rounded-xl border border-dashed border-violet/40 bg-violet/10 py-3 text-sm font-semibold text-violet-soft transition hover:bg-violet/20 disabled:cursor-not-allowed disabled:opacity-40"
          >
            + Add leg ({legs.length}/{maxLegs})
          </button>
        </div>

        <div
          className="rounded-2xl border border-violet/30 bg-gradient-to-b from-brand-deep to-brand p-5"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-violet-soft">Results</p>
          {parsed.result ? (
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-sm text-white/55">Combined American odds</dt>
                <dd className="font-display text-3xl font-bold text-violet">
                  {formatAmerican(parsed.result.combinedAmerican)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Combined decimal odds</dt>
                <dd className="text-xl font-semibold text-white">
                  {parsed.result.combinedDecimal.toFixed(4)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Profit</dt>
                <dd className="text-xl font-semibold text-teal">{formatMoney(parsed.result.profit)}</dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Total payout</dt>
                <dd className="font-display text-2xl font-bold text-white">
                  {formatMoney(parsed.result.payout)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-white/55">Implied win probability</dt>
                <dd className="text-lg font-medium text-white/90">
                  {(parsed.result.impliedProbability * 100).toFixed(2)}%
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Enter a stake above $0 and valid odds for every leg to see your parlay payout.
            </p>
          )}
          <p className="mt-6 text-xs leading-relaxed text-white/40">
            Estimates use standard odds conversion. Sportsbook parlays may include juice, boosted
            odds, or house rules that change the final ticket price.
          </p>
        </div>
      </div>
    </div>
  );
}
