import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const CulturalSpaceCard = ({ space }) => {
    return (_jsx(Link, { to: `/spaces/${space.NUM}`, children: _jsxs("div", { className: "bg-white rounded-xl shadow-md p-3 hover:shadow-lg transition", children: [_jsx("img", { src: space.MAIN_IMG, alt: space.FAC_NAME, className: "w-full h-48 object-cover rounded-md" }), _jsxs("div", { className: "mt-2", children: [_jsx("h3", { className: "font-bold text-lg", children: space.FAC_NAME }), _jsx("p", { className: "text-sm text-gray-600", children: space.ADDR }), _jsx("p", { className: "text-xs mt-1 text-gray-400", children: space.SUBJCODE })] })] }) }));
};
export default CulturalSpaceCard;
