import { useEffect, useState } from "react";
export const useNightViewSpots = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpots = async () => {
            var _a;
            try {
                const res = await fetch(`/api/seoulapi?type=night`);
                const data = await res.json();
                if (!((_a = data.viewNightSpot) === null || _a === void 0 ? void 0 : _a.row) ||
                    !Array.isArray(data.viewNightSpot.row)) {
                    console.error("API 구조:", data);
                    throw new Error("데이터 구조 불일치");
                }
                setSpots(data.viewNightSpot.row);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("API 오류 발생"));
            }
            finally {
                setLoading(false);
            }
        };
        fetchSpots();
    }, []);
    return { spots, loading, error };
};
