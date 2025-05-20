import { useEffect, useState } from "react";
import { Event } from "../types/Event";

const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/1000/`
        );
        const data = await res.json();
        setEvents(data.culturalEventInfo.row);
      } catch (error) {
        console.error("이벤트 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading };
};
