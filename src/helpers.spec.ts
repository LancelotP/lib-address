import { describe, expect, it } from "vitest";

import { getZipExamples } from "./entry-node";
import { getCountryStates } from "./helpers";

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
});
