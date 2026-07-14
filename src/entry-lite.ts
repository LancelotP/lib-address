import {
  c as countryCodes,
  d as dataFormats,
  r as subRegions,
} from "../countries/lite.json";
import type { CountryCode } from "./generated";
import {
  type AbbrObject,
  convertAbbrStringToObject,
  decodeNameType,
} from "./utils";

type SubRegionData = {
  key: string;
  name: string;
  zip: string | null;
};

export function getCountryData(countryCode: string | CountryCode) {
  const index = countryCodes.indexOf(countryCode);

  if (index === -1) return null;

  const {
    state_name_type,
    locality_name_type,
    sublocality_name_type,
    zip_name_type,
  } = decodeNameType(dataFormats[index][3]);

  return {
    code: countryCodes[index],
    lfmt: dataFormats[index][0],
    zip: dataFormats[index][1],
    require: dataFormats[index][2],
    state_name_type,
    locality_name_type,
    sublocality_name_type,
    zip_name_type,
    sub_regions: (subRegions[index] as [string, string, string?][]).map(
      (region) => ({
        key: region[0],
        name: region[1],
        zip: region[2] ?? null,
      }),
    ) as SubRegionData[],
  };
}

export function getCountryFields(
  countryCode: string | CountryCode,
): null | Record<keyof AbbrObject, "required" | "optional" | undefined> {
  const countryData = getCountryData(countryCode);
  if (!countryData) return null;

  const requiredFields = convertAbbrStringToObject(countryData.require ?? "");
  const optionnalFields = convertAbbrStringToObject(countryData.lfmt ?? "");

  const getFieldStatus = (field: keyof AbbrObject) =>
    requiredFields[field]
      ? "required"
      : optionnalFields[field]
        ? "optional"
        : undefined;

  return {
    name: getFieldStatus("name"),
    organization: getFieldStatus("organization"),
    dependentLocality: getFieldStatus("dependentLocality"),
    city: getFieldStatus("city"),
    state: getFieldStatus("state"),
    zip: getFieldStatus("zip"),
    sortingCode: getFieldStatus("sortingCode"),
    addressLine1: getFieldStatus("addressLine1"),
  };
}

export function getGridPattern(countryCode: string | CountryCode) {
  const countryData = getCountryData(countryCode);
  if (!countryData?.lfmt) return null;

  const rows = countryData.lfmt.split("%n");

  // Get different column counts
  const colCounts = [
    ...new Set(rows.map((row) => Array.from(row.matchAll(/%\D/g)).length)),
  ].filter(Boolean);

  // Calculate the LCM
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
  const commonDenominator = colCounts.reduce((acc, n) => lcm(acc, n), 1);

  const pattern = rows
    .map((row) => {
      const fields = Array.from(row.matchAll(/%\D/g))
        .map((match) => match[0])
        .filter(Boolean); // Filter empty fields
      const repeatCount = commonDenominator / fields.length;

      const rowPattern = fields.reduce((acc, field) => {
        const fieldName = identifierToField(field);
        const repeated = Array(repeatCount).fill(fieldName).join(" ");
        return acc ? `${acc} ${repeated}` : repeated;
      }, "");

      return rowPattern ? `"${rowPattern}"` : null;
    })
    .filter(Boolean);

  return {
    templateColumns: `repeat(${commonDenominator}, 1fr)`,
    templateAreas: pattern.join("\n"),
  };
}

function identifierToField(identifier: string) {
  switch (identifier) {
    case "%N":
      return "name";
    case "%O":
      return "organization";
    case "%A":
      return "addressLine1";
    case "%D":
      return "dependentLocality";
    case "%C":
      return "city";
    case "%S":
      return "state";
    case "%Z":
      return "zip";
    case "%X":
      return "sortingCode";
    default:
      throw new Error(`Invalid identifier: ${identifier}`);
  }
}
