import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import HeroSlider from "../components/Banner/HeroSlider";
import OngoingEventSlider from "../components/Events/OngoingEventSlider";
import { EventCard } from "../components/Events/EventCard";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useEvents } from "../hooks/useEvents";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import { useTranslation } from "react-i18next";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const Home = () => {
    const { t, i18n } = useTranslation();
    const { events, loading: eventsLoading } = useEvents();
    const { spaces, loading: spacesLoading } = useCulturalSpaces();
    const today = dayjs().startOf("day");
    const ongoingEvents = events === null || events === void 0 ? void 0 : events.filter((event) => {
        var _a;
        if (!((_a = event.DATE) === null || _a === void 0 ? void 0 : _a.includes("~")))
            return false;
        const [startStr, endStr] = event.DATE.split("~");
        const start = dayjs(startStr.trim());
        const end = dayjs(endStr.trim());
        return (start.isValid() &&
            end.isValid() &&
            today.isSameOrAfter(start, "day") &&
            today.isSameOrBefore(end, "day"));
    }).slice(0, 20);
    const currentMonthEvents = events === null || events === void 0 ? void 0 : events.filter((event) => {
        var _a;
        if (!((_a = event.DATE) === null || _a === void 0 ? void 0 : _a.includes("~")))
            return false;
        const [startStr, endStr] = event.DATE.split("~");
        const start = dayjs(startStr.trim());
        const end = dayjs(endStr.trim());
        if (!start.isValid() || !end.isValid())
            return false;
        const currentMonth = today.month();
        return (start.month() === currentMonth ||
            end.month() === currentMonth ||
            (start.month() <= currentMonth && end.month() >= currentMonth));
    }).slice(0, 5);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(HeroSlider, {}), _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("section", { className: "my-12", children: [_jsx("h2", { className: "text-3xl font-bold mb-12 text-center", children: t("home.ongoingEvents") }), eventsLoading ? (_jsx("p", { className: "text-center text-gray-500", children: t("home.loadingEvents") })) : ongoingEvents && ongoingEvents.length > 0 ? (_jsx(OngoingEventSlider, { events: ongoingEvents })) : (_jsx("p", { className: "text-gray-500 text-center", children: t("home.noOngoingEvents") }))] }), _jsxs("section", { className: "my-16", children: [_jsx("div", { className: "mb-8", children: _jsx("h2", { className: "text-3xl font-bold text-center", children: t("home.monthlyEvents", {
                                        month: i18n.language === "en"
                                            ? today.format("MMMM")
                                            : today.month() + 1,
                                    }) }) }), eventsLoading ? (_jsx("p", { className: "text-center text-gray-500", children: t("home.loadingMonthlyEvents") })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: currentMonthEvents && currentMonthEvents.length > 0 ? (currentMonthEvents.map((event) => (_jsx(EventCard, { event: event }, event.CULTCODE)))) : (_jsx("p", { className: "text-gray-500 col-span-full", children: t("home.noMonthlyEvents", {
                                                month: i18n.language === "en"
                                                    ? today.format("MMMM")
                                                    : today.month() + 1,
                                            }) })) }), _jsx("div", { className: "text-right mt-2", children: _jsxs(Link, { to: "/events", className: "inline-block text-blue-600 hover:text-blue-800 transition-colors", children: [t("home.moreEvents"), " ", ">"] }) })] }))] }), _jsxs("section", { className: "my-16", children: [_jsxs("div", { className: "mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-center", children: t("home.recommendedSpaces") }), _jsx("div", { className: "text-right mt-2", children: _jsxs(Link, { to: "/spaces", className: "block text-navy-600 hover:text-navy-800 transition-colors", children: [t("home.moreSpaces"), " ", ">"] }) })] }), spacesLoading ? (_jsx("p", { className: "text-center text-gray-500", children: t("home.loadingSpaces") })) : (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: spaces === null || spaces === void 0 ? void 0 : spaces.slice(0, 5).map((space) => (_jsx(CulturalSpaceCard, { space: space }, space.NUM))) }))] })] }), _jsx(Footer, {})] }));
};
export default Home;
