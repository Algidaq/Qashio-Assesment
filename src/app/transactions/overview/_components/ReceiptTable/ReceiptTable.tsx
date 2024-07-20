"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

// Components
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ReceiptListTile } from "../ReceiptListTile";
import { AppTable, TablePagination } from "@/components";

// Types
import type { CustomTableProps } from "./types";
import type { Receipt } from "@/data/TableData";

// Icons
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbMoodEmpty } from "react-icons/tb";

// styles
import styles from "./ReceiptTable.module.css";

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
      columnVisibility: {
        date: false,
      },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const tableWrapperRef = useRef<React.ElementRef<"div"> | null>(null);

  const handleOnPageSizeChange = (size: number) => {
    const prevSize = table.getState().pagination.pageSize;
    table.setPageSize(size);
    const shouldScrollToTop = size < prevSize;
    if (!shouldScrollToTop) return;
    scrollToTableTop();
  };

  const scrollToTableTop = () =>
    tableWrapperRef.current?.scrollTo({ behavior: "smooth", top: 0 });
  const navigationWrapper = useCallback(
    (func: () => void | ((index: number) => void)) => {
      return () => {
        func();
        scrollToTableTop();
      };
    },
    []
  );

  return (
    <div className={styles.wrapper}>
      <div ref={tableWrapperRef} className={styles.tableWrapper}>
        <AppTable
          table={table}
          className={styles.table}
          EmptyElement={<EmptyElement search={search} />}
        />
      </div>
      <div>
        <div className={styles.tableFooterWrapper}>
          <TablePagination
            pagination={{
              pageIndex: table.getState().pagination.pageIndex,
              pageSize: table.getState().pagination.pageSize,
              pageCount: table.getPageCount(),
            }}
            onChangePageSize={handleOnPageSizeChange}
            filteredRowsCount={table.getFilteredRowModel().rows.length}
            nextDisabled={!table.getCanNextPage()}
            prevDisabled={!table.getCanPreviousPage()}
            navigation={{
              goToFirstPage: navigationWrapper(table.firstPage),
              goToLastPage: navigationWrapper(table.lastPage),
              goToNextPage: navigationWrapper(table.nextPage),
              gotToPreviousPage: navigationWrapper(table.previousPage),
              goToPage: (i) => {
                scrollToTableTop();
                table.setPageIndex(i);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const EmptyElement: React.FC<{ search: string | null }> = ({ search }) => {
  return (
    <div className={styles.emptyWrapper}>
      <TbMoodEmpty size={64} />
      <p>
        No Results Found {search && search.length > 3 && `for keyword`}{" "}
        <strong>{search && search.length > 3 && `${search}`}</strong>
      </p>
    </div>
  );
};

export default CustomTable;
