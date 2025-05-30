import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import FilterTabs from "../components/Common/FilterTabs";
import { eventCategoryOptions } from "../components/Events/eventCategoryOptions";
import Pagination from "../components/Common/Pagination";
import EventDetailModal from "../components/Events/EventDetailModal";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Layout/Footer";
const EventsPage = () => {
    const { events } = useEvents();
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const { slug } = useParams();
    const navigate = useNavigate();
    const filteredEvents = useMemo(() => {
        return events
            .filter((event) => {
            const category = event.CODENAME || "";
            const title = event.TITLE || "";
            const matchesCategory = (Array.isArray(selectedCategory) &&
                selectedCategory.some((cat) => category.includes(cat))) ||
                selectedCategory === "전체" ||
                category.includes(selectedCategory);
            const matchesSearch = title
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
            .sort((a, b) => {
            const dateA = new Date(a.STRTDATE || a.DATE || "").getTime();
            const dateB = new Date(b.STRTDATE || b.DATE || "").getTime();
            return dateB - dateA;
        });
    }, [events, selectedCategory, searchQuery]);
    const paginatedEvents = useMemo(() => {
        return filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    }, [filteredEvents, currentPage]);
    const selectedEvent = useMemo(() => {
        if (!slug || events.length === 0)
            return null;
        const decodedSlug = decodeURIComponent(slug);
        return events.find((e) => e.TITLE === decodedSlug) || null;
    }, [slug, events]);
    const handleCloseModal = () => {
        navigate("/events");
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "w-full h-[300px] bg-cover bg-center relative", style: { backgroundImage: "url('/images/event-hero.jpg')" }, children: _jsxs("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-white mb-4", children: "\uBB38\uD654\uD589\uC0AC" }), _jsx("p", { className: "text-lg sm:text-xl text-white", children: "\uC11C\uC6B8\uC758 \uB2E4\uC591\uD55C \uBB38\uD654\uD589\uC0AC\uB97C \uCC3E\uC544\uBCF4\uC138\uC694." })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 mt-8 space-y-6", children: [_jsx(FilterTabs, { selected: selectedCategory, onSelect: setSelectedCategory, options: eventCategoryOptions }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "\uD589\uC0AC\uBA85\uC744 \uAC80\uC0C9\uD558\uC138\uC694", className: "w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), _jsx("svg", { className: "absolute left-3 top-4 h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }), paginatedEvents.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: paginatedEvents.map((event, i) => (_jsx(EventCard, { event: event }, i))) })) : (_jsx("p", { className: "text-center text-gray-500", children: "\uC870\uAC74\uC5D0 \uB9DE\uB294 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })), _jsx(Pagination, { totalItems: filteredEvents.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage })] }), selectedEvent && (_jsx(EventDetailModal, { event: selectedEvent, onClose: handleCloseModal }))] }), _jsx(Footer, {})] }));
};
export default EventsPage;
