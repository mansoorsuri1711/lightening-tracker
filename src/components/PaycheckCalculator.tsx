"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  FILING_STATUS_LABELS,
  FilingStatus,
  PAY_FREQUENCY_LABELS,
  PayFrequency,
  PayType,
  PaycheckInputs,
  PaycheckResult,
  formatPercent,
  formatUsd,
  projectFloridaPaycheck,
} from "@/lib/paycheckMath";

const defaults: PaycheckInputs = {
  payType: "salary",
  annualSalary: 72000,
  hourlyRate: 28,
  hoursPerWeek: 40,
  payFrequency: "biweekly",
  filingStatus: "single",
  pretaxDeductionPerPaycheck: 200,
  posttaxDeductionPerPaycheck: 0,
  extraWithholding: 0,
  dependentsCredit: 0,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-white/10 bg-[#061820] px-3 py-2.5 text-right text-[15px] text-white outline-none transition focus:border-accent focus:ring-1 focus:ring-accent disabled:opacity-50 md:py-3";

function Row({
  label,
  htmlFor,
  children,
  hint,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-3 border-b border-white/5 py-2.5 last:border-b-0 md:gap-4 md:py-3">
      <label htmlFor={htmlFor} className="text-[13px] leading-snug text-zinc-300 md:text-sm">
        {label}
        {hint ? (
          <span className="mt-0.5 block text-[11px] text-zinc-500 md:text-xs">{hint}</span>
        ) : null}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function BreakdownBars({ result }: { result: PaycheckResult }) {
  const gross = result.grossPerPaycheck || 1;
  return (
    <div className="space-y-2.5">
      {result.breakdown.map((row) => {
        const pct = Math.min(100, (row.amount / gross) * 100);
        return (
          <div key={row.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-zinc-300">
              <span className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: row.color }}
                  aria-hidden="true"
                />
                {row.label}
              </span>
              <span className="font-medium text-white">{formatUsd(row.amount)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: row.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ResultPanel({ result }: { result: PaycheckResult }) {
  return (
    <div id="calculator-result" className="flex h-full flex-col">
      <div className="flex items-center justify-between bg-gradient-to-r from-accent to-[#1a9e94] px-4 py-2.5">
        <p className="text-sm font-semibold text-[#041820]">Your Florida paycheck</p>
        <p className="text-xs font-medium text-[#041820]/90 md:text-sm">
          {result.periodsPerYear} paychecks / year
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Estimated take-home
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {formatUsd(result.netPay)}
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            {formatUsd(result.annualNet)} / year · {formatPercent(result.takeHomePercent)} of gross
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[
            { label: "Gross", value: result.grossPerPaycheck },
            { label: "Federal tax", value: result.federalIncomeTax },
            { label: "FICA", value: result.ficaTotal },
            { label: "FL state tax", value: result.floridaStateTax },
            { label: "Pre-tax", value: result.pretaxDeduction },
            { label: "Post-tax", value: result.posttaxDeduction },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5"
            >
              <p className="text-[11px] text-zinc-500">{item.label}</p>
              <p
                className={`text-sm font-semibold ${
                  item.label === "FL state tax" ? "text-accent" : "text-white"
                }`}
              >
                {formatUsd(item.value)}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#061820] p-3 md:p-4">
          <p className="mb-3 text-sm font-semibold text-white">Paycheck breakdown</p>
          <BreakdownBars result={result} />
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <tbody className="text-zinc-200">
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <td className="px-3 py-2.5">Social Security (6.2%)</td>
                <td className="px-3 py-2.5 text-right">{formatUsd(result.socialSecurity)}</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="px-3 py-2.5">Medicare (1.45%+)</td>
                <td className="px-3 py-2.5 text-right">
                  {formatUsd(result.medicare + result.additionalMedicare)}
                </td>
              </tr>
              <tr className="border-b border-white/5 bg-white/[0.03]">
                <td className="px-3 py-2.5 font-medium text-accent">Florida state income tax</td>
                <td className="px-3 py-2.5 text-right font-semibold text-accent">$0.00</td>
              </tr>
              <tr>
                <td className="px-3 py-2.5">Effective tax rate (excludes deductions)</td>
                <td className="px-3 py-2.5 text-right">{formatPercent(result.effectiveTaxRate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function PaycheckCalculator() {
  const [draft, setDraft] = useState<PaycheckInputs>(defaults);
  const [inputs, setInputs] = useState<PaycheckInputs>(defaults);
  const [showResult, setShowResult] = useState(false);
  const [, startTransition] = useTransition();

  const result = useMemo(() => projectFloridaPaycheck(inputs), [inputs]);

  const updateDraft = <K extends keyof PaycheckInputs>(key: K, value: PaycheckInputs[K]) => {
    startTransition(() => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    });
  };

  const onCalculate = (e?: FormEvent) => {
    e?.preventDefault();
    setInputs(draft);
    setShowResult(true);
    requestAnimationFrame(() => {
      document.getElementById("calculator-result")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  };

  const onClear = () => {
    setDraft(defaults);
    setInputs(defaults);
    setShowResult(false);
  };

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c24] shadow-2xl shadow-black/40"
    >
      <div className="flex flex-col gap-2 border-b border-white/5 bg-[#0d2430] px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <p id="calculator-heading" className="text-sm font-medium text-zinc-100 md:text-base">
            Florida take-home pay estimator
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-accent">
          FL state tax $0
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-white/10">
        <form onSubmit={onCalculate} className="px-4 md:px-6">
          <div className="flex gap-2 border-b border-white/5 py-3">
            {(
              [
                ["salary", "Salary"],
                ["hourly", "Hourly"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateDraft("payType", value as PayType)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  draft.payType === value
                    ? "bg-accent text-[#041820]"
                    : "border border-white/10 text-zinc-300 hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-5">
            {draft.payType === "salary" ? (
              <Row label="Annual salary" htmlFor="annualSalary">
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                    $
                  </span>
                  <input
                    id="annualSalary"
                    type="number"
                    min={0}
                    step={1000}
                    inputMode="decimal"
                    className={`${inputClass} pl-7`}
                    value={draft.annualSalary}
                    onChange={(e) => updateDraft("annualSalary", Number(e.target.value) || 0)}
                  />
                </div>
              </Row>
            ) : (
              <>
                <Row label="Hourly rate" htmlFor="hourlyRate">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                      $
                    </span>
                    <input
                      id="hourlyRate"
                      type="number"
                      min={0}
                      step={0.25}
                      inputMode="decimal"
                      className={`${inputClass} pl-7`}
                      value={draft.hourlyRate}
                      onChange={(e) => updateDraft("hourlyRate", Number(e.target.value) || 0)}
                    />
                  </div>
                </Row>
                <Row label="Hours / week" htmlFor="hoursPerWeek">
                  <input
                    id="hoursPerWeek"
                    type="number"
                    min={0}
                    max={168}
                    step={0.5}
                    inputMode="decimal"
                    className={inputClass}
                    value={draft.hoursPerWeek}
                    onChange={(e) => updateDraft("hoursPerWeek", Number(e.target.value) || 0)}
                  />
                </Row>
              </>
            )}

            <Row label="Pay frequency" htmlFor="payFrequency">
              <select
                id="payFrequency"
                className={`${inputClass} text-left`}
                value={draft.payFrequency}
                onChange={(e) => updateDraft("payFrequency", e.target.value as PayFrequency)}
              >
                {(Object.keys(PAY_FREQUENCY_LABELS) as PayFrequency[]).map((key) => (
                  <option key={key} value={key}>
                    {PAY_FREQUENCY_LABELS[key]}
                  </option>
                ))}
              </select>
            </Row>

            <Row label="Filing status" htmlFor="filingStatus" hint="For federal withholding estimate">
              <select
                id="filingStatus"
                className={`${inputClass} text-left`}
                value={draft.filingStatus}
                onChange={(e) => updateDraft("filingStatus", e.target.value as FilingStatus)}
              >
                {(Object.keys(FILING_STATUS_LABELS) as FilingStatus[]).map((key) => (
                  <option key={key} value={key}>
                    {FILING_STATUS_LABELS[key]}
                  </option>
                ))}
              </select>
            </Row>

            <Row
              label="Pre-tax / paycheck"
              htmlFor="pretax"
              hint="401(k), HSA, health premiums"
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="pretax"
                  type="number"
                  min={0}
                  step={25}
                  inputMode="decimal"
                  className={`${inputClass} pl-7`}
                  value={draft.pretaxDeductionPerPaycheck}
                  onChange={(e) =>
                    updateDraft("pretaxDeductionPerPaycheck", Number(e.target.value) || 0)
                  }
                />
              </div>
            </Row>

            <Row label="Post-tax / paycheck" htmlFor="posttax" hint="Roth 401(k), garnishments">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="posttax"
                  type="number"
                  min={0}
                  step={25}
                  inputMode="decimal"
                  className={`${inputClass} pl-7`}
                  value={draft.posttaxDeductionPerPaycheck}
                  onChange={(e) =>
                    updateDraft("posttaxDeductionPerPaycheck", Number(e.target.value) || 0)
                  }
                />
              </div>
            </Row>

            <Row label="Extra federal withholding" htmlFor="extra">
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="extra"
                  type="number"
                  min={0}
                  step={10}
                  inputMode="decimal"
                  className={`${inputClass} pl-7`}
                  value={draft.extraWithholding}
                  onChange={(e) => updateDraft("extraWithholding", Number(e.target.value) || 0)}
                />
              </div>
            </Row>

            <Row
              label="Annual dependent credit"
              htmlFor="dependents"
              hint="Optional W-4 Step 3 estimate"
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  id="dependents"
                  type="number"
                  min={0}
                  step={500}
                  inputMode="decimal"
                  className={`${inputClass} pl-7`}
                  value={draft.dependentsCredit}
                  onChange={(e) => updateDraft("dependentsCredit", Number(e.target.value) || 0)}
                />
              </div>
            </Row>
          </div>

          <div className="flex items-center justify-center gap-3 py-4 md:justify-start md:py-5">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-bold text-[#041820] shadow-lg shadow-accent/20 transition hover:bg-[#5eead4] active:scale-[0.99] md:px-8 md:text-base"
            >
              Calculate take-home
            </button>
            <button
              type="button"
              onClick={onClear}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:bg-white/10 md:text-base"
            >
              Clear
            </button>
          </div>
        </form>

        <div className={`${showResult ? "block" : "hidden lg:block"} border-t border-white/10 lg:border-t-0`}>
          {showResult ? (
            <ResultPanel result={result} />
          ) : (
            <div className="hidden h-full min-h-[28rem] flex-col items-center justify-center gap-3 p-8 text-center lg:flex">
              <p className="text-lg font-semibold text-white">Your net pay appears here</p>
              <p className="max-w-sm text-sm leading-relaxed text-zinc-400">
                Enter salary or hourly wages, pay frequency, and deductions, then calculate to see
                federal tax, FICA, and Florida&apos;s $0 state income tax.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-white/10 px-4 py-2.5 text-[11px] leading-relaxed text-zinc-400 md:px-6">
        Educational 2026 estimate using IRS brackets, standard deduction, and SSA FICA rates. Not a
        substitute for payroll software, your W-4, or tax advice. Florida has no state income tax.
      </p>
    </section>
  );
}
