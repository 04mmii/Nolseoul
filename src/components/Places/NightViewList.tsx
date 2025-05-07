// hooks/useNightViewSpots.ts
import { useEffect, useState } from "react";
import { NightViewSpot } from "../../types/NightViewSpot";

const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;

export const useNightViewSpots = () => {
  const [spots, setSpots] = useState<NightViewSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const encodedKey = encodeURIComponent(API_KEY);
        const res = await fetch(
          `http://openapi.seoul.go.kr:8088/${encodedKey}/json/ListNightviewSpotDesign/1/100/`,
          {
            headers: { Accept: "application/json" },
          }
        );

        if (!res.ok) throw new Error(`HTTP 오류: ${res.status}`);

        const data = await res.json();

        if (
          !data.ListNightviewSpotDesign ||
          !Array.isArray(data.ListNightviewSpotDesign.row)
        ) {
          throw new Error("데이터 구조 불일치");
        }

        setSpots(
          data.ListNightviewSpotDesign.row.map((item: any) => ({
            TITLE: item.TITLE,
            ADDR: item.ADDR,
            LA: item.LA,
            LO: item.LO,
            TEL_NO: item.TEL_NO,
            URL: item.URL,
            OPERATING_TIME: item.OPERATING_TIME,
            ENTR_FEE: item.ENTR_FEE,
            CONTENT: item.CONTENT,
            SUBWAY: item.SUBWAY,
            BUS: item.BUS,
            MAIN_IMG: item.MAIN_IMG,
            SUBJCODE: item.SUBJCODE,
            title: item.TITLE,
            NUM: item.NUM,
          }))
        );
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
