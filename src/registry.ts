import type { CountryCode } from "./codes";
import { CountryMissingError } from "./errors/country-missing.error";
import type { CountryData } from "./types";

const defaultCountryData = {
  fmt: "%N%n%O%n%A%n%C",
  require: "AC",
  upper: "C",
  zip_name_type: "postal",
  state_name_type: "province",
  locality_name_type: "city",
  sublocality_name_type: "suburb",
};

type DefaultCountryData = typeof defaultCountryData;

export const registry = new Map<CountryCode, CountryData>();

export function registerCountry(
  data: Omit<CountryData, "key"> & { key: string }
) {
  registry.set(
    data.id.slice("data/".length) as CountryCode,
    data as CountryData
  );
}

export function getCountryData(
  countryCode: CountryCode
): CountryData & DefaultCountryData {
  const data = registry.get(countryCode);

  if (!data) throw new CountryMissingError(countryCode);
  return { ...defaultCountryData, ...data };
}
