import { jsx as _jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Logo = () => {
    return (_jsx(Link, { to: "/", children: _jsx("img", { src: "/images/nol.gif", alt: "\uB180\uC11C\uC6B8 \uB85C\uACE0", className: "w-60 h-auto cursor-pointe pr-5" }) }));
};
export default Logo;
