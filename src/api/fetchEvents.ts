import axios from "axios";
import { EventItem } from "../types/EventItem";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchEvents = async (): Promise<EventItem[]> => {
  const response = await axios.get(
    `https://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/100/`
  );

  const data = response.data?.culturalEventInfo?.row || [];
  return data;
};
