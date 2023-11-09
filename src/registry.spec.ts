import { describe, expect, it } from "vitest";

import tg from "../countries/TG.json";
import { CountryMissingError } from "./errors/country-missing.error";
import type { CountryCode } from "./generated";
import {
  getCountryData,
  getRegisteredCountries,
  registerCountry,
  registry,
} from "./registry";

describe.sequential("registry", () => {
  describe.sequential("registerCountry", () => {
    it("should register a country", () => {
      const startSize = registry.size;

      registerCountry(tg);
      expect(registry.size).toBe(startSize + 1);
    });

    it("should not increase when a country is already registered", () => {
      const startSize = registry.size;

      registerCountry(tg);
      expect(registry.size).toBe(startSize);
    });
  });

  describe("getCountryData", () => {
    it("should return the country data", () => {
      expect(getCountryData("TG")).toBeDefined();
    });

    it("should return the country data with default values", () => {
      registerCountry({
        id: "data/X1",
        key: "X1",
        name: "Test Country",
      });

      const enhanceFields = [
        "key",
        "name",
        "fmt",
        "require",
        "upper",
        "zip_name_type",
        "state_name_type",
        "locality_name_type",
        "sublocality_name_type",
      ];

      enhanceFields.forEach((field) => {
        expect(getCountryData("X1" as CountryCode)).toHaveProperty(field);
      });
    });

    it("should throw an error if the country is not registered", () => {
      expect(() => getCountryData("XX" as CountryCode)).toThrowError(
        new CountryMissingError("XX"),
      );
    });
  });

  describe("getRegisteredCountries", () => {
    it("should return the registered countries", () => {
      expect(getRegisteredCountries().length).toEqual(
        Array.from(registry.keys()).length,
      );
    });
  });
});
