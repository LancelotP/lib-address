import { LibAddressError } from "./base.error";

export class AddressValidationError extends LibAddressError {
  readonly errors: LibAddressError[];

  constructor(errors: LibAddressError[]) {
    super(
      `Address validation failed: ${errors
        .map((error) => error.message)
        .join(", ")}`,
      "ADDRESS_VALIDATION_FAILED",
    );

    this.errors = errors;
  }
}
