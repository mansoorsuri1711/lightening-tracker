export type StrikeType = "cg" | "ic" | "unknown";
export type StrikeSource = "goes-glm" | "mtg-li" | "xweather";

export type Strike = {
  id: string;
  time: string;
  lat: number;
  lon: number;
  type: StrikeType;
  energy?: number;
  source: StrikeSource;
};
