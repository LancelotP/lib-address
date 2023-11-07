import { describe, expect, it } from "vitest";

import { codes } from "./codes";
import { getCountryData } from "./entry-node";

describe("entry-node", () => {
  it(`should register all ${codes.length} countries`, () => {
    for (const country of codes) {
      expect(getCountryData(country)).toBeDefined();
    }
  });
});
