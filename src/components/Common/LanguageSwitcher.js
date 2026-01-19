import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
const languages = [
    { code: "ko", label: "KO" },
    { code: "en", label: "EN" },
];
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const handleLanguageChange = (langCode) => {
        i18n.changeLanguage(langCode);
    };
    return (_jsx("div", { className: "flex items-center gap-1", children: languages.map((lang, index) => (_jsxs("span", { className: "flex items-center", children: [_jsx("button", { onClick: () => handleLanguageChange(lang.code), className: `px-2 py-1 text-sm transition-colors ${i18n.language === lang.code ||
                        (i18n.language.startsWith(lang.code) && lang.code === "ko")
                        ? "text-navy-600 font-bold"
                        : "text-gray-500 hover:text-gray-700"}`, "aria-label": `Switch to ${lang.label}`, children: lang.label }), index < languages.length - 1 && (_jsx("span", { className: "text-gray-300", children: "|" }))] }, lang.code))) }));
};
export default LanguageSwitcher;
