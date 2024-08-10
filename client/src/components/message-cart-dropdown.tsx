import { API } from "@/utils/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

export default function MessageBoxDropDown({ id }: { id: string }) {
  const deleteHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const resp = await API.delete(`/api/issues/${id}`);
    console.log(resp);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex items-center gap-x-4 "></div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={deleteHandler}>
            Delete Issue
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={deleteHandler}>
            Edit Issue
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
