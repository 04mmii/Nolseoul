import { useEffect, useState } from "react";
// useEvents.ts
export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchEvents = async () => {
            var _a, _b;
            try {
                const res = await fetch("/api/seoulapi?type=event");
                const data = await res.json();
                console.log("✅ API 응답 구조 확인:", data); // 추가
                console.log("🧾 첫 번째 row:", (_b = (_a = data.culturalEventInfo) === null || _a === void 0 ? void 0 : _a.row) === null || _b === void 0 ? void 0 : _b[0]); // 추가
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
