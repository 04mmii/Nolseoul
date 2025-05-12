import { CategoryOption } from "../../components/Common/FilterTabs";

export const eventCategoryOptions: CategoryOption[] = [
  { label: "전체", value: "전체" },
  {
    label: "공연",
    value: [
      "클래식",
      "콘서트",
      "연극",
      "뮤지컬/오페라",
      "무용",
      "독주/독창회회",
      "국악",
    ],
  },
  { label: "전시", value: "전시/미술" },
  {
    label: "축제",
    value: [
      "축제-전통/역사",
      "축제-자연/경관",
      "축제-시민화합",
      "축제-문화/예술",
      "축제-기타",
    ],
  },
  { label: "교육/체험", value: "교육/체험" },
  { label: "기타", value: ["영화", "기타"] },
];
