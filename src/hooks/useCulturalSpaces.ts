import { useEffect, useState } from "react";

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch(
          "https://api.odcloud.kr/api/15077586/v1/uddi:82c294cf-92fd-4aeb-bb59-14b4ffdfc795?page=1&perPage=1000&serviceKey=YOUR_API_KEY"
        );
        const json = await response.json();
        setSpaces(json.data); // API에 따라 json.data 혹은 다른 키 확인 필요
      } catch (error) {
        console.error("문화공간 데이터를 불러오지 못했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  return { spaces, loading };
};
