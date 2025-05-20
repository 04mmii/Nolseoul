import { jsx as _jsx } from "react/jsx-runtime";
import { useEvents } from "../../hooks/useEvents";
import { EventCard } from "./EventCard";
const EventList = () => {
    const { events, loading } = useEvents();
    if (loading)
        return _jsx("p", { className: "text-center mt-10", children: "\uBD88\uB7EC\uC624\uB294 \uC911..." });
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4", children: events.map((event, i) => (_jsx(EventCard, { event: event }, i))) }));
};
export default EventList;
