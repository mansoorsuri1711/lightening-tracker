/** U.S. Navy circumference method + BMI body-fat estimate (educational). */

export type Sex = "male" | "female";
export type UnitSystem = "imperial" | "metric";

export type BodyFatInputs = {
  sex: Sex;
  units: UnitSystem;
  age: number;
  weight: number;
  height: number;
  neck: number;
  waist: number;
  hip: number;
};

export type BodyFatCategory =
  | "Essential fat"
  | "Athletes"
  | "Fitness"
  | "Average"
  | "Obese"
  | "Below essential";

export type BodyFatResult = {
  navyPercent: number | null;
  bmiPercent: number | null;
  bmi: number | null;
  category: BodyFatCategory | null;
  fatMass: number | null;
  leanMass: number | null;
  idealPercent: number | null;
  fatToLoseForIdeal: number | null;
  weightUnit: "lbs" | "kg";
  error: string | null;
};

export type VisceralInputs = {
  sex: Sex;
  units: UnitSystem;
  waist: number;
  height: number;
};

export type VisceralRisk = "Low" | "Increased" | "High";

export type VisceralResult = {
  waistCm: number;
  heightCm: number;
  whtr: number;
  risk: VisceralRisk;
  guidance: string;
};

const CATEGORY_RANGES: Record<
  Sex,
  Array<{ label: BodyFatCategory; min: number; max: number }>
> = {
  male: [
    { label: "Essential fat", min: 2, max: 5 },
    { label: "Athletes", min: 6, max: 13 },
    { label: "Fitness", min: 14, max: 17 },
    { label: "Average", min: 18, max: 24 },
    { label: "Obese", min: 25, max: 100 },
  ],
  female: [
    { label: "Essential fat", min: 10, max: 13 },
    { label: "Athletes", min: 14, max: 20 },
    { label: "Fitness", min: 21, max: 24 },
    { label: "Average", min: 25, max: 31 },
    { label: "Obese", min: 32, max: 100 },
  ],
};

/** Jackson & Pollock ideal body-fat targets by age band (approximate). */
function idealBodyFat(sex: Sex, age: number): number {
  const bands =
    sex === "male"
      ? [
          { maxAge: 20, value: 8.5 },
          { maxAge: 25, value: 10.5 },
          { maxAge: 30, value: 12.7 },
          { maxAge: 35, value: 13.7 },
          { maxAge: 40, value: 15.3 },
          { maxAge: 45, value: 16.4 },
          { maxAge: 50, value: 18.9 },
          { maxAge: 55, value: 20.9 },
          { maxAge: 200, value: 21.8 },
        ]
      : [
          { maxAge: 20, value: 17.7 },
          { maxAge: 25, value: 18.4 },
          { maxAge: 30, value: 19.3 },
          { maxAge: 35, value: 21.5 },
          { maxAge: 40, value: 22.2 },
          { maxAge: 45, value: 22.9 },
          { maxAge: 50, value: 25.2 },
          { maxAge: 55, value: 26.3 },
          { maxAge: 200, value: 27.1 },
        ];
  return bands.find((b) => age <= b.maxAge)?.value ?? bands[bands.length - 1].value;
}

function toInches(value: number, units: UnitSystem): number {
  return units === "metric" ? value / 2.54 : value;
}

function toCm(value: number, units: UnitSystem): number {
  return units === "metric" ? value : value * 2.54;
}

function toKg(weight: number, units: UnitSystem): number {
  return units === "metric" ? weight : weight * 0.45359237;
}

function log10(n: number): number {
  return Math.log(n) / Math.LN10;
}

export function categorizeBodyFat(sex: Sex, percent: number): BodyFatCategory {
  const essentialMin = sex === "male" ? 2 : 10;
  if (percent < essentialMin) return "Below essential";
  const ranges = CATEGORY_RANGES[sex];
  for (const range of ranges) {
    if (percent >= range.min && percent <= range.max) return range.label;
  }
  return "Obese";
}

export function getCategoryChart(sex: Sex) {
  return CATEGORY_RANGES[sex];
}

export function calculateBmi(weightKg: number, heightCm: number): number | null {
  if (weightKg <= 0 || heightCm <= 0) return null;
  const meters = heightCm / 100;
  return weightKg / (meters * meters);
}

/** Deurenberg-style BMI body-fat estimate used by many web calculators. */
export function estimateBodyFatFromBmi(sex: Sex, bmi: number, age: number): number {
  const sexFactor = sex === "male" ? 1 : 0;
  return 1.2 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
}

