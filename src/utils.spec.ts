import { expect, describe, it } from "vitest";
import { AbbrObject, convertAbbrStringToObject } from "./utils";

describe("convertAbbrStringToObject", () => {
  it.each<{ value: string; fields: (keyof AbbrObject)[] }>([
    { value: "", fields: [] },
    { value: "N", fields: ["name"] },
    { value: "O", fields: ["organization"] },
    { value: "A", fields: ["addressLine1"] },
    { value: "D", fields: ["dependentLocality"] },
    { value: "C", fields: ["city"] },
    { value: "S", fields: ["state"] },
    { value: "Z", fields: ["zip"] },
    { value: "X", fields: ["sortingCode"] },
    {
      value: "ACZ",
      fields: ["addressLine1", "city", "zip"],
    },
    {
      value: "ACSZ",
      fields: ["addressLine1", "city", "state", "zip"],
    },
  ])("convertAbbrStringToObject($value) -> $fields", ({ value, fields }) => {
    expect(convertAbbrStringToObject(value)).toEqual(
      generateAbbrObject(fields)
    );
  });
});

function generateAbbrObject(requiredKeys: (keyof AbbrObject)[]): AbbrObject {
  return {
    name: requiredKeys.includes("name"),
    organization: requiredKeys.includes("organization"),
    addressLine1: requiredKeys.includes("addressLine1"),
    dependentLocality: requiredKeys.includes("dependentLocality"),
    city: requiredKeys.includes("city"),
    state: requiredKeys.includes("state"),
    zip: requiredKeys.includes("zip"),
    sortingCode: requiredKeys.includes("sortingCode"),
  };
}
