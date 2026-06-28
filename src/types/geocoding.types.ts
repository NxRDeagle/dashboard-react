export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone: string;
  country: string;
  country_code: string;
  admin1?: string;
}

export interface GeocodingSearchResponse {
  results?: GeocodingResult[];
}

export interface NominatimAddress {
  city?: string;
  town?: string;
  village?: string;
  county?: string;
  country?: string;
}

export interface NominatimResponse {
  address?: NominatimAddress;
}
