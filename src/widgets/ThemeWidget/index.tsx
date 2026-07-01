import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import type { Theme } from "../../types/theme.types";

const THEME_OPTIONS: { value: Theme; icon: string }[] = [
  { value: "light", icon: "☀️" },
  { value: "dark", icon: "🌙" },
];

const THEME_LABEL_KEYS = {
  light: "widgets.theme.light",
  dark: "widgets.theme.dark",
} as const;

export const ThemeWidget: FC = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
        {t("widgets.theme.title")}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {t("widgets.theme.subtitle")}
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
            <span>{t(THEME_LABEL_KEYS[option.value])}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
