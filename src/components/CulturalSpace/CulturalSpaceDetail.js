import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";
const CulturalSpaceDetailPage = () => {
    const { NUM } = useParams();
    const { spaces, loading, error } = useCulturalSpaces();
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
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-4xl mx-auto px-4 py-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-4", children: space.FAC_NAME }), space.MAIN_IMG && (_jsx("img", { src: space.MAIN_IMG, alt: space.FAC_NAME, className: "w-full h-64 object-cover rounded-lg mb-6" })), _jsxs("section", { className: "mb-4 ", children: [_jsxs("p", { children: [_jsx("strong", { children: "\uC8FC\uC18C:" }), " ", space.ADDR] }), _jsxs("p", { children: [_jsx("strong", { children: "\uC804\uD654\uBC88\uD638:" }), " ", space.PHNE] }), _jsxs("p", { children: [_jsx("strong", { children: "\uCE74\uD14C\uACE0\uB9AC:" }), " ", space.SUBJCODE] }), _jsxs("p", { children: [_jsx("strong", { children: "HOMEPAGE:" }), " ", space.HOMEPAGE] })] }), space.FAC_DESC && (_jsxs("section", { className: "mt-6", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: "\uACF5\uAC04 \uC18C\uAC1C" }), _jsx("div", { dangerouslySetInnerHTML: { __html: space.FAC_DESC } })] }))] })] }));
};
export default CulturalSpaceDetailPage;
