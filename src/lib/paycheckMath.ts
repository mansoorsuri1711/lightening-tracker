/** 2026 IRS / SSA figures used for educational Florida paycheck estimates. */

export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";
export type FilingStatus = "single" | "married_joint" | "married_separate" | "head_of_household";
export type PayType = "salary" | "hourly";

export type PaycheckInputs = {
  payType: PayType;
  annualSalary: number;
  hourlyRate: number;
  hoursPerWeek: number;
  payFrequency: PayFrequency;
  filingStatus: FilingStatus;
  pretaxDeductionPerPaycheck: number;
  posttaxDeductionPerPaycheck: number;
  extraWithholding: number;
  dependentsCredit: number;
};

export type PaycheckResult = {
  grossPerPaycheck: number;
  annualGross: number;
  pretaxDeduction: number;
  taxableWagesFederal: number;
  federalIncomeTax: number;
  socialSecurity: number;
  medicare: number;
  additionalMedicare: number;
  ficaTotal: number;
  floridaStateTax: number;
  posttaxDeduction: number;
  extraWithholding: number;
  totalTaxes: number;
  totalDeductions: number;
  netPay: number;
  annualNet: number;
  effectiveTaxRate: number;
  takeHomePercent: number;
  periodsPerYear: number;
  breakdown: Array<{ label: string; amount: number; color: string }>;
};

export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  weekly: "Weekly",
  biweekly: "Biweekly",
  semimonthly: "Semi-monthly",
  monthly: "Monthly",
};

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  married_joint: "Married filing jointly",
  married_separate: "Married filing separately",
  head_of_household: "Head of household",
};

export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

/** Employee OASDI rate and 2026 taxable maximum (SSA). */
export const SS_RATE = 0.062;
export const SS_WAGE_BASE_2026 = 184_500;
export const MEDICARE_RATE = 0.0145;
export const ADDITIONAL_MEDICARE_RATE = 0.009;

const ADDITIONAL_MEDICARE_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  married_separate: 125_000,
  married_joint: 250_000,
  head_of_household: 200_000,
};

/** 2026 standard deductions (Tax Foundation / IRS inflation adjustments). */
const STANDARD_DEDUCTION_2026: Record<FilingStatus, number> = {
  single: 16_100,
  married_separate: 16_100,
  married_joint: 32_200,
  head_of_household: 24_150,
};

