"use client"; 
import react, { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "./PaginatedTable"; 
import {
    ColumnDef,
    ColumnFiltersState,
    getFilteredRowModel,

    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel
  } from "@tanstack/react-table"

  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Input } from "@/components/ui/input"


 interface customTableProps<TData, TValue>{
    columns:ColumnDef<TData, TValue>[]
    data: TData[]
 }
 export function CustomTable<TData, TValue>({
    columns,
    data,
  }: customTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
      )
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(), 
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(), 
      state: {
        columnFilters,
      },
    })
    return(
    <div>
        <div className="flex items-center py-4">
            <Input
             placeholder="Filter players..."
             value={(table.getColumn("pitcherName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                table.getColumn("pitcherName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

    <div className="rounded-md border">
      <Table>
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
                )
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
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <DataTablePagination table={table}/>
    </div>
    )
}