import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useWeather } from "../../hooks/useWeather";
import { useLocation } from "../../context/LocationContext";
import { WMO_WEATHER_CODES, WEATHER_ICON_MAP } from "../../constants/weather";
import { Fallback, LoadingFallback } from "../../components/Fallback";

export const WeatherWidget: FC = () => {
  const { location } = useLocation();
  const { data, isLoading, error } = useWeather();
  const { t } = useTranslation();

  if (!location && !isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex items-center justify-center">
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">
          {t("widgets.weather.noLocation")}
        </p>
      </div>
    );
  }

  if (isLoading) return <LoadingFallback />;
  if (error || !data)
    return <Fallback message={error ?? t("widgets.weather.unavailable")} />;

  const { current, current_units } = data;
  const icon = WEATHER_ICON_MAP[current.weather_code] ?? "🌡️";
  const description = WMO_WEATHER_CODES[current.weather_code] ?? "Unknown";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        {t("widgets.weather.title")} · {location?.city ?? "—"}
      </p>
      <div className="flex items-center gap-3">
        <span className="text-5xl">{icon}</span>
        <div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(current.temperature_2m)}
            {current_units.temperature_2m}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span>
          {t("widgets.weather.feelsLike")} {Math.round(current.apparent_temperature)}
          {current_units.apparent_temperature}
        </span>
        <span>
          {t("widgets.weather.wind")} {Math.round(current.wind_speed_10m)}{" "}
          {current_units.wind_speed_10m}
        </span>
      </div>
    </div>
  );
};
