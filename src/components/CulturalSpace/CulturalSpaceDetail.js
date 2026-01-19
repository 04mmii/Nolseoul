import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";
import KakaoMapSingle from "../Map/KakaoMapSingle";
import Footer from "../Layout/Footer";
import { useTranslation } from "react-i18next";
const CulturalSpaceDetailPage = () => {
    const { t } = useTranslation();
    const { NUM } = useParams();
    const { spaces, loading, error } = useCulturalSpaces();
    const navigate = useNavigate();
    if (!NUM)
        return _jsx("p", { children: t("spaceDetail.invalidAccess") });
    if (loading)
        return _jsx("p", { children: t("common.loading") });
    if (error)
        return _jsxs("p", { children: [t("spaceDetail.errorOccurred"), ": ", error.message] });
    const space = spaces === null || spaces === void 0 ? void 0 : spaces.find((s) => String(s.NUM) === String(NUM));
    if (!space) {
        return _jsx("p", { children: t("spaceDetail.notFound") });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-3xl mx-auto px-4 py-8 text-center", children: [_jsx("h1", { className: "text-3xl font-bold mb-6", children: space.FAC_NAME }), space.MAIN_IMG && (_jsx("img", { src: space.MAIN_IMG, alt: space.FAC_NAME, className: "w-full h-64 object-cover rounded-lg mb-6" })), _jsx("section", { className: "mb-8 overflow-x-auto", children: _jsx("table", { className: "table-auto w-full text-left border border-gray-300 rounded-md", children: _jsxs("tbody", { children: [_jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "px-4 py-2 bg-gray-100 w-32", children: t("spaceDetail.address") }), _jsx("td", { className: "px-4 py-2", children: space.ADDR })] }), _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "px-4 py-2 bg-gray-100", children: t("spaceDetail.phone") }), _jsx("td", { className: "px-4 py-2", children: space.PHNE })] }), _jsxs("tr", { className: "border-b", children: [_jsx("th", { className: "px-4 py-2 bg-gray-100", children: t("spaceDetail.category") }), _jsx("td", { className: "px-4 py-2", children: space.SUBJCODE })] }), _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-2 bg-gray-100", children: t("spaceDetail.homepage") }), _jsx("td", { className: "px-4 py-2", children: space.HOMEPAGE ? (_jsx("a", { href: space.HOMEPAGE, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 underline", children: space.HOMEPAGE })) : (t("common.noInfo")) })] })] }) }) }), space.FAC_DESC && (_jsxs("section", { className: "text-left mt-10", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: t("spaceDetail.introduction") }), _jsx("div", { className: "prose max-w-none", dangerouslySetInnerHTML: { __html: space.FAC_DESC } })] })), _jsxs("section", { className: "mt-12", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: t("spaceDetail.directions") }), _jsxs("div", { className: "w-full h-72 rounded-lg overflow-hidden bg-gray-200", children: [_jsx(KakaoMapSingle, { address: space.ADDR, name: space.FAC_NAME }), _jsx("p", { className: "text-gray-500 pt-28", children: t("spaceDetail.mapPlaceholder") })] })] }), _jsx("button", { onClick: () => navigate("/spaces"), className: "mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition", children: t("common.backToList") })] }), _jsx(Footer, {})] }));
};
export default CulturalSpaceDetailPage;
