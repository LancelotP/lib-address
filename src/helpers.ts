import type { CountryCode } from "./generated.ts";
import { getCountryData } from "./registry.ts";
import { convertAbbrStringToObject } from "./utils.ts";

/**
 * @description Get a list of zip code examples for a given country. If no subRegion is provided, the default zip code example for the country will be used.
 * @param country CountryCode to get zip code examples for (e.g. US, FR, etc.)
 * @param subRegion Subdivision code to get zip code examples for (e.g. CA, NY, etc.)
 */
export function getZipExamples(
  country: CountryCode,
  subRegion?: string,
): string[] {
  const data = getCountryData(country);

  if (!subRegion) return data.zipex?.split(",") ?? [];

  const subRegionData = data.sub_regions?.find((sr) => sr.key === subRegion);

  return (subRegionData?.zipex ?? data.zipex)?.split(",") ?? [];
}

type GetCountryStatesOptions = {
  /**
   * @description Language to use for state names. If not provided, the default lang is used. Not all countries support multiple langs. Takes precedence over useLatin
   * @default default
   */
  lang?: string;
  /**
   * @description Use latinised equivalents for state names if true. Not all countries support latinised equivalents
   * @default false
   */
  useLatin?: boolean;
};

/**
 * @description Get a list of states for a given country. If no language is provided, the default language for the country will be used.
 * @param country CountryCode to get states for (e.g. US, FR, etc.)
 */
export function getCountryStates(
  country: CountryCode,
  opts?: GetCountryStatesOptions,
) {
  const { lang, useLatin = false } = opts ?? {};
  const data = getCountryData(country);

  return (
    data.sub_regions?.map((sr) => ({
      value: sr.key,
      label: [
        lang && sr.name[lang],
        useLatin && sr.name.latin,
        sr.name.default,
      ].filter(Boolean)[0] as string,
    })) ?? []
  );
}

export type CountryFields = {
  state?: "required" | "optional";
  zip?: "required" | "optional";
  dependentLocality?: "required" | "optional";
  city?: "required" | "optional";
  sortingCode?: "required" | "optional";
  addressLine1?: "required" | "optional";
  addressLine2?: "required" | "optional";
  addressLine3?: "required" | "optional";
};

export function getCountryFields(countryCode: CountryCode): CountryFields {
  const data = getCountryData(countryCode);
  const requiredFields = convertAbbrStringToObject(data.require);
  const optionnalFields = convertAbbrStringToObject(data.fmt);

  return {
    state: requiredFields.state
      ? "required"
      : optionnalFields.state
      ? "optional"
      : undefined,
    zip: requiredFields.zip
      ? "required"
      : optionnalFields.zip
      ? "optional"
      : undefined,
    dependentLocality: requiredFields.dependentLocality
      ? "required"
      : optionnalFields.dependentLocality
      ? "optional"
      : undefined,
    city: requiredFields.city
      ? "required"
      : optionnalFields.city
      ? "optional"
      : undefined,
    sortingCode: requiredFields.sortingCode
      ? "required"
      : optionnalFields.sortingCode
      ? "optional"
      : undefined,
    addressLine1: requiredFields.addressLine1
      ? "required"
      : optionnalFields.addressLine1
      ? "optional"
      : undefined,
    addressLine2: optionnalFields.addressLine1 ? "optional" : undefined,
    addressLine3: optionnalFields.addressLine1 ? "optional" : undefined,
  };
}

export function getRequiredFields(countryCode: CountryCode) {
  return Object.entries(getCountryFields(countryCode))
    .filter(([_, value]) => value === "required")
    .map(([key]) => key) as (keyof CountryFields)[];
}

export function getOptionnalFields(countryCode: CountryCode) {
  return Object.entries(getCountryFields(countryCode))
    .filter(([_, value]) => value === "optional")
    .map(([key]) => key) as (keyof CountryFields)[];
}
