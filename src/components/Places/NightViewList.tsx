import { useEffect, useState } from "react";
import axios from "axios";
import NightViewCard from "./NightViewCard";

export interface NightViewSpot {
  TITLE: string;
  MAIN_IMG: string;
  SUBTITLE: string;
  ADDRESS: string;
}

const NightViewList = ({ limit = 3 }: { limit?: number }) => {
  // 임시 데이터 (API 실패시 사용)
  const mockData: NightViewSpot[] = [
    {
      TITLE: "2025 서울 문화의 밤, 문화로 야금야금(夜金)",
      MAIN_IMG: "/images/nightview.jpg",
      SUBTITLE: "도심 내 주요 시립 문화시설(8개소), 한강공원 등",
      ADDRESS: "",
    },
  ];

  const [data, setData] = useState<NightViewSpot[]>(mockData);

  useEffect(() => {
    const fetchNightViewData = async () => {
      try {
        const apiKey = import.meta.env.VITE_SEOUL_API_KEY;
        const response = await axios.get(
          `http://openapi.seoul.go.kr:8088/${apiKey}/json/ListNightviewSpotDesign/1/20/`
        );

        if (
          response.data &&
          response.data.ListNightviewSpotDesign &&
          response.data.ListNightviewSpotDesign.row
        ) {
          setData(response.data.ListNightviewSpotDesign.row);
        } else {
          console.log("API 응답:", response.data);
        }
      } catch (error) {
        console.error("야경명소 데이터를 불러오는 중 오류 발생:", error);
        // 오류 발생 시 임시 데이터 사용 (이미 설정됨)
      }
    };

    fetchNightViewData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {data.slice(0, limit).map((item, index) => (
        <NightViewCard key={index} data={item} />
      ))}
    </div>
  );
};

export default NightViewList;
