import { codes } from "./codes";
import { registerCountry } from "./registry";
import type { CountryData } from "./types";

for (const country of codes) {
  registerCountry(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("../countries/" + country + ".json") as unknown as CountryData,
  );
}

export * from "./entry-browser";
