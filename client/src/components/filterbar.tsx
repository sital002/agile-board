import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTeams } from "@/api/team";
import { useUser } from "@/hooks/useUser";
import { Tooltip, TooltipTrigger } from "./ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface FilterbarProps {
  setSearchIssue: (prev: string) => void;
  searchIssue: string;
  setActiveAssignee: (prev: string | null) => void;
  activeAssignee: string | null;
}
const Filterbar = ({
  searchIssue,
  setSearchIssue,
  activeAssignee,
  setActiveAssignee,
}: FilterbarProps) => {
  const { user } = useUser();
  const { data: members } = useTeams(user?.currentProjectId || "");

  function handleChangeAssigne(assignee: string | null) {
    const newAssignee = assignee === activeAssignee ? "" : assignee;
    setActiveAssignee(newAssignee);
  }

  return (
    <div className="sticky left-0 top-0 flex select-none items-center justify-between py-2">
      <div className="flex w-full max-w-[40%] justify-between">
        <div className="flex w-full items-center justify-between">
          <Input
            className="mr-5"
            placeholder="Search"
            value={searchIssue}
            onChange={(e) => {
              setSearchIssue(e.currentTarget.value);
            }}
          />
          <div className="flex items-center gap-1">
            {members &&
              members?.map((member) => {
                return (
                  <Tooltip key={member.id}>
                    <TooltipTrigger>
                      <Avatar
                        onClick={() => handleChangeAssigne(member.id)}
                        className={`h-7 w-8 cursor-pointer border-2 ${activeAssignee === member.id ? "border-primary" : "border-transparent"}`}
                      >
                        <AvatarImage src={member.profile_image_url} />
                        <AvatarFallback>
                          {member.display_name.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{member.display_name}</TooltipContent>
                  </Tooltip>
                );
              })}
            <Tooltip>
              <TooltipTrigger>
                <Avatar
                  onClick={() => handleChangeAssigne(null)}
                  className={`h-7 w-8 cursor-pointer border-2 ${activeAssignee === null ? "border-primary" : "border-transparent"}`}
                >
                  <AvatarFallback>{"UN"}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>Unassigned</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
