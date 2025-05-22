// utils/parseDate.ts
import dayjs from "dayjs";

export const parseDate = (dateStr: string): Date => {
  const cleanStr = dateStr?.trim().replace(" ", "T").replace(".0", "");
  const parsed = dayjs(cleanStr).startOf("day");

  if (!parsed.isValid()) {
    console.warn("❌ parseDate 실패:", dateStr);
    return new Date("Invalid Date");
  }

  return parsed.toDate();
};
