var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;
export const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchEvents = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield fetch(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/1000/`);
                const data = yield res.json();
                setEvents(data.culturalEventInfo.row);
            }
            catch (error) {
                console.error("이벤트 불러오기 오류:", error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchEvents();
    }, []);
    return { events, loading };
};
