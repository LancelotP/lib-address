import update from "immutability-helper";

import type { CountryCode } from "../src/generated.ts";
import type { CountryData } from "../src/types.ts";

export function override(data: Record<CountryCode, CountryData>) {
  return update(data, {
    FR: {
      state_name_type: { $set: "region" },
    },
  });
}
