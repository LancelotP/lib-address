import { describe, expect, it } from "vitest";

import type { CountryCode } from "./entry-node";
import {
  AddressValidationError,
  getZipExamples,
  InvalidStateError,
  InvalidZipError,
  InvalidZipSubRegionError,
  MissingFieldError,
  registerCountry,
} from "./entry-node";
import type { CountryFields } from "./helpers";
import {
  getCountryStates,
  getOptionnalFields,
  getRequiredFields,
  isAddressError,
} from "./helpers";

registerCountry({
  id: "data/ZO",
  key: "ZO",
  name: "Test Country optionnal",
  fmt: "%A%C%D%N%O%S%X%Z",
  require: "",
});

registerCountry({
  id: "data/ZR",
  key: "ZR",
  name: "Test Country required",
  fmt: "",
  require: "ACDNOSXZ",
});

registerCountry({
  id: "data/ZE",
  key: "ZE",
  name: "Test Country empty",
  fmt: "",
  require: "",
});

describe("helpers", () => {
  describe("getZipExamples", () => {
    it("should return an array of examples", () => {
      expect(getZipExamples("US").length).toBeGreaterThan(0);
    });

    it("should return an array of examples", () => {
      expect(getZipExamples("US", "CA").length).toBeGreaterThan(0);
    });

    it("should return an empty array", () => {
      expect(getZipExamples("AG").length).toBe(0);
    });

    it("should return an empty array", () => {
      expect(getZipExamples("AE", "AZ").length).toBe(0);
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
      const states = getCountryStates("CA", { lang: "FR" });

      expect(states).toBeInstanceOf(Array);
      expect(states.length).toBeGreaterThan(0);

      states.forEach((state) => {
        expect(state.label).toBeTypeOf("string");
        expect(state.value).toBeTypeOf("string");
      });
    });

    it("should return an array with latin", () => {
      const states = getCountryStates("CN", { useLatin: true });

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
      {
        value: "ZE" as CountryCode,
        fields: [],
      },
      {
        value: "ZO" as CountryCode,
        fields: [],
      },
      {
        value: "ZR" as CountryCode,
        fields: [
          "state",
          "zip",
          "city",
          "addressLine1",
          "dependentLocality",
          "sortingCode",
        ],
      },
    ])("getRequiredFields($value) -> $fields", ({ value, fields }) => {
      expect(getRequiredFields(value)).toEqual(expect.arrayContaining(fields));
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
      {
        value: "ZE" as CountryCode,
        fields: [],
      },
      {
        value: "ZR" as CountryCode,
        fields: [],
      },
      {
        value: "ZO" as CountryCode,
        fields: [
          "state",
          "zip",
          "city",
          "addressLine1",
          "addressLine2",
          "addressLine3",
          "dependentLocality",
          "sortingCode",
        ],
      },
    ])("getOptionnalFields($value) -> $fields", ({ value, fields }) => {
      expect(getOptionnalFields(value)).toEqual(expect.arrayContaining(fields));
    });
  });

  describe("isAddressError", () => {
    it.each<{ error: Error; expected: boolean }>([
      { error: new Error(), expected: false },
      { error: new Error("MissingFieldError"), expected: false },
      { error: new MissingFieldError("foo"), expected: true },
      { error: new AddressValidationError([]), expected: true },
      { error: new InvalidZipError("foo"), expected: true },
      { error: new InvalidZipSubRegionError("foo", "bar"), expected: true },
      { error: new InvalidStateError("FR"), expected: true },
    ])(
      "should return $expected when $error is passed",
      ({ error, expected }) => {
        expect(isAddressError(error)).toBe(expected);
      },
    );
  });
});
