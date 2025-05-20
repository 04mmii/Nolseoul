import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import EventDetailModal from "./EventDetailModal";
import type { Event } from "../../types/Event";

interface Props {
  events: Event[];
}

const OngoingEventSlider = ({ events }: Props) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={3}
        navigation
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {events.map((event, i) => (
          <SwiperSlide key={i}>
            <div
              className="aspect-[3/4] overflow-hidden rounded-lg shadow cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <img
                src={event.MAIN_IMG}
                alt={event.TITLE}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default OngoingEventSlider;
