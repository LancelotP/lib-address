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
