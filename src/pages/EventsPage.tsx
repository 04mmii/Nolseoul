import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import FilterTabs from "../components/Common/FilterTabs";
import { eventCategoryOptions } from "../components/Events/eventCategoryOptions";
import Pagination from "../components/Common/Pagination";
import EventDetailModal from "../components/Events/EventDetailModal";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "@/components/Layout/Footer";
import SkeletonCard from "@/components/Common/SkeletonCard";

const EventsPage = () => {
  const { events, loading, isError } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>(
    "전체"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const { slug } = useParams();
  const navigate = useNavigate();

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const category = event.CODENAME || "";
        const title = event.TITLE || "";
        const matchesCategory =
          (Array.isArray(selectedCategory) &&
            selectedCategory.some((cat) => category.includes(cat))) ||
          selectedCategory === "전체" ||
          category.includes(selectedCategory as string);
        const matchesSearch = title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.STRTDATE || a.DATE || "").getTime();
        const dateB = new Date(b.STRTDATE || b.DATE || "").getTime();
        return dateA - dateB;
      })
      .filter((event) => {
        const now = new Date().setHours(0, 0, 0, 0);
        const eventDate = new Date(
          event.STRTDATE || event.DATE || ""
        ).getTime();
        return eventDate >= now;
      });
  }, [events, selectedCategory, searchQuery]);

  const paginatedEvents = useMemo(() => {
    return filteredEvents.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredEvents, currentPage]);

  const selectedEvent = useMemo(() => {
    if (!slug || events.length === 0) return null;
    const decodedSlug = decodeURIComponent(slug);
    return events.find((e) => e.TITLE === decodedSlug) || null;
  }, [slug, events]);

  const handleCloseModal = () => {
    navigate("/events");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Banner */}
        <div
          className="w-full h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: "url('/images/event-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              문화행사
            </h1>
            <p className="text-lg sm:text-xl text-white">
              서울의 다양한 문화행사를 찾아보세요.
            </p>
          </div>
        </div>

        {/* 필터 및 검색창 + 리스트 영역 */}
        <div className="max-w-7xl mx-auto px-4 mt-8 space-y-6">
          <FilterTabs
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            options={eventCategoryOptions}
          />

          <div className="relative">
            <input
              type="text"
              placeholder="행사명을 검색하세요"
              className="w-full p-3 pl-10 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* ✅ 로딩 / 에러 / 정상 상태 처리 */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="w-full py-10 text-center text-red-500">
              데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
            </div>
          ) : (
            <>
              {/* 카드 리스트 */}
              {paginatedEvents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedEvents.map((event, i) => (
                    <EventCard key={i} event={event} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  조건에 맞는 행사가 없습니다.
                </p>
              )}

              {/* 페이지네이션 */}
              <Pagination
                totalItems={filteredEvents.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>

        {/* 행사 모달 */}
        {selectedEvent && (
          <EventDetailModal event={selectedEvent} onClose={handleCloseModal} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default EventsPage;
