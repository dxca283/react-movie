import { useEffect, useMemo, useState } from "react";

const usePagination = (data = [], itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = useMemo(
    () =>
      data.slice((currentPage - 1) * itemsPerPage, itemsPerPage * currentPage),
    [data, currentPage]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  return [totalPages, paginatedData, currentPage, setCurrentPage];
};

export default usePagination;