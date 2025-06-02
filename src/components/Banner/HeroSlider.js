import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { bannerData } from "./bannerData";
const HeroSlider = () => {
    const handleClick = (link) => {
        if (link.startsWith("http")) {
            window.open(link, "_blank");
        }
        else {
            window.location.href = link;
        }
    };
    return (_jsx("div", { className: "w-full px-4 sm:px-8 py-6 max-w-[1440px] mx-auto", children: _jsxs("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6", children: [_jsxs("div", { className: "w-full lg:w-3/4 relative", children: [_jsx(Swiper, { modules: [Navigation, Pagination, Autoplay], slidesPerView: 1, loop: true, navigation: true, pagination: {
                                clickable: true,
                                el: ".custom-swiper-pagination",
                            }, autoplay: { delay: 4000, disableOnInteraction: false }, className: "rounded-xl shadow-lg", children: bannerData.map((banner) => (_jsx(SwiperSlide, { children: _jsxs("div", { className: "relative w-full h-[300px] sm:h-[400px] md:h-[480px] lg:h-[600px]", children: [_jsx("a", { href: banner.link, target: "_blank", rel: "noopener noreferrer", className: "block w-full h-full", children: _jsx("img", { src: banner.image, alt: banner.title, className: "w-full h-full object-cover rounded-xl" }) }), _jsxs("div", { className: "absolute top-[70%] left-6 w-full max-w-[700px] bg-white/80 backdrop-blur-sm p-4 sm:p-6 shadow-md", children: [_jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-gray-800 mb-2", children: banner.title }), banner.description && (_jsx("p", { className: "text-sm sm:text-base text-gray-700 mb-10", children: banner.description })), _jsx("div", { className: "relative", children: _jsx("button", { onClick: () => handleClick(banner.link), className: "absolute -right-10 -bottom-1 translate-x-1  px-5 py-1 text-sm sm:text-sm bg-navy-600 text-white rounded-full shadow-lg hover:bg-navy-700 transition", children: "\uC790\uC138\uD788 \uBCF4\uAE30" }) })] })] }) }, banner.id))) }), _jsx("div", { className: "custom-swiper-pagination absolute bottom-4 left-4 z-10" })] }), _jsxs(Link, { to: "/night-views", className: "w-full lg:w-1/4", children: [_jsx("div", { className: "aspect-[3/4] overflow-hidden rounded-xl shadow-lg mb-4", children: _jsx("img", { src: "/images/nightview.jpg", alt: "\uC11C\uC6B8 \uC57C\uACBD\uBA85\uC18C", className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "mt-2", children: [_jsx("h3", { className: "text-lg sm:text-xl font-bold mb-1", children: "2025 \uC11C\uC6B8 \uBB38\uD654\uC758 \uBC24, \uBB38\uD654\uB85C \uC57C\uAE08\uC57C\uAE08(\u591C\u91D1)" }), _jsx("p", { className: "text-sm text-gray-500 mb-1", children: "2025.4. ~ 12." }), _jsx("p", { className: "text-sm text-gray-700", children: "\uB3C4\uC2EC \uB0B4 \uC8FC\uC694 \uC2DC\uB9BD \uBB38\uD654\uC2DC\uC124(8\uAC1C\uC18C), \uD55C\uAC15\uACF5\uC6D0 \uB4F1" })] })] })] }) }));
};
export default HeroSlider;
