import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import HeroSlider from "../components/Banner/HeroSlider";
import OngoingEventSlider from "../components/Events/OngoingEventSlider";
import { EventCard } from "../components/Events/EventCard";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useEvents } from "../hooks/useEvents";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";
import { useTranslation } from "react-i18next";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const Home = () => {
  const { t, i18n } = useTranslation();
  const { events, loading: eventsLoading } = useEvents();
  const { spaces, loading: spacesLoading } = useCulturalSpaces();

  const today = dayjs().startOf("day");

  const ongoingEvents = events
    ?.filter((event) => {
      if (!event.DATE?.includes("~")) return false;
      const [startStr, endStr] = event.DATE.split("~");
      const start = dayjs(startStr.trim());
      const end = dayjs(endStr.trim());

      return (
        start.isValid() &&
        end.isValid() &&
        today.isSameOrAfter(start, "day") &&
        today.isSameOrBefore(end, "day")
      );
    })
    .slice(0, 20);

  const currentMonthEvents = events
    ?.filter((event) => {
      if (!event.DATE?.includes("~")) return false;

      const [startStr, endStr] = event.DATE.split("~");
      const start = dayjs(startStr.trim());
      const end = dayjs(endStr.trim());

      if (!start.isValid() || !end.isValid()) return false;

      const currentMonth = today.month();

      return (
        start.month() === currentMonth ||
        end.month() === currentMonth ||
        (start.month() <= currentMonth && end.month() >= currentMonth)
      );
    })
    .slice(0, 5);

  return (
    <>
      <Header />
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4">
        {/* 현재 진행 중인 볼거리 */}
        <section className="my-12">
          <h2 className="text-3xl font-bold mb-12 text-center">
            {t("home.ongoingEvents")}
          </h2>

          {eventsLoading ? (
            <p className="text-center text-gray-500">
              {t("home.loadingEvents")}
            </p>
          ) : ongoingEvents && ongoingEvents.length > 0 ? (
            <OngoingEventSlider events={ongoingEvents} />
          ) : (
            <p className="text-gray-500 text-center">
              {t("home.noOngoingEvents")}
            </p>
          )}
        </section>

        {/* 이번 달 문화 행사 */}
        <section className="my-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center">
              {t("home.monthlyEvents", {
                month: i18n.language === "en"
                  ? today.format("MMMM")
                  : today.month() + 1,
              })}
            </h2>
          </div>

          {eventsLoading ? (
            <p className="text-center text-gray-500">
              {t("home.loadingMonthlyEvents")}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {currentMonthEvents && currentMonthEvents.length > 0 ? (
                  currentMonthEvents.map((event) => (
                    <EventCard key={event.CULTCODE} event={event} />
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">
                    {t("home.noMonthlyEvents", {
                      month: i18n.language === "en"
                        ? today.format("MMMM")
                        : today.month() + 1,
                    })}
                  </p>
                )}
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/events"
                  className="inline-block text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {t("home.moreEvents")} {">"}
                </Link>
              </div>
            </>
          )}
        </section>

        {/* 추천 문화공간 */}
        <section className="my-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center">{t("home.recommendedSpaces")}</h2>
            <div className="text-right mt-2">
              <Link
                to="/spaces"
                className="block text-navy-600 hover:text-navy-800 transition-colors"
              >
                {t("home.moreSpaces")} {">"}
              </Link>
            </div>
          </div>

          {spacesLoading ? (
            <p className="text-center text-gray-500">
              {t("home.loadingSpaces")}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {spaces?.slice(0, 5).map((space) => (
                <CulturalSpaceCard key={space.NUM} space={space} />
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
