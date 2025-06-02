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
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center", children: _jsxs("div", { ref: modalRef, className: "w-full max-w-6xl h-[95vh] bg-white p-8 rounded shadow-lg overflow-y-auto relative", children: [_jsx("button", { className: "absolute top-4 right-4 text-gray-500 hover:text-black text-xl", onClick: handleClose, children: "\u2715" }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-8 mt-4", children: [event.MAIN_IMG && (_jsx("div", { className: "lg:w-1/2 w-full", children: _jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-auto rounded shadow" }) })), _jsxs("div", { className: "lg:w-1/2 w-full", children: [_jsx("h2", { className: "text-3xl font-bold mb-3", children: event.TITLE }), _jsx("table", { className: "w-full border border-gray-200 text-sm", children: _jsxs("tbody", { className: "divide-y divide-gray-200", children: [_jsx(TableRow, { label: "\uC7A5\uC18C", value: event.PLACE }), _jsx(TableRow, { label: "\uAE30\uAC04", value: event.DATE }), event.USE_TIME && (_jsx(TableRow, { label: "\uC2DC\uAC04", value: event.USE_TIME })), event.USE_TRGT && (_jsx(TableRow, { label: "\uB300\uC0C1", value: event.USE_TRGT })), event.USE_FEE && (_jsx(TableRow, { label: "\uC694\uAE08", value: event.USE_FEE })), event.PHONE && _jsx(TableRow, { label: "\uBB38\uC758", value: event.PHONE })] }) })] })] }), event.ETC_DESC && (_jsxs("div", { className: "mt-10", children: [_jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "\uC0C1\uC138\uBCF4\uAE30" }), _jsx("p", { className: "text-gray-700 whitespace-pre-line leading-relaxed", children: event.ETC_DESC })] })), event.LAT && event.LONG && (_jsxs("div", { className: "mt-10", children: [_jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: "\uC704\uCE58 \uC548\uB0B4" }), _jsx(KakaoMapSingle, { lat: parseFloat(event.LAT), lng: parseFloat(event.LONG), name: event.TITLE })] }))] }) }));
};
export default EventDetailModal;
// 🔹 표 한 행
const TableRow = ({ label, value }) => value ? (_jsxs("tr", { children: [_jsx("td", { className: "bg-gray-100 font-semibold text-gray-700 px-4 py-3 w-24 whitespace-nowrap", children: label }), _jsx("td", { className: "px-4 py-3 text-gray-800", children: value })] })) : null;
