export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
}

export type LocationSource = "geo" | "manual";

export interface LocationState {
  location: Location | null;
  source: LocationSource | null;
  isLoading: boolean;
  error: string | null;
}

export interface LocationContextValue extends LocationState {
  setManualLocation: (location: Location) => void;
  requestGeoLocation: VoidFunction;
}
