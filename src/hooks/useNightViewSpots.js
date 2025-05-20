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
export const useNightViewSpots = () => {
    const [spots, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpots = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield fetch(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/viewNightSpot/1/1000/`);
                const data = yield res.json();
                if (!data.viewNightSpot || !Array.isArray(data.viewNightSpot.row)) {
                    console.error("API 구조:", data);
                    throw new Error("데이터 구조 불일치");
                }
                setSpaces(data.viewNightSpot.row);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("API 오류 발생"));
            }
            finally {
                setLoading(false);
            }
        });
        fetchSpots();
    }, []);
    return { spots, loading, error };
};
