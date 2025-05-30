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
    const { slug } = useParams();
    const navigate = useNavigate();
    const itemsPerPage = 20;
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
    const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const selectedEvent = useMemo(() => {
        if (!slug || events.length === 0)
            return null;
        const decodedSlug = decodeURIComponent(slug);
        return events.find((e) => e.TITLE === decodedSlug) || null;
    }, [slug, events]);
    const handleCloseModal = () => {
        navigate("/events");
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: "p-6 max-w-7xl mx-auto", children: [_jsx("input", { type: "text", placeholder: "\uD589\uC0AC\uBA85\uC744 \uAC80\uC0C9\uD558\uC138\uC694", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full p-3 border border-gray-300 rounded mb-4" }), _jsx(FilterTabs, { selected: selectedCategory, onSelect: setSelectedCategory, options: eventCategoryOptions }), paginatedEvents.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: paginatedEvents.map((event, i) => (_jsx(EventCard, { event: event }, i))) })) : (_jsx("p", { className: "text-gray-500", children: "\uC870\uAC74\uC5D0 \uB9DE\uB294 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })), _jsx(Pagination, { totalItems: filteredEvents.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage })] }), selectedEvent && (_jsx(EventDetailModal, { event: selectedEvent, onClose: handleCloseModal })), _jsx(Footer, {})] }));
};
export default EventsPage;
