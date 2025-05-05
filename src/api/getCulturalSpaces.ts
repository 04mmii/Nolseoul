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
        console.log("API_KEY:", API_KEY); // 확인용
        const res = await fetch(
          `https://api.odcloud.kr/api/15077586/v1/uddi:82c294cf-92fd-4aeb-bb59-14b4ffdfc795?page=1&perPage=1000&serviceKey=${API_KEY}`
        );
        const data = await res.json();
        setSpaces(data.data || []);
      } catch (err) {
        setError(err as Error);
        console.error("API 호출 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, loading, error };
};
