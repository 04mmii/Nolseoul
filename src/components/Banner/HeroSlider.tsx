import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";

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
    <div className="relative w-full h-[847px] overflow-hidden px-5">
      {bannerData.map((banner, idx) => (
        <div
          key={banner.id}
          className={`absolute transition-opacity duration-1000 ease-in-out w-full h-full flex items-center ${
            current === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="w-full flex justify-center items-center gap-12 px-12">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-[1020px] h-auto rounded shadow-lg cursor-pointer"
              onClick={() => handleClick(banner.link)}
            />
            <div className="max-w-md text-left">
              <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{banner.description}</p>
              <button
                onClick={() => handleClick(banner.link)}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                바로가기 →
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSlider;
