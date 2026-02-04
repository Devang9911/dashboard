import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  count: number;      
  pageSize?: number;  
};

function Pagination({ count, pageSize = 5 }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / pageSize);

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, count);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < pageCount) setPage(currentPage + 1);
  };

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2">
      <p className="text-sm text-gray-600">
        Showing <span className="font-medium">{from}</span> to{" "}
        <span className="font-medium">{to}</span> of{" "}
        <span className="font-medium">{count}</span> results
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 rounded-md bg-white px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 hover:text-white"
        >
          <HiChevronLeft />
          Previous
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="bg-white flex items-center gap-1 rounded-md px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600 hover:text-white"
        >
          Next
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
