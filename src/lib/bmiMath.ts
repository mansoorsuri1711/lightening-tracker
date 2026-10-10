/** WHO adult BMI calculator (educational). Optimized for women’s health content. */

export type UnitSystem = "imperial" | "metric";
export type Sex = "female" | "male";

export type BmiInputs = {
  sex: Sex;
  units: UnitSystem;
  age: number;
  weight: number;
  height: number;
};

export type BmiCategory =
  | "Underweight"
  | "Healthy weight"
  | "Overweight"
  | "Obesity class I"
  | "Obesity class II"
  | "Obesity class III";

export type BmiResult = {
  bmi: number | null;
  category: BmiCategory | null;
  healthyMinKg: number | null;
  healthyMaxKg: number | null;
  healthyMinDisplay: number | null;
  healthyMaxDisplay: number | null;
  weightUnit: "kg" | "lb";
  heightCm: number | null;
  prime: number | null;
  ageNote: string | null;
  error: string | null;
};

export const BMI_BANDS: Array<{ label: BmiCategory; min: number; max: number; color: string }> = [
  { label: "Underweight", min: 0, max: 18.5, color: "#7CC6FE" },
  { label: "Healthy weight", min: 18.5, max: 25, color: "#5DD39E" },
  { label: "Overweight", min: 25, max: 30, color: "#FFC857" },
  { label: "Obesity class I", min: 30, max: 35, color: "#FF9F68" },
  { label: "Obesity class II", min: 35, max: 40, color: "#FF6B6B" },
  { label: "Obesity class III", min: 40, max: 100, color: "#E63946" },
];

function toMetric(inputs: BmiInputs): { kg: number; cm: number } | null {
  if (!Number.isFinite(inputs.weight) || !Number.isFinite(inputs.height)) return null;
  if (inputs.weight <= 0 || inputs.height <= 0) return null;

  if (inputs.units === "metric") {
    return { kg: inputs.weight, cm: inputs.height };
  }

  const kg = inputs.weight * 0.45359237;
  const cm = inputs.height * 2.54;
  return { kg, cm };
}

export function categorizeBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  if (bmi < 35) return "Obesity class I";
  if (bmi < 40) return "Obesity class II";
  return "Obesity class III";
}

export function categoryColor(category: BmiCategory | null): string {
  if (!category) return "#1A1225";
  return BMI_BANDS.find((b) => b.label === category)?.color ?? "#1A1225";
}

/** Healthy weight band for height using WHO BMI 18.5–24.9. */
export function healthyWeightRangeKg(heightCm: number): { min: number; max: number } {
  const m = heightCm / 100;
  return {
    min: 18.5 * m * m,
    max: 24.9 * m * m,
  };
}

export function ageContext(age: number, sex: Sex): string | null {
  if (!Number.isFinite(age) || age < 2) return null;
  if (age < 18) {
    return "BMI-for-age percentiles (CDC/WHO growth charts) are preferred under 18. Adult cut-offs on this page are for context only.";
  }
  if (sex === "female" && age >= 65) {
    return "For women 65+, a slightly higher BMI can sometimes associate with better outcomes — discuss personal targets with a clinician.";
  }
  if (sex === "female" && age >= 40) {
    return "After 40, body composition and waist measures add useful context alongside BMI for women.";
  }
  return null;
}

export function calculateBmi(inputs: BmiInputs): BmiResult {
  const empty: BmiResult = {
    bmi: null,
    category: null,
    healthyMinKg: null,
    healthyMaxKg: null,
    healthyMinDisplay: null,
    healthyMaxDisplay: null,
    weightUnit: inputs.units === "metric" ? "kg" : "lb",
    heightCm: null,
    prime: null,
    ageNote: null,
    error: null,
  };

  if (!Number.isFinite(inputs.age) || inputs.age < 2 || inputs.age > 120) {
    return { ...empty, error: "Enter an age between 2 and 120." };
  }

  const metric = toMetric(inputs);
  if (!metric) {
    return { ...empty, error: "Enter a valid height and weight." };
  }

  if (metric.cm < 90 || metric.cm > 250) {
    return { ...empty, error: "Height looks out of range. Check units and try again." };
  }
  if (metric.kg < 20 || metric.kg > 400) {
    return { ...empty, error: "Weight looks out of range. Check units and try again." };
  }

  const m = metric.cm / 100;
  const bmi = metric.kg / (m * m);
  const rounded = Math.round(bmi * 10) / 10;
  const range = healthyWeightRangeKg(metric.cm);
  const weightUnit = inputs.units === "metric" ? "kg" : "lb";
  const toDisplay = (kg: number) =>
    weightUnit === "kg" ? Math.round(kg * 10) / 10 : Math.round(kg / 0.45359237);

  return {
    bmi: rounded,
    category: categorizeBmi(rounded),
    healthyMinKg: Math.round(range.min * 10) / 10,
    healthyMaxKg: Math.round(range.max * 10) / 10,
    healthyMinDisplay: toDisplay(range.min),
    healthyMaxDisplay: toDisplay(range.max),
    weightUnit,
    heightCm: Math.round(metric.cm * 10) / 10,
    prime: Math.round((rounded / 25) * 100) / 100,
    ageNote: ageContext(inputs.age, inputs.sex),
    error: null,
  };
}

export function formatBmi(bmi: number | null): string {
  if (bmi === null) return "—";
  return bmi.toFixed(1);
}

/** Sample adult women’s chart rows (height → healthy weight at BMI 18.5–24.9). */
export function womenChartRows(
  unit: UnitSystem = "imperial"
): Array<{ heightLabel: string; minLabel: string; maxLabel: string }> {
  const heightsCm = [152, 155, 157, 160, 163, 165, 168, 170, 173, 175, 178, 180];
  return heightsCm.map((cm) => {
    const { min, max } = healthyWeightRangeKg(cm);
    if (unit === "metric") {
      return {
        heightLabel: `${cm} cm`,
        minLabel: `${Math.round(min)} kg`,
        maxLabel: `${Math.round(max)} kg`,
      };
    }
    const totalIn = Math.round(cm / 2.54);
    const ft = Math.floor(totalIn / 12);
    const inch = totalIn % 12;
    return {
      heightLabel: `${ft}'${inch}"`,
      minLabel: `${Math.round(min / 0.45359237)} lb`,
      maxLabel: `${Math.round(max / 0.45359237)} lb`,
    };
  });
}
