import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleClick = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-50 min-h-[360px] sm:min-h-[400px] lg:min-h-[500px]">
      {/* 슬라이드 전체 */}
      <div
        className="flex w-full  transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${bannerData.length * 100}%`,
        }}
      >
        {bannerData.map((banner) => (
          <div
            key={banner.id}
            className="w-full flex-shrink-0 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-6 lg:min-h-[650px]"
          >
            {/* 왼쪽 배너 */}
            <div className="relative w-full lg:w-3/4 aspect-[3/2]">
              <a
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
              </a>
              <div className="absolute w-full sm:w-[500px] bottom-4 left-4 right-4 sm:right-auto bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md max-w-md">
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
                  className="mt-2 px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  자세히 보기
                </button>
              </div>
            </div>

            {/* 오른쪽 야경 카드 */}
            <Link to="/night-views" className="w-full lg:w-1/4 mt-4 lg:mt-0">
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
        ))}
      </div>

      {/* 좌우 버튼 */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white z-10"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white z-10"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* 인디케이터 + 재생/일시정지 */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-10">
        {bannerData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrent(idx);
              setIsPaused(true);
            }}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-navy-600" : "bg-gray-300"
            }`}
            aria-label={`슬라이드 ${idx + 1}`}
          />
        ))}

        {/* 재생/일시정지 버튼 */}
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="ml-4 bg-white/80 p-2 rounded-full shadow hover:bg-white"
          aria-label={isPaused ? "재생" : "일시정지"}
        >
          {isPaused ? (
            <Play className="w-4 h-4 text-gray-700" />
          ) : (
            <Pause className="w-4 h-4 text-gray-700" />
          )}
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
