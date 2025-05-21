import { useEffect, useState } from "react";
import { CulturalSpace } from "../types/CulturalSpace";

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState<CulturalSpace[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(`/api/seoulapi?type=space`);
        const data = await res.json();

        if (!data.culturalSpaceInfo?.row) {
          throw new Error(
            "데이터 구조 불일치: " + JSON.stringify(data).slice(0, 100)
          );
        }

        setSpaces(data.culturalSpaceInfo.row);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("API 오류 발생"));
        console.error("API 호출 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, loading, error };
};
