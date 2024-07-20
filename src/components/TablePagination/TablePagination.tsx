"use client";
import React from "react";

//styles
import styles from "./TablePagination.module.css";

type TablePaginationProps = {
  pagination: { pageIndex: number; pageSize: number; pageCount: number };
  onChangePageSize?: (size: number) => void;
  filteredRowsCount: number;
  nextDisabled?: boolean;
  prevDisabled?: boolean;
  navigation?: {
    goToPage?: (index: number) => void;
    goToFirstPage?: () => void;
    goToLastPage?: () => void;
    goToNextPage?: () => void;
    gotToPreviousPage?: () => void;
  };
};

export const TablePagination: React.FC<TablePaginationProps> = ({
  pagination: { pageCount, pageIndex, pageSize },
  onChangePageSize,
  filteredRowsCount,
  nextDisabled,
  prevDisabled,
  navigation,
}) => {
  const handleOnChangePageSize = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const size = Number(event.target.value);
    onChangePageSize?.(isNaN(size) ? pageSize : size);
  };

  return (
    <>
      <div className={styles.showWrapper}>
        <p>Show:</p>
        <select
          value={pageSize}
          onChange={handleOnChangePageSize}
          className={styles.selectStyle}
        >
          {[10, 15, 25].map((pageSizeOption) => (
            <option key={pageSizeOption} value={pageSizeOption}>
              {pageSizeOption}
            </option>
          ))}
        </select>
        <span className={styles.perPageWrapper}>
          Page{" "}
          <span>
            {pageIndex * pageSize + 1} - {(pageIndex + 1) * pageSize} of{" "}
            {filteredRowsCount}
          </span>{" "}
        </span>
      </div>
      <div>
        <button
          onClick={navigation?.goToFirstPage}
          disabled={prevDisabled}
          className={styles.paginationButton}
        >
          {"<<"}
        </button>
        <button
          onClick={navigation?.gotToPreviousPage}
          disabled={prevDisabled}
          className={styles.paginationButton}
        >
          {"<"}
        </button>
        {renderPageNumbers({
          pageIndex,
          pageCount,
          goToPage: navigation?.goToPage,
        })}
        <button
          onClick={navigation?.goToNextPage}
          disabled={nextDisabled}
          className={styles.paginationButton}
        >
          {">"}
        </button>
        <button
          onClick={navigation?.goToLastPage}
          disabled={nextDisabled}
          className={styles.paginationButton}
        >
          {">>"}
        </button>
      </div>
    </>
  );
};

const renderPageNumbers = ({
  pageCount,
  pageIndex,
  goToPage,
}: {
  pageIndex: number;
  pageCount: number;
  goToPage?: (index: number) => void;
}) => {
  const pages = [];

  if (pageCount <= 10) {
    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage?.(i)}
          disabled={pageIndex === i}
          className={
            pageIndex === i
              ? styles.activePaginationButton
              : styles.paginationButton
          }
        >
          {i + 1}
        </button>
      );
    }
  } else {
    for (let i = 0; i < 3; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage?.(i)}
          disabled={pageIndex === i}
          className={
            pageIndex === i
              ? styles.activePaginationButton
              : styles.paginationButton
          }
        >
          {i + 1}
        </button>
      );
    }
    pages.push(
      <div key="dots1" className={styles.paginationDots}>
        ....
      </div>
    );
    for (let i = pageCount - 2; i < pageCount; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage?.(i)}
          disabled={pageIndex === i}
          className={
            pageIndex === i
              ? styles.activePaginationButton
              : styles.paginationButton
          }
        >
          {i + 1}
        </button>
      );
    }
  }
  return pages;
};
