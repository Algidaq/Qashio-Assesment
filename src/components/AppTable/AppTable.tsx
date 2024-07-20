import React from "react";

import { flexRender, Table } from "@tanstack/react-table";

type AppTableProps<TData> = {
  table: Table<TData>;
  className?: string;
  EmptyElement?: React.ReactNode;
};

export const AppTable = <TData,>({
  table,
  className,
  EmptyElement,
}: AppTableProps<TData>) => {
  const rows = table.getRowModel().rows;
  return (
    <table className={className}>
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
        {rows.length > 0 &&
          rows.map((row, index) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        {rows.length < 1 && (
          <tr>
            <td colSpan={100}>{EmptyElement}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
