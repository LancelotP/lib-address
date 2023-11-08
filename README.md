# LibAddress

![GitHub](https://img.shields.io/github/license/lancelotp/lib-address)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/LancelotP/lib-address/release-please.yml)
![npm](https://img.shields.io/npm/v/lib-address?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Flib-address)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/lib-address?link=https%3A%2F%2Fbundlephobia.com%2Fpackage%2Flib-address)

## Description

A library for parsing and formatting addresses based on Google's [AddessValidationMetadata](https://github.com/google/libaddressinput/wiki/AddressValidationMetadata).

When building applications for the web, it is often necessary to collect address information from users or companies. However, every country has differents ways of handling addresses.

Wether it is the zip (or postal code) format, the need for a state or province, or the way to format the address itself.

This library aims to provide a simple API for parsing and formatting addresses.

The library is written in TypeScript and is fully typed.

## Table of Contents

- [Usage](#usage)
- [API](#api)
- [Install](#install)
- [Tests](#tests)
- [Contributing](#contributing)
- [License](#license)

## Usage

> Under construction

```ts
import { isAddressValid, registerCountry } from "lib-address";
import fr from "lib-address/countries/fr.json";

registerCountry(fr);

isAddressValid({
  country: "FR",
  addressLine1: "1 rue de Rivoli",
  city: "Paris",
  zip: "75001",
});
```

## API

> Under construction

## Install

via [npm](https://npmjs.org)

```sh
$ npm install --save lib-address
```

via [yarn](https://yarnpkg.com)

```sh
$ yarn add lib-address
```

via [pnpm](https://pnpm.io)

```sh
$ pnpm add lib-address
```

via [bun](https://bun.sh)

```sh
$ bun install lib-address
```

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
