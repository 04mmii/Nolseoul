import { Event } from "../../types/Event";
type Props = {
    event: Event;
    onClose?: () => void;
};
declare const EventDetailModal: ({ event, onClose }: Props) => import("react/jsx-runtime").JSX.Element;
export default EventDetailModal;
