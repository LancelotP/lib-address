import { codes } from "./codes.ts";
import { registerCountry } from "./registry.ts";
import type { CountryData } from "./types.ts";

for (const country of codes) {
  registerCountry(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("../countries/" + country + ".json") as unknown as CountryData,
  );
}

export * from "./entry-browser";
