import { describe, expect, it } from "vitest";

import { codes } from "./codes";
import { getCountryData } from "./entry-browser";
import { CountryMissingError } from "./errors/country-missing.error";

describe("entry-browser", () => {
  it(`should none of the ${codes.length} countries`, () => {
    for (const country of codes) {
      expect(() => getCountryData(country)).toThrowError(CountryMissingError);
    }
  });
});
