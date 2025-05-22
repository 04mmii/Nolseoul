export const parseDate = (str: string): Date => {
  if (!str || str.length !== 8) {
    console.warn("❌ 잘못된 날짜 문자열:", str);
    return new Date(""); // Invalid Date
  }

  const year = str.slice(0, 4);
  const month = str.slice(4, 6);
  const day = str.slice(6, 8);

  return new Date(`${year}-${month}-${day}`);
};
