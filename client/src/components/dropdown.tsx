import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

export default function Dropdown() {
const navigate=useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <p>Create</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Recent</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <div className="flex items-center gap-x-4 ">
                <img
                  className="w-[15%]"
                  src="https://sitaladhikari111-1721917254800.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=xxlarge"
                  alt=""
                />
                <div>
                  <h1 className="font-medium ">Agile Board</h1>
                  <p className="text-sm opacity-90">Software project</p>
                </div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>View all projects</DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate('/create')}>Create project</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
