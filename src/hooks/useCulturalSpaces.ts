import { useEffect, useState } from "react";
import { CulturalSpace } from "../types/CulturalSpace";

const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState<CulturalSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const res = await fetch(
          `http://openapi.seoul.go.kr:8088/${API_KEY}/json/ListCulturalSpace/1/100/`
        );
        const data = await res.json();

        if (
          !data.ListCulturalSpace ||
          !Array.isArray(data.ListCulturalSpace.row)
        ) {
          throw new Error("데이터 형식이 올바르지 않습니다.");
        }

        setSpaces(data.ListCulturalSpace.row);
      } catch (err) {
        setError(err as Error);
        console.error("문화공간 API 호출 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, loading, error };
};
