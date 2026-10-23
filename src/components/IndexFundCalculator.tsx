"use client";

import { useId, useMemo, useState, type MouseEvent } from "react";
import {
  ContributionFrequency,
  GrowthResult,
  calculateIndexFundGrowth,
  formatMoney,
  formatPercent,
} from "@/lib/indexFundMath";

type ChartPoint = {
  year: number;
  balance: number;
  contributed: number;
  growth: number;
  x: number;
  yBalance: number;
  yContrib: number;
};

type ChartSeries = {
  width: number;
  height: number;
  padT: number;
  plotBottom: number;
  balancePath: string;
  balanceArea: string;
  contribPath: string;
  points: ChartPoint[];
  labelIndexes: number[];
};

const CHART_W = 360;
const CHART_H = 140;
const CHART_PAD_L = 14;
const CHART_PAD_R = 14;
const CHART_PAD_T = 12;
const CHART_PAD_B = 28;

function buildGrowthChart(result: GrowthResult): ChartSeries | null {
  const rows = result.years;
  if (!rows.length) return null;

  const plotW = CHART_W - CHART_PAD_L - CHART_PAD_R;
  const plotH = CHART_H - CHART_PAD_T - CHART_PAD_B;
  const plotBottom = CHART_PAD_T + plotH;

  let cum = 0;
  const data = rows.map((row) => {
    cum += row.contributions;
    return {
      year: row.year,
      balance: row.balance,
      contributed: cum,
      growth: row.balance - cum,
    };
  });

  const maxY = Math.max(...data.map((d) => d.balance), 1);
  const maxX = data.length - 1;

  const xAt = (i: number) =>
    CHART_PAD_L + (maxX === 0 ? plotW / 2 : (i / maxX) * plotW);
  const yAt = (v: number) => CHART_PAD_T + plotH - (Math.max(0, v) / maxY) * plotH;

  const points: ChartPoint[] = data.map((d, i) => ({
    ...d,
    x: xAt(i),
    yBalance: yAt(d.balance),
    yContrib: yAt(d.contributed),
  }));

  const toLine = (getY: (p: ChartPoint) => number) =>
    points
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${getY(p).toFixed(2)}`)
      .join(" ");

  const balancePath = toLine((p) => p.yBalance);
  const contribPath = toLine((p) => p.yContrib);
  const first = points[0];
  const last = points[points.length - 1];
  const balanceArea = `${balancePath} L${last.x.toFixed(2)},${plotBottom.toFixed(2)} L${first.x.toFixed(2)},${plotBottom.toFixed(2)} Z`;

  const lastIdx = points.length - 1;
  const midIdx = Math.floor(lastIdx / 2);
  const labelIndexes =
    points.length === 1
      ? [0]
      : midIdx > 0 && midIdx < lastIdx
        ? [0, midIdx, lastIdx]
        : [0, lastIdx];

  return {
    width: CHART_W,
    height: CHART_H,
    padT: CHART_PAD_T,
    plotBottom,
    balancePath,
    balanceArea,
    contribPath,
    points,
    labelIndexes,
  };
}

function clientToSvgPoint(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM();
  if (!ctm) return { x: 0, y: 0 };
  const pt = svg.createSVGPoint();
  pt.x = clientX;
  pt.y = clientY;
  const local = pt.matrixTransform(ctm.inverse());
  return { x: local.x, y: local.y };
}

function nearestPointIndex(points: ChartPoint[], svgX: number): number {
  if (points.length === 1) return 0;
  // Use Voronoi-style midpoints on the x-axis so each segment maps to the closest year point
  for (let i = 0; i < points.length - 1; i++) {
    const mid = (points[i].x + points[i + 1].x) / 2;
    if (svgX < mid) return i;
  }
  return points.length - 1;
}

function GrowthChart({ result }: { result: GrowthResult }) {
  const gradId = useId().replace(/:/g, "");
  const chart = useMemo(() => buildGrowthChart(result), [result]);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (!chart) return null;

  const active = hoverIdx !== null ? chart.points[hoverIdx] : null;

  const onMove = (event: MouseEvent<SVGSVGElement>) => {
    const { x } = clientToSvgPoint(event.currentTarget, event.clientX, event.clientY);
    setHoverIdx(nearestPointIndex(chart.points, x));
  };

  const labelAnchor = (idxInLabels: number, total: number) => {
    if (total === 1) return "middle" as const;
    if (idxInLabels === 0) return "start" as const;
    if (idxInLabels === total - 1) return "end" as const;
    return "middle" as const;
  };

  const display = active ?? chart.points[chart.points.length - 1];

  return (
    <div className="mt-4 mb-1">
      <svg
        viewBox={`0 0 ${chart.width} ${chart.height}`}
        className="h-[140px] w-full cursor-crosshair touch-pan-y"
        role="img"
        aria-label={`Growth chart ending at ${formatMoney(result.finalBalance)}. Hover to update yearly stats below.`}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#12A876" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#12A876" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <line
          x1={CHART_PAD_L}
          y1={chart.plotBottom}
          x2={chart.width - CHART_PAD_R}
          y2={chart.plotBottom}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />

        <path d={chart.balanceArea} fill={`url(#${gradId})`} />
        <path
          d={chart.contribPath}
          fill="none"
          stroke="#E0A030"
          strokeWidth="1.75"
          strokeDasharray="4 3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={chart.balancePath}
          fill="none"
          stroke="#3ECF98"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {active && (
          <>
            <line
              x1={active.x}
              y1={CHART_PAD_T}
              x2={active.x}
              y2={chart.plotBottom}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={active.x} cy={active.yBalance} r="4" fill="#3ECF98" stroke="#030A08" strokeWidth="2" />
            <circle cx={active.x} cy={active.yContrib} r="3.5" fill="#E0A030" stroke="#030A08" strokeWidth="2" />
          </>
        )}

        {chart.labelIndexes.map((i, idx) => {
          const p = chart.points[i];
          const anchor = labelAnchor(idx, chart.labelIndexes.length);
          return (
            <text
              key={`label-${p.year}`}
              x={p.x}
              y={CHART_H - 8}
              textAnchor={anchor}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
            >
              {`Yr ${p.year}`}
            </text>
          );
        })}
      </svg>

      <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2.5">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-semibold text-white">
            {active ? `Year ${display.year}` : `Year ${display.year} (end)`}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-white/50">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-3 rounded bg-[#3ECF98]" aria-hidden="true" />
              Balance
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="inline-block h-0 w-3 border-t border-dashed border-[#E0A030]"
                aria-hidden="true"
              />
              Contributions
            </span>
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-2 text-center sm:text-left">
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-white/45">Balance</dt>
            <dd className="mt-0.5 text-sm font-semibold text-[#3ECF98]">
              {formatMoney(display.balance)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-white/45">Contributed</dt>
            <dd className="mt-0.5 text-sm font-semibold text-white">
              {formatMoney(display.contributed)}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-wide text-white/45">Growth</dt>
            <dd className="mt-0.5 text-sm font-semibold text-gold">
              {formatMoney(display.growth)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

type IndexFundCalculatorProps = {
  title?: string;
  subtitle?: string;
  titleAs?: "h1" | "h2";
  framed?: boolean;
  showHeader?: boolean;
  showYearTable?: boolean;
  defaultInitial?: string;
  defaultContribution?: string;
  defaultYears?: string;
  defaultReturn?: string;
  defaultExpense?: string;
  defaultFrequency?: ContributionFrequency;
  /** Hide expense ratio field (e.g. pure compound interest page). */
  hideExpense?: boolean;
};

function parsePositive(raw: string): number | null {
  const n = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(n) || n < 0) return null;
  return n;
}

export default function IndexFundCalculator({
  title = "Index fund calculator",
  subtitle = "Enter your starting balance, contributions, years, expected return, and expense ratio to project growth.",
  titleAs = "h2",
  framed = false,
  showHeader = false,
  showYearTable = true,
  defaultInitial = "10000",
  defaultContribution = "500",
  defaultYears = "20",
  defaultReturn = "8",
  defaultExpense = "0.05",
  defaultFrequency = "monthly",
  hideExpense = false,
}: IndexFundCalculatorProps) {
  const formId = useId();
  const [initial, setInitial] = useState(defaultInitial);
  const [contribution, setContribution] = useState(defaultContribution);
  const [years, setYears] = useState(defaultYears);
  const [expectedReturn, setExpectedReturn] = useState(defaultReturn);
  const [expense, setExpense] = useState(defaultExpense);
  const [frequency, setFrequency] = useState<ContributionFrequency>(defaultFrequency);
  const [tableOpen, setTableOpen] = useState(false);

  const TitleTag = titleAs;

  const result = useMemo(() => {
    const i = parsePositive(initial);
    const c = parsePositive(contribution);
    const y = parsePositive(years);
    const r = Number(expectedReturn);
    const e = hideExpense ? 0 : Number(expense);
    if (i === null || c === null || y === null || !Number.isFinite(r) || !Number.isFinite(e)) {
      return null;
    }
    if (y < 1 || y > 80) return null;
    return calculateIndexFundGrowth({
      initial: i,
      contribution: c,
      years: y,
      expectedReturnPct: r,
      expenseRatioPct: e,
      frequency,
    });
  }, [initial, contribution, years, expectedReturn, expense, frequency, hideExpense]);

  const shellClass = framed
    ? "overflow-hidden rounded-2xl border border-white/10 bg-brand-soft/90 shadow-[0_24px_60px_-28px_rgba(18,168,118,0.35)]"
    : "";

  const fieldClass =
    "w-full rounded-xl border border-white/15 bg-[#0a1814] px-3 py-2.5 text-white outline-none transition placeholder:text-white/35 focus:border-violet/60 focus:bg-[#0c1e19] focus:ring-2 focus:ring-violet/30";
  const labelClass = "mb-1.5 block text-sm font-medium text-white/80";

  return (
    <div className={shellClass}>
      {showHeader && (
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <TitleTag className="font-display text-xl font-bold text-white sm:text-2xl">
            {title}
          </TitleTag>
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
        </div>
      )}

      <div className="flex w-full flex-col gap-4">
        <div className="grid w-full grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-5">
          <form
            className="flex h-full flex-col space-y-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5"
            onSubmit={(e) => e.preventDefault()}
            aria-labelledby={`${formId}-heading`}
          >
            <h2 id={`${formId}-heading`} className="sr-only">
              {title} inputs
            </h2>

            <div>
              <label htmlFor={`${formId}-initial`} className={labelClass}>
                Initial investment ($)
              </label>
              <input
                id={`${formId}-initial`}
                type="number"
                min={0}
                step={100}
                inputMode="decimal"
                value={initial}
                onChange={(e) => setInitial(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor={`${formId}-contrib`} className={labelClass}>
                Contribution ($)
              </label>
              <input
                id={`${formId}-contrib`}
                type="number"
                min={0}
                step={50}
                inputMode="decimal"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <span className={labelClass}>Contribution frequency</span>
              <div className="flex gap-2" role="group" aria-label="Contribution frequency">
                {(["monthly", "yearly"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFrequency(f)}
                    className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-semibold capitalize transition ${
                      frequency === f
                        ? "bg-gradient-to-r from-violet to-teal text-white"
                        : "border border-white/15 text-white/80 hover:border-white/30"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              <div>
                <label htmlFor={`${formId}-years`} className={labelClass}>
                  Years
                </label>
                <input
                  id={`${formId}-years`}
                  type="number"
                  min={1}
                  max={80}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-return`} className={labelClass}>
                  Expected return (%)
                </label>
                <input
                  id={`${formId}-return`}
                  type="number"
                  min={-20}
                  max={30}
                  step={0.1}
                  value={expectedReturn}
                  onChange={(e) => setExpectedReturn(e.target.value)}
                  className={fieldClass}
                />
              </div>
            </div>

            {!hideExpense && (
              <div>
                <label htmlFor={`${formId}-expense`} className={labelClass}>
                  Expense ratio (%)
                </label>
                <input
                  id={`${formId}-expense`}
                  type="number"
                  min={0}
                  max={5}
                  step={0.01}
                  value={expense}
                  onChange={(e) => setExpense(e.target.value)}
                  className={fieldClass}
                />
                <p className="mt-1.5 text-xs text-white/50">
                  Typical broad-market index funds: ~0.03%–0.20%. Higher fees compound against you.
                </p>
              </div>
            )}
          </form>

          <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-4 sm:p-5">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-violet-soft">
              Projected results
            </p>
            {result ? (
              <>
                <p className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {formatMoney(result.finalBalance)}
                </p>
                <p className="mt-1 text-sm text-white/60">Estimated ending balance</p>

                <GrowthChart result={result} />

                <dl className="mt-auto grid grid-cols-1 gap-4 pt-4 min-[420px]:grid-cols-2">
                  <div className="border-t border-white/10 pt-3">
                    <dt className="text-xs uppercase tracking-wide text-white/50">
                      Total contributed
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-white">
                      {formatMoney(result.totalContributed)}
                    </dd>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <dt className="text-xs uppercase tracking-wide text-white/50">
                      Investment growth
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-teal">
                      {formatMoney(result.totalGrowth)}
                    </dd>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <dt className="text-xs uppercase tracking-wide text-white/50">
                      Effective net return
                    </dt>
                    <dd className="mt-1 text-lg font-semibold text-white">
                      {formatPercent(result.effectiveAnnualReturn)}
                    </dd>
                  </div>
                  {!hideExpense && (
                    <div className="border-t border-white/10 pt-3">
                      <dt className="text-xs uppercase tracking-wide text-white/50">
                        Fee drag vs 0% ER
                      </dt>
                      <dd className="mt-1 text-lg font-semibold text-gold">
                        {formatMoney(result.totalFeesDrag)}
                      </dd>
                    </div>
                  )}
                </dl>
              </>
            ) : (
              <p className="text-white/70">Enter valid numbers to see your projection.</p>
            )}
          </div>
        </div>

        {showYearTable && result && result.years.length > 0 && (
          <div className="w-full rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => setTableOpen((open) => !open)}
              aria-expanded={tableOpen}
              aria-controls={`${formId}-year-table`}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/[0.04]"
            >
              <span className="text-sm font-semibold text-white">
                Year-by-year breakdown
                <span className="ml-2 font-normal text-white/50">
                  ({result.years.length} years)
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-violet-soft">
                {tableOpen ? "Minimize" : "Expand"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 transition-transform ${tableOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {tableOpen && (
              <div id={`${formId}-year-table`} className="overflow-x-auto border-t border-white/10">
                <table className="w-full min-w-[420px] text-left text-sm">
                  <caption className="sr-only">Year-by-year index fund balance</caption>
                  <thead className="bg-white/[0.06] text-xs uppercase tracking-wide text-white/60">
                    <tr>
                      <th scope="col" className="px-3 py-2.5 font-medium">
                        Year
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-medium">
                        Added
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-medium">
                        Growth
                      </th>
                      <th scope="col" className="px-3 py-2.5 font-medium">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.years.map((row) => (
                      <tr key={row.year} className="border-t border-white/10 text-white/80">
                        <td className="px-3 py-2">{row.year}</td>
                        <td className="px-3 py-2">{formatMoney(row.contributions)}</td>
                        <td className="px-3 py-2 text-teal">{formatMoney(row.interestEarned)}</td>
                        <td className="px-3 py-2 font-medium text-white">
                          {formatMoney(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
