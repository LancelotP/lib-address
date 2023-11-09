import { describe, expect, it } from "vitest";
import { z, ZodError } from "zod";

import FR from "../../countries/FR.json";
import US from "../../countries/US.json";
import { CountryMissingError } from "../errors/country-missing.error";
import type { AnyAddress } from "../generated";
import { registerCountry } from "../registry";
import { getAddressSchema, isZodLibAddressIssue } from "./zod";

registerCountry(FR);
registerCountry(US);

describe("zod", () => {
  describe("getAddressSchema", () => {
    const schema = getAddressSchema();
    describe("default", () => {
      it("should return a zod schema", () => {
        expect(schema).toBeInstanceOf(z.ZodSchema);
      });
    });

    describe("initialization", () => {
      it("should throw if data is missing", () => {
        expect(() =>
          schema.parse({
            country: "ZW",
          }),
        ).toThrowError(CountryMissingError);
      });
    });

    describe("validation", () => {
      it.each<{
        value: AnyAddress;
        type: string;
        path: string[];
        label: string;
        extra?: Record<string, unknown>;
      }>([
        {
          value: { country: "X1" },
          type: "InvalidCountryError",
          path: ["country"],
          label: "country is not a valid country code",
        },
        {
          value: {
            country: "US",
            addressLine1: "1",
            city: "1",
            state: "FF",
            zip: "22162",
          },
          type: "InvalidStateError",
          path: ["state"],
          label: "state is not valid for country",
        },
        {
          value: { country: "FR", addressLine1: "1", city: "1", zip: "1" },
          type: "InvalidZipError",
          path: ["zip"],
          label: "zip is not valid",
          extra: { format: expect.stringContaining("") },
        },
        {
          value: {
            country: "US",
            addressLine1: "1",
            city: "1",
            state: "CA",
            zip: "22162",
          },
          type: "InvalidZipError",
          path: ["zip"],
          label: "zip is not valid for state",
          extra: { format: expect.stringContaining("") },
        },
      ])("should throw if $label", ({ value, type, path, extra }) => {
        let error: ZodError | null = null;

        try {
          schema.parse(value);
        } catch (err) {
          error = err as ZodError;
        }

        expect(error).toBeInstanceOf(ZodError);
        expect(error?.issues[0]).toMatchObject(
          expect.objectContaining({
            code: z.ZodIssueCode.custom,
            path: path,
            params: {
              __isLibAddressIssue__: true,
              type: type,
              ...(extra ?? {}),
            },
          }),
        );
      });
    });

    describe("customization", () => {
      describe("invalid_type_error", () => {
        const schema = getAddressSchema({
          invalid_type_error: "invalid_type_error",
        });

        it("should return custom message", () => {
          let error: ZodError | null = null;

          try {
            schema.parse(null);
          } catch (err) {
            error = err as ZodError;
          }

          expect(error?.flatten().formErrors?.[0]).toEqual(
            "invalid_type_error",
          );
        });
      });

      describe("required_error", () => {
        const schema = getAddressSchema({
          required_error: "required_error",
        });

        it("should return custom message", () => {
          let error: ZodError | null = null;

          try {
            schema.parse(undefined);
          } catch (err) {
            error = err as ZodError;
          }

          expect(error?.flatten().formErrors?.[0]).toEqual("required_error");
        });
      });

      describe("errorMap", () => {
        const errorMap: z.ZodErrorMap = (issue, ctx) => {
          if (issue.code === z.ZodIssueCode.invalid_type) {
            if (issue.expected === "string" && issue.received === "undefined") {
              return { message: "This field is required" };
            }
          }

          if (isZodLibAddressIssue(issue)) {
            switch (issue.params.type) {
              case "InvalidZipError":
                return { message: "Invalid Zip Code" };
              case "InvalidZipSubRegionError":
                return { message: "Invalid Zip Code for state" };
              case "InvalidStateError":
                return { message: "Invalid State" };
            }
          }

          return { message: ctx.defaultError };
        };

        it.each<{
          value: AnyAddress;
          message: string;
          path: string;
        }>([
          {
            value: { country: "FR", city: "1", zip: "75000" },
            message: "This field is required",
            path: "addressLine1",
          },
          {
            value: { country: "FR", city: "1", zip: "1", addressLine1: "1" },
            message: "Invalid Zip Code",
            path: "zip",
          },
          {
            value: {
              country: "US",
              state: "CA",
              city: "1",
              zip: "35000",
              addressLine1: "1",
            },
            message: "Invalid Zip Code for state",
            path: "zip",
          },
          {
            value: {
              country: "US",
              state: "ZZ",
              city: "1",
              zip: "35000",
              addressLine1: "1",
            },
            message: "Invalid State",
            path: "state",
          },
        ])("should display $message on $path", ({ value, message, path }) => {
          let error: ZodError | null = null;

          try {
            schema.parse(value, { errorMap });
          } catch (err) {
            error = err as ZodError;
          }

          expect(error).toBeInstanceOf(ZodError);
          expect(error?.flatten().fieldErrors?.[path]?.at(-1)).toEqual(message);
        });
      });
    });
  });

  describe("isZodLibAddressIssue", () => {
    it("should return false if issue is not custom", () => {
      expect(
        isZodLibAddressIssue({
          code: z.ZodIssueCode.invalid_type,
          path: [],
          expected: "string",
          received: "undefined",
        }),
      ).toBe(false);
    });

    it("should return false if issue is custom but not from lib-address", () => {
      expect(
        isZodLibAddressIssue({
          code: z.ZodIssueCode.custom,
          path: [],
        }),
      ).toBe(false);
    });

    it("should return true if issue is custom and from lib-address", () => {
      expect(
        isZodLibAddressIssue({
          code: z.ZodIssueCode.custom,
          path: [],
          params: {
            __isLibAddressIssue__: true,
          },
        }),
      ).toBe(true);
    });
  });
});
