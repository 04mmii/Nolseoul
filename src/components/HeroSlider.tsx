import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useEvents } from "../hooks/useEvents";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const { events } = useEvents();

  const banners = events.filter((event) => event.MAIN_IMG).slice(0, 5);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 mb-10 flex items-center gap-8">
      {/* 배너 슬라이드 */}
      <div className="w-[378px] h-[534px]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full h-full rounded-lg overflow-hidden shadow-md"
        >
          {banners.map((event, idx) => (
            <SwiperSlide key={idx} className="relative">
              <Link to={`/events/${event.MAIN_KEY}`}>
                <img
                  src={event.MAIN_IMG}
                  alt={event.TITLE}
                  className="w-full h-full object-cover object-center rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black/60 text-white p-3 rounded-md max-w-[90%]">
                  <h2 className="text-lg font-bold">{event.TITLE}</h2>
                  <p className="text-xs mt-1">{event.DATE}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 배너 옆 소개글 */}
      <div className="flex-1">
        {banners.length > 0 && (
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{banners[0].TITLE}</h1>
            <p className="text-gray-700">{banners[0].PLACE}</p>
            <p className="text-gray-500 text-sm">{banners[0].DATE}</p>
            <Link
              to={`/events/${banners[0].MAIN_KEY}`}
              className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              행사 자세히 보기 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSlider;
