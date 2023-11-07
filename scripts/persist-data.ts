import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { CountryData } from "../src/types.ts";
import { getCountryData } from "./download-data.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function persistCountryCodes(dict: Record<string, CountryData>) {
  await writeFile(
    resolve(__dirname, "../src/codes.ts"),
    [
      `export const codes = ${JSON.stringify(
        Object.keys(dict),
        null,
        2,
      )} as const;`,
      "",
      "export type CountryCode = (typeof codes)[number]",
      "",
    ].join("\n"),
    "utf-8",
  );
}

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

export async function persistGeneratedTypes(dict: Record<string, CountryData>) {
  const defaultCountryData = await getCountryData("ZZ");
  const combinedDict = { ...dict, ZZ: defaultCountryData };

  const stateTypes = Array.from(
    new Set(
      Object.values(combinedDict)
        .map((data) => data.state_name_type)
        .filter(Boolean),
    ),
  ).sort((a, b) => a!.localeCompare(b!));

  const zipTypes = Array.from(
    new Set(
      Object.values(combinedDict)
        .map((data) => data.zip_name_type)
        .filter(Boolean),
    ),
  ).sort((a, b) => a!.localeCompare(b!));

  const localityTypes = Array.from(
    new Set(
      Object.values(combinedDict)
        .map((data) => data.locality_name_type)
        .filter(Boolean),
    ),
  ).sort((a, b) => a!.localeCompare(b!));

  const sublocalityTypes = Array.from(
    new Set(
      Object.values(combinedDict)
        .map((data) => data.sublocality_name_type)
        .filter(Boolean),
    ),
  ).sort((a, b) => a!.localeCompare(b!));

  await writeFile(
    resolve(__dirname, "../src/generated.ts"),
    [
      `export type StateType = ${stateTypes.map((v) => `"${v}"`).join(" | ")};`,
      "",
      `export type ZipType = ${zipTypes.map((v) => `"${v}"`).join(" | ")};`,
      "",
      `export type LocalityType = ${localityTypes
        .map((v) => `"${v}"`)
        .join(" | ")};`,
      "",
      `export type SublocalityType = ${sublocalityTypes
        .map((v) => `"${v}"`)
        .join(" | ")};`,
      "",
    ].join("\n"),
    "utf-8",
  );
}