/** 2026 ordinary income brackets — upper bound of each tier (Tax Foundation). */
const BRACKETS_2026: Record<FilingStatus, Array<{ upTo: number; rate: number }>> = {
  single: [
    { upTo: 12_400, rate: 0.1 },
    { upTo: 50_400, rate: 0.12 },
    { upTo: 105_700, rate: 0.22 },
    { upTo: 201_775, rate: 0.24 },
    { upTo: 256_225, rate: 0.32 },
    { upTo: 640_600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married_separate: [
    { upTo: 12_400, rate: 0.1 },
    { upTo: 50_400, rate: 0.12 },
    { upTo: 105_700, rate: 0.22 },
    { upTo: 201_775, rate: 0.24 },
    { upTo: 256_225, rate: 0.32 },
    { upTo: 384_350, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  married_joint: [
    { upTo: 24_800, rate: 0.1 },
    { upTo: 100_800, rate: 0.12 },
    { upTo: 211_400, rate: 0.22 },
    { upTo: 403_550, rate: 0.24 },
    { upTo: 512_450, rate: 0.32 },
    { upTo: 768_700, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
  head_of_household: [
    { upTo: 17_700, rate: 0.1 },
    { upTo: 67_450, rate: 0.12 },
    { upTo: 105_700, rate: 0.22 },
    { upTo: 201_775, rate: 0.24 },
    { upTo: 256_200, rate: 0.32 },
    { upTo: 640_600, rate: 0.35 },
    { upTo: Infinity, rate: 0.37 },
  ],
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function roundMoney(n: number) {
  return Math.round(n * 100) / 100;
}

export function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

export function formatPercent(n: number, digits = 1): string {
  return `${n.toFixed(digits)}%`;
}

function annualFederalTax(taxableIncome: number, status: FilingStatus): number {
  const brackets = BRACKETS_2026[status];
  let tax = 0;
  let prev = 0;
  const income = Math.max(0, taxableIncome);

  for (const { upTo, rate } of brackets) {
    const slice = Math.min(income, upTo) - prev;
    if (slice <= 0) break;
    tax += slice * rate;
    prev = upTo;
    if (income <= upTo) break;
  }

  return tax;
}

export function projectFloridaPaycheck(inputs: PaycheckInputs): PaycheckResult {
  const periods = PERIODS_PER_YEAR[inputs.payFrequency];

  const annualGross =
    inputs.payType === "hourly"
      ? clamp(inputs.hourlyRate, 0, 1_000_000) * clamp(inputs.hoursPerWeek, 0, 168) * 52
      : clamp(inputs.annualSalary, 0, 50_000_000);

  const grossPerPaycheck = annualGross / periods;
  const pretax = clamp(inputs.pretaxDeductionPerPaycheck, 0, grossPerPaycheck);
  const posttax = clamp(inputs.posttaxDeductionPerPaycheck, 0, grossPerPaycheck);
  const extra = clamp(inputs.extraWithholding, 0, grossPerPaycheck);
  const dependentAnnualCredit = clamp(inputs.dependentsCredit, 0, 50_000);

  const annualPretax = pretax * periods;
  const ficaWagesAnnual = Math.max(0, annualGross - annualPretax);

  const socialSecurityAnnual = Math.min(ficaWagesAnnual, SS_WAGE_BASE_2026) * SS_RATE;
  const medicareAnnual = ficaWagesAnnual * MEDICARE_RATE;
  const addlThreshold = ADDITIONAL_MEDICARE_THRESHOLD[inputs.filingStatus];
  const additionalMedicareAnnual =
    Math.max(0, ficaWagesAnnual - addlThreshold) * ADDITIONAL_MEDICARE_RATE;

  const socialSecurity = socialSecurityAnnual / periods;
  const medicare = medicareAnnual / periods;
  const additionalMedicare = additionalMedicareAnnual / periods;
  const ficaTotal = socialSecurity + medicare + additionalMedicare;

  const annualTaxableBeforeStd = Math.max(0, annualGross - annualPretax);
  const taxableIncome = Math.max(
    0,
    annualTaxableBeforeStd - STANDARD_DEDUCTION_2026[inputs.filingStatus]
  );
  const annualFederal = Math.max(0, annualFederalTax(taxableIncome, inputs.filingStatus) - dependentAnnualCredit);
  const federalIncomeTax = annualFederal / periods + extra;

  const floridaStateTax = 0;

  const totalTaxes = federalIncomeTax + ficaTotal + floridaStateTax;
  const totalDeductions = pretax + posttax + totalTaxes;
  const netPay = Math.max(0, grossPerPaycheck - totalDeductions);
  const annualNet = netPay * periods;
  const effectiveTaxRate = annualGross > 0 ? (totalTaxes * periods * 100) / annualGross : 0;
  const takeHomePercent = annualGross > 0 ? (annualNet * 100) / annualGross : 0;

  const result: PaycheckResult = {
    grossPerPaycheck: roundMoney(grossPerPaycheck),
    annualGross: roundMoney(annualGross),
    pretaxDeduction: roundMoney(pretax),
    taxableWagesFederal: roundMoney(annualTaxableBeforeStd / periods),
    federalIncomeTax: roundMoney(federalIncomeTax),
    socialSecurity: roundMoney(socialSecurity),
    medicare: roundMoney(medicare),
    additionalMedicare: roundMoney(additionalMedicare),
    ficaTotal: roundMoney(ficaTotal),
    floridaStateTax: 0,
    posttaxDeduction: roundMoney(posttax),
    extraWithholding: roundMoney(extra),
    totalTaxes: roundMoney(totalTaxes),
    totalDeductions: roundMoney(totalDeductions),
    netPay: roundMoney(netPay),
    annualNet: roundMoney(annualNet),
    effectiveTaxRate: roundMoney(effectiveTaxRate),
    takeHomePercent: roundMoney(takeHomePercent),
    periodsPerYear: periods,
    breakdown: [],
  };

  result.breakdown = [
    { label: "Take-home", amount: result.netPay, color: "#2EC4B6" },
    { label: "Federal tax", amount: result.federalIncomeTax, color: "#F08020" },
    { label: "Social Security", amount: result.socialSecurity, color: "#38BDF8" },
    { label: "Medicare", amount: result.medicare + result.additionalMedicare, color: "#A78BFA" },
    { label: "FL state tax", amount: 0, color: "#94A3B8" },
    {
      label: "Deductions",
      amount: result.pretaxDeduction + result.posttaxDeduction,
      color: "#64748B",
    },
  ].filter((row) => row.amount > 0 || row.label === "FL state tax");

  return result;
}
