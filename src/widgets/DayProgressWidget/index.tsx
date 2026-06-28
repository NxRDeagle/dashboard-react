import type { FC } from "react";
import { useTodo } from "../../context/TodoContext";

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function progressColor(pct: number): string {
  if (pct === 100) return "#22c55e";
  if (pct >= 50) return "#3b82f6";
  return "#f59e0b";
}

export const DayProgressWidget: FC = () => {
  const { todayItems, todayProgress } = useTodo();
  const completedCount = todayItems.filter((item) => item.completed).length;
  const strokeDashoffset =
    CIRCUMFERENCE - (todayProgress / 100) * CIRCUMFERENCE;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Day Progress
      </p>
      <div className="flex items-center gap-5">
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg
            width="128"
            height="128"
            className="-rotate-90"
            aria-hidden="true"
          >
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-gray-100 dark:text-gray-700"
            />
            <circle
              cx="64"
              cy="64"
              r={RADIUS}
              fill="none"
              stroke={progressColor(todayProgress)}
              strokeWidth="10"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {todayProgress}%
            </p>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {completedCount}/{todayItems.length}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">tasks done</p>
          {todayProgress === 100 && todayItems.length > 0 && (
            <p className="mt-2 text-xs font-medium text-green-600 dark:text-green-400">
              All done! 🎉
            </p>
          )}
          {todayItems.length === 0 && (
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Add tasks to track progress
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
