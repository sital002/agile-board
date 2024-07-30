import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "../components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const data: Issue[] = [
  {
    id: "m5gr84i9",
    status: "done",
    title: "Payment for ",
    assignee: "Sora",
    createdAt: new Date(),
    dueDate: new Date(),
  },
  {
    id: "3u1reuv4",
    status: "inprogress",
    title: "Payment  #1234",
    assignee: "Nora",
    createdAt: new Date(),
    dueDate: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "derv1ws0",
    status: "inprogress",
    title: "Payment 234",
    assignee: "John",
    createdAt: new Date(),
    dueDate: new Date(),
  },
  {
    id: "5kma53ae",
    status: "todo",
    title: "abcs",
    assignee: "John",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "bhqecj4p",
    status: "todo",
    title: "Payment der #1234",
    assignee: "John",
    createdAt: new Date(),
    dueDate: new Date(),
    updatedAt: new Date(),
  },
];

type Issue = {
  id: string;
  title: string;
  status: "todo" | "inprogress" | "done";
  assignee: string;
  createdAt: Date;
  dueDate?: Date;
  updatedAt?: Date;
};

const columns: ColumnDef<Issue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Summary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "assignee",
    header: () => <div className="text-right">Assignee</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue("assignee")}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-right">Created</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.createdAt.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">Updated At</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.updatedAt?.toLocaleDateString() ??
            row.original.createdAt.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: () => <div className="text-left">Due Date</div>,
    cell: ({ row }) => {
      return (
        <div
          className={`w-fit px-2 py-1 rounded-sm text-left font-medium ${
            row.original?.dueDate && row.original.dueDate < new Date()
              ? "bg-red-200 text-red-600"
              : ""
          }`}
        >
          {row.original.dueDate?.toLocaleDateString() ?? "NONE"}
        </div>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
      </div>
    </div>
  );
}
