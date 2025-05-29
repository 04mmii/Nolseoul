import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="relative w-full h-auto lg:h-[650px] bg-gray-50 overflow-hidden">
      {" "}
      {/* 💡 높이 반응형 */}
      {bannerData.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            current === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-auto lg:h-full flex flex-col lg:flex-row items-center justify-between gap-6 px-4 sm:px-8 py-6">
            {" "}
            {/* 💡 내부 높이도 반응형 */}
            {/* 왼쪽 배너 이미지 */}
            <div className="relative w-full lg:w-3/4 h-[300px] sm:h-[360px] md:h-[400px] lg:h-full">
              {" "}
              {/* 💡 사이즈 줄이기 */}
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
              <div className="absolute w-[800px] bottom-6 left-6 right-6 sm:right-auto bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md max-w-md">
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
            <Link
              to="/night-views"
              className="w-full lg:w-1/4 h-auto mt-4 lg:mt-0"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl shadow-lg mb-4">
                {" "}
                {/* 💡 고정 높이 제거 */}
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
      ))}
      {/* 인디케이터 */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-navy-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
