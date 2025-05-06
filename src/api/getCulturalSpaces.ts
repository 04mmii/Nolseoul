import { useEffect, useState } from "react";
import { CulturalSpace } from "../types/CulturalSpace";

const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY;

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState<CulturalSpace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        console.log("API_KEY:", API_KEY);

        // HTTPS → HTTP로 변경 (SSL 오류 해결)
        const res = await fetch(
          `http://api.odcloud.kr/api/15077586/v1/uddi:82c294cf-92fd-4aeb-bb59-14b4ffdfc795?page=1&perPage=1000&serviceKey=${API_KEY}`
        );

        console.log("API 응답 상태:", res.status);
        const data = await res.json();

        if (data.data && Array.isArray(data.data)) {
          setSpaces(data.data);
        } else {
          console.warn("API에서 예상한 형식의 데이터가 오지 않음:", data);
          setSpaces([]);
        }
      } catch (err) {
        setError(err as Error);
        console.error("API 호출 실패:", err);
        setSpaces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, loading, error };
};
