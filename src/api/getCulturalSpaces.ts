const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;
const API_URL = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalSpaceInfo/1/100`;

export const getCulturalSpaces = async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.culturalSpaceInfo?.row || [];
  } catch (error) {
    console.error("문화공간 데이터를 불러오지 못했습니다.", error);
    return [];
  }
};
