import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { bannerData } from "./bannerData";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % bannerData.length);
    };
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? bannerData.length - 1 : prev - 1));
    };
    useEffect(() => {
        if (isPaused)
            return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % bannerData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused]);
    const handleClick = (link) => {
        if (link.startsWith("http")) {
            window.open(link, "_blank");
        }
        else {
            window.location.href = link;
        }
    };
    return (_jsxs("div", { className: "relative w-full overflow-hidden min-h-[480px] lg:min-h-[650px]", children: [_jsx("div", { className: "flex w-[70%] transition-transform duration-700 ease-in-out", style: {
                    transform: `translateX(-${current * 100}%)`,
                    width: `${bannerData.length * 100}%`,
                }, children: bannerData.map((banner) => (_jsxs("div", { className: "w-full flex-shrink-0 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-6 lg:min-h-[650px]", children: [_jsxs("div", { className: "relative w-full lg:w-3/4 h-[280px] sm:h-[360px] md:h-[420px] lg:h-full", children: [_jsx("a", { href: banner.link, target: "_blank", rel: "noopener noreferrer", className: "block w-full h-full", children: _jsx("img", { src: banner.image, alt: banner.title, className: "w-full h-full object-cover rounded-xl shadow-lg" }) }), _jsxs("div", { className: "absolute w-full sm:w-[500px] bottom-4 left-4 right-4 sm:right-auto bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-md max-w-md", children: [_jsx("h2", { className: "text-lg sm:text-xl font-bold text-gray-800 mb-2", children: banner.title }), banner.description && (_jsx("p", { className: "text-sm sm:text-base text-gray-700 mb-2", children: banner.description })), _jsx("button", { onClick: () => handleClick(banner.link), className: "mt-2 px-4 py-2 text-sm sm:text-base bg-indigo-600 text-white rounded hover:bg-indigo-700 transition", children: "\uC790\uC138\uD788 \uBCF4\uAE30" })] })] }), _jsxs(Link, { to: "/night-views", className: "w-full lg:w-1/4 mt-4 lg:mt-0", children: [_jsx("div", { className: "aspect-[3/4] overflow-hidden rounded-xl shadow-lg mb-4", children: _jsx("img", { src: "/images/nightview.jpg", alt: "\uC11C\uC6B8 \uC57C\uACBD\uBA85\uC18C", className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "mt-2", children: [_jsx("h3", { className: "text-lg sm:text-xl font-bold mb-1", children: "2025 \uC11C\uC6B8 \uBB38\uD654\uC758 \uBC24, \uBB38\uD654\uB85C \uC57C\uAE08\uC57C\uAE08(\u591C\u91D1)" }), _jsx("p", { className: "text-sm text-gray-500 mb-1", children: "2025.4. ~ 12." }), _jsx("p", { className: "text-sm text-gray-700", children: "\uB3C4\uC2EC \uB0B4 \uC8FC\uC694 \uC2DC\uB9BD \uBB38\uD654\uC2DC\uC124(8\uAC1C\uC18C), \uD55C\uAC15\uACF5\uC6D0 \uB4F1" })] })] })] }, banner.id))) }), _jsx("button", { onClick: prevSlide, className: "absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white z-10", "aria-label": "\uC774\uC804 \uC2AC\uB77C\uC774\uB4DC", children: _jsx(ChevronLeft, { className: "w-6 h-6 text-gray-700" }) }), _jsx("button", { onClick: nextSlide, className: "absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white z-10", "aria-label": "\uB2E4\uC74C \uC2AC\uB77C\uC774\uB4DC", children: _jsx(ChevronRight, { className: "w-6 h-6 text-gray-700" }) }), _jsxs("div", { className: "absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-10", children: [bannerData.map((_, idx) => (_jsx("button", { onClick: () => {
                            setCurrent(idx);
                            setIsPaused(true);
                        }, className: `w-3 h-3 rounded-full ${current === idx ? "bg-navy-600" : "bg-gray-300"}`, "aria-label": `슬라이드 ${idx + 1}` }, idx))), _jsx("button", { onClick: () => setIsPaused((prev) => !prev), className: "ml-4 bg-white/80 p-2 rounded-full shadow hover:bg-white", "aria-label": isPaused ? "재생" : "일시정지", children: isPaused ? (_jsx(Play, { className: "w-4 h-4 text-gray-700" })) : (_jsx(Pause, { className: "w-4 h-4 text-gray-700" })) })] })] }));
};
export default HeroSlider;
