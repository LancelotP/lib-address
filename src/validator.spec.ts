import { describe, it, expect } from "vitest";
import type {
  CountryFields} from "./validator";
import {
  getOptionnalFields,
  getRequiredFields,
  isAddressValid,
  isValidCountryCode,
  isValidCountrySubdivisionCode,
  validateAddress,
} from "./validator";

import { registerCountry } from "./registry";

import ag from "../countries/AG.json";
import ae from "../countries/AE.json";
import fr from "../countries/FR.json";
import us from "../countries/US.json";
import type { AddressInput } from "./types";
import { AddressValidationError } from "./errors/missing-fields.error";
import { MissingFieldError } from "./errors/missing-field.error";
import { InvalidZipError } from "./errors/invalid-zip.error";
import { InvalidStateError } from "./errors/invalid-state.error";
import type { CountryCode } from "./codes";

registerCountry(ag);
registerCountry(ae);
registerCountry(fr);
registerCountry(us);

describe("validator", () => {
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

  describe("isValidCountryCode", () => {
    it.each([
      { value: "US", expected: true },
      { value: "AG", expected: true },
      { value: "AE", expected: true },
      { value: "FR", expected: true },
      { value: "fr", expected: true },
      { value: "fR", expected: true },
      { value: " fR ", expected: true },
      { value: "1234", expected: false },
    ])("isValidCountryCode($value) -> $expected", ({ value, expected }) => {
      expect(isValidCountryCode(value)).toBe(expected);
    });
  });

  describe("isValidCountrySubdivisionCode", () => {
    it.each<{ country: CountryCode; value: string; expected: boolean }>([
      { country: "US", value: "CA", expected: true },
      { country: "US", value: " CA ", expected: true },
      { country: "US", value: " Ca ", expected: true },
      { country: "US", value: " ca ", expected: true },
      { country: "US", value: "ZZ", expected: false },
      { country: "US", value: "", expected: false },
    ])(
      "isValidCountrySubdivisionCode($country, $value) -> $expected",
      ({ country, value, expected }) => {
        expect(isValidCountrySubdivisionCode(country, value)).toBe(expected);
      }
    );
  });

  describe("validateAddress", () => {
    describe("Valid", () => {
      it.each<{ value: AddressInput }>([
        {
          value: {
            country: "AG",
            addressLine1: "Rua do MAT",
          },
        },
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
        },
      ])(
        "validateAddress({ country: $value.country, ... }) -> void",
        ({ value }) => {
          expect(() => validateAddress(value)).not.toThrow();
        }
      );
    });

    describe("Missing fields", () => {
      it.each<{ value: AddressInput; missingFields: string[] }>([
        {
          value: {
            country: "AG",
          },
          missingFields: ["addressLine1"],
        },
        {
          value: {
            country: "FR",
          },
          missingFields: ["addressLine1", "city", "zip"],
        },
        {
          value: {
            country: "US",
          },
          missingFields: ["addressLine1", "city", "zip", "state"],
        },
        {
          value: {
            country: "AE",
          },
          missingFields: ["addressLine1", "state"],
        },
        {
          value: {
            country: "FR",
            city: "Paris",
            zip: "75001",
          },
          missingFields: ["addressLine1"],
        },
      ])(
        "validateAddress({ country: $value.country, ... }) -> $missingFields",
        ({ value, missingFields }) => {
          let missingFieldErrors: MissingFieldError[] = [];

          try {
            validateAddress(value);
          } catch (err) {
            expect(err).toBeInstanceOf(AddressValidationError);
            if (err instanceof AddressValidationError) {
              missingFieldErrors = err.errors.filter(
                (error) => error instanceof MissingFieldError
              ) as MissingFieldError[];
            } else {
              throw err;
            }
          }

          missingFieldErrors.forEach((error) => {
            expect(missingFields).toContain(error.field);
          });

          missingFields.forEach((field) => {
            expect(missingFieldErrors.map((e) => e.field)).toContain(field);
          });
        }
      );
    });

    describe("Invalid Zip", () => {
      it.each<{ value: AddressInput }>([
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "7500",
          },
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "98041",
          },
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "wefwf",
          },
        },
      ])("validateAddress({ country: $value.country, ... })", ({ value }) => {
        let error: InvalidZipError | undefined;

        try {
          validateAddress(value);
        } catch (err) {
          expect(err).toBeInstanceOf(AddressValidationError);
          if (err instanceof AddressValidationError) {
            error = err.errors.find(
              (error) => error instanceof InvalidZipError
            ) as InvalidZipError;
          } else {
            throw err;
          }
        }

        expect(error).toBeInstanceOf(InvalidZipError);
        expect(error?.format).toBeDefined();
      });
    });

    describe("Invalid State", () => {
      it.each<{ value: AddressInput }>([
        {
          value: {
            country: "US",
            state: "ZZ",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
        },
        {
          value: {
            country: "AE",
            state: "ZZ",
            addressLine1: "1600 Amphitheatre Parkway",
          },
        },
      ])("validateAddress({ country: $value.country, ... })", ({ value }) => {
        let error: InvalidStateError | undefined;

        try {
          validateAddress(value);
        } catch (err) {
          expect(err).toBeInstanceOf(AddressValidationError);
          if (err instanceof AddressValidationError) {
            error = err.errors.find(
              (error) => error instanceof InvalidStateError
            ) as InvalidStateError;
          } else {
            throw err;
          }
        }

        expect(error).toBeInstanceOf(InvalidStateError);
        expect(error?.country).toEqual(value.country);
      });
    });
  });

  describe("isAddressValid", () => {
    it.each<{ value: AddressInput; expected: boolean }>([
      { value: { country: "AG", addressLine1: "Rua do MAT" }, expected: true },
      { value: { country: "AG" }, expected: false },
    ])(`isAddressValid($value) -> $expected`, ({ value, expected }) => {
      expect(isAddressValid(value)).toBe(expected);
    });
  });
});
