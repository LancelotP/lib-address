import { LibAddressError } from "./base.error";

export class InvalidZipError extends LibAddressError {
  readonly format: string;

  constructor(format: string) {
    super(`Zip format invalid. Expected: /${format}/`, "INVALID_ZIP");

    this.format = format;
  }
}

export class InvalidZipSubRegionError extends InvalidZipError {
  readonly subRegionFormat: string;

  constructor(format: string, subRegionFormat: string) {
    super(`Zip format invalid. Expected: /${format}/ and /${subRegionFormat}/`);

    this.subRegionFormat = subRegionFormat;
  }
}
