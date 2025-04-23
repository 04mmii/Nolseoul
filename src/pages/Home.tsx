import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/EventCard";
import Header from "../components/Header";
import { Link } from "react-router-dom";

const Home = () => {
  const { events, loading } = useEvents();

  if (loading) return <p className="p-4">불러오는 중...</p>;

  return (
    <>
      <Header />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">문화 행사</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {events.slice(0, 5).map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
        <div className="text-right mt-4">
          <Link to="/events" className="text-blue-600 hover:underline">
            더보기 →
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
