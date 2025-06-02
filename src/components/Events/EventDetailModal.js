import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import KakaoMapSingle from "../Map/KakaoMapSingle";
const EventDetailModal = ({ event, onClose }) => {
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Escape")
            handleClose();
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
    const hasMap = event.LAT && event.LONG;
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center", children: _jsxs("div", { ref: modalRef, className: "w-full max-w-6xl h-[95vh] bg-white p-12 rounded-xl shadow-lg overflow-y-auto relative", children: [_jsx("button", { className: "absolute top-6 right-6 text-gray-500 hover:text-black text-2xl", onClick: handleClose, children: "\u2715" }), _jsx("div", { className: "text-center", children: _jsx("h2", { className: "text-3xl font-bold mb-6", children: event.TITLE }) }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-10 mt-6", children: [event.MAIN_IMG && (_jsx("div", { className: "lg:w-1/2 w-full", children: _jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-auto rounded shadow-md" }) })), _jsxs("div", { className: "lg:w-1/2 w-full", children: [event.CODENAME && (_jsx("p", { className: "text-sm text-navy-600 font-medium mb-4", children: event.CODENAME })), _jsx("table", { className: "w-full border border-gray-200 text-sm", children: _jsxs("tbody", { className: "divide-y divide-gray-200", children: [_jsx(TableRow, { label: "\uC7A5\uC18C", value: event.PLACE }), _jsx(TableRow, { label: "\uAE30\uAC04", value: event.DATE }), event.USE_TIME && (_jsx(TableRow, { label: "\uC2DC\uAC04", value: event.USE_TIME })), event.USE_TRGT && (_jsx(TableRow, { label: "\uB300\uC0C1", value: event.USE_TRGT })), event.USE_FEE && (_jsx(TableRow, { label: "\uC694\uAE08", value: event.USE_FEE })), event.PHONE && _jsx(TableRow, { label: "\uBB38\uC758", value: event.PHONE }), event.SPONSOR && (_jsx(TableRow, { label: "\uC8FC\uCD5C/\uC8FC\uAD00", value: event.SPONSOR })), event.HOST_INST && (_jsx(TableRow, { label: "\uC8FC\uAD00\uAE30\uAD00", value: event.HOST_INST })), event.PLACE && _jsx(TableRow, { label: "\uC804\uC2DC\uC2E4", value: event.PLACE })] }) })] })] }), event.ETC_DESC && (_jsxs("div", { className: "mt-12", children: [_jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "\uC0C1\uC138\uBCF4\uAE30" }), _jsx("p", { className: "text-gray-700 whitespace-pre-line leading-relaxed", children: event.ETC_DESC })] })), hasMap && (_jsxs("div", { className: "mt-12", children: [_jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "\uC704\uCE58 \uBC0F \uAD50\uD1B5 \uC548\uB0B4" }), _jsx(KakaoMapSingle, { lat: parseFloat(event.LAT), lng: parseFloat(event.LONG), name: event.TITLE })] })), event.ORG_LINK && (_jsx("div", { className: "mt-12", children: _jsx("a", { href: event.ORG_LINK, target: "_blank", rel: "noopener noreferrer", className: "inline-block bg-navy-900 text-white px-5 py-3 rounded hover:bg-gray-800 transition", children: "\uD648\uD398\uC774\uC9C0 \u2192" }) }))] }) }));
};
export default EventDetailModal;
// 🔹 표 한 행
const TableRow = ({ label, value }) => value ? (_jsxs("tr", { children: [_jsx("td", { className: "bg-gray-100 font-semibold text-gray-700 px-4 py-3 w-28 whitespace-nowrap", children: label }), _jsx("td", { className: "px-4 py-3 text-gray-800", children: value })] })) : null;
