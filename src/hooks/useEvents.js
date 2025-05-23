import { useEffect, useState } from "react";
// useEvents.ts
export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/seoulapi?type=event");
                const data = await res.json();
                setEvents(data.culturalEventInfo.row);
            }
            catch (error) {
                console.error("이벤트 불러오기 오류:", error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);
    return { events, loading };
};
