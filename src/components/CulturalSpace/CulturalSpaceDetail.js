import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";
import KakaoMapSingle from "../Map/KakaoMapSingle";
const CulturalSpaceDetailPage = () => {
    const { NUM } = useParams();
    const { spaces, loading, error } = useCulturalSpaces();
    const navigate = useNavigate();
    if (!NUM)
        return _jsx("p", { children: "\uC798\uBABB\uB41C \uC811\uADFC\uC785\uB2C8\uB2E4. (NUM \uC5C6\uC74C)" });
    if (loading)
        return _jsx("p", { children: "\uBD88\uB7EC\uC624\uB294 \uC911..." });
    if (error)
        return _jsxs("p", { children: ["\uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4: ", error.message] });
    const space = spaces === null || spaces === void 0 ? void 0 : spaces.find((s) => String(s.NUM) === String(NUM));
    if (!space) {
        return _jsx("p", { children: "\uBB38\uD654\uACF5\uAC04 \uC815\uBCF4\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-3xl mx-auto px-4 py-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: space.FAC_NAME }), space.MAIN_IMG && (_jsx("img", { src: space.MAIN_IMG, alt: space.FAC_NAME, className: "w-full h-64 object-cover rounded-lg mb-6" })), _jsx("section", { className: "mb-8 overflow-x-auto", children: _jsx("table", { className: "table-auto w-full text-left border border-gray-300 rounded-md", children: _jsxs("tbody", { children: [_jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "px-4 py-2 bg-gray-100 w-32", children: "\uC8FC\uC18C" }), _jsx("td", { className: "px-4 py-2", children: space.ADDR })] }), _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "px-4 py-2 bg-gray-100", children: "\uC804\uD654\uBC88\uD638" }), _jsx("td", { className: "px-4 py-2", children: space.PHNE })] }), _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "px-4 py-2 bg-gray-100", children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsx("td", { className: "px-4 py-2", children: space.SUBJCODE })] }), _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 bg-gray-100", children: "\uD648\uD398\uC774\uC9C0" }), _jsx("td", { className: "px-4 py-2", children: space.HOMEPAGE ? (_jsx("a", { href: space.HOMEPAGE, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline", children: space.HOMEPAGE })) : ("정보 없음") })] })] }) }) }), space.FAC_DESC && (_jsxs("section", { className: "text-left mt-10", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "\uACF5\uAC04 \uC18C\uAC1C" }), _jsx("div", { className: "prose max-w-none", dangerouslySetInnerHTML: { __html: space.FAC_DESC } })] })), _jsxs("section", { className: "mt-12", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "\uC624\uC2DC\uB294 \uAE38" }), _jsxs("div", { className: "w-full h-72 rounded-lg overflow-hidden bg-gray-200", children: [_jsx(KakaoMapSingle, { address: space.ADDR, name: space.FAC_NAME }), _jsx("p", { className: "text-gray-500 pt-28", children: "[\uC9C0\uB3C4\uAC00 \uC5EC\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4]" })] })] }), _jsx("button", { onClick: () => navigate("/spaces"), className: "mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition", children: "\uBAA9\uB85D\uC73C\uB85C \uB3CC\uC544\uAC00\uAE30" })] })] }));
};
export default CulturalSpaceDetailPage;
