import { useEvents } from "../hooks/useEvents";
import EventCard from "./EventCard";

const EventList = () => {
  const { events, loading } = useEvents();

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventList;
