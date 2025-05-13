import { useEvents } from "../../hooks/useEvents";
import { EventCard } from "./EventCard";
import { Event } from "../../types/Event"; // 실제 경로로 맞추세요

type Props = {
  onSelectEvent: (event: Event) => void;
};

const EventList = ({ onSelectEvent }: Props) => {
  const { events, loading } = useEvents();

  if (loading) return <p className="text-center mt-10">불러오는 중...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {events.map((event, i) => (
        <EventCard key={i} event={event} onClick={() => onSelectEvent(event)} />
      ))}
    </div>
  );
};

export default EventList;
