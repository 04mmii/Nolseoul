import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import EventDetailModal from "./EventDetailModal";
const OngoingEventSlider = ({ events }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    return (_jsxs("div", { children: [_jsx(Swiper, { modules: [Navigation], spaceBetween: 16, slidesPerView: 3, navigation: true, breakpoints: {
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }, children: events.map((event, i) => (_jsx(SwiperSlide, { children: _jsx("div", { className: "aspect-[3/4] overflow-hidden rounded-lg shadow cursor-pointer", onClick: () => setSelectedEvent(event), children: _jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-full object-cover" }) }) }, i))) }), selectedEvent && (_jsx(EventDetailModal, { event: selectedEvent, onClose: () => setSelectedEvent(null) }))] }));
};
export default OngoingEventSlider;
