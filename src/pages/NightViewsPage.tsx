import { useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import Pagination from "../components/Common/Pagination";
import Map from "../components/Map/KakaoMap";

// 야경명소 목록 (API 오류 대체 데이터)
const nightViewSpots = [
  {
    id: 1,
    title: "아름다이에 광장",
    image: "/images/nightview1.jpg",
    subtitle: "도심 속 아름다운 야경",
    address: "서울시 중구",
    operatingHours: "일몰후~23:00",
    category: "공원/광장",
    lat: 37.566826,
    lng: 126.978656,
  },
  {
    id: 2,
    title: "석촌호수 루미나리에",
    image: "/images/nightview2.jpg",
    subtitle: "송파나루공원",
    address: "서울 송파구 석촌호수로 226",
    operatingHours: "17:30~22:30",
    category: "다리/하천",
    lat: 37.5092,
    lng: 127.1037,
  },
  {
    id: 3,
    title: "세종문화회관",
    image: "/images/nightview3.jpg",
    subtitle: "문화와 예술이 있는 곳",
    address: "서울특별시 종로구 세종대로 175",
    operatingHours: "일몰 후부터 심야",
    category: "공공시설",
    lat: 37.5725,
    lng: 126.9756,
  },
  {
    id: 4,
    title: "여의도한강공원 물빛광장",
    image: "/images/nightview4.jpg",
    subtitle: "음악분수와 야경",
    address: "서울 영등포구 여의도동 84-1",
    operatingHours: "일몰 후 21:00까지",
    category: "다리/하천",
    lat: 37.5248,
    lng: 126.9324,
  },
];

const categories = ["전체", "다리/하천", "공원/광장", "공공시설", "문화 체험"];

const NightViewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 8;

  // 카테고리 및 검색어로 필터링
  const filteredSpots = nightViewSpots.filter((spot) => {
    const categoryMatch =
      selectedCategory === "전체" || spot.category === selectedCategory;
    const searchMatch =
      searchKeyword === "" ||
      spot.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchKeyword.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // 페이지네이션
  const paginatedSpots = filteredSpots.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* 헤더 */}
        <div className="py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold">야경명소</h1>
          </div>
        </div>

        {/* 소개 */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-lg">
            서울의 아름답고 멋진 <strong>야경명소</strong>를 확인해보세요!
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="max-w-7xl mx-auto px-4 mb-6 border-b pb-4">
          <div className="flex gap-4">
            {categories.map((category) => (
              <span
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1 rounded-full cursor-pointer ${
                  selectedCategory === category
                    ? "bg-yellow-300 font-bold"
                    : "bg-gray-100"
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* 검색 필터 */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <div className="flex gap-4">
            <select className="border px-4 py-2 rounded w-[150px]">
              <option>전체</option>
            </select>
            <select className="border px-4 py-2 rounded w-[150px]">
              <option>전체</option>
            </select>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="border px-4 py-2 rounded flex-grow"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button className="bg-red-500 text-white px-6 py-2 rounded">
              검색
            </button>
          </div>
        </div>

        {/* 지도 컴포넌트 */}
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Map spaces={filteredSpots} />
        </div>

        {/* 야경명소 목록 */}
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedSpots.map((spot) => (
              <div key={spot.id} className="border rounded overflow-hidden">
                <img
                  src={spot.image}
                  alt={spot.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-1">{spot.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{spot.subtitle}</p>
                  <p className="text-xs text-gray-500">{spot.operatingHours}</p>
                  <p className="text-xs text-gray-500 mt-1">{spot.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 페이지네이션 */}
        <Pagination
          totalItems={filteredSpots.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default NightViewsPage;
