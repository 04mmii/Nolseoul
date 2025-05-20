type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};
declare const Pagination: ({ totalItems, itemsPerPage, currentPage, onPageChange, }: PaginationProps) => import("react/jsx-runtime").JSX.Element;
export default Pagination;
