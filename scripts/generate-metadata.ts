import type { CountryData } from "../src/types.ts";
import { getCountryCodes, getCountryData } from "./download-data.ts";
import { override } from "./override.ts";
import {
  persistCountries,
  persistCountryCodes,
  persistGeneratedTypes,
} from "./persist-data.ts";

async function main() {
  const dict: Record<string, CountryData> = {};
  const countryCodes = await getCountryCodes();

  const results = await Promise.all(
    countryCodes.map((countryCode) => getCountryData(countryCode)),
  );

  for (const result of results) {
    dict[result.key] = result;
  }

  const combinedDict = override(dict);

  await persistCountries(combinedDict);
  await persistCountryCodes(combinedDict);
  await persistGeneratedTypes(combinedDict);
}

void main();
