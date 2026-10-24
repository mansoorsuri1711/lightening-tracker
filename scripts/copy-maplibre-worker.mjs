// MapLibre v6 runs in an ES-module worker that imports a shared chunk. Bundlers don't
// resolve that reliably, so serve both files as plain static assets from /public.
import { copyFileSync, existsSync } from "node:fs";

for (const f of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) {
  const src = `node_modules/maplibre-gl/dist/${f}`;
  if (existsSync(src)) copyFileSync(src, `public/${f}`);
}
