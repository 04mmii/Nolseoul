import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import Header from "../components/Layout/Header";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import Map from "../components/Map/KakaoMap";
import FilterTabs from "../components/Common/FilterTabs";
import Pagination from "../components/Common/Pagination";
import Footer from "@/components/Layout/Footer";
import { useState, useEffect, useMemo } from "react";
import { spaceCategoryOptions } from "../components/CulturalSpace/spaceCategoryOptions";
import SkeletonCard from "../components/Common/SkeletonCard";

const CulturalSpacesPage = () => {
  const { spaces, loading, error } = useCulturalSpaces();
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>(
    "전체"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const filteredSpaces = useMemo(() => {
    return (spaces ?? []).filter((space) => {
      const subj = space.SUBJCODE || "";
      const name = space.FAC_NAME || "";
      const addr = space.ADDR || "";
      const matchesCategory =
        (Array.isArray(selectedCategory) &&
          selectedCategory.some((cat) => subj.includes(cat))) ||
        selectedCategory === "전체" ||
        subj.includes(selectedCategory as string);
      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        addr.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [spaces, selectedCategory, searchTerm]);

  const paginatedSpaces = useMemo(() => {
    return filteredSpaces.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredSpaces, currentPage]);

  if (error)
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-white">
          <div className="text-center text-red-500">
            데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            <br />
            <span className="text-xs text-gray-400">
              ({error instanceof Error ? error.message : "알 수 없는 오류"})
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
        {/* Hero */}
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/seoul-1280.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              문화공간
            </h1>
            <p className="text-lg sm:text-xl text-white">
              서울의 다양한 문화공간을 둘러보세요.
            </p>
          </div>
        </div>

        {/* 지도 */}
        <div className="max-w-7xl mx-auto p-4 mb-8">
          <Map spaces={paginatedSpaces} />
        </div>

        {/* 필터 및 검색창 + 카드 리스트 */}
        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-6">
          <FilterTabs
            selected={selectedCategory}
            onSelect={(category) => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            options={spaceCategoryOptions}
          />

          <div className="relative">
            <input
              type="text"
              placeholder="문화공간 이름 또는 주소 검색"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          {/* 카드 리스트 영역 */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedSpaces.map((space) => (
                <CulturalSpaceCard key={space.NUM} space={space} />
              ))}
            </div>
          )}

          {!loading && (
            <Pagination
              totalItems={filteredSpaces.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CulturalSpacesPage;
