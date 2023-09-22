"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { DataTablePagination } from "@/components/DataTablePagination";
import { useRef, useState } from "react";
import Input from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { TitlesResponse } from "@/types";
import { FilterX } from "lucide-react";
import Button from "@/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  titles: TitlesResponse[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  titles,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div>
      <div className="flex items-center py-1">
        <Input
          placeholder="Filter name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm px-2"
        />
        <Select
          key={table.getColumn("titles")?.getFilterValue() as string}
          value={table.getColumn("titles")?.getFilterValue() as string}
          onValueChange={(value) => {
            table.getColumn("titles")?.setFilterValue(value);
          }}
        >
          <SelectTrigger className="text-gray-500 w-[220px]">
            <SelectValue placeholder="Filter Role..." />
          </SelectTrigger>
          <SelectContent side="top">
            {titles.map((title) => (
              <SelectItem key={title.id} value={title.name}>
                {title.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          disabled={!table.getColumn("titles")?.getFilterValue()}
          size="small"
          variant="plain"
          className="mx-1"
          type="button"
          onClick={() => table.getColumn("titles")?.setFilterValue("")}
        >
          <FilterX className="w-4 h-4" />
        </Button>
      </div>
      <Table className="w-full sm:w-[900px]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  );
}
