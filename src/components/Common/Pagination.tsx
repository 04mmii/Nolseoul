type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 한 번에 보여줄 페이지 수 (예: 10개)
  const pageRange = 10;
  const startPage = Math.floor((currentPage - 1) / pageRange) * pageRange + 1;
  const endPage = Math.min(startPage + pageRange - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center items-center mt-8">
      {/* 이전 페이지 그룹 */}
      <button
        onClick={() => onPageChange(startPage - 1)}
        disabled={startPage === 1}
        className="mx-1 px-2 py-1 rounded disabled:text-gray-300"
      >
        &lt;
      </button>

      {/* 페이지 번호 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-2 py-1 rounded ${
            page === currentPage
              ? "text-blue-600 font-bold underline"
              : "text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* 다음 페이지 그룹 */}
      <button
        onClick={() => onPageChange(endPage + 1)}
        disabled={endPage === totalPages}
        className="mx-1 px-2 py-1 rounded disabled:text-gray-300"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
