import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";
import { Link } from "react-router-dom";
const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const nightViewInfo = {
        title: "2025 서울 문화의 밤, 문화로 야금야금(夜金)",
        date: "2025.4. ~ 12.",
        location: "도심 내 주요 시립 문화시설(8개소), 한강공원 등",
        image: "/images/nightview.jpg",
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    const handleClick = (link) => {
        if (link.startsWith("http")) {
            window.open(link, "_blank");
        }
        else {
            window.location.href = link;
        }
    };
    return (_jsxs("div", { className: "relative max-w-8xl mx-auto w-[90%] h-[650px] overflow-hidden px-5 py-7", children: [bannerData.map((banner, idx) => (_jsx("div", { className: `absolute transition-opacity duration-1000 ease-in-out w-full h-full ${current === idx ? "opacity-100" : "opacity-0"}`, children: _jsxs("div", { className: "w-full h-full flex justify-between items-center gap-10 px-6", children: [_jsxs("div", { className: "relative w-[70%] h-full", children: [_jsx("img", { src: banner.image, alt: banner.title, className: "w-full h-[85%] object-cover rounded-xl shadow-lg cursor-pointer", onClick: () => handleClick(banner.link) }), _jsxs("div", { className: "absolute w-full h-[150px] top-103 left-10 bg-white opacity-98 p-6 max-w-[600px] ", children: [_jsx("h2", { className: "text-2xl font-bold mb-2", children: banner.title }), banner.description && (_jsx("p", { className: "text-base text-gray-700 mb-2", children: banner.description })), banner.date && (_jsx("p", { className: "text-sm text-gray-500 mb-3", children: banner.date })), _jsx("button", { onClick: () => handleClick(banner.link), className: "absolute right-10 top--1 px-4 py-2 bg-indigo-600 text-white cursor-pointer hover:bg-indigo-800 transition", children: "\uC790\uC138\uD788 \uBCF4\uAE30" })] })] }), _jsxs(Link, { to: "/night-views", className: "w-[30%] h-full cursor-pointer", children: [_jsx("div", { className: "h-[60%] overflow-hidden rounded-xl shadow-lg mb-4", children: _jsx("img", { src: nightViewInfo.image, alt: "\uC11C\uC6B8 \uC57C\uACBD\uBA85\uC18C", className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-xl font-bold mb-2", children: nightViewInfo.title }), _jsx("p", { className: "text-sm text-gray-500 mb-2", children: nightViewInfo.date }), _jsx("p", { className: "text-sm text-gray-700", children: nightViewInfo.location })] })] })] }) }, banner.id))), _jsx("div", { className: "absolute px-2 bottom-10 left-2/3 transform -translate-x-1/2 flex space-x-2", children: bannerData.map((_, idx) => (_jsx("div", { onClick: () => setCurrent(idx), className: `w-3 h-3 rounded-full cursor-pointer ${current === idx ? "bg-indigo-600" : "bg-gray-300"}` }, idx))) })] }));
};
export default HeroSlider;
