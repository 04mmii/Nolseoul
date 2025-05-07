import { useEffect, useState } from "react";
import { CulturalSpace } from "../types/CulturalSpace";

const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;

let cachedSpaces: CulturalSpace[] | null = null;

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState<CulturalSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      if (cachedSpaces) {
        setSpaces(cachedSpaces!);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalSpaceInfo/1/1000/`,
          { headers: { Accept: "application/json" } }
        );

        const rawText = await res.text();

        if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);

        const data = JSON.parse(rawText);

        if (!data.culturalSpaceInfo?.row) {
          throw new Error("데이터 구조 불일치: " + rawText.slice(0, 100));
        }

        cachedSpaces = data.culturalSpaceInfo.row;
        setSpaces(cachedSpaces);
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
