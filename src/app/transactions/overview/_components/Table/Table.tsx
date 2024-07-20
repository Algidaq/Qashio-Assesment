"use client";
import React, { useEffect, useMemo } from "react";

// Components
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowModel,
  Table,
  useReactTable,
} from "@tanstack/react-table";

// Types
import { CustomTableProps, Receipt, TableData } from "./types";

// Icons
import { MdReceipt } from "react-icons/md";
import { HiOutlineCurrencyDollar, HiOutlineCalendar } from "react-icons/hi";
import { IoDocumentTextOutline } from "react-icons/io5";

// styles
import styles from "./Table.module.css";
import { useSearchParams } from "next/navigation";

const columns: Array<ColumnDef<Receipt>> = [
  {
    header: "Date",
    id: "receipt",
    accessorKey: "company.name",
    cell: (props) => {
      const value = props.row.original;
      return (
        <div>
          <ReceiptListTile
            headerCaption={
              value.transaction.status === "completed"
                ? value.transaction.date
                : value.transaction.status
            }
            title={value.company.name}
            subtitle={value.company.category}
            location={value.buyer.name}
            img={value.company.logo}
          />
        </div>
      );
    },
  },
  {
    header: "Receipt",
    accessorKey: "transaction.status",
    cell: (props) => (
      <div className={styles.receiptStatusWrapper}>
        <IoDocumentTextOutline
          className={styles.receiptStatusIcon}
          color={props.getValue() === "completed" ? "green" : "red"}
        />
      </div>
    ),
  },
  {
    header: "Amount",
    cell: (props) => {
      const transaction = props.row.original.transaction;
      return (
        <div className={styles.receiptAmountWrapper}>
          <p>{`$${transaction.amount}`}</p>
          <p>1.5% ,{`$ ${(transaction.amount * 0.0015).toFixed(2)}`}</p>
        </div>
      );
    },
  },
];
const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  const queryParams = useSearchParams();

  const search = queryParams.get("search");

  const table = useReactTable<Receipt>({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 25 },
      columnFilters:
        search !== null
          ? [
              {
                id: "receipt",
                value: search,
              },
            ]
          : [],
    },
  });

  useEffect(() => {
    const filters =
      search !== null && search.length > 0
        ? [{ id: "receipt", value: search }]
        : [];
    table.setColumnFilters(filters);
  }, [search]);

  const renderPageNumbers = () => {
    const pages = [];
    const pageCount = table.getPageCount();
    const pageIndex = table.getState().pagination.pageIndex;
    if (pageCount <= 10) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => table.setPageIndex(i)}
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
            onClick={() => table.setPageIndex(i)}
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
            onClick={() => table.setPageIndex(i)}
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th colSpan={header.colSpan} key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell, index) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className={styles.tableFooterWrapper}>
          <div className={styles.showWrapper}>
            <p>Show:</p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
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
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}{" "}
                -{" "}
                {(table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize}{" "}
                of {data.length}
              </span>{" "}
            </span>
          </div>
          <div>
            <button
              onClick={table.firstPage}
              disabled={!table.getCanPreviousPage()}
              className={styles.paginationButton}
            >
              {"<<"}
            </button>
            <button
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
              className={styles.paginationButton}
            >
              {"<"}
            </button>
            {renderPageNumbers()}
            <button
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
              className={styles.paginationButton}
            >
              {">"}
            </button>
            <button
              onClick={table.lastPage}
              disabled={!table.getCanNextPage()}
              className={styles.paginationButton}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
type ReceiptListTileProps = {
  headerCaption: string;
  img?: string;
  title: string;
  subtitle: string;
  location: string;
};
const ReceiptListTile: React.FC<ReceiptListTileProps> = ({
  headerCaption,
  img,
  title,
  subtitle,
  location,
}) => {
  return (
    <div className={styles.receiptWrapper}>
      <div className={styles.receipt}>
        <p className={styles.receiptDate}>{headerCaption}</p>
        <div className={styles.receiptContent}>
          <img src={img} alt="img" className={styles.receiptImageWrapper} />
          <div className={styles.infoReceipt}>
            <p>{title}</p>
            <div className={styles.infoReceiptTypes}>
              <p>{subtitle}</p>
              <span />
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
