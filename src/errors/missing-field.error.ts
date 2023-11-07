import { LibAddressError } from "./base.error";

export class MissingFieldError extends LibAddressError {
  readonly field: string;

  constructor(field: string) {
    super(`Field ${field} is required`, "MISSING_FIELD");

    this.field = field;
  }
}
