"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  BMI_BANDS,
  BmiInputs,
  BmiResult,
  Sex,
  UnitSystem,
  calculateBmi,
  categoryColor,
  formatBmi,
} from "@/lib/bmiMath";

const imperialDefaults: BmiInputs = {
  sex: "female",
  units: "imperial",
  age: 30,
  weight: 150,
  height: 65,
};

const metricDefaults: BmiInputs = {
  sex: "female",
  units: "metric",
  age: 30,
  weight: 68,
  height: 165,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-pink/25 bg-white px-3 py-2.5 text-right text-[15px] text-ink outline-none transition focus:border-pink focus:ring-1 focus:ring-pink/35 disabled:opacity-50 md:py-3";

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
    <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-3 border-b border-brand/10 py-2.5 last:border-b-0 md:gap-4 md:py-3">
      <label htmlFor={htmlFor} className="text-[13px] leading-snug text-ink md:text-sm">
        {label}
        {hint ? (
          <span className="mt-0.5 block text-[11px] text-ink/65 md:text-xs">{hint}</span>
        ) : null}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ResultPanel({ result }: { result: BmiResult }) {
  const accent = categoryColor(result.category);
  const markerPct =
    result.bmi === null ? 0 : Math.min(100, Math.max(0, ((result.bmi - 15) / (40 - 15)) * 100));

  return (
    <div id="calculator-result" className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-pink/15 bg-blush px-4 py-2.5">
        <p className="text-sm font-semibold text-brand">Your BMI result</p>
        <p className="text-xs font-medium text-brand/60 md:text-sm">WHO adult scale</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        {result.error ? (
          <p className="rounded-xl border border-pink/40 bg-pink/5 px-4 py-3 text-sm text-ink">
            {result.error}
          </p>
        ) : (
          <>
            <div className="rounded-2xl border border-pink/20 bg-gradient-to-b from-blush to-white p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-pink-deep">
                Body mass index
              </p>
              <p className="mt-1 font-display text-4xl font-bold tracking-tight text-brand md:text-5xl">
                {formatBmi(result.bmi)}
              </p>
              <p className="mt-1 text-sm font-semibold" style={{ color: accent }}>
                {result.category ?? "—"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  label: "Healthy weight range",
                  value:
                    result.healthyMinDisplay !== null && result.healthyMaxDisplay !== null
                      ? `${result.healthyMinDisplay}–${result.healthyMaxDisplay} ${result.weightUnit}`
                      : "—",
                },
                {
                  label: "BMI Prime",
                  value: result.prime !== null ? result.prime.toFixed(2) : "—",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-brand/10 bg-white px-3 py-2.5"
                >
                  <p className="text-[11px] text-ink/65">{item.label}</p>
                  <p className="text-sm font-semibold text-ink">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-brand/10 bg-white p-3 md:p-4">
              <p className="mb-2 text-sm font-semibold text-ink">BMI scale for women</p>
              <div className="relative mb-3 h-3 overflow-hidden rounded-full">
                <div className="flex h-full w-full">
                  {BMI_BANDS.map((band) => (
                    <span
                      key={band.label}
                      className="flex-1"
                      style={{ backgroundColor: band.color }}
                      title={band.label}
                    />
                  ))}
                </div>
                {result.bmi !== null ? (
                  <span
                    className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-white bg-brand shadow"
                    style={{ left: `calc(${markerPct}% - 8px)` }}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-ink/80 sm:text-xs">
                {BMI_BANDS.map((band) => (
                  <li key={band.label} className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: band.color }}
                    />
                    {band.label}
                  </li>
                ))}
              </ul>
            </div>

            {result.ageNote ? (
              <p className="rounded-xl border border-lilac/50 bg-lilac/15 px-3 py-2 text-xs leading-relaxed text-brand">
                {result.ageNote}
              </p>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

export default function BmiCalculator({
  heading = "BMI calculator for women",
  defaultSex = "female",
}: {
  heading?: string;
  defaultSex?: Sex;
}) {
  const [units, setUnits] = useState<UnitSystem>("imperial");
  const [inputs, setInputs] = useState<BmiInputs>({ ...imperialDefaults, sex: defaultSex });
  const [submitted, setSubmitted] = useState<BmiInputs | null>(null);
  const [isPending, startTransition] = useTransition();

  const livePreview = useMemo(() => calculateBmi(inputs), [inputs]);
  const submittedResult = useMemo(
    () => (submitted ? calculateBmi(submitted) : null),
    [submitted]
  );

  const applyUnits = (next: UnitSystem) => {
    setUnits(next);
    const base = next === "metric" ? metricDefaults : imperialDefaults;
    setInputs((prev) => ({ ...base, sex: prev.sex, age: prev.age }));
    setSubmitted(null);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      setSubmitted({ ...inputs });
    });
  };

  const shown = submittedResult ?? livePreview;

  return (
    <section
      id="calculator"
      className="overflow-hidden rounded-3xl border border-pink/25 bg-white shadow-[0_24px_70px_-28px_rgba(232,90,122,0.35)]"
      aria-labelledby="bmi-calculator-heading"
    >
      <div className="border-b border-pink/20 bg-gradient-to-r from-brand via-brand-soft to-brand-glow px-4 py-3 sm:px-5">
        <h2 id="bmi-calculator-heading" className="font-display text-lg font-semibold text-white sm:text-xl">
          {heading}
        </h2>
        <p className="mt-0.5 text-xs text-pink-soft sm:text-sm">
          Designed for women — WHO categories, healthy weight range, metric & imperial
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        <form onSubmit={onSubmit} className="border-b border-pink/15 p-4 md:p-5 lg:border-b-0 lg:border-r lg:border-pink/15">
          <div className="mb-3 flex flex-wrap gap-2">
            {(
              [
                ["imperial", "US (lb / in)"],
                ["metric", "Metric (kg / cm)"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => applyUnits(value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition sm:text-sm ${
                  units === value
                    ? "bg-brand text-white shadow-sm"
                    : "border border-pink/30 bg-blush text-brand hover:border-pink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <Row label="Sex" hint="Defaults to female for this women’s BMI tool">
            <select
              id="sex"
              className={inputClass}
              value={inputs.sex}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, sex: e.target.value as Sex }))
              }
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </Row>

          <Row label="Age" htmlFor="age" hint="Years">
            <input
              id="age"
              type="number"
              inputMode="numeric"
              min={2}
              max={120}
              className={inputClass}
              value={inputs.age}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, age: Number(e.target.value) }))
              }
            />
          </Row>

          <Row
            label="Height"
            htmlFor="height"
            hint={units === "imperial" ? "Total inches (e.g. 65 for 5'5\")" : "Centimeters"}
          >
            <input
              id="height"
              type="number"
              inputMode="decimal"
              step="any"
              className={inputClass}
              value={inputs.height}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, height: Number(e.target.value) }))
              }
            />
          </Row>

          <Row
            label="Weight"
            htmlFor="weight"
            hint={units === "imperial" ? "Pounds" : "Kilograms"}
          >
            <input
              id="weight"
              type="number"
              inputMode="decimal"
              step="any"
              className={inputClass}
              value={inputs.weight}
              onChange={(e) =>
                setInputs((prev) => ({ ...prev, weight: Number(e.target.value) }))
              }
            />
          </Row>

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full rounded-2xl bg-gradient-to-r from-coral to-pink px-4 py-3.5 text-center text-base font-semibold text-white shadow-[0_10px_24px_-12px_rgba(255,122,122,0.9)] transition hover:from-coral-deep hover:to-pink-deep disabled:opacity-60"
          >
            {isPending ? "Calculating…" : "Calculate BMI"}
          </button>
          <p className="mt-2 text-center text-[11px] text-ink/60">
            Educational estimate — not a medical diagnosis.
          </p>
        </form>

        <ResultPanel result={shown} />
      </div>
    </section>
  );
}
