import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Home.tsx
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";
import HeroSlider from "../components/Banner/HeroSlider";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import OngoingEventSlider from "../components/Events/OngoingEventSlider";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Footer from "../components/Layout/Footer";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
const Home = () => {
    const { events, loading: eventsLoading } = useEvents();
    const { spaces, loading: spacesLoading } = useCulturalSpaces();
    const today = dayjs().startOf("day");
    // 현재 진행 중인 이벤트 필터링
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
        const currentMonth = today.month(); // 0부터 시작
        return (start.month() === currentMonth ||
            end.month() === currentMonth ||
            (start.month() <= currentMonth && end.month() >= currentMonth));
    }).slice(0, 5);
    if (eventsLoading || spacesLoading) {
        return _jsx("p", { className: "p-4", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." });
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(HeroSlider, {}), _jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [_jsxs("section", { className: "my-8", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "\uD604\uC7AC \uC9C4\uD589 \uC911\uC778 \uD589\uC0AC" }), (ongoingEvents === null || ongoingEvents === void 0 ? void 0 : ongoingEvents.length) > 0 ? (_jsx(OngoingEventSlider, { events: ongoingEvents })) : (_jsx("p", { className: "text-gray-500", children: "\uD604\uC7AC \uC9C4\uD589 \uC911\uC778 \uBB38\uD654 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }))] }), _jsxs("section", { className: "my-12", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("h2", { className: "text-2xl font-bold", children: [today.month() + 1, "\uC6D4 \uBB38\uD654 \uD589\uC0AC"] }), _jsx(Link, { to: "/events", className: "text-blue-600 hover:text-blue-800 transition-colors", children: "\uB354\uBCF4\uAE30 \u2192" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: (currentMonthEvents === null || currentMonthEvents === void 0 ? void 0 : currentMonthEvents.length) > 0 ? (currentMonthEvents.map((event) => (_jsx(EventCard, { event: event }, event.CULTCODE)))) : (_jsxs("p", { className: "text-gray-500 col-span-full", children: [today.month() + 1, "\uC6D4\uC5D0 \uC608\uC815\uB41C \uBB38\uD654 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4."] })) })] }), _jsxs("section", { className: "my-12", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: "\uCD94\uCC9C \uBB38\uD654\uACF5\uAC04" }), _jsx(Link, { to: "/spaces", className: "text-blue-600 hover:text-blue-800 transition-colors", children: "\uB354\uBCF4\uAE30 \u2192" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6", children: spaces === null || spaces === void 0 ? void 0 : spaces.slice(0, 5).map((space) => (_jsx(CulturalSpaceCard, { space: space }, space.NUM))) })] })] }), _jsx(Footer, {})] }));
};
export default Home;
