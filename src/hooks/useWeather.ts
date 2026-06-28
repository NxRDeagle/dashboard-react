import { useState, useEffect } from "react";
import { weatherApi } from "../api/weather.api";
import { useLocation } from "../context/LocationContext";
import type { WeatherState } from "../types/weather.types";

export function useWeather(): WeatherState {
  const { location } = useLocation();

  const [state, setState] = useState<WeatherState>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!location) {
      setState({ data: null, isLoading: false, error: null });
      return;
    }

    let cancelled = false;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    weatherApi
      .getCurrentWeather({
        latitude: location.latitude,
        longitude: location.longitude,
      })
      .then((data) => {
        if (!cancelled) setState({ data, isLoading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled)
          setState({ data: null, isLoading: false, error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [location?.latitude, location?.longitude]);

  return state;
}
