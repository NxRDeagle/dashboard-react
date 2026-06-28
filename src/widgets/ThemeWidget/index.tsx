import type { FC } from "react";
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../types/theme.types";

interface ThemeOption {
  value: Theme;
  label: string;
  icon: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { value: "light", label: "Light", icon: "☀️" },
  { value: "dark", label: "Dark", icon: "🌙" },
];

export const ThemeWidget: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        Appearance
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Choose your preferred theme
      </p>
      <div className="flex gap-3">
        {THEME_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              theme === option.value
                ? "bg-blue-500 text-white shadow-sm"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <span>{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
