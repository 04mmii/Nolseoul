import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import Header from "../components/Layout/Header";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import Map from "../components/Map/KakaoMap";
import FilterTabs from "../components/CulturalSpace/FilterTabs";
import Pagination from "../components/Common/Pagination";
import { useState, useEffect } from "react";

const CulturalSpacesPage = () => {
  const { spaces } = useCulturalSpaces();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // 필터링 (카테고리 + 검색어)
  const filteredSpaces = spaces.filter((space) => {
    const matchesCategory =
      selectedCategory === "전체" || space.SUBJCODE === selectedCategory;
    const matchesSearch =
      space.FAC_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.ADDR.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginatedSpaces = filteredSpaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4">
          문화공간 전체
        </h1>
        <Map spaces={filteredSpaces} />

        {/* 필터 탭 */}
        <FilterTabs
          selected={selectedCategory}
          onSelect={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />

        {/* 검색창 */}
        <div className="mt-4 mb-6">
          <input
            type="text"
            placeholder="문화공간 이름 또는 주소 검색"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 문화공간 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 pt-1">
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
