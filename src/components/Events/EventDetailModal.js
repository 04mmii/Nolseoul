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
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center", children: _jsxs("div", { className: "w-full max-w-6xl h-[95vh] bg-white p-6 rounded shadow-lg relative flex flex-col overflow-hidden", children: [_jsx("button", { className: "absolute top-4 right-4 text-gray-500 hover:text-black text-xl", onClick: handleClose, children: "\u2715" }), _jsxs("div", { className: "overflow-y-auto pr-2 mt-8 space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold", children: event.TITLE }), _jsxs("div", { className: "border-t border-b divide-y", children: [_jsx(Row, { label: "\uC7A5\uC18C", value: event.PLACE }), _jsx(Row, { label: "\uAE30\uAC04", value: event.DATE }), event.USE_TRGT && _jsx(Row, { label: "\uB300\uC0C1", value: event.USE_TRGT }), event.USE_FEE && _jsx(Row, { label: "\uC694\uAE08", value: event.USE_FEE }), event.PHONE && _jsx(Row, { label: "\uBB38\uC758", value: event.PHONE }), event.USE_TIME && _jsx(Row, { label: "\uC2DC\uAC04", value: event.USE_TIME })] }), event.ETC_DESC && (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-2 text-lg", children: "\uC0C1\uC138 \uC124\uBA85" }), _jsx("p", { className: "text-gray-700 whitespace-pre-line", children: event.ETC_DESC })] })), event.MAIN_IMG && (_jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-auto rounded shadow" })), event.LAT && event.LONG && (_jsxs("div", { children: [_jsx("h3", { className: "font-semibold mb-2 text-lg", children: "\uC704\uCE58 \uC548\uB0B4" }), _jsx(KakaoMapSingle, { lat: parseFloat(event.LAT), lng: parseFloat(event.LONG), name: event.TITLE })] }))] })] }) }));
};
export default EventDetailModal;
// 🔹 행 컴포넌트
const Row = ({ label, value }) => value ? (_jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-28 bg-gray-100 px-4 py-3 font-semibold text-sm text-gray-700", children: label }), _jsx("div", { className: "flex-1 px-4 py-3 text-sm text-gray-800", children: value })] })) : null;
