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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-4xl max-h-[95vh] p-6 rounded shadow-lg relative flex flex-col"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={handleClose}
        >
          ✕
        </button>
        {/* 스크롤 가능한 컨텐츠 영역 */}
        <div className="overflow-y-auto max-h-[70vh] pr-2">
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
          {event.PLACE && (
            <div className="pt-2">
              <KakaoMapSingle address={event.PLACE} name={event.TITLE} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
