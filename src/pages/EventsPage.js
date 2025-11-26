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
    const { events, loading, isError } = useEvents(); // ✅ loading, isError 추가
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
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: "min-h-screen bg-white", children: [_jsx("div", { className: "w-full h-[300px] bg-cover bg-center relative", style: { backgroundImage: "url('/images/event-hero.jpg')" }, children: _jsxs("div", { className: "absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4", children: [_jsx("h1", { className: "text-4xl sm:text-5xl font-bold text-white mb-4", children: "\uBB38\uD654\uD589\uC0AC" }), _jsx("p", { className: "text-lg sm:text-xl text-white", children: "\uC11C\uC6B8\uC758 \uB2E4\uC591\uD55C \uBB38\uD654\uD589\uC0AC\uB97C \uCC3E\uC544\uBCF4\uC138\uC694." })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 mt-8 space-y-6", children: [_jsx(FilterTabs, { selected: selectedCategory, onSelect: setSelectedCategory, options: eventCategoryOptions }), _jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", placeholder: "\uD589\uC0AC\uBA85\uC744 \uAC80\uC0C9\uD558\uC138\uC694", className: "w-full p-3 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) }), _jsx("svg", { className: "absolute left-3 top-4 h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })] }), loading ? (_jsx("div", { className: "w-full py-10 text-center text-gray-500", children: "\uBB38\uD654\uD589\uC0AC \uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uB294 \uC911\uC785\uB2C8\uB2E4\u2026" })) : isError ? (_jsx("div", { className: "w-full py-10 text-center text-red-500", children: "\uB370\uC774\uD130\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574 \uC8FC\uC138\uC694." })) : (_jsxs(_Fragment, { children: [paginatedEvents.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6", children: paginatedEvents.map((event, i) => (_jsx(EventCard, { event: event }, i))) })) : (_jsx("p", { className: "text-center text-gray-500", children: "\uC870\uAC74\uC5D0 \uB9DE\uB294 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })), _jsx(Pagination, { totalItems: filteredEvents.length, itemsPerPage: itemsPerPage, currentPage: currentPage, onPageChange: setCurrentPage })] }))] }), selectedEvent && (_jsx(EventDetailModal, { event: selectedEvent, onClose: handleCloseModal }))] }), _jsx(Footer, {})] }));
};
export default EventsPage;
