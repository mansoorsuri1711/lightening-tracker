export type OddsFormat = "american" | "decimal" | "fractional";

export function americanToDecimal(american: number): number {
  if (!Number.isFinite(american) || american === 0) return NaN;
  if (american > 0) return american / 100 + 1;
  return 100 / Math.abs(american) + 1;
}

export function decimalToAmerican(decimal: number): number {
  if (!Number.isFinite(decimal) || decimal <= 1) return NaN;
  if (decimal >= 2) return Math.round((decimal - 1) * 100);
  return Math.round(-100 / (decimal - 1));
}

export function decimalToFractional(decimal: number): { num: number; den: number } {
  if (!Number.isFinite(decimal) || decimal <= 1) return { num: 0, den: 1 };
  const profit = decimal - 1;
  // Approximate as a reduced fraction with small denominator
  let best = { num: Math.round(profit * 100), den: 100, err: Infinity };
  for (let den = 1; den <= 100; den++) {
    const num = Math.round(profit * den);
    const err = Math.abs(profit - num / den);
    if (err < best.err) best = { num, den, err };
  }
  const g = gcd(Math.abs(best.num), best.den);
  return { num: best.num / g, den: best.den / g };
}

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function fractionalToDecimal(num: number, den: number): number {
  if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return NaN;
  return num / den + 1;
}

/** Parse a single odds string into decimal odds. */
export function parseOddsToDecimal(raw: string, format: OddsFormat): number | null {
  const cleaned = raw.trim().replace(/,/g, "");
  if (!cleaned) return null;

  if (format === "american") {
    const n = Number(cleaned.replace(/^\+/, ""));
    if (!Number.isFinite(n) || n === 0) return null;
    const d = americanToDecimal(n);
    return Number.isFinite(d) && d > 1 ? d : null;
  }

  if (format === "decimal") {
    const n = Number(cleaned);
    if (!Number.isFinite(n) || n <= 1) return null;
    return n;
  }

  // fractional: "5/2" or "5-2"
  const m = cleaned.match(/^(-?\d+(?:\.\d+)?)\s*[\/\-]\s*(-?\d+(?:\.\d+)?)$/);
  if (!m) return null;
  const num = Number(m[1]);
  const den = Number(m[2]);
  const d = fractionalToDecimal(num, den);
  return Number.isFinite(d) && d > 1 ? d : null;
}

export function formatAmerican(american: number): string {
  if (!Number.isFinite(american)) return "—";
  return american > 0 ? `+${american}` : `${american}`;
}

export function formatMoney(n: number, currency = "USD"): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(n);
}

export type ParlayResult = {
  combinedDecimal: number;
  combinedAmerican: number;
  payout: number;
  profit: number;
  impliedProbability: number;
};

export function calculateParlay(stake: number, decimalOdds: number[]): ParlayResult | null {
  if (!Number.isFinite(stake) || stake <= 0) return null;
  if (!decimalOdds.length || decimalOdds.some((d) => !Number.isFinite(d) || d <= 1)) return null;
  const combinedDecimal = decimalOdds.reduce((acc, d) => acc * d, 1);
  const payout = stake * combinedDecimal;
  const profit = payout - stake;
  const impliedProbability = 1 / combinedDecimal;
  return {
    combinedDecimal,
    combinedAmerican: decimalToAmerican(combinedDecimal),
    payout,
    profit,
    impliedProbability,
  };
}

/** All combinations of length k from items. */
export function combinations<T>(items: T[], k: number): T[][] {
  if (k <= 0 || k > items.length) return [];
  const out: T[][] = [];
  const walk = (start: number, path: T[]) => {
    if (path.length === k) {
      out.push([...path]);
      return;
    }
    for (let i = start; i < items.length; i++) {
      path.push(items[i]);
      walk(i + 1, path);
      path.pop();
    }
  };
  walk(0, []);
  return out;
}

export type RoundRobinResult = {
  ticketCount: number;
  totalStake: number;
  maxPayout: number;
  maxProfit: number;
  tickets: Array<{ legs: number[]; decimal: number; payout: number }>;
};

/** Round robin: every combination of `groupSize` legs from the list. */
export function calculateRoundRobin(
  stakePerTicket: number,
  decimalOdds: number[],
  groupSize: number
): RoundRobinResult | null {
  if (!Number.isFinite(stakePerTicket) || stakePerTicket <= 0) return null;
  if (groupSize < 2 || groupSize > decimalOdds.length) return null;
  const combos = combinations(
    decimalOdds.map((d, i) => ({ d, i })),
    groupSize
  );
  if (!combos.length) return null;

  const tickets = combos.map((combo) => {
    const decimal = combo.reduce((acc, x) => acc * x.d, 1);
    return {
      legs: combo.map((x) => x.i + 1),
      decimal,
      payout: stakePerTicket * decimal,
    };
  });

  const totalStake = stakePerTicket * tickets.length;
  const maxPayout = tickets.reduce((s, t) => s + t.payout, 0);
  return {
    ticketCount: tickets.length,
    totalStake,
    maxPayout,
    maxProfit: maxPayout - totalStake,
    tickets,
  };
}
