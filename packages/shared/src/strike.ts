export type StrikeType = "cg" | "ic" | "unknown";
export type StrikeSource = "goes-glm" | "mtg-li" | "xweather";

/** Normalized strike format used by worker, API, and frontend. */
export type Strike = {
  id: string;
  time: string;
  lat: number;
  lon: number;
  type: StrikeType;
  energy?: number;
  source: StrikeSource;
};

export type LatLon = { lat: number; lon: number };

export type BBox = {
  west: number;
  south: number;
  east: number;
  north: number;
};
