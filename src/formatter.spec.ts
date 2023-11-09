import { describe, expect, it } from "vitest";

import AE from "../countries/AE.json";
import AG from "../countries/AG.json";
import CA from "../countries/CA.json";
import CI from "../countries/CI.json";
import CN from "../countries/CN.json";
import ES from "../countries/ES.json";
import FR from "../countries/FR.json";
import HK from "../countries/HK.json";
import KY from "../countries/KY.json";
import US from "../countries/US.json";
import { convertAddressCasing, formatAddress } from "./formatter";
import { registerCountry } from "./registry";
import type { AddressInput } from "./types";

registerCountry(AE);
registerCountry(AG);
registerCountry(CA);
registerCountry(CI);
registerCountry(CN);
registerCountry(ES);
registerCountry(FR);
registerCountry(HK);
registerCountry(KY);
registerCountry(US);

describe("formatter", () => {
  describe("formatAddress", () => {
    describe("default", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "AG",
            addressLine1: "123 Main St",
          },
          expected: "123 Main St",
        },
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "1 rue de Rivoli\n75001 PARIS",
        },
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75 001",
          },
          expected: "1 rue de Rivoli\n75 001 PARIS",
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043",
        },
        {
          value: {
            country: "CI",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "01 BP 1234 ABIDJAN 01",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value)).toBe(expected);
        },
      );
    });

    describe("organization", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "AG",
            organization: "Acme Corp",
            addressLine1: "123 Main St",
          },
          expected: "Acme Corp\n123 Main St",
        },
        {
          value: {
            country: "FR",
            organization: "Acme Corp",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "Acme Corp\n1 rue de Rivoli\n75001 PARIS",
        },
        {
          value: {
            country: "US",
            organization: "Acme Corp",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "Acme Corp\n1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043",
        },
        {
          value: {
            country: "CI",
            organization: "Acme Corp",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "Acme Corp\n01 BP 1234 ABIDJAN 01",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value)).toBe(expected);
        },
      );
    });

    describe("name", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "AG",
            name: "John Doe",
            addressLine1: "123 Main St",
          },
          expected: "John Doe\n123 Main St",
        },
        {
          value: {
            country: "FR",
            name: "John Doe",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "John Doe\n1 rue de Rivoli\n75001 PARIS",
        },
        {
          value: {
            country: "US",
            name: "John Doe",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "John Doe\n1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043",
        },
        {
          value: {
            country: "CI",
            name: "John Doe",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "John Doe\n01 BP 1234 ABIDJAN 01",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value)).toBe(expected);
        },
      );
    });

    describe("organization + name", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "AG",
            organization: "Acme Corp",
            name: "John Doe",
            addressLine1: "123 Main St",
          },
          expected: "John Doe\nAcme Corp\n123 Main St",
        },
        {
          value: {
            country: "FR",
            organization: "Acme Corp",
            name: "John Doe",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "Acme Corp\nJohn Doe\n1 rue de Rivoli\n75001 PARIS",
        },
        {
          value: {
            country: "US",
            organization: "Acme Corp",
            name: "John Doe",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "John Doe\nAcme Corp\n1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043",
        },
        {
          value: {
            country: "CI",
            organization: "Acme Corp",
            name: "John Doe",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "John Doe\nAcme Corp\n01 BP 1234 ABIDJAN 01",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value)).toBe(expected);
        },
      );
    });

    describe("preserveCase", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "1 rue de Rivoli\n75001 Paris",
        },
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75 001",
          },
          expected: "1 rue de Rivoli\n75 001 Paris",
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "1600 Amphitheatre Parkway\nMountain View, California 94043",
        },
        {
          value: {
            country: "CI",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "01 BP 1234 Abidjan 01",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value, { preserveCase: true })).toBe(expected);
        },
      );
    });

    describe("useStateISOCode", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected: "1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CA 94043",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value, { useStateISOCode: true })).toBe(
            expected,
          );
        },
      );

      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "HK",
            addressLine1: "Far East Mans",
            state: "Hong Kong Island",
          },
          expected: "HONG KONG ISLAND\nFar East Mans",
        },
        {
          value: {
            country: "KY",
            addressLine1: "Westin Casuarina Resort",
            state: "Grand Cayman",
            zip: "KY1-1201",
          },
          expected: "Westin Casuarina Resort\nGrand Cayman KY1-1201",
        },
      ])(
        `[EXCEPTIONS] formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value, { useStateISOCode: true })).toBe(
            expected,
          );
        },
      );
    });

    describe("locale", () => {
      it.each<{ value: AddressInput; lang?: string; expected: string }>([
        {
          value: {
            country: "ES",
            state: "V",
            city: "Mislata",
            addressLine1: "Escuadro 56",
            zip: "46920",
          },
          expected: "Escuadro 56\n46920 MISLATA VALENCIA",
        },
        {
          value: {
            country: "ES",
            state: "V",
            city: "Mislata",
            addressLine1: "Escuadro 56",
            zip: "46920",
          },
          lang: "es",
          expected: "Escuadro 56\n46920 MISLATA VALENCIA",
        },
        {
          value: {
            country: "ES",
            state: "V",
            city: "Mislata",
            addressLine1: "Escuadro 56",
            zip: "46920",
          },
          lang: "ca",
          expected: "Escuadro 56\n46920 MISLATA VALÈNCIA",
        },
        {
          value: {
            country: "ES",
            state: "V",
            city: "Mislata",
            addressLine1: "Escuadro 56",
            zip: "46920",
          },
          lang: "gl",
          expected: "Escuadro 56\n46920 MISLATA VALENCIA",
        },
        {
          value: {
            country: "ES",
            state: "V",
            city: "Mislata",
            addressLine1: "Escuadro 56",
            zip: "46920",
          },
          lang: "eu",
          expected: "Escuadro 56\n46920 MISLATA VALENTZIA",
        },
      ])(
        `formatAddress({ ... }, { lang: $lang }) -> $expected`,
        ({ value, lang, expected }) => {
          expect(formatAddress(value, { lang })).toBe(expected);
        },
      );
    });

    describe("appendCountry", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "AG",
            addressLine1: "123 Main St",
          },
          expected: "123 Main St\nANTIGUA AND BARBUDA",
        },
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "1 rue de Rivoli\n75001 PARIS\nFRANCE",
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043\nUNITED STATES",
        },
        {
          value: {
            country: "CI",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "01 BP 1234 ABIDJAN 01\nCOTE D'IVOIRE",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(formatAddress(value, { appendCountry: true })).toBe(expected);
        },
      );
    });

    describe("appendCountry + useCountryISOCode", () => {
      it.each<{ value: AddressInput; expected: string }>([
        {
          value: {
            country: "AG",
            addressLine1: "123 Main St",
          },
          expected: "123 Main St\nAG",
        },
        {
          value: {
            country: "FR",
            addressLine1: "1 rue de Rivoli",
            city: "Paris",
            zip: "75001",
          },
          expected: "1 rue de Rivoli\n75001 PARIS\nFR",
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043\nUS",
        },
        {
          value: {
            country: "CI",
            addressLine1: "BP 1234",
            sortingCode: "01",
            city: "Abidjan",
          },
          expected: "01 BP 1234 ABIDJAN 01\nCI",
        },
      ])(
        `formatAddress({ country: $value.country, ... }) -> $expected`,
        ({ value, expected }) => {
          expect(
            formatAddress(value, {
              appendCountry: true,
              useCountryISOCode: true,
            }),
          ).toBe(expected);
        },
      );
    });

    describe("useLatinisedEquivalents", () => {
      it.each<{ value: AddressInput; expected: string; useLatin: boolean }>([
        {
          value: {
            country: "AE",
            addressLine1: "123 Main St.",
            state: "DU",
          },
          expected: "123 Main St.\nدبي",
          useLatin: false,
        },
        {
          value: {
            country: "AE",
            addressLine1: "123 Main St.",
            state: "DU",
          },
          expected: "123 Main St.\nDubai",
          useLatin: true,
        },
        {
          value: {
            country: "CN",
            addressLine1: "123 Main St.",
            state: "42",
            city: "武汉市", // Wuhan
            zip: "436000",
          },
          expected: "436000\n湖北省武汉市\n123 Main St.",
          useLatin: false,
        },
        {
          value: {
            country: "CN",
            addressLine1: "123 Main St.",
            state: "42",
            city: "武汉市", // Wuhan
            zip: "436000",
          },
          expected: "123 Main St.\n武汉市\nHUBEI SHENG, 436000",
          useLatin: true,
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043",
          useLatin: false,
        },
        {
          value: {
            country: "US",
            state: "CA",
            addressLine1: "1600 Amphitheatre Parkway",
            city: "Mountain View",
            zip: "94043",
          },
          expected:
            "1600 Amphitheatre Parkway\nMOUNTAIN VIEW, CALIFORNIA 94043",
          useLatin: true,
        },
      ])(
        `formatAddress({ country: $value.country, ... }, { useLatin: $useLatin }) -> $expected`,
        ({ value, expected, useLatin }) => {
          expect(
            formatAddress(value, {
              useLatin,
            }),
          ).toBe(expected);
        },
      );
    });
  });

  describe("convertAddressCasing", () => {
    const address: AddressInput = {
      country: "US",
      state: "a",
      city: "a",
      zip: "a",
      addressLine1: "a",
      addressLine2: "a",
      addressLine3: "a",
      sortingCode: "a",
      dependentLocality: "a",
      name: "a",
      organization: "a",
    };

    it.each<{ upper: string; label: string; expected: (keyof AddressInput)[] }>(
      [
        {
          upper: "A",
          label: "Address",
          expected: ["addressLine1", "addressLine2", "addressLine3"],
        },
        {
          upper: "C",
          label: "City",
          expected: ["city"],
        },
        {
          upper: "D",
          label: "Dependent Locality",
          expected: ["dependentLocality"],
        },
        {
          upper: "N",
          label: "Name",
          expected: ["name"],
        },
        {
          upper: "O",
          label: "Organization",
          expected: ["organization"],
        },
        {
          upper: "S",
          label: "State",
          expected: ["state"],
        },
        {
          upper: "X",
          label: "Sorting Code",
          expected: ["sortingCode"],
        },
        {
          upper: "Z",
          label: "Zip",
          expected: ["zip"],
        },
        {
          upper: "ACZ",
          label: "Address, City, Zip",
          expected: [
            "addressLine1",
            "addressLine2",
            "addressLine3",
            "city",
            "zip",
          ],
        },
      ],
    )("$upper should uppercase $label", ({ upper, expected }) => {
      const result = convertAddressCasing(address, upper);

      expected.forEach((key) => {
        expect(result[key]).toBe(address[key]?.toUpperCase());
      });
    });
  });
});
