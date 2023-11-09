import type {
  CountryCode,
  LocalityType,
  StateType,
  SublocalityType,
  ZipType,
} from "./generated.ts";

export type CountryData = {
  id: string;
  key: CountryCode;
  name: string;
  lname?: string;
  fmt?: string;
  lfmt?: string;
  zip?: string;
  zipex?: string;
  lang?: string;
  upper?: string;
  postprefix?: string;
  require?: string;
  zip_name_type?: ZipType;
  state_name_type?: StateType;
  locality_name_type?: LocalityType;
  sublocality_name_type?: SublocalityType;
  languages?: string;
  isoid?: string;

  sub_regions?: SubRegionData[];
};

export type SubRegionData = {
  key: string;
  name: {
    default: string;
    latin?: string;
    [locale: string]: string | undefined;
  };
  lname?: string;
  zip?: string;
  zipex?: string;
  sub_regions?: SubRegionData[];
};

export type CountryDataWithDefault = CountryData &
  Required<
    Pick<
      CountryData,
      | "fmt"
      | "locality_name_type"
      | "require"
      | "state_name_type"
      | "sublocality_name_type"
      | "upper"
      | "zip_name_type"
    >
  >;

export type AddressInput = {
  country: CountryCode;
  name?: string;
  organization?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  dependentLocality?: string;
  city?: string;
  state?: string;
  zip?: string;
  sortingCode?: string;
};
