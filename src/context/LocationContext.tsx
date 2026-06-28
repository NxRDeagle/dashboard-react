import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type FC,
  type ReactNode,
} from "react";
import type {
  Location,
  LocationState,
  LocationSource,
  LocationContextValue,
} from "../types/location.types";
import { geocodingApi } from "../api/geocoding.api";
import { STORAGE_KEYS } from "../constants/storage";

const LocationContext = createContext<LocationContextValue | null>(null);

function loadSaved(): { location: Location; source: LocationSource } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.location);
    if (!raw) return null;
    return JSON.parse(raw) as { location: Location; source: LocationSource };
  } catch {
    return null;
  }
}

function persist(location: Location, source: LocationSource): void {
  localStorage.setItem(
    STORAGE_KEYS.location,
    JSON.stringify({ location, source }),
  );
}

export const LocationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const saved = loadSaved();

  const [state, setState] = useState<LocationState>({
    location: saved?.location ?? null,
    source: saved?.source ?? null,
    isLoading: !saved,
    error: null,
  });

  const applyGeoPosition = useCallback(
    async (latitude: number, longitude: number) => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      try {
        const { city, country } = await geocodingApi.reverseGeocode(
          latitude,
          longitude,
        );
        const location: Location = {
          latitude,
          longitude,
          city,
          country,
          timezone,
        };
        persist(location, "geo");
        setState({ location, source: "geo", isLoading: false, error: null });
      } catch {
        // Если упала ошибка - все равно храним координаты неизвестного города
        const location: Location = {
          latitude,
          longitude,
          city: "Your location",
          country: "",
          timezone,
        };
        persist(location, "geo");
        setState({ location, source: "geo", isLoading: false, error: null });
      }
    },
    [],
  );

  const requestGeoLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    navigator.geolocation.getCurrentPosition(
      (pos) => void applyGeoPosition(pos.coords.latitude, pos.coords.longitude),
      (err) =>
        setState((prev) => ({ ...prev, isLoading: false, error: err.message })),
      { timeout: 10000 },
    );
  }, [applyGeoPosition]);

  // Автоматом запрашиваем геолокацию, если не указана при монтировании
  useEffect(() => {
    if (!saved) requestGeoLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setManualLocation = useCallback((location: Location) => {
    persist(location, "manual");
    setState({ location, source: "manual", isLoading: false, error: null });
  }, []);

  return (
    <LocationContext.Provider
      value={{ ...state, setManualLocation, requestGeoLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextValue => {
  const ctx = useContext(LocationContext);
  if (!ctx) throw new Error("useLocation must be used within LocationProvider");
  return ctx;
};
