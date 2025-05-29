import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Footer = () => {
    return (_jsx("footer", { className: "bg-gray-100 text-gray-600 py-8 mt-16 border-t", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4", children: [_jsx(Link, { to: "/", children: _jsx("div", { className: "flex w-[200px] items-center gap-2", children: _jsx("img", { src: "/images/nol-b.gif", alt: "\uB180\uC11C\uC6B8 \uB85C\uACE0", className: "w-[600px] object-contain" }) }) }), _jsxs("div", { className: "text-center text-sm", children: [_jsx("p", { children: "\u00A9 2025 \uB180\uC11C\uC6B8. All rights reserved." }), _jsxs("p", { className: "mt-1", children: ["Contact:", " ", _jsx("a", { href: "mailto:04mmii@naver.com", className: "underline hover:text-gray-800", children: "04mmii@naver.com" })] })] })] }) }));
};
export default Footer;
