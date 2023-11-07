export class LibAddressError extends Error {
  readonly isLibAddressError = true;
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }

    this.message = message;
    this.name = "LibAddressError";
    this.code = code;
  }
}
