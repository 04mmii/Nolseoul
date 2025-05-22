// Home.tsx

import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";
import HeroSlider from "../components/Banner/HeroSlider";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import OngoingEventSlider from "../components/Events/OngoingEventSlider";
import { parseDate } from "../utils/parseDate";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Home = () => {
  const { events, loading: eventsLoading } = useEvents();
  const { spaces, loading: spacesLoading } = useCulturalSpaces();

  const today = dayjs().startOf("day");
  const isValidDate = (d: Date) => !isNaN(d.getTime());

  // 오늘이 포함된 행사만 필터링
  const ongoingEvents = events
    ?.filter((event) => {
      const start = parseDate(event.STRTDATE);
      const end = parseDate(event.END_DATE);

      return (
        isValidDate(start) &&
        isValidDate(end) &&
        dayjs(start).isSameOrBefore(today, "day") &&
        dayjs(end).isSameOrAfter(today, "day")
      );
    })
    .slice(0, 20); // 최대 20개

  // 오늘의 월(예: 5월)이 포함된 행사만 필터링
  const mayEvents = events
    ?.filter((event) => {
      const start = parseDate(event.STRTDATE);
      const end = parseDate(event.END_DATE);

      return (
        isValidDate(start) &&
        isValidDate(end) &&
        (dayjs(start).month() === today.month() ||
          dayjs(end).month() === today.month())
      );
    })
    .slice(0, 5); // 최대 5개

  if (eventsLoading || spacesLoading)
    return <p className="p-4">불러오는 중...</p>;

  return (
    <>
      <Header />
      <HeroSlider />

      <div className="max-w-7xl mx-auto">
        {/* 1. 현재 진행 중인 행사 */}
        <h2 className="text-xl font-bold mb-4">현재 진행 중인 행사</h2>
        {ongoingEvents?.length > 0 ? (
          <OngoingEventSlider events={ongoingEvents} />
        ) : (
          <p>현재 진행 중인 문화 행사가 없습니다.</p>
        )}

        {/* 2. 이번 달 행사 */}
        <h2 className="text-xl font-bold mt-12 mb-4">
          {today.month() + 1}월 문화 행사
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mayEvents?.length > 0 ? (
            mayEvents.map((event, i) => <EventCard key={i} event={event} />)
          ) : (
            <p>{today.month() + 1}월에 열리는 문화 행사가 없습니다.</p>
          )}
        </div>

        <div className="text-right mt-4">
          <Link to="/events" className="text-blue-600 hover:underline">
            더보기 →
          </Link>
        </div>
      </div>

      {/* 문화공간 */}
      <section className="mt-12 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">문화공간</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {spaces?.slice(0, 5).map((space, i) => (
            <CulturalSpaceCard key={space.NUM || i} space={space} />
          ))}
        </div>
        <div className="text-right mt-4">
          <Link to="/spaces" className="text-blue-600 hover:underline">
            더보기 →
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
