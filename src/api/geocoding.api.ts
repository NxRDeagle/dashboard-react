import { GEOCODING_API_BASE_URL, NOMINATIM_BASE_URL } from "../constants/api";
import type {
  GeocodingResult,
  GeocodingSearchResponse,
  NominatimResponse,
} from "../types/geocoding.types";

export type { GeocodingResult };

export const geocodingApi = {
  search: async (query: string): Promise<GeocodingResult[]> => {
    const params = new URLSearchParams({
      name: query,
      count: "6",
      language: "en",
      format: "json",
    });
    const res = await fetch(`${GEOCODING_API_BASE_URL}/search?${params}`);
    if (!res.ok) throw new Error("City search failed");
    const data = (await res.json()) as GeocodingSearchResponse;
    return data.results ?? [];
  },

  reverseGeocode: async (
    latitude: number,
    longitude: number,
  ): Promise<{ city: string; country: string }> => {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lon: longitude.toString(),
      format: "json",
    });
    const res = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
      headers: { "Accept-Language": "en-US,en" },
    });
    if (!res.ok) throw new Error("Reverse geocoding failed");
    const data = (await res.json()) as NominatimResponse;
    const addr = data.address;
    const city =
      addr?.city ?? addr?.town ?? addr?.village ?? addr?.county ?? "Unknown";
    const country = addr?.country ?? "";
    return { city, country };
  },
};
