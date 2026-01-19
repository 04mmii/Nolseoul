import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../types/Event";
import KakaoMapSingle from "../Map/KakaoMapSingle";
import { useTranslation } from "react-i18next";

type Props = {
  event: Event;
  onClose?: () => void;
};

const EventDetailModal = ({ event, onClose }: Props) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  }, [onClose, navigate]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  // const hasMap = event.LAT && event.LONG;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-full max-w-6xl h-[95vh] bg-white p-12 rounded-xl shadow-lg overflow-y-auto relative"
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-6 right-6 text-gray-500 hover:text-black text-2xl"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-16">{event.TITLE}</h2>
        </div>
        {/* 상단: 포스터 + 정보 */}
        <div className="flex flex-col lg:flex-row gap-10 mt-6">
          {/* 포스터 */}
          {event.MAIN_IMG && (
            <div className="lg:w-1/2 w-full">
              <img
                src={event.MAIN_IMG}
                alt={event.TITLE}
                className="w-full h-auto rounded shadow-md"
              />
            </div>
          )}

          {/* 정보 표 */}
          <div className="lg:w-1/2 w-full">
            {/* 카테고리 (CODENAME) */}
            {event.CODENAME && (
              <p className="text-sm text-navy-600 font-medium mb-4">
                {event.CODENAME}
              </p>
            )}

            <table className="w-full pt-10 border border-gray-200 text-sm">
              <tbody className="divide-y divide-gray-200">
                <TableRow label={t("eventDetail.place")} value={event.PLACE} />
                <TableRow label={t("eventDetail.period")} value={event.DATE} />
                {event.USE_TIME && (
                  <TableRow label={t("eventDetail.time")} value={event.USE_TIME} />
                )}
                {event.USE_TRGT && (
                  <TableRow label={t("eventDetail.target")} value={event.USE_TRGT} />
                )}
                {event.USE_FEE && (
                  <TableRow label={t("eventDetail.fee")} value={event.USE_FEE} />
                )}
                {event.PHONE && <TableRow label={t("eventDetail.contact")} value={event.PHONE} />}
                {/* 주최/주관 정보 */}
                {event.SPONSOR && (
                  <TableRow label={t("eventDetail.organizer")} value={event.SPONSOR} />
                )}
                {event.HOST_INST && (
                  <TableRow label={t("eventDetail.hostInstitution")} value={event.HOST_INST} />
                )}
              </tbody>
            </table>

            {/* 홈페이지 버튼 */}
            {event.ORG_LINK && (
              <div className="mt-12">
                <a
                  href={event.ORG_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-navy-900 text-white px-5 py-3 rounded hover:bg-gray-800 transition"
                >
                  {t("eventDetail.homepage")} &rarr;
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 상세 설명 */}
        {event.PROGRAM && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {t("eventDetail.programIntro")}
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {event.PROGRAM}
            </p>
            <p className="text-gray-500 whitespace-pre-line leading-relaxed">
              {event.ETC_DESC}
            </p>
          </div>
        )}

        {/* 지도 */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold m-4 text-gray-800 text-center">
            {t("eventDetail.location")} {">"}
          </h3>
          <KakaoMapSingle
            lat={parseFloat(event.LOT)}
            lng={parseFloat(event.LAT)}
            name={event.PLACE}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;

// 🔹 표 한 행
const TableRow = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <tr>
      <td className="bg-gray-100 font-semibold text-gray-700 px-4 py-3 w-28 whitespace-nowrap">
        {label}
      </td>
      <td className="px-4 py-3 text-gray-800">{value}</td>
    </tr>
  ) : null;
