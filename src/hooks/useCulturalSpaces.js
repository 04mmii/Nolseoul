import { useEffect, useState } from "react";
export const useCulturalSpaces = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpaces = async () => {
            var _a;
            try {
                const BASE_URL = import.meta.env.DEV
                    ? "https://nolseoul.vercel.app"
                    : "";
                const res = await fetch(`${BASE_URL}/api/seoulapi?type=space`);
                const data = await res.json();
                if (!((_a = data === null || data === void 0 ? void 0 : data.culturalSpaceInfo) === null || _a === void 0 ? void 0 : _a.row)) {
                    console.warn("문화공간 데이터 없음:", data);
                    setSpaces([]);
                    return;
                }
                setSpaces(data.culturalSpaceInfo.row);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("API 오류 발생"));
                console.error("API 호출 실패:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchSpaces();
    }, []);
    return { spaces, loading, error };
};
