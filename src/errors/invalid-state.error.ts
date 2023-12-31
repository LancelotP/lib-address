import type { CountryCode } from "../generated";
import { LibAddressError } from "./base.error";

export class InvalidStateError extends LibAddressError {
  readonly country: CountryCode;

  constructor(country: CountryCode) {
    super(`State invalid for country: ${country}`, "INVALID_STATE");

    this.country = country;
  }
}
