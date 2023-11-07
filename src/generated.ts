export type CountryCode =
  | "AC"
  | "AD"
  | "AE"
  | "AF"
  | "AG"
  | "AI"
  | "AL"
  | "AM"
  | "AO"
  | "AQ"
  | "AR"
  | "AS"
  | "AT"
  | "AU"
  | "AW"
  | "AX"
  | "AZ"
  | "BA"
  | "BB"
  | "BD"
  | "BE"
  | "BF"
  | "BG"
  | "BH"
  | "BI"
  | "BJ"
  | "BL"
  | "BM"
  | "BN"
  | "BO"
  | "BQ"
  | "BR"
  | "BS"
  | "BT"
  | "BV"
  | "BW"
  | "BY"
  | "BZ"
  | "CA"
  | "CC"
  | "CD"
  | "CF"
  | "CG"
  | "CH"
  | "CI"
  | "CK"
  | "CL"
  | "CM"
  | "CN"
  | "CO"
  | "CR"
  | "CU"
  | "CV"
  | "CW"
  | "CX"
  | "CY"
  | "CZ"
  | "DE"
  | "DJ"
  | "DK"
  | "DM"
  | "DO"
  | "DZ"
  | "EC"
  | "EE"
  | "EG"
  | "EH"
  | "ER"
  | "ES"
  | "ET"
  | "FI"
  | "FJ"
  | "FK"
  | "FM"
  | "FO"
  | "FR"
  | "GA"
  | "GB"
  | "GD"
  | "GE"
  | "GF"
  | "GG"
  | "GH"
  | "GI"
  | "GL"
  | "GM"
  | "GN"
  | "GP"
  | "GQ"
  | "GR"
  | "GS"
  | "GT"
  | "GU"
  | "GW"
  | "GY"
  | "HK"
  | "HM"
  | "HN"
  | "HR"
  | "HT"
  | "HU"
  | "ID"
  | "IE"
  | "IL"
  | "IM"
  | "IN"
  | "IO"
  | "IQ"
  | "IR"
  | "IS"
  | "IT"
  | "JE"
  | "JM"
  | "JO"
  | "JP"
  | "KE"
  | "KG"
  | "KH"
  | "KI"
  | "KM"
  | "KN"
  | "KP"
  | "KR"
  | "KW"
  | "KY"
  | "KZ"
  | "LA"
  | "LB"
  | "LC"
  | "LI"
  | "LK"
  | "LR"
  | "LS"
  | "LT"
  | "LU"
  | "LV"
  | "LY"
  | "MA"
  | "MC"
  | "MD"
  | "ME"
  | "MF"
  | "MG"
  | "MH"
  | "MK"
  | "ML"
  | "MM"
  | "MN"
  | "MO"
  | "MP"
  | "MQ"
  | "MR"
  | "MS"
  | "MT"
  | "MU"
  | "MV"
  | "MW"
  | "MX"
  | "MY"
  | "MZ"
  | "NA"
  | "NC"
  | "NE"
  | "NF"
  | "NG"
  | "NI"
  | "NL"
  | "NO"
  | "NP"
  | "NR"
  | "NU"
  | "NZ"
  | "OM"
  | "PA"
  | "PE"
  | "PF"
  | "PG"
  | "PH"
  | "PK"
  | "PL"
  | "PM"
  | "PN"
  | "PR"
  | "PS"
  | "PT"
  | "PW"
  | "PY"
  | "QA"
  | "RE"
  | "RO"
  | "RS"
  | "RU"
  | "RW"
  | "SA"
  | "SB"
  | "SC"
  | "SD"
  | "SE"
  | "SG"
  | "SH"
  | "SI"
  | "SJ"
  | "SK"
  | "SL"
  | "SM"
  | "SN"
  | "SO"
  | "SR"
  | "SS"
  | "ST"
  | "SV"
  | "SX"
  | "SY"
  | "SZ"
  | "TA"
  | "TC"
  | "TD"
  | "TF"
  | "TG"
  | "TH"
  | "TJ"
  | "TK"
  | "TL"
  | "TM"
  | "TN"
  | "TO"
  | "TR"
  | "TT"
  | "TV"
  | "TW"
  | "TZ"
  | "UA"
  | "UG"
  | "UM"
  | "US"
  | "UY"
  | "UZ"
  | "VA"
  | "VC"
  | "VE"
  | "VG"
  | "VI"
  | "VN"
  | "VU"
  | "WF"
  | "WS"
  | "XK"
  | "YE"
  | "YT"
  | "ZA"
  | "ZM"
  | "ZW"
  | "ZZ";

