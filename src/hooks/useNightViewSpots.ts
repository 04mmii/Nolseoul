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
        const encodedKey = encodeURIComponent(API_KEY);
        const res = await fetch(
          `http://openapi.seoul.go.kr:8088/${encodedKey}/json/viewNightSpot/1/1000/`
        );

        const data = await res.json();

        // 1. API 응답 구조 수정 (viewNightSpot 사용)
        if (!data.viewNightSpot || !Array.isArray(data.viewNightSpot.row)) {
          console.error("API 구조:", data);
          throw new Error("데이터 구조 불일치");
        }

        // 2. 실제 API 필드명에 맞춰 매핑
        const mappedSpots = data.viewNightSpot.row.map((item: any) => ({
          TITLE: item.TITLE,
          ADDR: item.ADDR,
          LA: item.LA,
          LO: item.LO,
          TEL_NO: item.TEL_NO,
          URL: item.URL,
          OPERATING_TIME: item.OPERATING_TIME,
          ENTR_FEE: item.ENTR_FEE,
          CONTENT: item.CONTENTS,
          SUBWAY: item.SUBWAY,
          BUS: item.BUS,
          MAIN_IMG: item.MAIN_IMG,
          SUBJCODE: item.SUBJECT_CD, // API 응답 필드명 확인
          NUM: item.NUM,
        }));

        setSpaces(mappedSpots);
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
