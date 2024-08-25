import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Issue } from "@/schema/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/api";
import moment from "moment";

export const issueColumns: ColumnDef<Issue>[] = [
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
    cell: ({ row }) => <div>{row.original.column.name}</div>,
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
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "assignee",
    header: () => <div>Assignee</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.assignee?.display_name ?? "Unassigned"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Created</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {moment(row.original.createdAt).format("MMMM Do YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div>Updated At</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original?.updatedAt
            ? moment(row.original?.updatedAt).format("MMMM Do YYYY")
            : moment(row.original.updatedAt).format("MMMM Do YYYY")}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: () => <div>Due Date</div>,
    cell: ({ row }) => {
      return (
        <div className={`w-fit rounded-sm px-2 py-1 font-medium`}>
          {row.original.dueDate
            ? moment(row.original?.dueDate).format("MMMM Do YYYY")
            : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Actions issueId={row.original.id} />;
    },
  },
];

type ActionsProps = {
  issueId: string;
};
function Actions({ issueId }: ActionsProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => API.delete(`/api/issues/${issueId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => mutation.mutate()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
