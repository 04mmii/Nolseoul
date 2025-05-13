import { useEffect, useRef } from "react";
import { Event } from "../../types/Event"; // 실제 경로에 맞게 import 하세요

type Props = {
  event: Event;
  onClose: () => void;
};

const EventDetailModal = ({ event, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="bg-white w-full max-w-2xl p-6 rounded shadow-lg relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
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
