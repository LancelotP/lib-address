import { CountryCode } from "./codes";
import { getCountryData } from "./registry";

export function getZipExamples(country: CountryCode, subRegion?: string) {
  const data = getCountryData(country);

  if (!subRegion) return data.zipex;

  const subRegionData = data.sub_regions?.find((sr) => sr.key === subRegion);

  return subRegionData?.zipex ?? data.zipex;
}
