import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { STORAGE_KEYS } from "../../constants/storage";

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const toggle = () => {
    const next = isEn ? "ru" : "en";
    void i18n.changeLanguage(next);
    localStorage.setItem(STORAGE_KEYS.language, next);
  };

  return (
    <button
      onClick={toggle}
      className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
      aria-label="Switch language"
    >
      {isEn ? "RU" : "EN"}
    </button>
  );
};
