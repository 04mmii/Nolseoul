import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Event } from "../../types/Event";

type Props = {
  event: Event;
  onClose?: () => void; // optional로 변경
};

const EventDetailModal = ({ event, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 외부 클릭 시 닫기
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  // Esc 키 닫기
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  };

  // 공통 닫기 처리
  const handleClose = () => {
    onClose ? onClose() : navigate(-1); // onClose 있으면 실행, 없으면 뒤로가기
  };

  // 이벤트 등록
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden"; // 배경 스크롤 막기

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = ""; // 스크롤 원복
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl p-6 rounded shadow-lg relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={handleClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{event.TITLE}</h2>
        <p className="text-gray-600 mb-2">기간: {event.DATE}</p>
        {event.PLACE && (
          <p className="text-gray-600 mb-2">장소: {event.PLACE}</p>
        )}
        {event.ORG_NAME && (
          <p className="text-gray-600 mb-2">주최: {event.ORG_NAME}</p>
        )}
        {event.MAIN_IMG && (
          <img
            src={event.MAIN_IMG}
            alt={event.TITLE}
            className="mt-4 w-full h-auto rounded"
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailModal;
