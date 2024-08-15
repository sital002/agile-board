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
import { Project } from "@/schema/schema";
import { API } from "@/utils/api";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleChangeProject = async (id: string) => {
  return API.put(`/api/users/change-current-project/${id}`);
};

export const projectColumns: ColumnDef<Project>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <p>{row.original.name}</p>
          <ShowCurrentStatus id={row.original.id} />
        </div>
      );
    },
  },
  {
    accessorKey: "lead",
    header: () => <div>Lead</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.original.creator.display_name}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div>Description</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.description}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
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
            <DropdownMenuItem>
              <CurrentProjectChange id={row.original.id} />
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface ShowCurrentStatusProps {
  id: string;
}

function ShowCurrentStatus({ id }: ShowCurrentStatusProps) {
  const { user } = useUser();
  if (user?.currentProjectId === id) {
    return (
      <p className="rounded-2xl border-2 border-green-800 px-2 py-1 text-green-500">
        Current
      </p>
    );
  }
}

const CurrentProjectChange = ({ id }: ShowCurrentStatusProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: handleChangeProject,
    onSuccess: (res) => {
      console.log(res.data);
      queryClient.invalidateQueries();
    },
  });

  return <div onClick={() => mutation.mutate(id)}>Change</div>;
};
