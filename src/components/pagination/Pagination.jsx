"use client";

import React from "react";
import ArrowBackIosNewIcon from "../icons/ArrowBackIosNewIcon";
import ArrowForwardIosIcon from "../icons/ArrowForwardIosIcon";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="flex items-center justify-center gap-4"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <ArrowBackIosNewIcon className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => onPageChange(number)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold transition-colors
              ${
                currentPage === number
                  ? "bg-secondary-default text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 bg-gray-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <ArrowForwardIosIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
