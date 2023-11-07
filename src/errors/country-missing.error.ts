import { LibAddressError } from "./base.error";

export class CountryMissingError extends LibAddressError {
  constructor(countryCode: string) {
    super(`Data for ${countryCode} is missing`, "COUNTRY_MISSING");
  }
}
