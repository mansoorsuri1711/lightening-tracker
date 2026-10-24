import type { ExpressionSpecification, StyleSpecification } from "maplibre-gl";

export type Basemap = "dark" | "satellite" | "light";

const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services";

const SATELLITE: StyleSpecification = {
  version: 8,
  sources: {
    imagery: {
      type: "raster",
      tiles: [`${ESRI}/World_Imagery/MapServer/tile/{z}/{y}/{x}`],
      tileSize: 256,
      maxzoom: 18,
      attribution: "Imagery © Esri, Maxar, Earthstar Geographics",
    },
    places: {
      type: "raster",
      tiles: [`${ESRI}/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}`],
      tileSize: 256,
      maxzoom: 18,
    },
  },
  layers: [
    { id: "imagery", type: "raster", source: "imagery", paint: { "raster-brightness-max": 0.8, "raster-saturation": -0.2 } },
    { id: "places", type: "raster", source: "places" },
  ],
};

export function styleFor(b: Basemap): string | StyleSpecification {
  if (b === "satellite") return SATELLITE;
  if (b === "light") return "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  return "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";
}

/** Age (minutes) → colour. Fresh flashes are white-hot, old ones fade through amber and red to violet. */
export const AGE_STOPS: [number, string][] = [
  [0, "#ffffff"],
  [1, "#fff27a"],
  [4, "#ffc233"],
  [9, "#ff8a1f"],
  [18, "#f2461d"],
  [35, "#c4163a"],
  [60, "#7a2a8f"],
];

export const AGE_COLOR_EXPR = [
  "interpolate",
  ["linear"],
  ["get", "age"],
  ...AGE_STOPS.flat(),
] as unknown as ExpressionSpecification;

const r = (a: number, b: number) => ["interpolate", ["linear"], ["get", "age"], 0, a, 60, b];
export const RADIUS_EXPR = [
  "interpolate",
  ["linear"],
  ["zoom"],
  2, r(2.6, 1.0),
  5, r(4.0, 1.7),
  8, r(6.5, 3.2),
  12, r(11, 6),
] as unknown as ExpressionSpecification;
