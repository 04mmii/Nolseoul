import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import { Link } from "react-router-dom";
import HeroSlider from "../components/Banner/HeroSlider";
import CulturalSpaceCard from "../components/CulturalSpace/CulturalSpaceCard";
import { useCulturalSpaces } from "../hooks/useCulturalSpaces";

const Home = () => {
  const { events, loading: eventsLoading } = useEvents();
  const { spaces, loading: spacesLoading } = useCulturalSpaces();

  if (eventsLoading || spacesLoading)
    return <p className="p-4">불러오는 중...</p>;

  return (
    <>
      <Header />
      <HeroSlider />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">문화 행사</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {events?.length > 0 ? (
            events
              .slice(0, 5)
              .map((event, i) => <EventCard key={i} event={event} />)
          ) : (
            <p>문화 행사가 없습니다.</p>
          )}
        </div>
        <div className="text-right mt-4">
          <Link to="/events" className="text-blue-600 hover:underline">
            더보기 →
          </Link>
        </div>
      </div>
      <section className="mt-12 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4">문화공간</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {spaces?.slice(0, 5).map((space, i) => (
            <CulturalSpaceCard key={space.FAC_CODE || i} space={space} />
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
