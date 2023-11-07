import { expect, describe, it } from "vitest";
import { getCountryData, registerCountry, registry } from "./registry";

import tg from "../countries/TG.json";
import { CountryMissingError } from "./errors/country-missing.error";

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
        expect(getCountryData("X1")).toHaveProperty(field);
      });
    });

    it("should throw an error if the country is not registered", () => {
      expect(() => getCountryData("XX")).toThrowError(
        new CountryMissingError("XX")
      );
    });
  });
});
