import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
export const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        const slug = encodeURIComponent(event.TITLE);
        navigate(`/events/${slug}`);
    };
    const getBadgeColor = (category) => {
        switch (category) {
            case "전시/미술":
                return "bg-pink-500";
            case "공연":
                return "bg-green-500";
            case "교육/체험":
                return "bg-yellow-500";
            case "축제":
                return "bg-purple-500";
            case "기타":
                return "bg-gray-500";
            default:
                return "bg-blue-600";
        }
    };
    return (_jsxs("div", { className: "bg-white rounded-xl border shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:border-2 transition", onClick: handleClick, children: [_jsxs("div", { className: "relative aspect-[3/4] overflow-hidden", children: [_jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-full object-cover" }), event.CODENAME && (_jsx("span", { className: `absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded ${getBadgeColor(event.CODENAME)}`, children: event.CODENAME }))] }), _jsxs("div", { className: "p-4", children: [_jsxs("h3", { className: "text-sm font-semibold leading-snug line-clamp-2", children: ["[", event.ORG_NAME, "] ", event.TITLE] }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: event.DATE }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: event.PLACE })] })] }));
};
