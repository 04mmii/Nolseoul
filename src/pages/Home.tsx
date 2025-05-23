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

  // 개선된 날짜 유효성 검사 함수
  const isValidDate = (d: Date) => dayjs(d).isValid();

  // 현재 진행 중인 이벤트 필터링
  const ongoingEvents = events
    ?.filter((event) => {
      const start = parseDate(event.STRTDATE);
      const end = parseDate(event.END_DATE);

      // 디버깅용 로그 (문제시 주석 해제)
      console.log("현재 이벤트:", {
        title: event.TITLE,
        originalStart: event.STRTDATE,
        parsedStart: start,
        originalEnd: event.END_DATE,
        parsedEnd: end,
      });

      return (
        isValidDate(start) &&
        isValidDate(end) &&
        dayjs(start).isSameOrBefore(today) &&
        dayjs(end).isSameOrAfter(today)
      );
    })
    .slice(0, 20);

  // 이번 달 행사 필터링 (월 범위 체크 강화)
  const currentMonthEvents = events
    ?.filter((event) => {
      const start = parseDate(event.STRTDATE);
      const end = parseDate(event.END_DATE);

      if (!isValidDate(start) || !isValidDate(end)) return false;

      const eventStart = dayjs(start);
      const eventEnd = dayjs(end);
      const currentMonth = today.month();

      // 시작월 ≤ 현재월 ≤ 종료월 조건으로 장기 이벤트 포함
      return (
        (eventStart.month() <= currentMonth &&
          currentMonth <= eventEnd.month()) ||
        eventStart.month() === currentMonth ||
        eventEnd.month() === currentMonth
      );
    })
    .slice(0, 5);

  if (eventsLoading || spacesLoading) {
    return <p className="p-4">불러오는 중...</p>;
  }

  return (
    <>
      <Header />
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4">
        {/* 현재 진행 중인 행사 섹션 */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-6">현재 진행 중인 행사</h2>
          {ongoingEvents?.length > 0 ? (
            <OngoingEventSlider events={ongoingEvents} />
          ) : (
            <p className="text-gray-500">
              현재 진행 중인 문화 행사가 없습니다.
            </p>
          )}
        </section>

        {/* 이번 달 행사 섹션 */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {today.month() + 1}월 문화 행사
            </h2>
            <Link
              to="/events"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              더보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {currentMonthEvents?.length > 0 ? (
              currentMonthEvents.map((event) => (
                <EventCard key={event.CULTCODE} event={event} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                {today.month() + 1}월에 예정된 문화 행사가 없습니다.
              </p>
            )}
          </div>
        </section>

        {/* 문화공간 섹션 */}
        <section className="my-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">추천 문화공간</h2>
            <Link
              to="/spaces"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              더보기 →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {spaces?.slice(0, 5).map((space) => (
              <CulturalSpaceCard key={space.NUM} space={space} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
