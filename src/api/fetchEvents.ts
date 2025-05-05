import axios from "axios";
import { EventItem } from "../types/EventItem";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchEvents = async (): Promise<EventItem[]> => {
  try {
    const response = await axios.get(
      `https://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/100/`
    );

    const data = response.data?.culturalEventInfo?.row;

    if (!data) {
      console.error("이벤트 데이터를 찾을 수 없습니다:", response.data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("API 요청 오류:", error);
    return [];
  }
};
