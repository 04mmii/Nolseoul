const categories = [
  "전체",
  "공연장",
  "박물관/기념관",
  "미술관/갤러리",
  "문화예술회관",
  "문화원",
  "도서관",
  "기타",
];

export default function FilterTabs({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 my-4">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-1 rounded-full border ${
            selected === cat ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
