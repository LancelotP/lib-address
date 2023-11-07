import { writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import axiosRetry from "axios-retry";

import { CountryData, SubRegionData } from "../src/types";
import { CountryCode } from "../src/codes";

axiosRetry(axios, { retries: 3 });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = "https://chromium-i18n.appspot.com/ssl-address";

type CountryMetadata = any;

async function getCountryCodes() {
  const response = await fetch(`${BASE_URL}/data`);
  const data = (await response.json()) as { id: "data"; countries: string };

  return data.countries.split("~");
}

type JSONSubRegionData = {
  id: string;
  key: string;
  name: string;
  lname?: string;
  lang?: string;
  zip?: string;
  zipex?: string;
  isoid?: string;
  sub_keys?: string;
};

async function getCountrySubRegionData(
  id: string,
  extraLocales: string[] = []
): Promise<SubRegionData> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<JSONSubRegionData>(url);
  const resLocales = await Promise.all(
    extraLocales.map(async (locale) => ({
      locale,
      data: await axios.get<JSONSubRegionData>(`${url}--${locale}`),
    }))
  );

  console.log(res.data.id);

  const sub_regions = await Promise.all(
    (res.data.sub_keys?.split("~") ?? []).map((key) =>
      getCountrySubRegionData(`${res.data.id}/${key}`, extraLocales)
    )
  );

  const foo = {
    key: res.data.isoid ?? res.data.key,
    name: {
      default: res.data.name ?? res.data.key,
      latin: res.data.lname,
      ...Object.fromEntries(
        resLocales.map(({ locale, data }) => [locale, data.data.name])
      ),
    },
    zip: res.data.zip,
    zipex: res.data.zipex,
    sub_regions: sub_regions.length ? sub_regions : undefined,
  };

  return foo;
}

async function getCountryData<K extends string>(
  countryCode: K
): Promise<CountryData> {
  const url = `${BASE_URL}/data/${countryCode}`;

  const res = await axios.get<JSONCountryData>(url);

  if (res.status !== 200) {
    throw new Error(`Failed to fetch country data for ${countryCode}`);
  }

  const extraLocales = res.data.languages?.split("~").slice(1) ?? [];
  console.log(res.data.key);

  const sub_regions = await Promise.all(
    (res.data.sub_keys?.split("~") ?? []).map((key) =>
      getCountrySubRegionData(`${res.data.id}/${key}`, extraLocales)
    )
  );

  return {
    id: res.data.id,
    key: res.data.key as CountryCode,
    name: res.data.name,
    fmt: res.data.fmt,
    lfmt: res.data.lfmt,
    zip: res.data.zip,
    zipex: res.data.zipex,
    lang: res.data.lang,
    upper: res.data.upper,
    locality_name_type: res.data.locality_name_type,
    postprefix: res.data.postprefix,
    require: res.data.require,
    state_name_type: res.data.state_name_type,
    sublocality_name_type: res.data.sublocality_name_type,
    zip_name_type: res.data.zip_name_type,
    sub_regions: sub_regions.length ? sub_regions : undefined,
  };
}

async function downloadMetadata() {
  const countryCodes = await getCountryCodes();

  const dict: Record<string, CountryMetadata> = {};

  const results = await Promise.all(
    countryCodes.map((countryCode) => getCountryData(countryCode))
  );

  for (const result of results) {
    dict[result.key] = result;
  }

  await Promise.all(
    results.map((result) =>
      writeFile(
        resolve(__dirname, "../countries", `${result.key}.json`),
        JSON.stringify(result, null, 2),
        "utf-8"
      )
    )
  );

  await writeFile(
    resolve(__dirname, "../src/codes.ts"),
    [
      `export const codes = ${JSON.stringify(Object.keys(dict), null, 2)};`,
      "",
      "export type CountryCode = (typeof codes)[number]",
      "",
    ].join("\n"),
    "utf-8"
  );

  return dict;
}

async function buildSource() {
  await downloadMetadata();
}

buildSource();

type JSONCountryData = {
  id: string;
  key: string;
  name: string;
  fmt?: string;
  lfmt?: string;
  zip?: string;
  zipex?: string;
  lang?: string;
  languages?: string;
  zip_name_type?: string;
  state_name_type?: string;
  locality_name_type?: string;
  sublocality_name_type?: string;
  sub_keys?: string;
  sub_names?: string;
  sub_zips?: string;
  sub_zipexs?: string;
  sub_isoids?: string;
  require?: string;
  sub_lnames?: string;
  upper?: string;
  postprefix?: string;
  sub_mores?: string;
  sub_xzips?: string;
  sub_xrequires?: string;
};
