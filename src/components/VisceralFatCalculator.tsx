"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  Sex,
  UnitSystem,
  VisceralInputs,
  calculateVisceralRisk,
} from "@/lib/bodyFatMath";

const defaults: VisceralInputs = {
  sex: "male",
  units: "imperial",
  waist: 34,
  height: 70,
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-black/15 bg-white px-3 py-2.5 text-right text-[15px] text-black outline-none transition focus:border-black focus:ring-1 focus:ring-black md:py-3";

function riskColor(risk: string): string {
  if (risk === "Low") return "#0a7a5c";
  if (risk === "Increased") return "#b45309";
  return "#b91c1c";
}

export default function VisceralFatCalculator() {
  const [draft, setDraft] = useState<VisceralInputs>(defaults);
  const [inputs, setInputs] = useState<VisceralInputs>(defaults);
  const [showResult, setShowResult] = useState(false);
  const [, startTransition] = useTransition();

  const result = useMemo(() => calculateVisceralRisk(inputs), [inputs]);

  const updateDraft = <K extends keyof VisceralInputs>(key: K, value: VisceralInputs[K]) => {
    startTransition(() => {
      setDraft((prev) => ({ ...prev, [key]: value }));
    });
  };

  const onCalculate = (e?: FormEvent) => {
    e?.preventDefault();
    setInputs(draft);
    setShowResult(true);
  };

  const lengthUnit = draft.units === "metric" ? "cm" : "in";

  return (
    <section
      id="calculator"
      aria-labelledby="visceral-calculator-heading"
      className="overflow-hidden rounded-2xl border border-black/15 bg-white text-black shadow-xl shadow-black/10"
    >
      <div className="flex flex-col gap-2 border-b border-black/10 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-black" aria-hidden="true" />
          <p id="visceral-calculator-heading" className="text-sm font-medium text-black md:text-base">
            Visceral fat risk estimator
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-black/20 bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-black">
          Waist + WHtR
        </span>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:divide-x lg:divide-black/10">
        <form onSubmit={onCalculate} className="space-y-1 bg-white px-4 md:px-6">
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
                onClick={() => updateDraft("units", value as UnitSystem)}
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
                onClick={() => updateDraft("sex", value as Sex)}
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

          <div className="grid grid-cols-[1.2fr_1fr] items-center gap-3 border-b border-black/10 py-3">
            <label htmlFor="v-waist" className="text-sm text-black">
              Waist ({lengthUnit})
            </label>
            <input
              id="v-waist"
              type="number"
              min={0}
              step={0.1}
              className={inputClass}
              value={draft.waist}
              onChange={(e) => updateDraft("waist", Number(e.target.value) || 0)}
            />
          </div>
          <div className="grid grid-cols-[1.2fr_1fr] items-center gap-3 py-3">
            <label htmlFor="v-height" className="text-sm text-black">
              Height ({lengthUnit})
            </label>
            <input
              id="v-height"
              type="number"
              min={0}
              step={0.1}
              className={inputClass}
              value={draft.height}
              onChange={(e) => updateDraft("height", Number(e.target.value) || 0)}
            />
          </div>

          <div className="py-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-black px-7 py-3 text-sm font-bold text-white transition hover:bg-black/85"
            >
              Estimate risk
            </button>
          </div>
        </form>

        <div className={`${showResult ? "block" : "hidden lg:block"} border-t border-black/10 bg-white p-5 lg:border-t-0`}>
          {showResult && result ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-black/15 bg-white p-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black">
                  Visceral fat risk
                </p>
                <p className="mt-2 text-3xl font-bold" style={{ color: riskColor(result.risk) }}>
                  {result.risk}
                </p>
                <p className="mt-2 text-sm text-black">
                  Waist-to-height ratio: {result.whtr.toFixed(2)}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-black">{result.guidance}</p>
              <ul className="space-y-2 text-sm text-black">
                <li>Waist: {result.waistCm.toFixed(1)} cm</li>
                <li>Height: {result.heightCm.toFixed(1)} cm</li>
              </ul>
            </div>
          ) : (
            <div className="hidden min-h-[16rem] flex-col items-center justify-center gap-2 text-center lg:flex">
              <p className="text-lg font-semibold text-black">Risk level appears here</p>
              <p className="max-w-sm text-sm text-black">
                Enter waist and height to estimate abdominal fat risk from common clinical cutoffs.
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="border-t border-black/10 bg-white px-4 py-2.5 text-[11px] leading-relaxed text-black md:px-6">
        Screening estimate only (waist circumference and waist-to-height ratio). It does not measure
        visceral fat volume like imaging studies.
      </p>
    </section>
  );
}
