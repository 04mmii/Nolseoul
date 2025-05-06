import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";
import NightViewList from "../Places/NightViewList";
import { Link } from "react-router-dom";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // 고정 정보 (API에서 데이터를 가져오지 못할 경우 사용)
  const nightViewInfo = {
    title: "2025 서울 문화의 밤, 문화로 야금야금(夜金)",
    date: "2025.4. ~ 12.",
    location: "도심 내 주요 시립 문화시설(8개소), 한강공원 등",
    image: "/images/nightview.jpg", // 이미지 경로는 적절히 수정
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

              {/* 이미지 하단 텍스트 박스 */}
              <div className="absolute w-full h-[150px] top-103 left-10 bg-white opacity-98 p-6 max-w-[600px] ">
                <h2 className="text-2xl font-bold mb-2">{banner.title}</h2>
                {banner.description && (
                  <p className="text-base text-gray-700 mb-2">
                    {banner.description}
                  </p>
                )}
                {banner.date && (
                  <p className="text-sm text-gray-500 mb-3">{banner.date}</p>
                )}
                <button
                  onClick={() => handleClick(banner.link)}
                  className="absolute right-10 top--1 px-4 py-2 bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800 transition"
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
              current === idx ? "bg-indigo-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
