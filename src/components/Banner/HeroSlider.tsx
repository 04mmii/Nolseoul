import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { bannerData } from "./bannerData";

const HeroSlider = () => {
  const handleClick = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="w-full px-4 sm:px-8 py-6 max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* 왼쪽 슬라이드 */}
        <div className="w-full lg:w-3/4 relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop
            navigation
            pagination={{ clickable: true, el: ".custom-swiper-pagination" }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="rounded-xl shadow-lg"
          >
            {bannerData.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full h-auto pd-14">
                  <a
                    href={banner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </a>
                  <div className="absolute -bottom-3 left-4 right-4 w-[850px] sm:w-[500px] max-w-md bg-white/80 backdrop-blur-sm p-4 sm:p-6  shadow-md">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                      {banner.title}
                    </h2>
                    {banner.description && (
                      <p className="text-sm sm:text-base text-gray-700 mb-2">
                        {banner.description}
                      </p>
                    )}
                    <button
                      onClick={() => handleClick(banner.link)}
                      className="absolute -right-3 px-6 py-2 transform -translate-x-1/2 px-6 py-2 text-sm sm:text-base bg-navy-600 text-white rounded-full shadow-lg hover:bg-navy-700 transition"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="custom-swiper-pagination absolute bottom-4 right-4 z-10" />
        </div>

        {/* 오른쪽 고정 야경카드 */}
        <Link to="/night-views" className="w-full lg:w-1/4">
          <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg mb-4">
            <img
              src="/images/nightview.jpg"
              alt="서울 야경명소"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-2">
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              2025 서울 문화의 밤, 문화로 야금야금(夜金)
            </h3>
            <p className="text-sm text-gray-500 mb-1">2025.4. ~ 12.</p>
            <p className="text-sm text-gray-700">
              도심 내 주요 시립 문화시설(8개소), 한강공원 등
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HeroSlider;
