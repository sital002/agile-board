import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User } from "@/schema/schema";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/api";

export const teamsColumns: ColumnDef<User>[] = [
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
    accessorKey: "profile_image_url",
    header: "Avatar",
    cell: ({ row }) => (
      <Avatar>
        <AvatarImage src={row.original.profile_image_url || ""} />
        <AvatarFallback className="uppercase">
          {row.original.display_name.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.original.display_name,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => row.original.email,
  },

  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) =>
      row.original.updated_at &&
      new Date(row.original.updated_at).toLocaleDateString(),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <TeamActions id={row.original.id} />;
    },
  },
];

function TeamActions({ id }: { id: string }) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: () =>
      API.put(`/api/teams/remove-member/${user!.currentProjectId}`, {
        member: id,
      }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
  if (user?.currentProject.creatorId !== user?.id) return;
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
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => deleteMutation.mutate()}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
