import { useState, useEffect, useMemo } from "react";
import Header from "../components/Layout/Header";
import Pagination from "../components/Common/Pagination";
import NightViewMap from "../components/Map/NightViewMap";
import { useNightViewSpots } from "../hooks/useNightViewSpots";
import NightViewCard from "../components/Places/NightViewCard";
import Footer from "../components/Layout/Footer";
import SkeletonCard from "@/components/Common/SkeletonCard";
import { useTranslation } from "react-i18next";

const NightViewsPage = () => {
  const { t } = useTranslation();
  const { spots, loading, error } = useNightViewSpots();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 8;

  const categories = useMemo(
    () => [
      { label: t("categories.nightViews.all"), value: "전체" },
      { label: t("categories.nightViews.parkPlaza"), value: "공원/광장" },
      { label: t("categories.nightViews.cultureSports"), value: "문화/체육" },
      { label: t("categories.nightViews.publicFacility"), value: "공공시설" },
      { label: t("categories.nightViews.streetVillage"), value: "가로/마을" },
    ],
    [t]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchKeyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const filteredSpots = useMemo(() => {
    return spots.filter(
      (spot) =>
        (selectedCategory === "전체" || spot.SUBJECT_CD === selectedCategory) &&
        (spot.TITLE?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          spot.ADDR?.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  }, [spots, selectedCategory, searchKeyword]);

  const paginatedSpots = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredSpots.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredSpots, currentPage]);

  if (error)
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center text-red-500">
            {t("common.error")}
            <br />
            <span className="text-xs text-gray-400">
              ({error instanceof Error ? error.message : t("common.unknownError")})
            </span>
          </div>
        </main>
        <Footer />
      </div>
    );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/n-1920.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t("nightViews.title")}
            </h1>
            <p className="text-lg sm:text-xl text-white">
              {t("nightViews.subtitle")}
            </p>
          </div>
        </div>

        {/* 지도 */}
        <div className="max-w-7xl mx-auto p-4 mb-8">
          {/* 로딩 중엔 지도 대신 스켈레톤 느낌으로 비워두고 싶으면 조건 분기 해도 됨 */}
          <NightViewMap spots={paginatedSpots} />
        </div>

        {/* 필터 및 검색창 */}
        <div className="max-w-7xl mx-auto px-4 mt-8 mb-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.value
                    ? "bg-orange-400 text-black font-bold"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={t("nightViews.searchPlaceholder")}
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

        {/* 명소 카드 리스트 */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedSpots.map((spot) => (
                <NightViewCard key={spot.NUM} spot={spot} />
              ))}
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {!loading && (
          <div className="max-w-7xl mx-auto px-4 pb-8">
            <Pagination
              totalItems={filteredSpots.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default NightViewsPage;
