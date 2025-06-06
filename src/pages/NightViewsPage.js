import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import Header from "../components/Layout/Header";
import Pagination from "../components/Common/Pagination";
import NightViewMap from "../components/Map/NightViewMap";
import { useNightViewSpots } from "../hooks/useNightViewSpots";
import NightViewCard from "../components/Places/NightViewCard";
import Footer from "../components/Layout/Footer";
const categories = ["전체", "공원/광장", "문화/체육", "공공시설", "가로/마을"];
const NightViewsPage = () => {
    const { spots, loading, error } = useNightViewSpots();
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");
    const itemsPerPage = 8;
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchKeyword]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);
    const filteredSpots = useMemo(() => {
        return spots.filter((spot) => {
            var _a, _b;
            return (selectedCategory === "전체" || spot.SUBJECT_CD === selectedCategory) &&
                (((_a = spot.TITLE) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(searchKeyword.toLowerCase())) ||
                    ((_b = spot.ADDR) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(searchKeyword.toLowerCase())));
        });
    }, [spots, selectedCategory, searchKeyword]);
    const paginatedSpots = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredSpots.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredSpots, currentPage]);
    if (loading)
        return _jsx("div", { className: "text-center py-8", children: "\uB85C\uB529 \uC911..." });
    if (error)
        return (_jsxs("div", { className: "text-center py-8 text-red-500", children: ["\uC624\uB958 \uBC1C\uC0DD: ", error.message] }));
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "w-full h-[300px] bg-cover bg-center relative", style: { backgroundImage: "url('/images/n-1920.jpg')" }, children: _jsxs("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-white mb-4", children: "\uC57C\uACBD\uBA85\uC18C" }), _jsx("p", { className: "text-lg sm:text-xl text-white", children: "\uC11C\uC6B8\uC758 \uC544\uB984\uB2E4\uC6B4 \uC57C\uACBD \uBA85\uC18C\uB97C \uCC3E\uC544\uBCF4\uC138\uC694!" })] }) }), _jsx("div", { className: "max-w-7xl mx-auto p-4 mb-8", children: _jsx(NightViewMap, { spots: paginatedSpots }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 mt-8 mb-6 space-y-4", children: [_jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => (_jsx("button", { onClick: () => setSelectedCategory(category), className: `px-4 py-2 rounded-full transition-colors ${selectedCategory === category
                                        ? "bg-orange-400 text-black font-bold"
                                        : "bg-gray-100 hover:bg-gray-200"}`, children: category }, category))) }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "\uC774\uB984 \uB610\uB294 \uC8FC\uC18C\uB85C \uAC80\uC0C9", className: "w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400", value: searchKeyword, onChange: (e) => setSearchKeyword(e.target.value) }), _jsx("svg", { className: "absolute left-3 top-4 h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] })] }), _jsx("div", { className: "max-w-7xl mx-auto px-4 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: paginatedSpots.map((spot) => (_jsx(NightViewCard, { spot: spot }, spot.NUM))) }), _jsx("div", { className: "max-w-7xl mx-auto px-4 pb-8", children: _jsx(Pagination, { totalItems: filteredSpots.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage }) })] }), _jsx(Footer, {})] }));
};
export default NightViewsPage;
