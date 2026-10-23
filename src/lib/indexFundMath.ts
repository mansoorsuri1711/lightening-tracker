export type ContributionFrequency = "monthly" | "yearly";

export type YearRow = {
  year: number;
  contributions: number;
  balance: number;
  interestEarned: number;
  feesDrag: number;
};

export type GrowthResult = {
  finalBalance: number;
  totalContributed: number;
  totalGrowth: number;
  totalFeesDrag: number;
  effectiveAnnualReturn: number;
  years: YearRow[];
};

export function formatMoney(n: number, currency = "USD"): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatMoneyExact(n: number, currency = "USD"): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatPercent(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(digits)}%`;
}

/**
 * Project index fund growth with optional contributions and expense-ratio drag.
 * Net annual return ≈ expectedReturn% − expenseRatio%.
 * Contributions are applied at the start of each period (common planning default).
 */
export function calculateIndexFundGrowth(input: {
  initial: number;
  contribution: number;
  years: number;
  expectedReturnPct: number;
  expenseRatioPct?: number;
  frequency?: ContributionFrequency;
}): GrowthResult | null {
  const {
    initial,
    contribution,
    years,
    expectedReturnPct,
    expenseRatioPct = 0,
    frequency = "monthly",
  } = input;

  if (
    ![initial, contribution, years, expectedReturnPct, expenseRatioPct].every((v) =>
      Number.isFinite(v)
    )
  ) {
    return null;
  }
  if (initial < 0 || contribution < 0 || years <= 0 || years > 100) return null;

  const netAnnual = (expectedReturnPct - expenseRatioPct) / 100;
  const grossAnnual = expectedReturnPct / 100;
  const periodsPerYear = frequency === "monthly" ? 12 : 1;
  const totalPeriods = Math.round(years * periodsPerYear);
  const rNet = netAnnual / periodsPerYear;
  const rGross = grossAnnual / periodsPerYear;

  let balanceNet = initial;
  let balanceGross = initial;
  let totalContributed = initial;
  const yearRows: YearRow[] = [];

  let contribThisYear = 0;
  let interestThisYear = 0;
  let feesThisYear = 0;
  let year = 1;

  for (let p = 1; p <= totalPeriods; p++) {
    if (contribution > 0) {
      balanceNet += contribution;
      balanceGross += contribution;
      totalContributed += contribution;
      contribThisYear += contribution;
    }

    const beforeNet = balanceNet;
    const beforeGross = balanceGross;
    balanceNet *= 1 + rNet;
    balanceGross *= 1 + rGross;
    interestThisYear += balanceNet - beforeNet;
    feesThisYear += balanceGross - beforeGross - (balanceNet - beforeNet);

    if (p % periodsPerYear === 0 || p === totalPeriods) {
      yearRows.push({
        year,
        contributions: contribThisYear + (year === 1 ? initial : 0),
        balance: balanceNet,
        interestEarned: interestThisYear,
        feesDrag: Math.max(0, feesThisYear),
      });
      year += 1;
      contribThisYear = 0;
      interestThisYear = 0;
      feesThisYear = 0;
    }
  }

  const totalFeesDrag = Math.max(0, balanceGross - balanceNet);
  const totalGrowth = balanceNet - totalContributed;

  return {
    finalBalance: balanceNet,
    totalContributed,
    totalGrowth,
    totalFeesDrag,
    effectiveAnnualReturn: (expectedReturnPct - expenseRatioPct),
    years: yearRows,
  };
}

/** Compare two expense ratios on the same contribution plan. */
export function compareExpenseRatios(input: {
  initial: number;
  contribution: number;
  years: number;
  expectedReturnPct: number;
  lowExpensePct: number;
  highExpensePct: number;
  frequency?: ContributionFrequency;
}): { low: GrowthResult; high: GrowthResult; difference: number } | null {
  const low = calculateIndexFundGrowth({
    ...input,
    expenseRatioPct: input.lowExpensePct,
  });
  const high = calculateIndexFundGrowth({
    ...input,
    expenseRatioPct: input.highExpensePct,
  });
  if (!low || !high) return null;
  return { low, high, difference: low.finalBalance - high.finalBalance };
}
