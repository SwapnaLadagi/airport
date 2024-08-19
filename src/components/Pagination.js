import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Pagination({
  currentPage,
  totalResults,
  resultsPerPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange("prev")} disabled={currentPage === 1}>
        <FaArrowLeft />
      </button>
      <span>
        Showing <strong>{startResult}</strong>-<strong>{endResult}</strong> of{" "}
        <strong>{totalResults}</strong> results
      </span>
      <button
        onClick={() => onPageChange("next")}
        disabled={currentPage === totalPages}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
