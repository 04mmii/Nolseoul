import { useEffect, useState } from "react";
import { CulturalSpace } from "../types/CulturalSpace";

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState<CulturalSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const BASE_URL = import.meta.env.DEV
          ? "https://nolseoul.vercel.app"
          : "";

        const res = await fetch(`${BASE_URL}/api/seoulapi?type=space`);
        const data = await res.json();

        if (!data?.culturalSpaceInfo?.row) {
          console.warn("문화공간 데이터 없음:", data);
          setSpaces([]);
          return;
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
