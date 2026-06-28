import { WEATHER_API_BASE_URL } from "../constants/api";
import type { GeoPosition, WeatherResponse } from "../types/weather.types";

export const weatherApi = {
  getCurrentWeather: async (
    position: GeoPosition,
  ): Promise<WeatherResponse> => {
    const params = new URLSearchParams({
      latitude: position.latitude.toString(),
      longitude: position.longitude.toString(),
      current:
        "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
      timezone: "auto",
    });

    const response = await fetch(`${WEATHER_API_BASE_URL}/forecast?${params}`);

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    return response.json() as Promise<WeatherResponse>;
  },
};
