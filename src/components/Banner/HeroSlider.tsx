import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const nightViewInfo = {
    title: "2025 서울 문화의 밤, 문화로 야금야금(夜金)",
    date: "2025.4. ~ 12.",
    location: "도심 내 주요 시립 문화시설(8개소), 한강공원 등",
    image: "/images/nightview.jpg",
  };

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
    <div className="relative max-w-8xl mx-auto w-[90%] h-[650px] overflow-hidden px-5 py-7">
      {bannerData.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute transition-opacity duration-1000 ease-in-out w-full h-full ${
            current === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full h-full flex justify-between items-center gap-10 px-6">
            {/* 왼쪽 배너 이미지 */}
            <div className="relative w-[70%] h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-[85%] object-cover rounded-xl shadow-lg cursor-pointer"
                onClick={() => handleClick(banner.link)}
              />

              {/* 이미지 위 텍스트 오버레이 */}
              <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md w-[600px]">
                <h2 className="text-xl font-bold text-gray-800 mb-1">
                  {banner.title}
                </h2>
                {banner.description && (
                  <p className="text-sm text-gray-700 mb-1">
                    {banner.description}s
                  </p>
                )}
                <button
                  onClick={() => handleClick(banner.link)}
                  className="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition"
                >
                  자세히 보기
                </button>
              </div>
            </div>

            {/* 오른쪽 야경 명소 카드 */}
            <Link to="/night-views" className="w-[30%] h-full cursor-pointer">
              {/* 야경 이미지 */}
              <div className="h-[60%] overflow-hidden rounded-xl shadow-lg mb-4">
                <img
                  src={nightViewInfo.image}
                  alt="서울 야경명소"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 야경 정보 */}
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">
                  {nightViewInfo.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {nightViewInfo.date}
                </p>
                <p className="text-sm text-gray-700">
                  {nightViewInfo.location}
                </p>
              </div>
            </Link>
          </div>
        </div>
      ))}

      {/* 슬라이더 인디케이터 */}
      <div className="absolute px-2 bottom-10 left-2/3 transform -translate-x-1/2 flex space-x-2">
        {bannerData.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === idx ? "bg-navy-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
