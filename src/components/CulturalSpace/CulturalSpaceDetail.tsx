import { useParams } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";

const CulturalSpaceDetailPage = () => {
  const { facCode } = useParams(); // <- 라우터에서 :facCode로 받았으므로 여기도 facCode
  const { spaces, loading, error } = useCulturalSpaces();

  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  const space = spaces.find((s) => s.FAC_CODE.toString() === facCode);

  if (!space) return <p>문화공간 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{space.FAC_NAME}</h1>
        <img
          src={space.MAIN_IMG}
          alt={space.FAC_NAME}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-2">
          <strong>주소:</strong> {space.ADDR}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>전화번호:</strong> {space.PHNE}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>카테고리:</strong> {space.SUBJCODE}
        </p>
        <p className="text-gray-600 mt-4">{space.FAC_DESC}</p>
      </main>
    </>
  );
};

export default CulturalSpaceDetailPage;
