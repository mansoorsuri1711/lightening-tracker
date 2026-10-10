"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  BodyFatInputs,
  BodyFatResult,
  Sex,
  UnitSystem,
  calculateBodyFat,
  categoryColor,
  formatMass,
  formatPercent,
} from "@/lib/bodyFatMath";

const defaults: BodyFatInputs = {
  sex: "male",
  units: "imperial",
  age: 30,
  weight: 176,
  height: 70,
  neck: 15,
  waist: 34,
  hip: 38,
};

const metricDefaults: BodyFatInputs = {
  sex: "male",
  units: "metric",
  age: 30,
  weight: 80,
  height: 178,
  neck: 38,
  waist: 86,
  hip: 97,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-black/15 bg-white px-3 py-2.5 text-right text-[15px] text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black disabled:opacity-50 md:py-3";

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
    <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-3 border-b border-black/10 py-2.5 last:border-b-0 md:gap-4 md:py-3">
      <label htmlFor={htmlFor} className="text-[13px] leading-snug text-black md:text-sm">
        {label}
        {hint ? (
          <span className="mt-0.5 block text-[11px] text-black md:text-xs">{hint}</span>
        ) : null}
      </label>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function ResultPanel({ result }: { result: BodyFatResult }) {
  const accent = categoryColor(result.category);
  return (
    <div id="calculator-result" className="flex h-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-2.5">
        <p className="text-sm font-semibold text-black">Your body fat estimate</p>
        <p className="text-xs font-medium text-black md:text-sm">U.S. Navy method</p>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        {result.error ? (
          <p className="rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black">
            {result.error}
          </p>
        ) : (
          <>
            <div className="rounded-2xl border border-black/15 bg-white p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black">
                Body fat percentage
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-black md:text-4xl">
                {formatPercent(result.navyPercent)}
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
                {result.category ?? "—"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                { label: "Fat mass", value: formatMass(result.fatMass, result.weightUnit) },
                { label: "Lean mass", value: formatMass(result.leanMass, result.weightUnit) },
                { label: "BMI estimate", value: formatPercent(result.bmiPercent) },
                { label: "BMI", value: result.bmi ? result.bmi.toFixed(1) : "—" },
                { label: "Ideal for age", value: formatPercent(result.idealPercent) },
                {
                  label: "Fat to lose to ideal",
                  value: formatMass(result.fatToLoseForIdeal, result.weightUnit),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-black/10 bg-white px-3 py-2.5"
                >
                  <p className="text-[11px] text-black">{item.label}</p>
                  <p className="text-sm font-semibold text-black">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-3 md:p-4">
              <p className="mb-2 text-sm font-semibold text-black">Category scale</p>
              <div className="flex h-2.5 overflow-hidden rounded-full">
                {["#8FD16A", "#2EC4B6", "#F4C150", "#F08020", "#F0716A"].map((color) => (
                  <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-black">
                Essential → Athletes → Fitness → Average → Obese. Categories differ for men and women.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

type Props = {
  defaultSex?: Sex;
  heading?: string;
};

export default function BodyFatCalculator({
  defaultSex = "male",
  heading = "Body fat percentage calculator",
}: Props) {
  const initial = { ...defaults, sex: defaultSex };
  const [draft, setDraft] = useState<BodyFatInputs>(initial);
  const [inputs, setInputs] = useState<BodyFatInputs>(initial);
  const [showResult, setShowResult] = useState(false);
  const [, startTransition] = useTransition();

  const result = useMemo(() => calculateBodyFat(inputs), [inputs]);

  const updateDraft = <K extends keyof BodyFatInputs>(key: K, value: BodyFatInputs[K]) => {
    startTransition(() => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    });
  };

  const switchUnits = (units: UnitSystem) => {
    startTransition(() => {
      const base = units === "metric" ? metricDefaults : defaults;
      setDraft((prev) => ({
        ...base,
        sex: prev.sex,
        age: prev.age,
        units,
      }));
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
    const cleared = { ...defaults, sex: defaultSex };
    setDraft(cleared);
    setInputs(cleared);
    setShowResult(false);
  };

  const lengthUnit = draft.units === "metric" ? "cm" : "in";
  const weightUnit = draft.units === "metric" ? "kg" : "lbs";

  return (
    <section
      id="calculator"
      aria-labelledby="calculator-heading"
      className="overflow-hidden rounded-2xl border border-black/15 bg-white text-black shadow-xl shadow-black/10"
    >
      <div className="flex flex-col gap-2 border-b border-black/10 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-black" aria-hidden="true" />
          <p id="calculator-heading" className="text-sm font-medium text-black md:text-base">
            {heading}
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-black/20 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
          Navy + BMI
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-black/10">
        <form onSubmit={onCalculate} className="bg-white px-4 md:px-6">
          <div className="flex gap-2 border-b border-black/10 py-3">
            {(
              [
                ["imperial", "US / Imperial"],
                ["metric", "Metric"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => switchUnits(value)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  draft.units === value
                    ? "bg-black text-white"
                    : "border border-black/15 bg-white text-black hover:bg-black/[0.04]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-b border-black/10 py-3">
            {(
              [
                ["male", "Male"],
                ["female", "Female"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateDraft("sex", value)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  draft.sex === value
                    ? "bg-black text-white"
                    : "border border-black/15 bg-white text-black hover:bg-black/[0.04]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-x-5">
            <Row label="Age" htmlFor="age">
              <input
                id="age"
                type="number"
                min={15}
                max={100}
                inputMode="numeric"
                className={inputClass}
                value={draft.age}
                onChange={(e) => updateDraft("age", Number(e.target.value) || 0)}
              />
            </Row>
            <Row label={`Weight (${weightUnit})`} htmlFor="weight">
              <input
                id="weight"
                type="number"
                min={0}
                step={draft.units === "metric" ? 0.1 : 1}
                inputMode="decimal"
                className={inputClass}
                value={draft.weight}
                onChange={(e) => updateDraft("weight", Number(e.target.value) || 0)}
              />
            </Row>
            <Row
              label={`Height (${lengthUnit})`}
              htmlFor="height"
              hint={draft.units === "imperial" ? "Total inches (e.g. 70 = 5′10″)" : undefined}
            >
              <input
                id="height"
                type="number"
                min={0}
                step={draft.units === "metric" ? 0.5 : 0.25}
                inputMode="decimal"
                className={inputClass}
                value={draft.height}
                onChange={(e) => updateDraft("height", Number(e.target.value) || 0)}
              />
            </Row>
            <Row label={`Neck (${lengthUnit})`} htmlFor="neck" hint="Just below the larynx">
              <input
                id="neck"
                type="number"
                min={0}
                step={0.1}
                inputMode="decimal"
                className={inputClass}
                value={draft.neck}
                onChange={(e) => updateDraft("neck", Number(e.target.value) || 0)}
              />
            </Row>
            <Row
              label={`Waist (${lengthUnit})`}
              htmlFor="waist"
              hint={draft.sex === "male" ? "At navel" : "Narrowest point"}
            >
              <input
                id="waist"
                type="number"
                min={0}
                step={0.1}
                inputMode="decimal"
                className={inputClass}
                value={draft.waist}
                onChange={(e) => updateDraft("waist", Number(e.target.value) || 0)}
              />
            </Row>
            {draft.sex === "female" ? (
              <Row label={`Hip (${lengthUnit})`} htmlFor="hip" hint="Widest point of hips">
                <input
                  id="hip"
                  type="number"
                  min={0}
                  step={0.1}
                  inputMode="decimal"
                  className={inputClass}
                  value={draft.hip}
                  onChange={(e) => updateDraft("hip", Number(e.target.value) || 0)}
                />
              </Row>
            ) : null}
          </div>

          <div className="flex items-center justify-center gap-3 py-4 md:justify-start md:py-5">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-7 py-3 text-sm font-bold text-white transition hover:bg-black/85 active:scale-[0.99] md:px-8 md:text-base"
            >
              Calculate body fat
            </button>
            <button
              type="button"
              onClick={onClear}
              className="rounded-xl border border-black/20 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-black/[0.04] md:text-base"
            >
              Clear
            </button>
          </div>
        </form>

        <div className={`${showResult ? "block" : "hidden lg:block"} border-t border-black/10 bg-white lg:border-t-0`}>
          {showResult ? (
            <ResultPanel result={result} />
          ) : (
            <div className="hidden h-full min-h-[28rem] flex-col items-center justify-center gap-3 p-8 text-center lg:flex">
              <p className="text-lg font-semibold text-black">Your body fat % appears here</p>
              <p className="max-w-sm text-sm leading-relaxed text-black">
                Enter sex, age, weight, height, and tape measurements, then calculate for a U.S. Navy
                estimate plus a BMI-based comparison.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-black/10 bg-white px-4 py-2.5 text-[11px] leading-relaxed text-black md:px-6">
        Educational estimate using the U.S. Navy circumference method and a BMI body-fat formula. Not a
        medical diagnosis — DEXA, Bod Pod, or clinical assessment is more precise.
      </p>
    </section>
  );
}
