import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEvents } from "../hooks/useEvents";

const HeroSlider = () => {
  const { events } = useEvents();

  const banners = events.filter((event) => event.MAIN_IMG).slice(0, 5);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 mb-10">
      <div className="w-full flex justify-start">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-[720px] h-[400px] rounded-lg overflow-hidden shadow-lg"
        >
          {banners.map((event, idx) => (
            <SwiperSlide key={idx} className="relative">
              <img
                src={event.MAIN_IMG}
                alt={event.TITLE}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/50 text-white p-3 rounded-md max-w-[90%]">
                <h2 className="text-lg font-bold">{event.TITLE}</h2>
                <p className="text-sm mt-1">{event.DATE}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;
