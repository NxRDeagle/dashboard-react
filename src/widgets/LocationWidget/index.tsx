import { useState, useEffect, useRef, type FC, type ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "../../context/LocationContext";
import { geocodingApi, type GeocodingResult } from "../../api/geocoding.api";

export const LocationWidget: FC = () => {
  const {
    location,
    source,
    isLoading,
    error,
    setManualLocation,
    requestGeoLocation,
  } = useLocation();
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSearching(true);
      setSearchError(null);
      geocodingApi
        .search(query)
        .then((data) => {
          setResults(data);
          setShowDropdown(data.length > 0);
        })
        .catch(() => setSearchError(t("widgets.location.searchFailed")))
        .finally(() => setIsSearching(false));
    }, 350);

    return () => clearTimeout(timer);
  }, [query, t]);

  const handleSelect = (result: GeocodingResult) => {
    setManualLocation({
      latitude: result.latitude,
      longitude: result.longitude,
      city: result.name,
      country: result.country,
      timezone: result.timezone,
    });
    setQuery("");
    setShowDropdown(false);
    setResults([]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col gap-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex-shrink-0">
        {t("widgets.location.title")}
      </p>

      <div className="flex-shrink-0">
        {isLoading ? (
          <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
            <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">{t("widgets.location.detecting")}</span>
          </div>
        ) : location ? (
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              📍 {location.city}
              {location.country ? `, ${location.country}` : ""}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {location.timezone}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              {source === "geo"
                ? `● ${t("widgets.location.autoDetected")}`
                : `● ${t("widgets.location.setManually")}`}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {t("widgets.location.noLocation")}
          </p>
        )}
        {error && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
            {error}
          </p>
        )}
      </div>

      <div className="relative flex-shrink-0">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            onBlur={handleBlur}
            placeholder={t("widgets.location.searchPlaceholder")}
            className="flex-1 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {isSearching && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          )}
        </div>

        {searchError && (
          <p className="text-xs text-red-500 mt-1">{searchError}</p>
        )}

        {showDropdown && results.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-20 overflow-hidden">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onMouseDown={() => handleSelect(r)}
                  className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium">{r.name}</span>
                  <span className="text-gray-400 dark:text-gray-500 text-xs ml-1.5">
                    {r.admin1 ? `${r.admin1}, ` : ""}
                    {r.country}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={requestGeoLocation}
        disabled={isLoading}
        className="flex-shrink-0 flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors"
      >
        <span>📍</span>
        <span>{t("widgets.location.useMyLocation")}</span>
      </button>
    </div>
  );
};
