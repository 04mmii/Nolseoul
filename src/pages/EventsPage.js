import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import FilterTabs from "../components/Common/FilterTabs";
import { getEventCategoryOptions } from "../components/Events/eventCategoryOptions";
import Pagination from "../components/Common/Pagination";
import EventDetailModal from "../components/Events/EventDetailModal";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Layout/Footer";
import SkeletonCard from "@/components/Common/SkeletonCard";
import { useTranslation } from "react-i18next";
const EventsPage = () => {
    const { t } = useTranslation();
    const { events, loading, isError } = useEvents();
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const { slug } = useParams();
    const navigate = useNavigate();
    const eventCategoryOptions = useMemo(() => getEventCategoryOptions(t), [t]);
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
            return dateA - dateB;
        })
            .filter((event) => {
            const now = new Date().setHours(0, 0, 0, 0);
            const eventDate = new Date(event.STRTDATE || event.DATE || "").getTime();
            return eventDate >= now;
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
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "w-full h-[300px] bg-cover bg-center relative", style: { backgroundImage: "url('/images/event-hero.jpg')" }, children: _jsxs("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-white mb-4", children: t("events.title") }), _jsx("p", { className: "text-lg sm:text-xl text-white", children: t("events.subtitle") })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 mt-8 space-y-6", children: [_jsx(FilterTabs, { selected: selectedCategory, onSelect: setSelectedCategory, options: eventCategoryOptions }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: t("events.searchPlaceholder"), className: "w-full p-3 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), _jsx("svg", { className: "absolute left-3 top-4 h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }), loading ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: Array.from({ length: 12 }).map((_, i) => (_jsx(SkeletonCard, {}, i))) })) : isError ? (_jsx("div", { className: "w-full py-10 text-center text-red-500", children: t("common.error") })) : (_jsxs(_Fragment, { children: [paginatedEvents.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: paginatedEvents.map((event, i) => (_jsx(EventCard, { event: event }, i))) })) : (_jsx("p", { className: "text-center text-gray-500", children: t("events.noResults") })), _jsx(Pagination, { totalItems: filteredEvents.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage })] }))] }), selectedEvent && (_jsx(EventDetailModal, { event: selectedEvent, onClose: handleCloseModal }))] }), _jsx(Footer, {})] }));
};
export default EventsPage;
