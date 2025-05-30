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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-auto">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl max-h-[95vh] p-6 rounded shadow-lg relative"
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={handleClose}
        >
          ✕
        </button>

        {/* 제목 */}
        <h2 className="text-2xl font-bold mb-6">{event.TITLE}</h2>

        {/* 정보 테이블 */}
        <div className="border-t border-b divide-y">
          <Row label="장소" value={event.PLACE} />
          <Row label="기간" value={event.DATE} />
          {event.USE_TRGT && <Row label="대상" value={event.USE_TRGT} />}
          {event.USE_FEE && <Row label="요금" value={event.USE_FEE} />}
          {event.PHONE && <Row label="문의" value={event.PHONE} />}
          {event.USE_TIME && <Row label="시간" value={event.USE_TIME} />}
        </div>

        {/* 상세 설명 */}
        {event.ETC_DESC && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg">상세 설명</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {event.ETC_DESC}
            </p>
          </div>
        )}

        {/* 포스터 이미지 */}
        {event.MAIN_IMG && (
          <img
            src={event.MAIN_IMG}
            alt={event.TITLE}
            className="mt-6 w-full h-auto rounded shadow"
          />
        )}

        {/* 지도 */}
        {event.LAT && event.LONG && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-lg">위치 안내</h3>
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

// 🔹 행 컴포넌트
const Row = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <div className="flex">
      <div className="w-28 bg-gray-100 px-4 py-3 font-semibold text-sm text-gray-700">
        {label}
      </div>
      <div className="flex-1 px-4 py-3 text-sm text-gray-800">{value}</div>
    </div>
  ) : null;
