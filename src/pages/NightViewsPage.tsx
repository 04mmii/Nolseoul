import { useState, useEffect, useMemo } from "react";
import Header from "../components/Layout/Header";
import Pagination from "../components/Common/Pagination";
import NightViewMap from "../components/Map/NightViewMap";
import { useNightViewSpots } from "../hooks/useNightViewSpots";
import NightViewCard from "../components/Places/NightViewCard";
import Footer from "../components/Layout/Footer";

const categories = ["전체", "공원/광장", "문화/체육", "공공시설", "가로/마을"];

const NightViewsPage = () => {
  const { spots, loading, error } = useNightViewSpots();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 8;

  // 필터링 로직 수정 (FAC_NAME → TITLE)
  const filteredSpots = useMemo(() => {
    return spots.filter(
      (spot) =>
        (selectedCategory === "전체" || spot.SUBJECT_CD === selectedCategory) &&
        (spot.TITLE.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          spot.ADDR.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  }, [spots, selectedCategory, searchKeyword]);

  // 페이지네이션
  const paginatedSpots = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSpots.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredSpots]);

  // 페이지 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchKeyword]);

  // 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // 로딩 및 에러 상태 처리
  if (loading) return <div className="text-center py-8">로딩 중...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center py-8">
        오류 발생: {error.message}
      </div>
    );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/n-1920.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              야경명소
            </h1>
            <p className="text-lg sm:text-xl text-white">
              서울의 아름다운 야경 명소를 찾아보세요!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mb-8 mt-8">
          <NightViewMap spots={paginatedSpots} />
        </div>

        {/* 필터 섹션 */}
        <div className="max-w-7xl mx-auto px-4 mb-6 space-y-4">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-orange-400 text-black font-bold"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 검색 필터 */}
          <div className="relative">
            <input
              type="text"
              placeholder="이름 또는 주소로 검색"
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <svg
              className="absolute left-3 top-4 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* 명소 카드 표시 */}
        <div className="max-w-7xl mx-auto px-4 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedSpots.map((spot) => (
            <NightViewCard key={spot.NUM} spot={spot} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <Pagination
            totalItems={filteredSpots.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NightViewsPage;
