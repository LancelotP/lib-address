import progress from "cli-progress";

import type { CountryData } from "../src/types.ts";
import { getCountryCodes, getCountryData } from "./download-data.ts";
import { override } from "./override.ts";
import { persistCountries, persistGeneratedTypes } from "./persist-data.ts";

async function main() {
  const bar = new progress.SingleBar({}, progress.Presets.legacy);

  const dict: Record<string, CountryData> = {};
  bar.start(0, 0);
  const countryCodes = await getCountryCodes();
  bar.setTotal(countryCodes.length);

  const results = await Promise.all(
    countryCodes.map(async (countryCode) => {
      const res = await getCountryData(countryCode, bar);
      bar.increment();

      return res;
    }),
  );

  for (const result of results) {
    dict[result.key] = result;
  }

  const combinedDict = override(dict);

  await persistCountries(combinedDict);
  await persistGeneratedTypes(combinedDict);
  bar.stop();
}

void main();
