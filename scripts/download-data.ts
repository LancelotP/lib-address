import axios from "axios";
import axiosRetry from "axios-retry";
import type { SingleBar } from "cli-progress";

import type {
  CountryCode,
  LocalityType,
  StateType,
  SublocalityType,
  ZipType,
} from "../src/generated.ts";
import type { CountryData, SubRegionData } from "../src/types";

axiosRetry(axios, { retries: 3 });

const BASE_URL = "https://chromium-i18n.appspot.com/ssl-address";

export async function getCountryCodes() {
  const response = await fetch(`${BASE_URL}/data`);
  const data = (await response.json()) as { id: "data"; countries: string };

  return data.countries.split("~") as CountryCode[];
}

export async function getCountrySubRegionData(
  id: string,
  extraLocales: string[] = [],
  progress?: SingleBar,
): Promise<SubRegionData> {
  const url = `${BASE_URL}/${id}`;

  const res = await axios.get<JSONSubRegionData>(url);
  const resLocales = await Promise.all(
    extraLocales.map(async (locale) => ({
      locale,
      data: await axios.get<JSONSubRegionData>(`${url}--${locale}`),
    })),
  );

  const subRegionKeys = res.data.sub_keys?.split("~") ?? [];
  progress?.setTotal(progress.getTotal() + subRegionKeys.length);

  const sub_regions = await Promise.all(
    subRegionKeys.map(async (key) => {
      const result = await getCountrySubRegionData(
        `${res.data.id}/${key}`,
        extraLocales,
        progress,
      );
      progress?.increment();
      return result;
    }),
  );

  const foo = {
    key: res.data.isoid ?? res.data.key,
    name: {
      default: res.data.name ?? res.data.key,
      latin: res.data.lname,
      ...Object.fromEntries(
        resLocales.map(({ locale, data }) => [locale, data.data.name]),
      ),
    },
    zip: res.data.zip,
    zipex: res.data.zipex,
    sub_regions: sub_regions.length ? sub_regions : undefined,
  };

  return foo;
}

export async function getCountryData<K extends string>(
  countryCode: K,
  progress?: SingleBar,
): Promise<CountryData> {
  const url = `${BASE_URL}/data/${countryCode}`;

  const res = await axios.get<JSONCountryData>(url);

  if (res.status !== 200) {
    throw new Error(`Failed to fetch country data for ${countryCode}`);
  }

  const extraLocales = res.data.languages?.split("~").slice(1) ?? [];

  const subRegionKeys = res.data.sub_keys?.split("~") ?? [];
  progress?.setTotal(progress.getTotal() + subRegionKeys.length);

  const sub_regions = await Promise.all(
    subRegionKeys.map(async (key) => {
      const result = await getCountrySubRegionData(
        `${res.data.id}/${key}`,
        extraLocales,
        progress,
      );
      progress?.increment();
      return result;
    }),
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
  zip_name_type?: ZipType;
  state_name_type?: StateType;
  locality_name_type?: LocalityType;
  sublocality_name_type?: SublocalityType;
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
