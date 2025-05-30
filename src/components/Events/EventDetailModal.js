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
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm", children: _jsxs("div", { ref: modalRef, className: "bg-white w-full max-w-4xl max-h-[95vh] p-6 rounded shadow-lg relative flex flex-col", children: [_jsx("button", { className: "absolute top-4 right-4 text-gray-500 hover:text-black text-xl", onClick: handleClose, children: "\u2715" }), _jsxs("div", { className: "overflow-y-auto max-h-[70vh] pr-2", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: event.TITLE }), _jsxs("p", { className: "text-gray-600 mb-2", children: ["\uAE30\uAC04: ", event.DATE] }), event.PLACE && (_jsxs("p", { className: "text-gray-600 mb-2", children: ["\uC7A5\uC18C: ", event.PLACE] })), event.ORG_NAME && (_jsxs("p", { className: "text-gray-600 mb-2", children: ["\uC8FC\uCD5C: ", event.ORG_NAME] })), event.MAIN_IMG && (_jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "mt-4 w-full h-auto rounded" })), event.PLACE && (_jsx("div", { className: "pt-2", children: _jsx(KakaoMapSingle, { address: event.PLACE, name: event.TITLE }) }))] })] }) }));
};
export default EventDetailModal;
