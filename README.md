# LibAddress

[![GitHub](https://img.shields.io/github/license/lancelotp/lib-address)](https://github.com/LancelotP/lib-address/blob/main/LICENSE)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/LancelotP/lib-address/release-please.yml)](https://github.com/LancelotP/lib-address/actions)
[![npm](https://img.shields.io/npm/v/lib-address?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flib-address)](https://www.npmjs.com/package/lib-address)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/lib-address?link=https%3A%2F%2Fbundlephobia.com%2Fpackage%2Flib-address)](https://bundlephobia.com/package/lib-address)
[![codecov](https://codecov.io/gh/LancelotP/lib-address/graph/badge.svg?token=28O9XY6WIH)](https://codecov.io/gh/LancelotP/lib-address)

## Intro

A tiny library for building forms, parsing and formatting addresses based on Google's [AddessValidationMetadata](https://github.com/google/libaddressinput/wiki/AddressValidationMetadata).

### Features

- 🧙‍♂️&nbsp; Full static typesafety & autocompletion.
- 🌍&nbsp; Supports countries listed in [AddessValidationMetadata](https://github.com/google/libaddressinput/wiki/AddressValidationMetadata).
- 🪶&nbsp; Tiny - 2.5kb gzipped and zero dependencies.
- 🛡️&nbsp; [Zod](https://zod.dev) support (optional).
- 📖&nbsp; Fully documented.
- 🧪&nbsp; Fully tested.
- 🎨&nbsp; Supports multiple languages and latinised equivalents.
- 📦&nbsp; Supports tree-shaking.
<!-- - 👀&nbsp; Quite a few examples in the [./examples](./examples)-folder -->

## Motivation

When building applications for the web, it is often necessary to collect address information from users or companies. However, every country has differents ways of handling addresses.

Whether it is the zip (or postal code) format, the need for a state or province, or the way to format the address itself.

This library aims to provide a simple API for parsing and formatting addresses and interfaces nicely with [Zod](https://zod.dev).

The library is written in TypeScript and is fully typed.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Zod](#zod)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)

## Install

Using npm:

```sh
$ npm install lib-address
```

Using yarn:

```sh
$ yarn add lib-address
```

Using pnpm:

```sh
$ pnpm add lib-address
```

Using bun:

```sh
$ bun install lib-address
```

Once the package is installed, you can import the library using import or require approach:

```ts
import { formatAddress, isAddressValid } from "lib-address";
```

When the package is used in a browser, you need to include the country data you want to use.

```ts
import { registerCountry } from "lib-address";
import CA from "lib-address/countries/CA.json";
import US from "lib-address/countries/US.json";

registerCountry(CA);
registerCountry(US);
```

This is done in order to reduce the size of the package and to allow the user to only include the countries they need. When using it in a Node.js environment, all countries are included by default.

## Usage

```ts
import { isAddressValid } from "lib-address";

isAddressValid({
  country: "FR",
  addressLine1: "1 rue de Rivoli",
  city: "Paris",
  zip: "75001",
});
```

## API

### Registry

#### registerCountry

Used in browser environment to register a country. Countries needs to be registered before using the library. This is done in order to reduce the size of the package and to allow the user to only include the countries they need.

One recommended way to do this is to create a file that will register all the countries you need and import it in your application.

```ts
// address.ts
import { registerCountry } from "lib-address";
import US from "lib-address/countries/US.json";

registerCount(US);

export { formatAddress, isAddressValid } from "lib-address";
```

#### getCountryData

Returns data of a registered country. Mostly used internally, prefer the use of helpers to access country data.

```ts
import { getCountryData } from "lib-address";

const countryData = getCountryData("US");
```

#### getRegisteredCountries

Returns a list of registered countries. Useful to build a country select form and only display countries that you have registered.

```tsx
import { getRegisteredCountries } from "lib-address";

const countries = getRegisteredCountries();

export function CountrySelect() {
  return (
    <select>
      {countries.map((country) => (
        <option key={country.value} value={country.value}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
```

### Validator

#### isValidCountryCode

Checks if a string is a valid country code (ISO 3166-1 alpha-2)

```ts
import { isValidCountryCode } from "lib-address";

isValidCountryCode("US"); // true
isValidCountryCode("USA"); // false
```

#### isValidSubdivisionCode

Checks if a string is a valid subdivision code (ISO 3166-2)

> [!NOTE
> The country needs to be registered in order to validate the subdivision code.

```ts
import { isValidSubdivisionCode } from "lib-address";

isValidSubdivisionCode("US", "CA"); // true
isValidSubdivisionCode("US", "ZZ"); // false
```

#### validateAddress

Validates an address object against country rules.
Throws a `MissingFieldsError` if any required fields are missing.
Throws a `InvalidStateError` if the state code is invalid (if applicable).
Throws a `InvalidZipError` if the zip code is invalid (if applicable).
Throws a `InvalidZipSubRegionError` if the zip code is invalid for the subdivision (if applicable).

```ts
import { validateAddress } from "lib-address";
```

```ts
validateAddress({
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
  subdivision: "CA",
  zip: "95014",
}); // OK
```

```ts
validateAddress({
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
  subdivision: "CA",
  zip: "98014", // <- InvalidZip for US-CA
}); // InvalidZipSubRegionError
```

```ts
validateAddress({
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
  subdivision: "CA",
  zip: "8014", // <- InvalidZip for US
}); // InvalidZipError
```

```ts
validateAddress({
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
  subdivision: "ZZ", // <- InvalidState for US
  zip: "95014",
}); // InvalidStateError
```

```ts
validateAddress({
  // Missing Zip and State
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
}); // MissingFieldsError
```

#### isAddressValid

Checks if an address object is valid against country rules.
Returns `true` if the address is valid, `false` otherwise.

```ts
import { isAddressValid } from "lib-address";
```

```ts
isAddressValid({
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
  subdivision: "CA",
  zip: "95014",
}); // true
```

```ts
isAddressValid({
  country: "US",
  addressLine1: "1 Infinite Loop",
  city: "Cupertino",
  subdivision: "CA",
  zip: "98014", // <- InvalidZip
}); // false
```

### Formatter

#### formatAddress

Formats an address object into a string.

```ts
import { formatAddress } from "lib-address";
```

```ts
formatAddress({
  country: "AG",
  addressLine1: "123 Main St",
});

// 123 Main St
```

```ts
formatAddress({
  country: "FR",
  addressLine1: "1 rue de Rivoli",
  city: "Paris",
  zip: "75001",
});

/**
 * 1 rue de Rivoli
 * 75001 Paris
 */
```

```ts
formatAddress({
  country: "US",
  state: "CA",
  addressLine1: "1600 Amphitheatre Parkway",
  city: "Mountain View",
  zip: "94043",
});

/**
 * 1600 Amphitheatre Parkway
 * MOUNTAIN VIEW, CALIFORNIA 94043
 */
```

formatAddress can also be used to add recipient information to the address following country specifc formats.

```ts
formatAddress({
  country: "US",
  state: "CA",
  addressLine1: "1600 Amphitheatre Parkway",
  city: "Mountain View",
  zip: "94043",
  name: "John Doe",
  organization: "Acme Corp",
});

/**
 * John Doe
 * Acme Corp
 * 1600 Amphitheatre Parkway
 * MOUNTAIN VIEW, CALIFORNIA 94043
 */
```

```ts
formatAddress({
  country: "FR",
  organization: "Acme Corp",
  name: "John Doe",
  addressLine1: "1 rue de Rivoli",
  city: "Paris",
  zip: "75001",
});

/**
 * Acme Corp
 * John Doe
 * 1 rue de Rivoli
 * 75001 PARIS
 */
```

##### options

formatAddress accepts an optional options object as a second argument.

```ts
type FormatAddressOptions = {
  /**
   * @description Preserve input case if true
   * @default false
   */
  preserveCase?: boolean;
  /**
   * @description Use ISO 3166-2 subdivision code for state if true. Otherwise, use the state name
   * For example, use "CA" instead of "California"
   *
   * Some countries do not have ISO 3166-2 subdivision codes and will always use the state name regardless of this option
   * For example, "HK" (Hong Kong) and "KY" (Cayman Islands)
   *
   * @default false
   */
  useStateISOCode?: boolean;
  /**
   * @description Append country name to the end of the address if true. Useful for international addresses
   * @default false
   */
  appendCountry?: boolean;
  /**
   * @description Use ISO 3166-1 alpha-2 country code for country if true. Otherwise, use the country name
   * @default false
   */
  useCountryISOCode?: boolean;
  /**
   * @description Lang to use for country and subdivision names. If not provided, the default lang is used. Not all countries support multiple langs
   */
  lang?: string;
  /**
   * @description Use latinised equivalents for country, subdivision names and format if true. Not all countries support latinised equivalents
   * @default false
   */
  useLatin?: boolean;
};
```

### Helpers

Helpers are functions that return data about a country. They are useful to build forms based on country rules.

#### getCountryFields

Returns an object containing all the fields for a country and their rules.

```ts
import { getCountryFields } from "lib-address";

const countryFields = getCountryFields("US");
```

```json
{
  "addressLine1": "required",
  "addressLine2": "optional",
  "addressLine3": "optional",
  "state": "required",
  "zip": "required",
  "city": "required"
}
```

#### getRequiredFields

Returns an array of required fields for a country.

```ts
import { getRequiredFields } from "lib-address";

const countryFields = getRequiredFields("US");
```

```json
["state", "zip", "city", "addressLine1"]
```

#### getOptionnalFields

Returns an array of optionnal fields for a country.

```ts
import { getOptionnalFields } from "lib-address";

const countryFields = getOptionnalFields("US");
```

```json
["state", "zip", "city", "addressLine1"]
```

#### getZipExamples

Returns an array of zip code examples for a country.

> [!NOTE]
> If the country does not have zip code examples, an empty array is returned.

```ts
import { getZipExamples } from "lib-address";

const countryFields = getZipExamples("US");
```

```json
["95014", "22162-1010"]
```

Can also be used for subdivisions.

```ts
import { getZipExamples } from "lib-address";

const countryFields = getZipExamples("US", "CA");
```

```json
["90000", "96199"]
```

#### getCountryStates

Returns an array of states for a country.

> [!NOTE]
> If the country does not have states, an empty array is returned.

```ts
import { getCountryStates } from "lib-address";

const countryFields = getCountryStates("US");
```

```json
[
  {
    "code": "AL",
    "name": "Alabama"
  },
  {
    "code": "AK",
    "name": "Alaska"
  },
  ...
]
```

## Zod

This library exports a [Zod](https://zod.dev/) schema for validating addresses.

> [!NOTE]
> The Zod schema is not exported by default in order to reduce the size of the package. If you want to use it, you need to import it from `lib-address/zod`.
> Zod is not a dependency of this library and needs to be installed separately.

```ts
import { getAddressSchema } "lib-address/zod";
```

```ts
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  address: getAddressSchema(),
});

function validateForm(data: unknown) {
  return formSchema.parse(data);
}
```

> [!WARNING]
> The Zod schema will throw if you attempt to validate a country that is not registered. (Only applicable in browser environment)

## Tests

To run tests:

```
pnpm test
```

To generate a code coverage report:

```
pnpm coverage
```

The code coverage report can be viewed by opening `./coverage/index.html`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
