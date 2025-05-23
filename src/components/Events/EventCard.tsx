import { useNavigate } from "react-router-dom";
import { Event } from "../../types/Event";

export interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = encodeURIComponent(event.TITLE);
    navigate(`/events/${slug}`);
  };

  return (
    <div
      className="bg-white rounded-xl p-2 border shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      {/* 이미지 섹션 */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={event.MAIN_IMG}
          alt={event.TITLE}
          className="w-full h-full object-cover"
        />
        {/* 카테고리 뱃지 */}
        {event.CODENAME && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {event.CODENAME}
          </span>
        )}
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="p-4">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2">
          [{event.ORG_NAME}] {event.TITLE}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{event.DATE}</p>
        <p className="text-sm text-gray-500 mt-1">{event.PLACE}</p>
      </div>
    </div>
  );
};
