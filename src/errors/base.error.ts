export abstract class LibAddressError extends Error {
  readonly isLibAddressError = true;
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);

    this.message = message;
    this.name = "LibAddressError";
    this.code = code;
  }
}
