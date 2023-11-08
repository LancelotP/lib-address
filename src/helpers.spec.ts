import { describe, expect, it } from "vitest";

import type { CountryCode } from "./entry-node";
import { getZipExamples } from "./entry-node";
import type { CountryFields } from "./helpers";
import {
  getCountryStates,
  getOptionnalFields,
  getRequiredFields,
} from "./helpers";

describe("helpers", () => {
  describe("getZipExamples", () => {
    it("should return an array of examples", () => {
      expect(getZipExamples("US").length).toBeGreaterThan(0);
    });

    it("should return an empty array", () => {
      expect(getZipExamples("AG").length).toBe(0);
    });
  });

  describe("getCountryStates", () => {
    it("should return an array", () => {
      const states = getCountryStates("US");

      expect(states).toBeInstanceOf(Array);
      expect(states.length).toBeGreaterThan(0);

      states.forEach((state) => {
        expect(state.label).toBeTypeOf("string");
        expect(state.value).toBeTypeOf("string");
      });
    });

    it("should return an array with locale", () => {
      const states = getCountryStates("CN", "latin");

      expect(states).toBeInstanceOf(Array);
      expect(states.length).toBeGreaterThan(0);

      states.forEach((state) => {
        expect(state.label).toBeTypeOf("string");
        expect(state.value).toBeTypeOf("string");
      });
    });

    it("should return an empty array", () => {
      const states = getCountryStates("FR");

      expect(states).toBeInstanceOf(Array);
      expect(states.length).toEqual(0);
    });
  });

  describe("getRequiredFields", () => {
    it.each<{
      value: CountryCode;
      fields: (keyof CountryFields)[];
    }>([
      {
        value: "FR",
        fields: ["zip", "city", "addressLine1"],
      },
      {
        value: "AE",
        fields: ["state", "addressLine1"],
      },
      { value: "AG", fields: ["addressLine1"] },
      {
        value: "US",
        fields: ["state", "zip", "city", "addressLine1"],
      },
    ])("getRequiredFields($value) -> $fields", ({ value, fields }) => {
      expect(getRequiredFields(value)).toEqual(fields);
    });
  });

  describe("getOptionnalFields", () => {
    it.each<{
      value: CountryCode;
      fields: (keyof CountryFields)[];
    }>([
      {
        value: "FR",
        fields: ["addressLine2", "addressLine3"],
      },
      {
        value: "AG",
        fields: ["city", "addressLine2", "addressLine3"],
      },
    ])("getOptionnalFields($value) -> $fields", ({ value, fields }) => {
      expect(getOptionnalFields(value)).toEqual(fields);
    });
  });
});
