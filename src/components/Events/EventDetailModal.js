import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import KakaoMapSingle from "../Map/KakaoMapSingle";
import { useTranslation } from "react-i18next";
const EventDetailModal = ({ event, onClose }) => {
    const { t } = useTranslation();
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const handleClose = useCallback(() => {
        if (onClose) {
            onClose();
        }
        else {
            navigate(-1);
        }
    }, [onClose, navigate]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleClose();
            }
        };
        const handleKeyDown = (e) => {
            if (e.key === "Escape")
                handleClose();
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [handleClose]);
    // const hasMap = event.LAT && event.LONG;
    return (_jsx("div", { className: "fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center", children: _jsxs("div", { ref: modalRef, className: "w-full max-w-6xl h-[95vh] bg-white p-12 rounded-xl shadow-lg overflow-y-auto relative", children: [_jsx("button", { className: "absolute top-6 right-6 text-gray-500 hover:text-black text-2xl", onClick: handleClose, children: "\u2715" }), _jsx("div", { className: "text-center", children: _jsx("h2", { className: "text-2xl font-bold mb-16", children: event.TITLE }) }), _jsxs("div", { className: "flex flex-col lg:flex-row gap-10 mt-6", children: [event.MAIN_IMG && (_jsx("div", { className: "lg:w-1/2 w-full", children: _jsx("img", { src: event.MAIN_IMG, alt: event.TITLE, className: "w-full h-auto rounded shadow-md" }) })), _jsxs("div", { className: "lg:w-1/2 w-full", children: [event.CODENAME && (_jsx("p", { className: "text-sm text-navy-600 font-medium mb-4", children: event.CODENAME })), _jsx("table", { className: "w-full pt-10 border border-gray-200 text-sm", children: _jsxs("tbody", { className: "divide-y divide-gray-200", children: [_jsx(TableRow, { label: t("eventDetail.place"), value: event.PLACE }), _jsx(TableRow, { label: t("eventDetail.period"), value: event.DATE }), event.USE_TIME && (_jsx(TableRow, { label: t("eventDetail.time"), value: event.USE_TIME })), event.USE_TRGT && (_jsx(TableRow, { label: t("eventDetail.target"), value: event.USE_TRGT })), event.USE_FEE && (_jsx(TableRow, { label: t("eventDetail.fee"), value: event.USE_FEE })), event.PHONE && _jsx(TableRow, { label: t("eventDetail.contact"), value: event.PHONE }), event.SPONSOR && (_jsx(TableRow, { label: t("eventDetail.organizer"), value: event.SPONSOR })), event.HOST_INST && (_jsx(TableRow, { label: t("eventDetail.hostInstitution"), value: event.HOST_INST }))] }) }), event.ORG_LINK && (_jsx("div", { className: "mt-12", children: _jsxs("a", { href: event.ORG_LINK, target: "_blank", rel: "noopener noreferrer", className: "inline-block bg-navy-900 text-white px-5 py-3 rounded hover:bg-gray-800 transition", children: [t("eventDetail.homepage"), " \u2192"] }) }))] })] }), event.PROGRAM && (_jsxs("div", { className: "mt-8", children: [_jsx("h3", { className: "text-xl font-semibold mb-2 text-gray-800", children: t("eventDetail.programIntro") }), _jsx("p", { className: "text-gray-700 whitespace-pre-line leading-relaxed", children: event.PROGRAM }), _jsx("p", { className: "text-gray-500 whitespace-pre-line leading-relaxed", children: event.ETC_DESC })] })), _jsxs("div", { className: "mt-12", children: [_jsxs("h3", { className: "text-xl font-semibold m-4 text-gray-800 text-center", children: [t("eventDetail.location"), " ", ">"] }), _jsx(KakaoMapSingle, { lat: parseFloat(event.LOT), lng: parseFloat(event.LAT), name: event.PLACE })] })] }) }));
};
export default EventDetailModal;
// 🔹 표 한 행
const TableRow = ({ label, value }) => value ? (_jsxs("tr", { children: [_jsx("td", { className: "bg-gray-100 font-semibold text-gray-700 px-4 py-3 w-28 whitespace-nowrap", children: label }), _jsx("td", { className: "px-4 py-3 text-gray-800", children: value })] })) : null;
