import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        const slug = encodeURIComponent(event.TITLE);
        navigate(`/events/${slug}`);
    };
    return (_jsxs("div", { className: "bg-white rounded-xl border shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition", onClick: handleClick, children: [_jsxs("div", { className: "relative aspect-[3/4] overflow-hidden", children: [_jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-full object-cover" }), event.CODENAME && (_jsx("span", { className: "absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded", children: event.CODENAME }))] }), _jsxs("div", { className: "p-4", children: [_jsxs("h3", { className: "text-sm font-semibold leading-snug line-clamp-2", children: ["[", event.ORG_NAME, "] ", event.TITLE] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: event.DATE }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: event.PLACE })] })] }));
};
