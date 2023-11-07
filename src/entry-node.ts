import { codes } from "./codes.json";

import { registerCountry } from "./registry";

for (const country of codes) {
  registerCountry(require("../countries/" + country + ".json"));
}

export * from "./entry-browser";
