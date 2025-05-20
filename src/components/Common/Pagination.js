import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    // 한 번에 보여줄 페이지 수 (예: 10개)
    const pageRange = 10;
    const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
    const endPage = Math.min(startPage + pageRange - 1, totalPages);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return (_jsxs("nav", { className: "flex justify-center items-center mt-8", children: [_jsx("button", { onClick: () => onPageChange(startPage - 1), disabled: startPage === 1, className: "mx-1 px-2 py-1 rounded disabled:text-gray-300", children: "<" }), pages.map((page) => (_jsx("button", { onClick: () => onPageChange(page), className: `mx-1 px-2 py-1 rounded ${page === currentPage
                    ? "text-blue-600 font-bold underline"
                    : "text-gray-700"}`, children: page }, page))), _jsx("button", { onClick: () => onPageChange(endPage + 1), disabled: endPage === totalPages, className: "mx-1 px-2 py-1 rounded disabled:text-gray-300", children: ">" })] }));
};
export default Pagination;
