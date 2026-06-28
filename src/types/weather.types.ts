export interface WeatherCurrent {
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
}

export interface WeatherUnits {
  temperature_2m: string;
  apparent_temperature: string;
  wind_speed_10m: string;
}

export interface WeatherResponse {
  current: WeatherCurrent;
  current_units: WeatherUnits;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface WeatherState {
  data: WeatherResponse | null;
  isLoading: boolean;
  error: string | null;
}

export interface GeoPosition {
  latitude: number;
  longitude: number;
}
