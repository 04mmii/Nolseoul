import { useParams, useNavigate } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";
import KakaoMapSingle from "../Map/KakaoMapSingle";

const CulturalSpaceDetailPage = () => {
  const { NUM } = useParams<{ NUM: string }>();
  const { spaces, loading, error } = useCulturalSpaces();
  const navigate = useNavigate();

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
      <main className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">{space.FAC_NAME}</h1>

        {space.MAIN_IMG && (
          <img
            src={space.MAIN_IMG}
            alt={space.FAC_NAME}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}

        {/* 정보 테이블 */}
        <section className="mb-8 overflow-x-auto">
          <table className="table-auto w-full text-left border border-gray-300 rounded-md">
            <tbody>
              <tr className="border-b">
                <th className="px-4 py-2 bg-gray-100 w-32">주소</th>
                <td className="px-4 py-2">{space.ADDR}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 bg-gray-100">전화번호</th>
                <td className="px-4 py-2">{space.PHNE}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 bg-gray-100">카테고리</th>
                <td className="px-4 py-2">{space.SUBJCODE}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 bg-gray-100">홈페이지</th>
                <td className="px-4 py-2">
                  {space.HOMEPAGE ? (
                    <a
                      href={space.HOMEPAGE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {space.HOMEPAGE}
                    </a>
                  ) : (
                    "정보 없음"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 소개글 */}
        {space.FAC_DESC && (
          <section className="text-left mt-10">
            <h2 className="text-xl font-semibold mb-2">공간 소개</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: space.FAC_DESC }}
            />
          </section>
        )}

        {/* 지도 섹션 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-2">오시는 길</h2>
          <div className="w-full h-72 rounded-lg overflow-hidden bg-gray-200">
            <KakaoMapSingle address={space.ADDR} name={space.FAC_NAME} />
            <p className="text-gray-500 pt-28">[지도가 여기에 표시됩니다]</p>
          </div>
        </section>

        {/* 돌아가기 버튼 */}
        <button
          onClick={() => navigate("/spaces")}
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          목록으로 돌아가기
        </button>
      </main>
    </>
  );
};

export default CulturalSpaceDetailPage;
