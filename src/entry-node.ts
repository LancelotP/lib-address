import { codes } from "./codes";

import { registerCountry } from "./registry";

for (const country of codes) {
  registerCountry(require("../countries/" + country + ".json"));
}

export * from "./entry-browser";
