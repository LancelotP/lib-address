export type {
  LocalityType,
  StateType,
  SublocalityType,
  ZipType,
} from "./generated.ts";

export { registerCountry, getCountryData } from "./registry.ts";

export { getZipExamples } from "./helpers.ts";

export { formatAddress } from "./formatter.ts";

export {
  isAddressValid,
  isValidCountryCode,
  isValidCountrySubdivisionCode,
  validateAddress,
  getCountryFields,
  getOptionnalFields,
  getRequiredFields,
} from "./validator.ts";
