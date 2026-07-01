import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en/translation.json";
import ru from "../locales/ru/translation.json";
import { STORAGE_KEYS } from "../constants/storage";

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: localStorage.getItem(STORAGE_KEYS.language) ?? "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
