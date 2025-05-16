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
      className="rounded-xl border shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <img
        src={event.MAIN_IMG}
        alt={event.TITLE}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.TITLE}</h3>
        <p className="text-sm text-gray-600">
          {event.PLACE} | {event.DATE}
        </p>
        <p className="text-sm mt-1 text-gray-500">{event.ORG_NAME}</p>
      </div>
    </div>
  );
};
