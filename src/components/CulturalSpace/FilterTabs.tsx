const categoryOptions = [
  { label: "전체", value: "전체" },
  { label: "공연장", value: "공연장" },
  { label: "박물관/기념관", value: "박물관/기념관" },
  { label: "미술관/갤러리", value: "미술관/갤러리" },
  { label: "문화예술회관", value: "문화예술회관" },
  { label: "문화원", value: "문화원" },
  { label: "도서관", value: "도서관" },
  { label: "기타", value: "기타" },
];

export default function FilterTabs({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {categoryOptions.map(({ label, value }) => (
        <button
          key={value}
          className={`px-4 py-1 rounded-full border ${
            selected === value ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
