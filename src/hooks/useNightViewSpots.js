import { useEffect, useState } from "react";
export const useNightViewSpots = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpots = async () => {
            var _a;
            try {
                const BASE_URL = import.meta.env.DEV
                    ? "https://nolseoul.vercel.app"
                    : "";
                const res = await fetch(`${BASE_URL}/api/seoulapi?type=night`);
                const data = await res.json();
                if (!((_a = data === null || data === void 0 ? void 0 : data.viewNightSpot) === null || _a === void 0 ? void 0 : _a.row) ||
                    !Array.isArray(data.viewNightSpot.row)) {
                    console.warn("야경명소 데이터 없음 또는 형식 오류:", data);
                    setSpots([]);
                    return;
                }
                setSpots(data.viewNightSpot.row);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("API 오류 발생"));
                console.error("API 호출 실패:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSpots();
    }, []);
    return { spots, loading, error };
};
