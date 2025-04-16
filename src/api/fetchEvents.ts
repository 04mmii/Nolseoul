import { EventData } from "../types/apiTypes";

export async function fetchEvents(): Promise<EventData[]> {
  const serviceKey = import.meta.env.SEOUL_API_KEY;
  const url = `https://openapi.seoul.go.kr:8088/${serviceKey}/json/culturalEventInfo/1/100/`;

  const res = await fetch(url);
  const data = await res.json();
  return data?.culturalEventInfo?.row || [];
}
