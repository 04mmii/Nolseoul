import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import Header from "../components/Layout/Header";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import Map from "../components/Map/KakaoMap";
import FilterTabs from "../components/Common/FilterTabs";
import Pagination from "../components/Common/Pagination";
import Footer from "@/components/Layout/Footer";
import { useState, useEffect, useMemo } from "react";
import { getSpaceCategoryOptions } from "../components/CulturalSpace/spaceCategoryOptions";
import SkeletonCard from "../components/Common/SkeletonCard";
import { useTranslation } from "react-i18next";
const CulturalSpacesPage = () => {
    const { t } = useTranslation();
    const { spaces, loading, error } = useCulturalSpaces();
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const spaceCategoryOptions = useMemo(() => getSpaceCategoryOptions(t), [t]);
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);
    const filteredSpaces = useMemo(() => {
        return (spaces !== null && spaces !== void 0 ? spaces : []).filter((space) => {
            const subj = space.SUBJCODE || "";
            const name = space.FAC_NAME || "";
            const addr = space.ADDR || "";
            const matchesCategory = (Array.isArray(selectedCategory) &&
                selectedCategory.some((cat) => subj.includes(cat))) ||
                selectedCategory === "전체" ||
                subj.includes(selectedCategory);
            const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                addr.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [spaces, selectedCategory, searchTerm]);
    const paginatedSpaces = useMemo(() => {
        return filteredSpaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [filteredSpaces, currentPage]);
    if (error)
        return (_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1 flex items-center justify-center bg-white", children: _jsxs("div", { className: "text-center text-red-500", children: [t("common.error"), _jsx("br", {}), _jsxs("span", { className: "text-xs text-gray-400", children: ["(", error instanceof Error ? error.message : t("common.unknownError"), ")"] })] }) }), _jsx(Footer, {})] }));
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "w-full h-[300px] bg-cover bg-center relative", style: { backgroundImage: "url('/images/seoul-1280.jpg')" }, children: _jsxs("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-white mb-4", children: t("spaces.title") }), _jsx("p", { className: "text-lg sm:text-xl text-white", children: t("spaces.subtitle") })] }) }), _jsx("div", { className: "max-w-7xl mx-auto p-4 mb-8", children: _jsx(Map, { spaces: paginatedSpaces }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 mt-8 space-y-6", children: [_jsx(FilterTabs, { selected: selectedCategory, onSelect: (category) => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1);
                                }, options: spaceCategoryOptions }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: t("spaces.searchPlaceholder"), className: "w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx("svg", { className: "absolute left-3 top-4 h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }), loading ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: Array.from({ length: 12 }).map((_, i) => (_jsx(SkeletonCard, {}, i))) })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6", children: paginatedSpaces.map((space) => (_jsx(CulturalSpaceCard, { space: space }, space.NUM))) })), !loading && (_jsx(Pagination, { totalItems: filteredSpaces.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage }))] })] }), _jsx(Footer, {})] }));
};
export default CulturalSpacesPage;
