import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Logo from "../Logo";
import Nav from "./Nav";
import LanguageSwitcher from "../Common/LanguageSwitcher";
const Header = () => (_jsx("header", { className: "bg-white sticky top-0 z-50 py-5 pt-10 border-b-1 border-b-gray-300", children: _jsxs("div", { className: "max-w-7xl mx-auto py-2 flex justify-between items-center", children: [_jsx(Logo, {}), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Nav, {}), _jsx(LanguageSwitcher, {})] })] }) }));
export default Header;
