import { useEffect, useState } from "react";
import { EventData } from "../types/apiTypes";
import { fetchEvents } from "../api/fetchEvents";

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">문화 행사 목록</h2>
      <ul className="space-y-3">
        {events.map((event, index) => (
          <li key={index} className="border p-4 rounded-md">
            <h3 className="font-semibold">{event.TITLE}</h3>
            <p>{event.DATE}</p>
            <p className="text-sm text-gray-500">{event.PLACE}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
