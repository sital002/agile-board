import { API } from "@/utils/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function MessageBoxDropDown({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["issue", id],
    mutationFn: async () => {
      const resp = await API.delete(`/api/issues/${id}`);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute right-0 p-0">
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => mutation.mutate()}
          >
            Delete Issue
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
