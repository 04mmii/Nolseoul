// utils/parseDate.ts
import dayjs from "dayjs";
export const parseDate = (dateStr) => {
    if (!dateStr)
        return new Date("Invalid Date");
    // 1. 공백 -> T로 변환, .0 제거
    const cleanStr = dateStr
        .trim()
        .replace(/ /g, "T") // 모든 공백을 T로 변경
        .replace(/\.\d+$/, ""); // .0, .123 등 모든 소수점 제거
    // 2. 명시적 포맷 지정
    const formats = [
        "YYYY-MM-DDTHH:mm:ss", // API 응답 형식 우선 처리
        "YYYY-MM-DD",
        "YYYY-MM-DDTHH:mm",
    ];
    let parsed = dayjs(cleanStr, formats, true); // strict 모드
    // 3. Fallback: 유효하지 않으면 기본 파싱 시도
    if (!parsed.isValid()) {
        parsed = dayjs(cleanStr);
    }
    if (!parsed.isValid()) {
        console.warn("❌ parseDate 실패:", dateStr);
        return new Date("Invalid Date");
    }
    return parsed.startOf("day").toDate(); // 시간 무시
};
