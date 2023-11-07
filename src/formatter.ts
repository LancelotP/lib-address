import { getCountryData } from "./registry.ts";
import type { AddressInput } from "./types.ts";
import { convertAbbrStringToObject } from "./utils.ts";
import { validateAddress } from "./validator.ts";

type FormatAddressOptions = {
  /**
   * @description Preserve input case if true
   * @default false
   */
  preserveCase?: boolean;
  /**
   * @description Use ISO 3166-2 subdivision code for state if true. Otherwise, use the state name
   * For example, use "CA" instead of "California"
   *
   * Some countries do not have ISO 3166-2 subdivision codes and will always use the state name regardless of this option
   * For example, "HK" (Hong Kong) and "KY" (Cayman Islands)
   *
   * @default false
   */
  useStateISOCode?: boolean;
  /**
   * @description Append country name to the end of the address if true. Useful for international addresses
   * @default false
   */
  appendCountry?: boolean;
  /**
   * @description Use ISO 3166-1 alpha-2 country code for country if true. Otherwise, use the country name
   * @default false
   */
  useCountryISOCode?: boolean;
  /**
   * @description Lang to use for country and subdivision names. If not provided, the default lang is used. Not all countries support multiple langs
   */
  lang?: string;
  /**
   * @description Use latinised equivalents for country, subdivision names and format if true. Not all countries support latinised equivalents
   * @default false
   */
  useLatin?: boolean;
};

export function formatAddress(
  address: AddressInput,
  opts?: FormatAddressOptions,
): string {
  const {
    preserveCase = false,
    useStateISOCode = false,
    appendCountry = false,
    useCountryISOCode = false,
    useLatin = false,
    lang,
  } = opts ?? {};

  validateAddress(address);

  const cpy = { ...address };
  const data = getCountryData(cpy.country);

  const stateData = cpy.state
    ? data.sub_regions?.find((sr) => sr.key === cpy.state)
    : null;

  const fmt = useLatin ? data.lfmt ?? data.fmt : data.fmt;
  const upper = data.upper;

  if (!useStateISOCode && stateData) {
    cpy.state = [
      useLatin && stateData.name.latin,
      lang && stateData.name[lang],
      stateData.name.default,
    ].filter(Boolean)[0] as string;
  }

  const {
    addressLine1 = "",
    addressLine2 = "",
    addressLine3 = "",
    city = "",
    dependentLocality = "",
    name = "",
    organization = "",
    sortingCode = "",
    state = "",
    zip = "",
  } = preserveCase ? cpy : convertAddressCasing(cpy, upper);

  const addressLine = [addressLine1, addressLine2, addressLine3]
    .filter(Boolean)
    .join("\n");

  const nationalFormat = fmt
    .replace(/%N/g, name)
    .replace(/%O/g, organization)
    .replace(/%A/g, addressLine)
    .replace(/%D/g, dependentLocality)
    .replace(/%C/g, city)
    .replace(/%S/g, state)
    .replace(/%Z/g, zip)
    .replace(/%X/g, sortingCode)
    .replace(/(%n)+/g, "\n")
    .trim();

  if (appendCountry) {
    return useCountryISOCode
      ? `${nationalFormat}\n${data.key}`
      : `${nationalFormat}\n${data.name}`;
  }

  return nationalFormat;
}

function convertAddressCasing(
  address: AddressInput,
  upper: string,
): AddressInput {
  const upperFields = convertAbbrStringToObject(upper);

  return {
    country: address.country,
    name: upperFields.name ? address.name?.toUpperCase() : address.name,
    organization: upperFields.organization
      ? address.organization?.toUpperCase()
      : address.organization,
    addressLine1: upperFields.addressLine1
      ? address.addressLine1?.toUpperCase()
      : address.addressLine1,
    addressLine2: upperFields.addressLine1
      ? address.addressLine2?.toUpperCase()
      : address.addressLine2,
    addressLine3: upperFields.addressLine1
      ? address.addressLine3?.toUpperCase()
      : address.addressLine3,
    dependentLocality: upperFields.dependentLocality
      ? address.dependentLocality?.toUpperCase()
      : address.dependentLocality,
    city: upperFields.city ? address.city?.toUpperCase() : address.city,
    state: upperFields.state ? address.state?.toUpperCase() : address.state,
    zip: upperFields.zip ? address.zip?.toUpperCase() : address.zip,
    sortingCode: upperFields.sortingCode
      ? address.sortingCode?.toUpperCase()
      : address.sortingCode,
  };
}