export type StateType =
  | "area"
  | "county"
  | "department"
  | "district"
  | "do_si"
  | "emirate"
  | "island"
  | "oblast"
  | "parish"
  | "prefecture"
  | "province"
  | "region"
  | "state";

export type ZipType = "eircode" | "pin" | "postal" | "zip";

export type LocalityType = "city" | "district" | "post_town" | "suburb";

export type SublocalityType =
  | "district"
  | "neighborhood"
  | "suburb"
  | "townland"
  | "village_township";

export type BaseAddress = {
  organization?: string;
  name?: string;
};

export type AnyAddress = {
  country: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  dependentLocality?: string;
  sortingCode?: string;
  state?: string;
  zip?: string;
};

export type Address = BaseAddress &
  AnyAddress &
  (
    | AddressAC
    | AddressAD
    | AddressAE
    | AddressAF
    | AddressAG
    | AddressAI
    | AddressAL
    | AddressAM
    | AddressAO
    | AddressAQ
    | AddressAR
    | AddressAS
    | AddressAT
    | AddressAU
    | AddressAW
    | AddressAX
    | AddressAZ
    | AddressBA
    | AddressBB
    | AddressBD
    | AddressBE
    | AddressBF
    | AddressBG
    | AddressBH
    | AddressBI
    | AddressBJ
    | AddressBL
    | AddressBM
    | AddressBN
    | AddressBO
    | AddressBQ
    | AddressBR
    | AddressBS
    | AddressBT
    | AddressBV
    | AddressBW
    | AddressBY
    | AddressBZ
    | AddressCA
    | AddressCC
    | AddressCD
    | AddressCF
    | AddressCG
    | AddressCH
    | AddressCI
    | AddressCK
    | AddressCL
    | AddressCM
    | AddressCN
    | AddressCO
    | AddressCR
    | AddressCU
    | AddressCV
    | AddressCW
    | AddressCX
    | AddressCY
    | AddressCZ
    | AddressDE
    | AddressDJ
    | AddressDK
    | AddressDM
    | AddressDO
    | AddressDZ
    | AddressEC
    | AddressEE
    | AddressEG
    | AddressEH
    | AddressER
    | AddressES
    | AddressET
    | AddressFI
    | AddressFJ
    | AddressFK
    | AddressFM
    | AddressFO
    | AddressFR
    | AddressGA
    | AddressGB
    | AddressGD
    | AddressGE
    | AddressGF
    | AddressGG
    | AddressGH
    | AddressGI
    | AddressGL
    | AddressGM
    | AddressGN
    | AddressGP
    | AddressGQ
    | AddressGR
    | AddressGS
    | AddressGT
    | AddressGU
    | AddressGW
    | AddressGY
    | AddressHK
    | AddressHM
    | AddressHN
    | AddressHR
    | AddressHT
    | AddressHU
    | AddressID
    | AddressIE
    | AddressIL
    | AddressIM
    | AddressIN
    | AddressIO
    | AddressIQ
    | AddressIR
    | AddressIS
    | AddressIT
    | AddressJE
    | AddressJM
    | AddressJO
    | AddressJP
    | AddressKE
    | AddressKG
    | AddressKH
    | AddressKI
    | AddressKM
    | AddressKN
    | AddressKP
    | AddressKR
    | AddressKW
    | AddressKY
    | AddressKZ
    | AddressLA
    | AddressLB
    | AddressLC
    | AddressLI
    | AddressLK
    | AddressLR
    | AddressLS
    | AddressLT
    | AddressLU
    | AddressLV
    | AddressLY
    | AddressMA
    | AddressMC
    | AddressMD
    | AddressME
    | AddressMF
    | AddressMG
    | AddressMH
    | AddressMK
    | AddressML
    | AddressMM
    | AddressMN
    | AddressMO
    | AddressMP
    | AddressMQ
    | AddressMR
    | AddressMS
    | AddressMT
    | AddressMU
    | AddressMV
    | AddressMW
    | AddressMX
    | AddressMY
    | AddressMZ
    | AddressNA
    | AddressNC
    | AddressNE
    | AddressNF
    | AddressNG
    | AddressNI
    | AddressNL
    | AddressNO
    | AddressNP
    | AddressNR
    | AddressNU
    | AddressNZ
    | AddressOM
    | AddressPA
    | AddressPE
    | AddressPF
    | AddressPG
    | AddressPH
    | AddressPK
    | AddressPL
    | AddressPM
    | AddressPN
    | AddressPR
    | AddressPS
    | AddressPT
    | AddressPW
    | AddressPY
    | AddressQA
    | AddressRE
    | AddressRO
    | AddressRS
    | AddressRU
    | AddressRW
    | AddressSA
    | AddressSB
    | AddressSC
    | AddressSD
    | AddressSE
    | AddressSG
    | AddressSH
    | AddressSI
    | AddressSJ
    | AddressSK
    | AddressSL
    | AddressSM
    | AddressSN
    | AddressSO
    | AddressSR
    | AddressSS
    | AddressST
    | AddressSV
    | AddressSX
    | AddressSY
    | AddressSZ
    | AddressTA
    | AddressTC
    | AddressTD
    | AddressTF
    | AddressTG
    | AddressTH
    | AddressTJ
    | AddressTK
    | AddressTL
    | AddressTM
    | AddressTN
    | AddressTO
    | AddressTR
    | AddressTT
    | AddressTV
    | AddressTW
    | AddressTZ
    | AddressUA
    | AddressUG
    | AddressUM
    | AddressUS
    | AddressUY
    | AddressUZ
    | AddressVA
    | AddressVC
    | AddressVE
    | AddressVG
    | AddressVI
    | AddressVN
    | AddressVU
    | AddressWF
    | AddressWS
    | AddressXK
    | AddressYE
    | AddressYT
    | AddressZA
    | AddressZM
    | AddressZW
  );

