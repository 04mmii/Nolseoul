import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        const slug = encodeURIComponent(event.TITLE);
        navigate(`/events/${slug}`);
    };
    return (_jsxs("div", { className: "rounded-xl border shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition", onClick: handleClick, children: [_jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-48 object-cover" }), _jsxs("div", { className: "p-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: event.TITLE }), _jsxs("p", { className: "text-sm text-gray-600", children: [event.PLACE, " | ", event.DATE] }), _jsx("p", { className: "text-sm mt-1 text-gray-500", children: event.ORG_NAME })] })] }));
};
