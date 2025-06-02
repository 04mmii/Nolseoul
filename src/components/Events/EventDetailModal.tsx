import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../types/Event";
import KakaoMapSingle from "../Map/KakaoMapSingle";

type Props = {
  event: Event;
  onClose?: () => void;
};

const EventDetailModal = ({ event, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  const handleClose = () => {
    onClose ? onClose() : navigate(-1);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div
        ref={modalRef}
        className="w-full max-w-6xl h-[95vh] bg-white p-8 rounded shadow-lg overflow-y-auto relative"
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* 상단 레이아웃: 이미지 + 표 */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          {/* 포스터 이미지 */}
          {event.MAIN_IMG && (
            <div className="lg:w-1/2 w-full">
              <img
                src={event.MAIN_IMG}
                alt={event.TITLE}
                className="w-full h-auto rounded shadow"
              />
            </div>
          )}

          {/* 정보 표 */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl font-bold mb-3">{event.TITLE}</h2>
            <table className="w-full border border-gray-200 text-sm">
              <tbody className="divide-y divide-gray-200">
                <TableRow label="장소" value={event.PLACE} />
                <TableRow label="기간" value={event.DATE} />
                {event.USE_TIME && (
                  <TableRow label="시간" value={event.USE_TIME} />
                )}
                {event.USE_TRGT && (
                  <TableRow label="대상" value={event.USE_TRGT} />
                )}
                {event.USE_FEE && (
                  <TableRow label="요금" value={event.USE_FEE} />
                )}
                {event.PHONE && <TableRow label="문의" value={event.PHONE} />}
              </tbody>
            </table>
          </div>
        </div>

        {/* 상세 설명 */}
        {event.ETC_DESC && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              상세보기
            </h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {event.ETC_DESC}
            </p>
          </div>
        )}

        {/* 지도 */}
        {event.LAT && event.LONG && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              위치 안내
            </h3>
            <KakaoMapSingle
              lat={parseFloat(event.LAT)}
              lng={parseFloat(event.LONG)}
              name={event.TITLE}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailModal;

// 🔹 표 한 행
const TableRow = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <tr>
      <td className="bg-gray-100 font-semibold text-gray-700 px-4 py-3 w-24 whitespace-nowrap">
        {label}
      </td>
      <td className="px-4 py-3 text-gray-800">{value}</td>
    </tr>
  ) : null;
