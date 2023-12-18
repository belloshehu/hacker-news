import React from "react";
import { PaginationProp } from "./types";
import "./Pagination.scss";

export const Pagination = ({
  nextPageHandler,
  previousPageHandler,
}: PaginationProp) => {
  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination__button--previous btn"
        onClick={previousPageHandler}>
        Previous
      </button>
      <button
        type="button"
        className="pagination__button--next btn"
        onClick={nextPageHandler}>
        Next
      </button>
    </div>
  );
};
