/** Speed of sound at ~20°C (m/s). Used for flash-to-bang distance estimates. */
export const SPEED_OF_SOUND_MS = 343;

export type DistanceUnit = "miles" | "kilometers";

export type LightningDistanceResult = {
  seconds: number;
  meters: number;
  kilometers: number;
  miles: number;
  /** Rough NWS-style “count by 5” miles (seconds / 5). */
  ruleOfFiveMiles: number;
  riskLabel: "Immediate" | "Nearby" | "Distant" | "Far";
  riskHint: string;
};

export function estimateLightningDistance(seconds: number): LightningDistanceResult | null {
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  const s = Math.min(seconds, 600);
  const meters = s * SPEED_OF_SOUND_MS;
  const kilometers = meters / 1000;
  const miles = meters / 1609.344;
  const ruleOfFiveMiles = s / 5;

  let riskLabel: LightningDistanceResult["riskLabel"];
  let riskHint: string;
  if (s <= 5) {
    riskLabel = "Immediate";
    riskHint = "Strike is very close. Move indoors or to a hard-top vehicle now.";
  } else if (s <= 15) {
    riskLabel = "Nearby";
    riskHint = "Storm is close enough to pose risk. Seek substantial shelter.";
  } else if (s <= 30) {
    riskLabel = "Distant";
    riskHint = "Activity is farther out, but storms can move quickly — keep watching.";
  } else {
    riskLabel = "Far";
    riskHint = "Thunder is distant. Continue monitoring with a live lightning tracker.";
  }

  return {
    seconds: s,
    meters,
    kilometers,
    miles,
    ruleOfFiveMiles,
    riskLabel,
    riskHint,
  };
}

export function formatDistance(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(digits);
}
