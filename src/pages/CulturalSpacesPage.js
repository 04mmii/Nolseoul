import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import Header from "../components/Layout/Header";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import Map from "../components/Map/KakaoMap";
import FilterTabs from "../components/Common/FilterTabs";
import Pagination from "../components/Common/Pagination";
import { useState, useEffect } from "react";
import { spaceCategoryOptions } from "../components/CulturalSpace/spaceCategoryOptions";
const CulturalSpacesPage = () => {
    const { spaces, loading, error } = useCulturalSpaces();
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);
    if (loading)
        return _jsx("div", { className: "text-center py-8", children: "\uB85C\uB529 \uC911..." });
    if (error)
        return (_jsxs("div", { className: "text-center py-8 text-red-500", children: ["\uC624\uB958 \uBC1C\uC0DD: ", error.message] }));
    const filteredSpaces = (spaces !== null && spaces !== void 0 ? spaces : []).filter((space) => {
        const subj = space.SUBJCODE || "";
        const name = space.FAC_NAME || "";
        const addr = space.ADDR || "";
        // 카테고리 필터
        const matchesCategory = (Array.isArray(selectedCategory) &&
            selectedCategory.some((cat) => subj.includes(cat))) ||
            selectedCategory === "전체" ||
            subj.includes(selectedCategory);
        // 검색어 필터
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            addr.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    const paginatedSpaces = filteredSpaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "max-w-7xl mx-auto px-4", children: [_jsx("h1", { className: "text-3xl font-bold text-center mt-8 mb-4", children: "\uBB38\uD654\uACF5\uAC04 \uC804\uCCB4" }), _jsx(Map, { spaces: paginatedSpaces }), _jsx(FilterTabs, { selected: selectedCategory, onSelect: (category) => {
                            setSelectedCategory(category);
                            setCurrentPage(1);
                        }, options: spaceCategoryOptions }), _jsx("div", { className: "mt-4 mb-6", children: _jsx("input", { type: "text", placeholder: "\uBB38\uD654\uACF5\uAC04 \uC774\uB984 \uB610\uB294 \uC8FC\uC18C \uAC80\uC0C9", className: "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }) }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 pt-1", children: paginatedSpaces.map((space) => (_jsx(CulturalSpaceCard, { space: space }, space.NUM))) }), _jsx(Pagination, { totalItems: filteredSpaces.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage })] })] }));
};
export default CulturalSpacesPage;
