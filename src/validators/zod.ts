import type { ZodCustomIssue } from "zod";
import { z } from "zod";

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

export const getAddressSchema = (
  params?: Parameters<(typeof z)["object"]>[1],
) => {
  const { errorMap } = params ?? {};

  return z
    .object(
      {
        country: z.string({ errorMap }),
        addressLine1: z.string({ errorMap }).optional(),
        addressLine2: z.string({ errorMap }).optional(),
        addressLine3: z.string({ errorMap }).optional(),
        city: z.string({ errorMap }).optional(),
        dependentLocality: z.string({ errorMap }).optional(),
        sortingCode: z.string({ errorMap }).optional(),
        state: z.string({ errorMap }).optional(),
        zip: z.string({ errorMap }).optional(),
      },
      params,
    )
    .superRefine((val, ctx): val is Address => {
      const address = val as AddressInput;

      if (!isValidCountryCode(val.country)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          params: {
            __isLibAddressIssue__: true,
            type: "InvalidCountryError",
          },
          path: ["country"],
        } satisfies ZodLibAddressIssue);
        return false;
      }

      try {
        validateAddress(address);
        return true;
      } catch (err) {
        if (err instanceof CountryMissingError) {
          throw err;
        }

        if (err instanceof AddressValidationError) {
          err.errors.forEach((e) => {
            if (e instanceof MissingFieldError) {
              ctx.addIssue({
                code: z.ZodIssueCode.invalid_type,
                expected: "string",
                received: "undefined",
                path: [e.field],
              });
            }

            if (e instanceof InvalidZipError) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                params: {
                  __isLibAddressIssue__: true,
                  type: "InvalidZipError",
                  format: e.format,
                },
                path: ["zip"],
              } satisfies ZodLibAddressIssue);
            }

            if (e instanceof InvalidZipSubRegionError) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                params: {
                  __isLibAddressIssue__: true,
                  type: "InvalidZipSubRegionError",
                  format: e.subRegionFormat,
                },
                path: ["zip"],
              } satisfies ZodLibAddressIssue);
            }

            if (e instanceof InvalidStateError) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                params: {
                  __isLibAddressIssue__: true,
                  type: "InvalidStateError",
                },
                path: ["state"],
              } satisfies ZodLibAddressIssue);
            }
          });
        }

        return false;
      }
    });
};

export type AddressInput = z.infer<ReturnType<typeof getAddressSchema>>;

export function isZodLibAddressIssue(
  issue: z.ZodIssueOptionalMessage,
): issue is ZodLibAddressIssue {
  if (issue.code !== z.ZodIssueCode.custom) return false;
  if (!issue.params?.__isLibAddressIssue__) return false;
  return true;
}

export type ZodLibAddressIssue = Omit<ZodCustomIssue, "params"> & {
  params: {
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
};
