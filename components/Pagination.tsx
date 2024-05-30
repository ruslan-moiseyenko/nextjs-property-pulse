import React, { FC } from "react";

type PaginationProps = {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination: FC<PaginationProps> = ({
  onPageChange,
  page,
  pageSize,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <section className="container mx-auto my-8 flex items-center justify-center">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="mr-2 rounded border border-gray-300 px-2 py-1"
      >
        Previous
      </button>
      <span className="mx-2">
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="ml-2 rounded border border-gray-300 px-2 py-1"
      >
        Next
      </button>
    </section>
  );
};
