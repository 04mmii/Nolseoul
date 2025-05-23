import { useEffect, useState } from "react";
import { Event } from "../types/Event";

// useEvents.ts
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/seoulapi?type=event");
        const data = await res.json();

        console.log("✅ API 응답 구조 확인:", data); // 추가
        console.log("🧾 첫 번째 row:", data.culturalEventInfo?.row?.[0]); // 추가

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
