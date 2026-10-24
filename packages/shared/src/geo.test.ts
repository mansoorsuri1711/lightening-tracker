import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  bearingDeg,
  bearingToCompass,
  haversineKm,
  kmToMiles,
  parseBBox,
  pointInBBox,
} from "./geo.ts";

describe("haversineKm", () => {
  it("returns ~0 for identical points", () => {
    assert.ok(haversineKm({ lat: 40, lon: -75 }, { lat: 40, lon: -75 }) < 0.001);
  });

  it("estimates NYC to Philly roughly 130 km", () => {
    const km = haversineKm(
      { lat: 40.7128, lon: -74.006 },
      { lat: 39.9526, lon: -75.1652 }
    );
    assert.ok(km > 120 && km < 140, `got ${km}`);
  });
});

describe("kmToMiles", () => {
  it("converts 1.609 km ≈ 1 mile", () => {
    assert.ok(Math.abs(kmToMiles(1.609344) - 1) < 0.01);
  });
});

describe("bearingDeg", () => {
  it("points roughly north", () => {
    const b = bearingDeg({ lat: 0, lon: 0 }, { lat: 1, lon: 0 });
    assert.ok(b < 1 || b > 359);
  });

  it("maps to compass labels", () => {
    assert.equal(bearingToCompass(0), "N");
    assert.equal(bearingToCompass(90), "E");
  });
});

describe("bbox", () => {
  it("parses west,south,east,north", () => {
    const b = parseBBox("-100,20,-80,40");
    assert.deepEqual(b, { west: -100, south: 20, east: -80, north: 40 });
  });

  it("filters points", () => {
    const bbox = { west: -100, south: 20, east: -80, north: 40 };
    assert.equal(pointInBBox({ lat: 30, lon: -90 }, bbox), true);
    assert.equal(pointInBBox({ lat: 10, lon: -90 }, bbox), false);
  });
});
