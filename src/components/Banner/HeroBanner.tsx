const HeroBanner = () => {
  return (
    <div className="w-full flex justify-center items-center bg-white px-4 py-8">
      <div className="max-w-[1475px] h-[847px] w-full relative flex items-center justify-between">
        <img
          src="../src/images/banner-01.jpg"
          alt="서울 문화 행사 배너"
          className="w-[70%] object-contain rounded-xl shadow-lg"
        />
        <div className="ml-8 w-[30%]">
          <h2 className="text-3xl font-bold mb-4">2025 서울 문화 축제</h2>
          <p className="text-gray-700 mb-6">
            서울의 다양한 문화 행사와 축제를 지금 만나보세요! 가까운 곳에서
            즐기는 특별한 경험을 제공합니다.
          </p>
          <a
            href="https://culture.seoul.go.kr/night/main/main.do"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            행사 보러가기 →
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
