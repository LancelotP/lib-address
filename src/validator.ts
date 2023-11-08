import { codes as countryCodes } from "./codes.ts";
import type { LibAddressError } from "./errors/base.error.ts";
import { InvalidStateError } from "./errors/invalid-state.error.ts";
import {
  InvalidZipError,
  InvalidZipSubRegionError,
} from "./errors/invalid-zip.error.ts";
import { MissingFieldError } from "./errors/missing-field.error.ts";
import { AddressValidationError } from "./errors/missing-fields.error.ts";
import type { Address, CountryCode } from "./generated.ts";
import { getCountryFields } from "./helpers.ts";
import { getCountryData } from "./registry.ts";
import type { AddressInput } from "./types.ts";

/**
 * @description Checks if a string is a valid country code (ISO 3166-1 alpha-2)
 * @param value The country code to check
 * @returns true if the country code is valid
 */
export function isValidCountryCode(value: string): value is CountryCode {
  return countryCodes.includes(value.toUpperCase().trim() as CountryCode);
}

/**
 * @description Checks if a string is a valid country subdivision code (ISO 3166-2)
 * @param country ISO 3166-1 alpha-2 country code
 * @param value The subdivision code to check
 * @returns true if the subdivision code is valid for the country
 */
export function isValidCountrySubdivisionCode(
  country: CountryCode,
  value: string,
) {
  const sanitizedValue = value.toUpperCase().trim();
  const sanitizedCountry = country.toUpperCase().trim();

  if (!sanitizedValue || !isValidCountryCode(sanitizedCountry)) return false;

  const data = getCountryData(sanitizedCountry);
  return !!data.sub_regions?.find((sr) => sr.key === sanitizedValue) ?? false;
}

/**
 * @description Validates an address object and throws a MissingFieldsError if any required fields are missing
 * @param address The address object to validate
 * @throws MissingFieldsError if any required fields are missing
 * @throws CountryMissingError if the country data is not found
 */
export function validateAddress(
  address: AddressInput,
): asserts address is Address {
  const data = getCountryData(address.country);
  const fields = getCountryFields(address.country);
  const errors: LibAddressError[] = [];

  Object.entries(fields).forEach(([field, rule]) => {
    const value = address[field as keyof AddressInput]?.trim();

    if (rule === "required" && !value) {
      errors.push(new MissingFieldError(field));
    }
  });

  if (data.zip) {
    const regex = new RegExp(`^${data.zip}$`);
    const subRegion = address.state
      ? data.sub_regions?.find((sr) => sr.key === address.state)
      : null;

    if (!regex.test(address.zip?.trim() ?? "")) {
      errors.push(new InvalidZipError(regex.source));
    }

    if (subRegion?.zip) {
      const subRegionRegex = new RegExp(`^${subRegion.zip}`);

      if (!subRegionRegex.test(address.zip?.trim() ?? "")) {
        errors.push(
          new InvalidZipSubRegionError(regex.source, subRegionRegex.source),
        );
      }
    }
  }

  if (fields.state === "required") {
    if (!data.sub_regions?.find((sr) => sr.key === address.state)) {
      errors.push(new InvalidStateError(address.country));
    }
  }

  if (errors.length) {
    throw new AddressValidationError(errors);
  }
}

/**
 * @description Checks if an address object is valid
 * @param address The address object to validate
 * @returns true if the address is valid, false if it is not
 */
export function isAddressValid(address: AddressInput): address is Address {
  try {
    validateAddress(address);
    return true;
  } catch {
    return false;
  }
}
