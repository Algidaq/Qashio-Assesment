"use client";
import React, { useMemo } from "react";
import { useTable, Column, usePagination } from "react-table";
import { MdReceipt } from "react-icons/md";
import { HiOutlineCurrencyDollar, HiOutlineCalendar } from "react-icons/hi";
import styles from "./Table.module.css";
import { IoDocumentTextOutline } from "react-icons/io5";

interface TableData {
  id: number;
  date: string;
  receiptStatus: boolean;
  amount: string;
}

interface CustomTableProps {
  data: TableData[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
  const columns = useMemo(
    (): Array<Column<TableData>> => [
      {
        Header: <span>Date</span>,
        accessor: "date",

        Cell: ({ value }) => (
          <div>
            {/* <HiOutlineCalendar /> {value}
             */}
            <ReceiptListTile
              headerCaption={"Monday, 12.06,203"}
              title={"Amazon"}
              subtitle={"Restaurants"}
              location={"Tiffany Bennett"}
              img="https://cdn0.iconfinder.com/data/icons/most-usable-logos/120/Amazon-512.png"
            />
          </div>
        ),
      },
      {
        Header: "Receipt",
        accessor: "receiptStatus",
        Cell: ({ value }) => (
          <div className={styles.receiptStatusWrapper}>
            <IoDocumentTextOutline
              className={styles.receiptStatusIcon}
              color={value ? "green" : "red"}
            />
          </div>
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ value }) => (
          <div className={styles.receiptAmountWrapper}>
            <p>$14.15</p>
            <p>1.5% $0.21</p>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  const renderPageNumbers = () => {
    const pages = [];
    if (pageCount <= 10) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => gotoPage(i)}
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
            onClick={() => gotoPage(i)}
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
            onClick={() => gotoPage(i)}
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
    <div className={styles.tableWrapper}>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <tr key={index.toString()} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <td
                    key={index.toString()}
                    {...cell.getCellProps()}

                    // style={{
                    //   padding: "10px",
                    //   border: "solid 1px gray",
                    //   background: "papayawhip",
                    // }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <div className={styles.tableFooterWrapper}>
          <div className={styles.showWrapper}>
            <p>Show:</p>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              className={styles.selectStyle}
            >
              {[5, 10, 20].map((pageSizeOption) => (
                <option key={pageSizeOption} value={pageSizeOption}>
                  {pageSizeOption}
                </option>
              ))}
            </select>
            <span className={styles.perPageWrapper}>
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>{" "}
            </span>
          </div>
          <div>
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className={styles.paginationButton}
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={styles.paginationButton}
            >
              {"<"}
            </button>
            {renderPageNumbers()}
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={styles.paginationButton}
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
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
