import { z } from "zod/v4";

import { CountryMissingError } from "../errors/country-missing.error";
import { InvalidStateError } from "../errors/invalid-state.error";
import {
  InvalidZipError,
  InvalidZipSubRegionError,
} from "../errors/invalid-zip.error";
import { MissingFieldError } from "../errors/missing-field.error";
import { AddressValidationError } from "../errors/missing-fields.error";
import type { Address } from "../generated";
import { isValidCountryCode, validateAddress } from "../validator";

export type AddressSchemaParams = {
  /**
   * Custom error message or error map applied to the object, every field
   * and the issues raised by lib-address.
   */
  error?: string | z.core.$ZodErrorMap;
};

const buildSchema = (error: AddressSchemaParams["error"]) =>
  z
    .object(
      {
        country: z.string({ error }),
        addressLine1: z.string({ error }).optional(),
        addressLine2: z.string({ error }).optional(),
        addressLine3: z.string({ error }).optional(),
        city: z.string({ error }).optional(),
        dependentLocality: z.string({ error }).optional(),
        sortingCode: z.string({ error }).optional(),
        state: z.string({ error }).optional(),
        zip: z.string({ error }).optional(),
      },
      { error },
    )
    .superRefine((val, ctx) => {
      if (!isValidCountryCode(val.country)) {
        ctx.addIssue({
          code: "custom",
          params: {
            __isLibAddressIssue__: true,
            type: "InvalidCountryError",
          } satisfies LibAddressIssueParams,
          path: ["country"],
        });
        return;
      }

      try {
        validateAddress({ ...val, country: val.country });
      } catch (err) {
        if (err instanceof CountryMissingError) {
          throw err;
        }

        if (!(err instanceof AddressValidationError)) return;

        for (const e of err.errors) {
          if (e instanceof MissingFieldError) {
            ctx.addIssue({
              code: "invalid_type",
              expected: "string",
              input: undefined,
              path: [e.field],
            });
          } else if (e instanceof InvalidZipSubRegionError) {
            // must be checked before InvalidZipError (subclass)
            ctx.addIssue({
              code: "custom",
              params: {
                __isLibAddressIssue__: true,
                type: "InvalidZipSubRegionError",
                format: e.subRegionFormat,
              } satisfies LibAddressIssueParams,
              path: ["zip"],
            });
          } else if (e instanceof InvalidZipError) {
            ctx.addIssue({
              code: "custom",
              params: {
                __isLibAddressIssue__: true,
                type: "InvalidZipError",
                format: e.format,
              } satisfies LibAddressIssueParams,
              path: ["zip"],
            });
          } else if (e instanceof InvalidStateError) {
            ctx.addIssue({
              code: "custom",
              params: {
                __isLibAddressIssue__: true,
                type: "InvalidStateError",
              } satisfies LibAddressIssueParams,
              path: ["state"],
            });
          }
        }
      }
    });

type RawAddressSchema = ReturnType<typeof buildSchema>;

export const getAddressSchema = (params?: AddressSchemaParams) =>
  // superRefine can't narrow the output type in zod v4. The cast is checked
  // by TS (no `unknown`): the refinement guarantees the output is an `Address`.
  buildSchema(params?.error) as z.ZodType<Address, z.input<RawAddressSchema>>;

export type AddressInput = z.infer<ReturnType<typeof getAddressSchema>>;

export type LibAddressIssueParams = {
  __isLibAddressIssue__: true;
} & (
  | {
      type: "InvalidZipError";
      format: string;
    }
  | {
      type: "InvalidZipSubRegionError";
      format: string;
    }
  | {
      type: "InvalidStateError";
    }
  | {
      type: "InvalidCountryError";
    }
);

export type ZodLibAddressIssue = Omit<z.core.$ZodIssueCustom, "params"> & {
  params: LibAddressIssueParams;
};

/**
 * Works with both finalized issues (`error.issues`) and raw issues
 * (inside an error map).
 */
export function isZodLibAddressIssue<
  T extends { code: string; params?: unknown },
>(issue: T): issue is T & { code: "custom"; params: LibAddressIssueParams } {
  if (issue.code !== "custom") return false;
  const { params } = issue;
  return (
    typeof params === "object" &&
    params !== null &&
    "__isLibAddressIssue__" in params &&
    params.__isLibAddressIssue__ === true
  );
}
