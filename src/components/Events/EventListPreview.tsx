import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchEvents } from "../../api/fetchEvents";
import { EventItem } from "../../types/EventItem";

const EventListPreview = () => {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data.slice(0, 5));
    };
    loadEvents();
  }, []);

  return (
    <div className="max-w-7xl px-4">
      <h2 className="text-xl font-bold mb-4">문화 행사</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {events.map((event, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <h3 className="font-semibold">{event.TITLE}</h3>
            <p className="text-sm text-gray-600">{event.DATE}</p>
          </div>
        ))}
      </div>
      <div className="text-right mt-4">
        <Link to="/events" className="text-blue-600 hover:underline">
          더보기 →
        </Link>
      </div>
    </div>
  );
};

export default EventListPreview;
