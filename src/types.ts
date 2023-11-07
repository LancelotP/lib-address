export type CountryCode = string;

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
  zip_name_type?: string;
  state_name_type?: string;
  locality_name_type?: string;
  sublocality_name_type?: string;
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

export type Address = AddressInput & {
  country: "FR" | "US" | "CH";
  city: string;
  zip: string;
};