export function calculateNavyBodyFatPercent(inputs: BodyFatInputs): number | null {
  const heightIn = toInches(inputs.height, inputs.units);
  const neckIn = toInches(inputs.neck, inputs.units);
  const waistIn = toInches(inputs.waist, inputs.units);
  const hipIn = toInches(inputs.hip, inputs.units);

  if (heightIn <= 0 || neckIn <= 0 || waistIn <= 0) return null;

  if (inputs.sex === "male") {
    const abdomenNeck = waistIn - neckIn;
    if (abdomenNeck <= 0) return null;
    return 86.01 * log10(abdomenNeck) - 70.041 * log10(heightIn) + 36.76;
  }

  if (hipIn <= 0) return null;
  const sum = waistIn + hipIn - neckIn;
  if (sum <= 0) return null;
  return 163.205 * log10(sum) - 97.684 * log10(heightIn) - 78.387;
}

export function calculateBodyFat(inputs: BodyFatInputs): BodyFatResult {
  const weightUnit = inputs.units === "metric" ? "kg" : "lbs";
  const empty: BodyFatResult = {
    navyPercent: null,
    bmiPercent: null,
    bmi: null,
    category: null,
    fatMass: null,
    leanMass: null,
    idealPercent: null,
    fatToLoseForIdeal: null,
    weightUnit,
    error: null,
  };

  if (inputs.age < 15 || inputs.age > 100) {
    return { ...empty, error: "Enter an age between 15 and 100." };
  }
  if (inputs.weight <= 0 || inputs.height <= 0) {
    return { ...empty, error: "Enter a valid weight and height." };
  }

  const navyRaw = calculateNavyBodyFatPercent(inputs);
  if (navyRaw === null) {
    return {
      ...empty,
      error:
        inputs.sex === "female"
          ? "Check measurements: waist + hip must be greater than neck."
          : "Check measurements: waist must be greater than neck.",
    };
  }

  const navyPercent = Math.max(1, Math.min(60, navyRaw));
  const weightKg = toKg(inputs.weight, inputs.units);
  const heightCm = toCm(inputs.height, inputs.units);
  const bmi = calculateBmi(weightKg, heightCm);
  const bmiPercent =
    bmi === null ? null : Math.max(1, Math.min(60, estimateBodyFatFromBmi(inputs.sex, bmi, inputs.age)));

  const fatMass = (navyPercent / 100) * inputs.weight;
  const leanMass = inputs.weight - fatMass;
  const idealPercent = idealBodyFat(inputs.sex, inputs.age);
  const fatToLoseForIdeal =
    navyPercent > idealPercent
      ? ((navyPercent - idealPercent) / 100) * inputs.weight
      : 0;

  return {
    navyPercent,
    bmiPercent,
    bmi,
    category: categorizeBodyFat(inputs.sex, navyPercent),
    fatMass,
    leanMass,
    idealPercent,
    fatToLoseForIdeal,
    weightUnit,
    error: null,
  };
}

export function calculateVisceralRisk(inputs: VisceralInputs): VisceralResult | null {
  if (inputs.waist <= 0 || inputs.height <= 0) return null;
  const waistCm = toCm(inputs.waist, inputs.units);
  const heightCm = toCm(inputs.height, inputs.units);
  const whtr = waistCm / heightCm;

  let risk: VisceralRisk = "Low";
  if (inputs.sex === "male") {
    if (waistCm >= 102 || whtr >= 0.55) risk = "High";
    else if (waistCm >= 94 || whtr >= 0.5) risk = "Increased";
  } else if (waistCm >= 88 || whtr >= 0.55) {
    risk = "High";
  } else if (waistCm >= 80 || whtr >= 0.5) {
    risk = "Increased";
  }

  const guidance =
    risk === "Low"
      ? "Waist size is in a lower-risk range for visceral fat based on common clinical cutoffs."
      : risk === "Increased"
        ? "Waist size suggests elevated abdominal fat risk. Tracking diet, sleep, and activity often helps."
        : "Waist size is in a higher-risk range. Consider speaking with a clinician about body composition.";

  return { waistCm, heightCm, whtr, risk, guidance };
}

export function formatPercent(value: number | null, digits = 1): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${value.toFixed(digits)}%`;
}

export function formatMass(value: number | null, unit: "lbs" | "kg"): string {
  if (value === null || Number.isNaN(value)) return "—";
  return `${value.toFixed(1)} ${unit}`;
}

export function categoryColor(category: BodyFatCategory | null): string {
  switch (category) {
    case "Essential fat":
      return "#8FD16A";
    case "Athletes":
      return "#2EC4B6";
    case "Fitness":
      return "#F4C150";
    case "Average":
      return "#F08020";
    case "Obese":
      return "#F0716A";
    case "Below essential":
      return "#94a3b8";
    default:
      return "#2EC4B6";
  }
}
