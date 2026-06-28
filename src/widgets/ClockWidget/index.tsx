import type { FC } from "react";
import { useClock } from "../../hooks/useClock";
import { useLocation } from "../../context/LocationContext";

export const ClockWidget: FC = () => {
  const { location } = useLocation();
  const { hours, minutes, seconds, day, dayName, monthName, year } = useClock(
    location?.timezone,
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Clock & Calendar
      </p>
      <div className="text-4xl font-bold tabular-nums text-gray-900 dark:text-white tracking-tight">
        {hours}
        <span className="animate-pulse">:</span>
        {minutes}
        <span className="text-2xl text-gray-400 dark:text-gray-500">
          :{seconds}
        </span>
      </div>
      <div className="mt-3 text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {dayName}
        </p>
        <p className="text-sm">
          {day} {monthName} {year}
        </p>
        {location?.timezone && (
          <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
            {location.timezone}
          </p>
        )}
      </div>
    </div>
  );
};
