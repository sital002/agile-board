import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown, CalendarIcon, Check, MoreHorizontal } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Issue, User } from "@/schema/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/api";
import moment from "moment";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { useTeams } from "@/api/team";
import { useUser } from "@/hooks/useUser";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
          <AssigneeAction issue={row.original} />
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
          <DatePicker />
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

function DatePicker() {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={() => {
            setOpen(false);
            setDate(date);
          }}
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}

function AssigneeAction({ issue }: { issue: Issue }) {
  const { user } = useUser();
  const assignee = issue.assignee;
  const { data: teams } = useTeams(user?.currentProjectId || "");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<User | null>(assignee || null);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (data: Issue) => {
      return API.put(`/api/issues/${issue.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
    },
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-full px-1">
          <span className="sr-only">Open menu</span>
          {value?.display_name || "Unassigned"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={"Search"} />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {teams &&
                teams.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.display_name}
                    onSelect={(currentValue) => {
                      const user = teams.find(
                        (u) => u.display_name === currentValue,
                      );
                      if (user) {
                        setValue(user);
                        mutation.mutate({
                          ...issue,
                          assigneeId: user.id,
                        });
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value?.id === user.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {user.display_name}
                  </CommandItem>
                ))}
              <CommandItem
                onSelect={() => {
                  setValue(null);
                  mutation.mutate({
                    ...issue,
                    assigneeId: null,
                  });
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    !value ? "opacity-100" : "opacity-0",
                  )}
                />
                Unassign
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
