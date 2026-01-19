import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ko from "../../public/locales/ko/translation.json";
import en from "../../public/locales/en/translation.json";
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    resources: {
        ko: { translation: ko },
        en: { translation: en },
    },
    fallbackLng: "ko",
    debug: import.meta.env.DEV,
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
        lookupLocalStorage: "i18nextLng",
    },
});
export default i18n;
