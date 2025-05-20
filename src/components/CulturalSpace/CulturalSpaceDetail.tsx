import { useParams } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";

const CulturalSpaceDetailPage = () => {
  const { NUM } = useParams<{ NUM: string }>();
  const { spaces, loading, error } = useCulturalSpaces();

  if (!NUM) return <p>잘못된 접근입니다. (NUM 없음)</p>;
  if (loading) return <p>불러오는 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  const space = spaces?.find((s) => String(s.NUM) === String(NUM));

  if (!space) {
    return <p>문화공간 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{space.FAC_NAME}</h1>

        {space.MAIN_IMG && (
          <img
            src={space.MAIN_IMG}
            alt={space.FAC_NAME}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        <section className="mb-4">
          <p>
            <strong>주소:</strong> {space.ADDR}
          </p>
          <p>
            <strong>전화번호:</strong> {space.PHNE}
          </p>
          <p>
            <strong>카테고리:</strong> {space.SUBJCODE}
          </p>
        </section>

        {space.FAC_DESC && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold mb-2">공간 소개</h2>
            <div dangerouslySetInnerHTML={{ __html: space.FAC_DESC }} />
          </section>
        )}
      </main>
    </>
  );
};

export default CulturalSpaceDetailPage;
