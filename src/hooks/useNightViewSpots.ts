import { useEffect, useState } from "react";
import { NightViewSpot } from "../types/NightViewSpot";

export const useNightViewSpots = () => {
  const [spots, setSpots] = useState<NightViewSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch(`/api/seoulapi?type=night`);
        const data = await res.json();

        if (
          !data.viewNightSpot?.row ||
          !Array.isArray(data.viewNightSpot.row)
        ) {
          console.error("API 구조:", data);
          throw new Error("데이터 구조 불일치");
        }

        setSpots(data.viewNightSpot.row);
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
