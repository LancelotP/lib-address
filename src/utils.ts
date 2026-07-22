/**
 * N – Name
 * O – Organisation
 * A – Street Address Line(s)
 * D – Dependent locality (may be an inner-city district or a suburb)
 * C – City or Locality
 * S – Administrative area such as a state, province, island etc
 * Z – Zip or postal code
 * X – Sorting code
 */

import type { CountryData } from "./types";

export type AbbrObject = {
  name: boolean;
  organization: boolean;
  addressLine1: boolean;
  dependentLocality: boolean;
  city: boolean;
  state: boolean;
  zip: boolean;
  sortingCode: boolean;
};

export function convertAbbrStringToObject(value: string): AbbrObject {
  return {
    name: value.includes("N"),
    organization: value.includes("O"),
    addressLine1: value.includes("A"),
    dependentLocality: value.includes("D"),
    city: value.includes("C"),
    state: value.includes("S"),
    zip: value.includes("Z"),
    sortingCode: value.includes("X"),
  };
}

export function encodeNameType(data: CountryData): string | null {
  let n = 0;
  n |= stateNameType.indexOf(data.state_name_type);
  n |= zipNameType.indexOf(data.zip_name_type) << 4;
  n |= localityNameType.indexOf(data.locality_name_type) << 8;
  n |= sublocalityNameType.indexOf(data.sublocality_name_type) << 12;
  if (n === 0) return null;
  return n.toString(36);
}

export function decodeNameType(
  input: string | null,
): Pick<
  CountryData,
  | "state_name_type"
  | "locality_name_type"
  | "sublocality_name_type"
  | "zip_name_type"
> {
  if (input === null) return {};
  const n = Number.parseInt(input, 36);
  return {
    state_name_type: stateNameType[n & 0xf],
    zip_name_type: zipNameType[(n >> 4) & 0xf],
    locality_name_type: localityNameType[(n >> 8) & 0xf],
    sublocality_name_type: sublocalityNameType[(n >> 12) & 0xf],
  };
}

const stateNameType: ReadonlyArray<CountryData["state_name_type"]> = [
  undefined,
  "area",
  "county",
  "department",
  "district",
  "do_si",
  "emirate",
  "island",
  "oblast",
  "parish",
  "prefecture",
  "province",
  "region",
  "state",
];

const localityNameType: ReadonlyArray<CountryData["locality_name_type"]> = [
  undefined,
  "city",
  "district",
  "post_town",
  "suburb",
];

const sublocalityNameType: ReadonlyArray<CountryData["sublocality_name_type"]> =
  [
    undefined,
    "district",
    "neighborhood",
    "suburb",
    "townland",
    "village_township",
  ];

const zipNameType: ReadonlyArray<CountryData["zip_name_type"]> = [
  undefined,
  "eircode",
  "pin",
  "postal",
  "zip",
];
