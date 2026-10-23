"use client";

import { useId, useMemo, useState } from "react";
import { compareExpenseRatios, formatMoney, formatPercent } from "@/lib/indexFundMath";

function parsePositive(raw: string): number | null {
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export default function ExpenseRatioCalculator() {
  const formId = useId();
  const [initial, setInitial] = useState("25000");
  const [contribution, setContribution] = useState("500");
  const [years, setYears] = useState("30");
  const [expectedReturn, setExpectedReturn] = useState("8");
  const [lowEr, setLowEr] = useState("0.04");
  const [highEr, setHighEr] = useState("0.75");

  const result = useMemo(() => {
    const i = parsePositive(initial);
    const c = parsePositive(contribution);
    const y = parsePositive(years);
    const r = Number(expectedReturn);
    const low = Number(lowEr);
    const high = Number(highEr);
    if (
      i === null ||
      c === null ||
      y === null ||
      ![r, low, high].every(Number.isFinite) ||
      y < 1
    ) {
      return null;
    }
    return compareExpenseRatios({
      initial: i,
      contribution: c,
      years: y,
      expectedReturnPct: r,
      lowExpensePct: low,
      highExpensePct: high,
      frequency: "monthly",
    });
  }, [initial, contribution, years, expectedReturn, lowEr, highEr]);

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-[#0a1814] px-3 py-2.5 text-white outline-none transition placeholder:text-white/35 focus:border-violet/60 focus:bg-[#0c1e19] focus:ring-2 focus:ring-violet/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  return (
    <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
      <form className="space-y-4 lg:col-span-2" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor={`${formId}-initial`} className={labelClass}>
            Initial investment ($)
          </label>
          <input
            id={`${formId}-initial`}
            type="number"
            min={0}
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-contrib`} className={labelClass}>
            Monthly contribution ($)
          </label>
          <input
            id={`${formId}-contrib`}
            type="number"
            min={0}
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
            className={fieldClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${formId}-years`} className={labelClass}>
              Years
            </label>
            <input
              id={`${formId}-years`}
              type="number"
              min={1}
              max={80}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-return`} className={labelClass}>
              Gross return (%)
            </label>
            <input
              id={`${formId}-return`}
              type="number"
              step={0.1}
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor={`${formId}-low`} className={labelClass}>
              Low expense ratio (%)
            </label>
            <input
              id={`${formId}-low`}
              type="number"
              min={0}
              step={0.01}
              value={lowEr}
              onChange={(e) => setLowEr(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor={`${formId}-high`} className={labelClass}>
              High expense ratio (%)
            </label>
            <input
              id={`${formId}-high`}
              type="number"
              min={0}
              step={0.01}
              value={highEr}
              onChange={(e) => setHighEr(e.target.value)}
              className={fieldClass}
            />
          </div>
        </div>
      </form>

      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <p className="mb-4 text-sm font-medium uppercase tracking-wide text-violet-soft">
            Fee impact comparison
          </p>
          {result ? (
            <>
              <p className="font-display text-3xl font-bold text-gold sm:text-4xl">
                {formatMoney(result.difference)}
              </p>
              <p className="mt-1 text-sm text-white/60">
                Extra wealth kept with the lower expense ratio over the full timeline
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="border-t border-white/10 pt-3">
                  <dt className="text-xs uppercase tracking-wide text-white/50">
                    Balance @ {formatPercent(Number(lowEr))} ER
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-teal">
                    {formatMoney(result.low.finalBalance)}
                  </dd>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <dt className="text-xs uppercase tracking-wide text-white/50">
                    Balance @ {formatPercent(Number(highEr))} ER
                  </dt>
                  <dd className="mt-1 text-lg font-semibold text-white">
                    {formatMoney(result.high.finalBalance)}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="text-white/70">Enter valid numbers to compare expense ratios.</p>
          )}
        </div>
      </div>
    </div>
  );
}
