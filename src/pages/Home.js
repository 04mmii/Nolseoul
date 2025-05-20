import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";
import HeroSlider from "../components/Banner/HeroSlider";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import OngoingEventSlider from "../components/Events/OngoingEventSlider";
const Home = () => {
    const { events, loading: eventsLoading } = useEvents();
    const { spaces, loading: spacesLoading } = useCulturalSpaces();
    if (eventsLoading || spacesLoading)
        return _jsx("p", { className: "p-4", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." });
    const today = new Date();
    // 현재 날짜가 포함된 행사 5개
    const ongoingEvents = events === null || events === void 0 ? void 0 : events.filter((event) => {
        const start = new Date(event.STRTDATE);
        const end = new Date(event.END_DATE);
        return start <= today && end >= today;
    }).slice(0, 20);
    // 5월에 열리는 행사 5개
    const mayEvents = events === null || events === void 0 ? void 0 : events.filter((event) => {
        const start = new Date(event.STRTDATE);
        const end = new Date(event.END_DATE);
        return start.getMonth() === 4 || end.getMonth() === 4; // 0=1월 → 4=5월
    }).slice(0, 5);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx(HeroSlider, {}), _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "\uD604\uC7AC \uC9C4\uD589 \uC911\uC778 \uD589\uC0AC" }), (ongoingEvents === null || ongoingEvents === void 0 ? void 0 : ongoingEvents.length) > 0 ? (_jsx(OngoingEventSlider, { events: ongoingEvents })) : (_jsx("p", { children: "\uD604\uC7AC \uC9C4\uD589 \uC911\uC778 \uBB38\uD654 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })), _jsx("h2", { className: "text-xl font-bold mt-12 mb-4", children: "5\uC6D4 \uBB38\uD654 \uD589\uC0AC" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: (mayEvents === null || mayEvents === void 0 ? void 0 : mayEvents.length) > 0 ? (mayEvents.map((event, i) => _jsx(EventCard, { event: event }, i))) : (_jsx("p", { children: "5\uC6D4\uC5D0 \uC5F4\uB9AC\uB294 \uBB38\uD654 \uD589\uC0AC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) }), _jsx("div", { className: "text-right mt-4", children: _jsx(Link, { to: "/events", className: "text-blue-600 hover:underline", children: "\uB354\uBCF4\uAE30 \u2192" }) })] }), _jsxs("section", { className: "mt-12 max-w-7xl mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "\uBB38\uD654\uACF5\uAC04" }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: spaces === null || spaces === void 0 ? void 0 : spaces.slice(0, 5).map((space, i) => (_jsx(CulturalSpaceCard, { space: space }, space.NUM || i))) }), _jsx("div", { className: "text-right mt-4", children: _jsx(Link, { to: "/spaces", className: "text-blue-600 hover:underline", children: "\uB354\uBCF4\uAE30 \u2192" }) })] })] }));
};
export default Home;
