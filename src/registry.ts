import { CountryMissingError } from "./errors/country-missing.error.ts";
import type {
  CountryCode,
  LocalityType,
  StateType,
  SublocalityType,
  ZipType,
} from "./generated.ts";
import type { CountryData } from "./types.ts";

const defaultCountryData: {
  fmt: string;
  require: string;
  upper: string;
  zip_name_type: ZipType;
  state_name_type: StateType;
  locality_name_type: LocalityType;
  sublocality_name_type: SublocalityType;
} = {
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
  data: Omit<
    CountryData,
    | "key"
    | "zip_name_type"
    | "state_name_type"
    | "locality_name_type"
    | "sublocality_name_type"
  > & {
    key: string;
    zip_name_type?: string;
    state_name_type?: string;
    locality_name_type?: string;
    sublocality_name_type?: string;
  },
) {
  registry.set(
    data.id.slice("data/".length) as CountryCode,
    data as CountryData,
  );
}

export function getCountryData(
  countryCode: CountryCode,
): CountryData & DefaultCountryData {
  const data = registry.get(countryCode);

  if (!data) throw new CountryMissingError(countryCode);
  return { ...defaultCountryData, ...data };
}

/**
 * @description Get a list of all registered countries with their name and value.
 */
export function getRegisteredCountries() {
  return Array.from(registry.values()).map((data) => ({
    value: data.key,
    name: data.name,
  }));
}
