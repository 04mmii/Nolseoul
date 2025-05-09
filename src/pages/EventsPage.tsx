import { useState, useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";

const categories = [
  "전체",
  "클래식",
  "콘서트",
  "전시",
  "축제-전통/역사",
  "축제-자연/경관",
  "교육/체험",
];

const EventsPage = () => {
  const { events, loading } = useEvents();
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");

  // 필터 + 정렬된 리스트
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const category = event.CODENAME || "";
        const title = event.TITLE || "";

        const matchesCategory =
          selectedCategory === "전체" || category.includes(selectedCategory);
        const matchesSearch = title.includes(searchQuery);

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.STRTDATE || a.DATE || "").getTime();
        const dateB = new Date(b.STRTDATE || b.DATE || "").getTime();
        return dateA - dateB;
      });
  }, [events, selectedCategory, searchQuery]);

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
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 리스트 */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">조건에 맞는 행사가 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default EventsPage;
