export const getSpaceCategoryOptions = (t) => [
    { label: t("categories.spaces.all"), value: "전체" },
    { label: t("categories.spaces.performanceHall"), value: "공연장" },
    { label: t("categories.spaces.museum"), value: "박물관/기념관" },
    { label: t("categories.spaces.gallery"), value: "미술관/갤러리" },
    { label: t("categories.spaces.culturalCenter"), value: "문화예술회관" },
    { label: t("categories.spaces.culturalInstitute"), value: "문화원" },
    { label: t("categories.spaces.library"), value: "도서관" },
    { label: t("categories.spaces.other"), value: "기타" },
];
// 기존 호환성을 위해 유지
export const spaceCategoryOptions = [
    { label: "전체", value: "전체" },
    { label: "공연장", value: "공연장" },
    { label: "박물관/기념관", value: "박물관/기념관" },
    { label: "미술관/갤러리", value: "미술관/갤러리" },
    { label: "문화예술회관", value: "문화예술회관" },
    { label: "문화원", value: "문화원" },
    { label: "도서관", value: "도서관" },
    { label: "기타", value: "기타" },
];
