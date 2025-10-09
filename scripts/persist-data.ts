import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { CountryCode } from "../src/generated.ts";
import type { CountryData } from "../src/types.ts";
import { getCountryData } from "./download-data.ts";
import { generateTypes } from "./generate-type.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function persistCountries(dict: Record<string, CountryData>) {
  await Promise.all(
    Object.entries(dict).map(([key, value]) =>
      writeFile(
        resolve(__dirname, "../countries", `${key}.json`),
        JSON.stringify(value, null, 2),
        "utf-8",
      ),
    ),
  );
}

export async function persistLiteData(dict: Record<CountryCode, CountryData>) {
  const compactData: {
    c: string[]; // country codes
    d: [string | null, string | null, string | null][]; // [fmt, zip, require] - all optional
    r: [string, string, string?][][]; // [key, name, zip?][] by country index
  } = {
    c: [],
    d: [],
    r: [],
  };

  for (const country of Object.values(dict)) {
    compactData.c.push(country.key);
    compactData.d.push([
      country.lfmt ?? country.fmt ?? null,
      country.zip ?? null,
      country.require ?? null,
    ]);

    compactData.r.push(
      country.sub_regions?.map((region) =>
        region.zip
          ? [region.key, region.name.default, region.zip]
          : [region.key, region.name.default],
      ) ?? [],
    );
  }

  await writeFile(
    resolve(__dirname, "../countries/lite.json"),
    JSON.stringify(compactData),
    "utf-8",
  );
}

export async function persistGeneratedTypes(dict: Record<string, CountryData>) {
  const defaultCountryData = await getCountryData("ZZ");
  const combinedDict = { ...dict, ZZ: defaultCountryData };

  const content = generateTypes(
    combinedDict,
    defaultCountryData as Required<CountryData>,
  );

  await writeFile(resolve(__dirname, "../src/generated.ts"), content, "utf-8");
}
