import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import FilterTabs from "../components/Common/FilterTabs";
import { eventCategoryOptions } from "../components/Events/eventCategoryOptions";
import Pagination from "../components/Common/Pagination";
import EventDetailModal from "../components/Events/EventDetailModal";
import { useParams, useNavigate } from "react-router-dom";

const EventsPage = () => {
  const { events } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState<string | string[]>(
    "전체"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { slug } = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 20;

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
        return dateB - dateA;
      });
  }, [events, selectedCategory, searchQuery]);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      <div className="p-6 max-w-7xl mx-auto">
        <input
          type="text"
          placeholder="행사명을 검색하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />

        <FilterTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          options={eventCategoryOptions}
        />

        {paginatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedEvents.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">조건에 맞는 행사가 없습니다.</p>
        )}

        <Pagination
          totalItems={filteredEvents.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ✅ 모달은 URL로 선택된 이벤트 기반으로 렌더링 */}
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default EventsPage;
