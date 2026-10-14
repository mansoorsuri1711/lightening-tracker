"use client";

import { useId, useMemo, useState } from "react";
import {
  OddsFormat,
  calculateRoundRobin,
  formatMoney,
  parseOddsToDecimal,
} from "@/lib/parlayMath";

type Leg = { id: string; odds: string };

function newLeg(odds = "-110"): Leg {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, odds };
}

export default function RoundRobinCalculator() {
  const formId = useId();
  const [format, setFormat] = useState<OddsFormat>("american");
  const [stake, setStake] = useState("10");
  const [groupSize, setGroupSize] = useState(2);
  const [legs, setLegs] = useState<Leg[]>(() => [newLeg(), newLeg(), newLeg(), newLeg()]);

  const result = useMemo(() => {
    const stakeNum = Number(stake);
    const decimals = legs.map((leg) => parseOddsToDecimal(leg.odds, format));
    if (decimals.some((d) => d === null) || !Number.isFinite(stakeNum) || stakeNum <= 0) {
      return null;
    }
    return calculateRoundRobin(
      stakeNum,
      decimals.filter((d): d is number => d !== null),
      groupSize
    );
  }, [legs, format, stake, groupSize]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-soft/80">
      <div className="border-b border-white/10 px-4 py-4 sm:px-6">
        <h2 className="font-display text-xl font-bold text-white sm:text-2xl">
          Round robin bet calculator
        </h2>
        <p className="mt-1 text-sm text-white/65">
          Build every combination of {groupSize}-leg parlays from your selections and see total stake
          plus max payout if every ticket cashes.
        </p>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["american", "decimal", "fractional"] as OddsFormat[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold capitalize ${
                  format === f ? "bg-violet text-brand-deep" : "bg-white/5 text-white/75"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="calc-label" htmlFor={`${formId}-stake`}>
                Stake per ticket
              </label>
              <input
                id={`${formId}-stake`}
                className="calc-input"
                value={stake}
                onChange={(e) => setStake(e.target.value)}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="calc-label" htmlFor={`${formId}-size`}>
                Parlay size
              </label>
              <select
                id={`${formId}-size`}
                className="calc-input"
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value))}
              >
                {Array.from({ length: Math.max(1, legs.length - 1) }, (_, i) => i + 2)
                  .filter((n) => n <= legs.length)
                  .map((n) => (
                    <option key={n} value={n}>
                      {n}-leg parlays
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <ul className="space-y-2">
            {legs.map((leg, i) => (
              <li key={leg.id} className="flex gap-2">
                <input
                  className="calc-input"
                  aria-label={`Leg ${i + 1} odds`}
                  value={leg.odds}
                  onChange={(e) =>
                    setLegs((prev) =>
                      prev.map((l) => (l.id === leg.id ? { ...l, odds: e.target.value } : l))
                    )
                  }
                />
                <button
                  type="button"
                  className="rounded-lg border border-white/15 px-3 text-sm text-white/70 disabled:opacity-40"
                  disabled={legs.length <= 3}
                  onClick={() => setLegs((prev) => prev.filter((l) => l.id !== leg.id))}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="w-full rounded-xl border border-dashed border-violet/40 py-2.5 text-sm font-semibold text-violet-soft"
            disabled={legs.length >= 10}
            onClick={() => setLegs((prev) => [...prev, newLeg()])}
          >
            + Add selection
          </button>
        </div>

        <div className="rounded-2xl border border-violet/25 bg-brand-deep/80 p-5" aria-live="polite">
          {result ? (
            <>
              <dl className="space-y-3">
                <div className="flex justify-between gap-4">
                  <dt className="text-white/55">Tickets</dt>
                  <dd className="font-semibold text-white">{result.ticketCount}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/55">Total stake</dt>
                  <dd className="font-semibold text-white">{formatMoney(result.totalStake)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/55">Max payout (all hit)</dt>
                  <dd className="font-display text-xl font-bold text-violet">
                    {formatMoney(result.maxPayout)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-white/55">Max profit</dt>
                  <dd className="font-semibold text-teal">{formatMoney(result.maxProfit)}</dd>
                </div>
              </dl>
              <div className="mt-5 max-h-48 overflow-auto rounded-lg border border-white/10">
                <table className="w-full text-left text-xs">
                  <thead className="sticky top-0 bg-brand-soft text-white/50">
                    <tr>
                      <th className="px-3 py-2">Legs</th>
                      <th className="px-3 py-2">Decimal</th>
                      <th className="px-3 py-2">Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.tickets.map((t, i) => (
                      <tr key={i} className="border-t border-white/5 text-white/80">
                        <td className="px-3 py-1.5">{t.legs.join("-")}</td>
                        <td className="px-3 py-1.5">{t.decimal.toFixed(3)}</td>
                        <td className="px-3 py-1.5">{formatMoney(t.payout)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-sm text-white/60">
              Enter valid odds for each selection and a stake per ticket to calculate the round robin.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
