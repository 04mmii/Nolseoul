import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const navItems = [
        { href: "/events", labelKey: "nav.events" },
        { href: "/spaces", labelKey: "nav.spaces" },
        { href: "/night-views", labelKey: "nav.nightViews" },
    ];
    return (_jsxs("div", { className: "relative", children: [_jsx("button", { className: "md:hidden text-gray-600", onClick: () => setIsOpen((prev) => !prev), children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) }), _jsx("nav", { className: "hidden md:flex space-x-10 text-gray-600", children: navItems.map((item) => (_jsxs(Link, { to: item.href, className: "relative group inline-block px-1 py-1 text-gray-600", children: [t(item.labelKey), _jsx("span", { className: "absolute left-1/2 bottom-0 h-[0.5px] w-0 bg-gray-600 transition-all duration-300 group-hover:w-full group-hover:left-0 origin-center" })] }, item.href))) }), isOpen && (_jsx("div", { className: "absolute top-10 right-0 z-10 bg-white/80 border shadow-md rounded-md flex flex-col gap-2 px-4 py-3 md:hidden", children: navItems.map((item) => (_jsx(Link, { to: item.href, className: "text-gray-700 hover:text-black transition whitespace-nowrap", onClick: () => setIsOpen(false), children: t(item.labelKey) }, item.href))) }))] }));
};
export default Nav;
