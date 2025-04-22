import { useEvents } from "../hooks/useEvents";
import { EventCard } from "../components/EventCard";
import Header from "../components/Header";

const Home = () => {
  const { events, loading } = useEvents();

  if (loading) return <p className="p-4">불러오는 중...</p>;

  return (
    <>
      <Header />
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </>
  );
};

export default Home;
