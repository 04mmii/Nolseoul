import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import FilterTabs from "../components/Common/FilterTabs";
import { eventCategoryOptions } from "../components/Events/eventCategoryOptions";
import Pagination from "../components/Common/Pagination";

const EventsPage = () => {
  const { events, loading } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>(
    "전체"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const category = event.CODENAME || "";
        const title = event.TITLE || "";

        // 카테고리 필터
        const matchesCategory =
          (Array.isArray(selectedCategory) &&
            selectedCategory.some((cat) => category.includes(cat))) ||
          selectedCategory === "전체" ||
          category.includes(selectedCategory as string);

        // 검색어 필터
        const matchesSearch = title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.STRTDATE || a.DATE || "").getTime();
        const dateB = new Date(b.STRTDATE || b.DATE || "").getTime();
        return dateB - dateA; // 최신순
      });
  }, [events, selectedCategory, searchQuery]);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <div className="p-6 max-w-7xl mx-auto">
        {/* 검색창 */}
        <input
          type="text"
          placeholder="행사명을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />

        {/* 카테고리 탭 */}
        <FilterTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          options={eventCategoryOptions}
        />

        {/* 리스트 */}
        {paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedEvents.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">조건에 맞는 행사가 없습니다.</p>
        )}
        {/* 페이지네이션 */}
        <Pagination
          totalItems={filteredEvents.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default EventsPage;
