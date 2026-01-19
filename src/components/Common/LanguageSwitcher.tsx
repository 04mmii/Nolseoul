import { useTranslation } from "react-i18next";

const languages = [
  { code: "ko", label: "KO" },
  { code: "en", label: "EN" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang, index) => (
        <span key={lang.code} className="flex items-center">
          <button
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-2 py-1 text-sm transition-colors ${
              i18n.language === lang.code ||
              (i18n.language.startsWith(lang.code) && lang.code === "ko")
                ? "text-navy-600 font-bold"
                : "text-gray-500 hover:text-gray-700"
            }`}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && (
            <span className="text-gray-300">|</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
