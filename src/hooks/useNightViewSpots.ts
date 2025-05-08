import { useEffect, useState } from "react";
import { NightViewSpot } from "../types/NightViewSpot";

const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;

export const useNightViewSpots = () => {
  const [spots, setSpaces] = useState<NightViewSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch(
          `http://openapi.seoul.go.kr:8088/${API_KEY}/json/viewNightSpot/1/1000/`
        );

        const data = await res.json();

        if (!data.viewNightSpot || !Array.isArray(data.viewNightSpot.row)) {
          console.error("API 구조:", data);
          throw new Error("데이터 구조 불일치");
        }

        setSpaces(data.viewNightSpot.row);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("API 오류 발생"));
      } finally {
        setLoading(false);
      }
    };

    fetchSpots();
  }, []);

  return { spots, loading, error };
};
