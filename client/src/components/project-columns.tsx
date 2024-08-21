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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      return <ProjectActions project={row.original} />;
    },
  },
];

interface ShowCurrentStatusProps {
  id: string;
}

function ShowCurrentStatus({ id }: ShowCurrentStatusProps) {
  const { user } = useUser();
  if (user!.currentProjectId === id) {
    return (
      <p className="rounded-2xl border-2 border-green-800 px-2 py-1 text-green-500">
        Current
      </p>
    );
  }
}

type ProjectActionsProps = {
  project: Project;
};
function ProjectActions({ project }: ProjectActionsProps) {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const mutation = useMutation({
    mutationFn: handleChangeProject,
    onSuccess: (res) => {
      console.log(res.data);
      queryClient.invalidateQueries();
    },
  });

  return (
    <>
      {user!.currentProjectId !== project.id &&
      project.creatorId !== project.id ? (
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
            {user!.currentProjectId !== project.id && (
              <DropdownMenuItem>
                <Button
                  onClick={() => mutation.mutate(project.id)}
                  variant="ghost"
                  className="h-5 w-full cursor-default p-0 font-normal"
                >
                  <span>Change</span>
                </Button>
              </DropdownMenuItem>
            )}
            {project.creatorId === user!.id &&
              user!.currentProjectId !== project.id && (
                <>
                  <EditButton project={project} />
                  <DeleteButton />
                </>
              )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
}

function DeleteButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem>
          <Button
            variant="ghost"
            className="h-4 w-full cursor-default p-0 font-normal text-destructive"
          >
            <span>Delete</span>
          </Button>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface EditButtonProps {
  project: Project;
}
export function EditButton({ project }: EditButtonProps) {
  const queryClient = useQueryClient();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Project Name must be at least 2 characters.",
    }),
    description: z.string().optional().default(""),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name ?? "",
      description: project.description ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      console.log(data);
      return API.put(`/api/projects/${project.id}`, data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      console.log(data);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-full cursor-default p-0 font-normal"
        >
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Make changes to your project here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => mutation.mutate(e))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Test Project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="This is a description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit">Save Changes</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
