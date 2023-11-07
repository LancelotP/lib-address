import type { CountryCode } from "./codes";
import { getCountryData } from "./registry";

/**
 * @description Get a list of zip code examples for a given country. If no subRegion is provided, the default zip code example for the country will be used.
 * @param country CountryCode to get zip code examples for (e.g. US, FR, etc.)
 * @param subRegion Subdivision code to get zip code examples for (e.g. CA, NY, etc.)
 */
export function getZipExamples(country: CountryCode, subRegion?: string) {
  const data = getCountryData(country);

  if (!subRegion) return data.zipex;

  const subRegionData = data.sub_regions?.find((sr) => sr.key === subRegion);

  return subRegionData?.zipex ?? data.zipex;
}

/**
 * @description Get a list of states for a given country. If no language is provided, the default language for the country will be used.
 * @param country CountryCode to get states for (e.g. US, FR, etc.)
 * @param lang Language to use for state names. If not provided, the default language for the country will be used. Not all countries support multiple languages
 */
export function getCountryStates(country: CountryCode, lang = "default") {
  const data = getCountryData(country);

  return data.sub_regions?.map((sr) => ({
    value: sr.key,
    label: sr.name[lang] ?? sr.name.default,
  }));
}