export type AddressAC = {
  country: "AC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressAD = {
  country: "AD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressAE = {
  country: "AE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
  state: string;
};

export type AddressAF = {
  country: "AF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressAG = {
  country: "AG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  name?: string;
  organization?: string;
};

export type AddressAI = {
  country: "AI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressAL = {
  country: "AL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressAM = {
  country: "AM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressAO = {
  country: "AO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressAQ = {
  country: "AQ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressAR = {
  country: "AR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressAS = {
  country: "AS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressAT = {
  country: "AT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressAU = {
  country: "AU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressAW = {
  country: "AW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressAX = {
  country: "AX";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressAZ = {
  country: "AZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBA = {
  country: "BA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBB = {
  country: "BB";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressBD = {
  country: "BD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBE = {
  country: "BE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressBF = {
  country: "BF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
};

export type AddressBG = {
  country: "BG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBH = {
  country: "BH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBI = {
  country: "BI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressBJ = {
  country: "BJ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressBL = {
  country: "BL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressBM = {
  country: "BM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBN = {
  country: "BN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBO = {
  country: "BO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressBQ = {
  country: "BQ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressBR = {
  country: "BR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressBS = {
  country: "BS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
};

export type AddressBT = {
  country: "BT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressBV = {
  country: "BV";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressBW = {
  country: "BW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressBY = {
  country: "BY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressBZ = {
  country: "BZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCA = {
  country: "CA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressCC = {
  country: "CC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressCD = {
  country: "CD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCF = {
  country: "CF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCG = {
  country: "CG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCH = {
  country: "CH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressCI = {
  country: "CI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
};

export type AddressCK = {
  country: "CK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCL = {
  country: "CL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressCM = {
  country: "CM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCN = {
  country: "CN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressCO = {
  country: "CO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressCR = {
  country: "CR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressCU = {
  country: "CU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressCV = {
  country: "CV";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressCW = {
  country: "CW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressCX = {
  country: "CX";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressCY = {
  country: "CY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressCZ = {
  country: "CZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressDE = {
  country: "DE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressDJ = {
  country: "DJ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressDK = {
  country: "DK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressDM = {
  country: "DM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressDO = {
  country: "DO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressDZ = {
  country: "DZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressEC = {
  country: "EC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressEE = {
  country: "EE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressEG = {
  country: "EG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressEH = {
  country: "EH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressER = {
  country: "ER";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressES = {
  country: "ES";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressET = {
  country: "ET";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressFI = {
  country: "FI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressFJ = {
  country: "FJ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressFK = {
  country: "FK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressFM = {
  country: "FM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressFO = {
  country: "FO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressFR = {
  country: "FR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressGA = {
  country: "GA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressGB = {
  country: "GB";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressGD = {
  country: "GD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressGE = {
  country: "GE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressGF = {
  country: "GF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressGG = {
  country: "GG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressGH = {
  country: "GH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressGI = {
  country: "GI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressGL = {
  country: "GL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressGM = {
  country: "GM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressGN = {
  country: "GN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressGP = {
  country: "GP";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressGQ = {
  country: "GQ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressGR = {
  country: "GR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressGS = {
  country: "GS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressGT = {
  country: "GT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressGU = {
  country: "GU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressGW = {
  country: "GW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressGY = {
  country: "GY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressHK = {
  country: "HK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  name?: string;
  organization?: string;
  state: string;
};

export type AddressHM = {
  country: "HM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressHN = {
  country: "HN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressHR = {
  country: "HR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressHT = {
  country: "HT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressHU = {
  country: "HU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressID = {
  country: "ID";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressIE = {
  country: "IE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressIL = {
  country: "IL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressIM = {
  country: "IM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressIN = {
  country: "IN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressIO = {
  country: "IO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressIQ = {
  country: "IQ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressIR = {
  country: "IR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressIS = {
  country: "IS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressIT = {
  country: "IT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressJE = {
  country: "JE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressJM = {
  country: "JM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  state: string;
};

export type AddressJO = {
  country: "JO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressJP = {
  country: "JP";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressKE = {
  country: "KE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressKG = {
  country: "KG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressKH = {
  country: "KH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressKI = {
  country: "KI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
};

export type AddressKM = {
  country: "KM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressKN = {
  country: "KN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
};

export type AddressKP = {
  country: "KP";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressKR = {
  country: "KR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressKW = {
  country: "KW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressKY = {
  country: "KY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressKZ = {
  country: "KZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressLA = {
  country: "LA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressLB = {
  country: "LB";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressLC = {
  country: "LC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressLI = {
  country: "LI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressLK = {
  country: "LK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressLR = {
  country: "LR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressLS = {
  country: "LS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressLT = {
  country: "LT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressLU = {
  country: "LU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressLV = {
  country: "LV";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressLY = {
  country: "LY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressMA = {
  country: "MA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMC = {
  country: "MC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip?: string;
};

export type AddressMD = {
  country: "MD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressME = {
  country: "ME";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMF = {
  country: "MF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressMG = {
  country: "MG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMH = {
  country: "MH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressMK = {
  country: "MK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressML = {
  country: "ML";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressMM = {
  country: "MM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMN = {
  country: "MN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressMO = {
  country: "MO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
};

export type AddressMP = {
  country: "MP";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressMQ = {
  country: "MQ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressMR = {
  country: "MR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressMS = {
  country: "MS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressMT = {
  country: "MT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMU = {
  country: "MU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMV = {
  country: "MV";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressMW = {
  country: "MW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
};

export type AddressMX = {
  country: "MX";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressMY = {
  country: "MY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressMZ = {
  country: "MZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressNA = {
  country: "NA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressNC = {
  country: "NC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressNE = {
  country: "NE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressNF = {
  country: "NF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressNG = {
  country: "NG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressNI = {
  country: "NI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressNL = {
  country: "NL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressNO = {
  country: "NO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressNP = {
  country: "NP";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressNR = {
  country: "NR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
  state: string;
};

export type AddressNU = {
  country: "NU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressNZ = {
  country: "NZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressOM = {
  country: "OM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressPA = {
  country: "PA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
};

export type AddressPE = {
  country: "PE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressPF = {
  country: "PF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressPG = {
  country: "PG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressPH = {
  country: "PH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressPK = {
  country: "PK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressPL = {
  country: "PL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressPM = {
  country: "PM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressPN = {
  country: "PN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressPR = {
  country: "PR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressPS = {
  country: "PS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressPT = {
  country: "PT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressPW = {
  country: "PW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressPY = {
  country: "PY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressQA = {
  country: "QA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressRE = {
  country: "RE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressRO = {
  country: "RO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressRS = {
  country: "RS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressRU = {
  country: "RU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressRW = {
  country: "RW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressSA = {
  country: "SA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressSB = {
  country: "SB";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressSC = {
  country: "SC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
};

export type AddressSD = {
  country: "SD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressSE = {
  country: "SE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressSG = {
  country: "SG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressSH = {
  country: "SH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressSI = {
  country: "SI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressSJ = {
  country: "SJ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressSK = {
  country: "SK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressSL = {
  country: "SL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressSM = {
  country: "SM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressSN = {
  country: "SN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressSO = {
  country: "SO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressSR = {
  country: "SR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
};

export type AddressSS = {
  country: "SS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressST = {
  country: "ST";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressSV = {
  country: "SV";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressSX = {
  country: "SX";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressSY = {
  country: "SY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressSZ = {
  country: "SZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressTA = {
  country: "TA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressTC = {
  country: "TC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressTD = {
  country: "TD";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTF = {
  country: "TF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTG = {
  country: "TG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTH = {
  country: "TH";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressTJ = {
  country: "TJ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressTK = {
  country: "TK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTL = {
  country: "TL";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTM = {
  country: "TM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressTN = {
  country: "TN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressTO = {
  country: "TO";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTR = {
  country: "TR";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressTT = {
  country: "TT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressTV = {
  country: "TV";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
};

export type AddressTW = {
  country: "TW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressTZ = {
  country: "TZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressUA = {
  country: "UA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip: string;
};

export type AddressUG = {
  country: "UG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressUM = {
  country: "UM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressUS = {
  country: "US";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressUY = {
  country: "UY";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressUZ = {
  country: "UZ";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressVA = {
  country: "VA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressVC = {
  country: "VC";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressVE = {
  country: "VE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip?: string;
};

export type AddressVG = {
  country: "VG";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city?: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressVI = {
  country: "VI";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state: string;
  zip: string;
};

export type AddressVN = {
  country: "VN";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  state?: string;
  zip?: string;
};

export type AddressVU = {
  country: "VU";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressWF = {
  country: "WF";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressWS = {
  country: "WS";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressXK = {
  country: "XK";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressYE = {
  country: "YE";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};

export type AddressYT = {
  country: "YT";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  sortingCode?: string;
  zip: string;
};

export type AddressZA = {
  country: "ZA";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  dependentLocality?: string;
  name?: string;
  organization?: string;
  zip: string;
};

export type AddressZM = {
  country: "ZM";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
  zip?: string;
};

export type AddressZW = {
  country: "ZW";
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  city: string;
  name?: string;
  organization?: string;
};
