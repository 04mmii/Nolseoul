import { useParams, useNavigate } from "react-router-dom";
import { useCulturalSpaces } from "../../hooks/useCulturalSpaces";
import Header from "../Layout/Header";
import KakaoMapSingle from "../Map/KakaoMapSingle";
import Footer from "../Layout/Footer";
import { useTranslation } from "react-i18next";

const CulturalSpaceDetailPage = () => {
  const { t } = useTranslation();
  const { NUM } = useParams<{ NUM: string }>();
  const { spaces, loading, error } = useCulturalSpaces();
  const navigate = useNavigate();

  if (!NUM) return <p>{t("spaceDetail.invalidAccess")}</p>;
  if (loading) return <p>{t("common.loading")}</p>;
  if (error) return <p>{t("spaceDetail.errorOccurred")}: {error.message}</p>;

  const space = spaces?.find((s) => String(s.NUM) === String(NUM));

  if (!space) {
    return <p>{t("spaceDetail.notFound")}</p>;
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
                <th className="px-4 py-2 bg-gray-100 w-32">{t("spaceDetail.address")}</th>
                <td className="px-4 py-2">{space.ADDR}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 bg-gray-100">{t("spaceDetail.phone")}</th>
                <td className="px-4 py-2">{space.PHNE}</td>
              </tr>
              <tr className="border-b">
                <th className="px-4 py-2 bg-gray-100">{t("spaceDetail.category")}</th>
                <td className="px-4 py-2">{space.SUBJCODE}</td>
              </tr>
              <tr>
                <th className="px-4 py-2 bg-gray-100">{t("spaceDetail.homepage")}</th>
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
                    t("common.noInfo")
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* 소개글 */}
        {space.FAC_DESC && (
          <section className="text-left mt-10">
            <h2 className="text-xl font-semibold mb-2">{t("spaceDetail.introduction")}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: space.FAC_DESC }}
            />
          </section>
        )}

        {/* 지도 섹션 */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold mb-2">{t("spaceDetail.directions")}</h2>
          <div className="w-full h-72 rounded-lg overflow-hidden bg-gray-200">
            <KakaoMapSingle address={space.ADDR} name={space.FAC_NAME} />
            <p className="text-gray-500 pt-28">{t("spaceDetail.mapPlaceholder")}</p>
          </div>
        </section>

        {/* 돌아가기 버튼 */}
        <button
          onClick={() => navigate("/spaces")}
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t("common.backToList")}
        </button>
      </main>
      <Footer />
    </>
  );
};

export default CulturalSpaceDetailPage;
