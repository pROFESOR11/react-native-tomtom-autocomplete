export interface TomTomOptions {
  key: string;
  limit?: number;
  typeahead?: boolean;
  ofs?: number;
  countrySet?: string;
  lat?: number;
  lon?: number;
  radius?: number;
  topLeft?: string;
  btmRight?: string;
  language?: string;
  extendedPostalCodesFor?: string;
  minFuzzyLevel?: number;
  maxFuzzyLevel?: number;
  idxSet?: string;
  categorySet?: string;
  brandSet?: string;
  connectorSet?: string;
  minPowerKW?: number;
  maxPowerKW?: number;
  fuelSet?: string;
  view?: string;
  openingHours?: string;
  timeZone?: string;
  mapcodes?: string;
  relatedPois?: string;
}

export interface TomTomPOISearchResponse {
  summary: TomTomPOISearchResponseSummary;
  results: TomTomPOISearchResponseResult[];
}

export interface TomTomPOISearchResponseSummary {
  query: string;
  queryType: "NEARBY" | "NON_NEAR";
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
  geoBias?: string;
}

export interface TomTomPOISearchResponseResult {
  type:
    | "POI"
    | "Street"
    | "Geography"
    | "Point Address"
    | "Address Range"
    | "Cross Street";
  id: string;
  score: number;
  dist?: number;
  info: string;
  entityType?:
    | "Country"
    | "CountrySubdivision"
    | "CountrySecondarySubdivision"
    | "CountryTertiarySubdivision"
    | "Municipality"
    | "MunicipalitySubdivision"
    | "Neighbourhood"
    | "PostalCodeArea";
  poi?: TomTomPOI;
  address: TomTomAddress;
  position: TomTomLatLon;
  mapcodes?: TomTomMapCode[];
  viewport: TomTomViewport;
  entryPoints: TomTomEntryPoint[];
  addressRanges?: unknown;
  dataSources?: TomTomDataSources;
}

export interface TomTomAddress {
  streetNumber: string;
  streetName: string;
  municipalitySubdivision: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countryTertiarySubdivision: string;
  countrySubdivision: string;
  postalCode: string;
  extendedPostalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  countrySubdivisionName: string;
  localName: string;
}

export interface TomTomLatLon {
  lat: number;
  lon: number;
}

export interface TomTomMapCode {
  type: "Local" | "International" | "Alternative";
  fullMapcode: string;
  territory: string;
  code: string;
}

export interface TomTomViewport {
  topLeftPoint: TomTomLatLon;
  btmRightPoint: TomTomLatLon;
}

export interface TomTomEntryPoint {
  type: "main" | "minor";
}

export interface TomTomDataSources {
  chargingAvailability: unknown;
  id: string;
  geometry: unknown;
}

export interface TomTomPOI {
  name: string;
  phone: string;
  brands: TomTomPOIBrand[];
  url: string;
  categorySet: TomTomPOICategory[];
  openingHours: TomTomPOIOpeningHours;
  classifications: TomTomPOIClassification[];
  timeZone: TomTomTimeZone;
}

export interface TomTomPOIBrand {
  name: string;
}

export interface TomTomPOICategory {
  id: number;
}

export interface TomTomPOIOpeningHours {
  mode: string;
  timeRanges: TomTomTimeRange[];
}

export interface TomTomTimeRange {
  startTime: TomTomTime;
  endTime: TomTomTime;
}

export interface TomTomTime {
  date: string;
  hour: number;
  minute: number;
}

export interface TomTomPOIClassification {
  code: string;
  names: TomTomCategoryName[];
}

export interface TomTomCategoryName {
  nameLocale: string;
  name: string;
}

export interface TomTomTimeZone {
  ianaId: string;
}
