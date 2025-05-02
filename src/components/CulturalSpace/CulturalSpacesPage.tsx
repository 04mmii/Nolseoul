import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";
import CulturalSpaceCard from "../CulturalSpace/CulturalSpaceCard";
import Map from "../Map/KakaoMap.tsx";
import FilterTabs from "./FilterTabs.tsx";
import Pagination from "../Common/Pagination.tsx";
import { useState, useEffect } from "react";

const CulturalSpacesPage = () => {
  const { spaces } = useCulturalSpaces();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const filteredSpaces =
    selectedCategory === "전체"
      ? spaces
      : spaces.filter((space) => space.SUBJCODE === selectedCategory);

  const paginatedSpaces = filteredSpaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 시 스크롤 상단 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">
          문화공간 전체
        </h1>
        {/* 카테고리 필터 탭 */}
        <FilterTabs
          selected={selectedCategory}
          onSelect={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
        {/* 지도 컴포넌트 */}
        <Map spaces={filteredSpaces} />
        {/* 문화공간 카드 리스트 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {paginatedSpaces.map((space, i) => (
            <CulturalSpaceCard key={i} space={space} />
          ))}
        </div>
        {/* 페이지네이션 */}
        <Pagination
          totalItems={filteredSpaces.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
};

export default CulturalSpacesPage;
