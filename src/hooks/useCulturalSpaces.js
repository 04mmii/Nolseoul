import { useEffect, useState } from "react";
export const useCulturalSpaces = () => {
    const [spaces, setSpaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpaces = async () => {
            var _a;
            try {
                const res = await fetch(`/api/seoulapi?type=space`);
                const data = await res.json();
                if (!((_a = data.culturalSpaceInfo) === null || _a === void 0 ? void 0 : _a.row)) {
                    throw new Error("데이터 구조 불일치: " + JSON.stringify(data).slice(0, 100));
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
