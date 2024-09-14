import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTeams } from "@/api/team";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";

interface FilterbarProps {
  handleSearchIssue?: (currentValue: string) => void;
}
const Filterbar = ({ handleSearchIssue }: FilterbarProps) => {
  const { user } = useUser();
  const { data: members } = useTeams(user?.currentProjectId || "");
  const [activeAssignee, setActiveAssignee] = useState("");

  function handleChangeAssigne(assignee: string) {
    setActiveAssignee((prev) => (prev === assignee ? "" : assignee));
  }

  return (
    <div className="sticky left-0 top-0 flex select-none items-center justify-between py-2">
      <div className="flex w-full max-w-[40%] justify-between">
        <div className="flex w-full items-center justify-between">
          <Input
            className="mr-5"
            placeholder="Search"
            onChange={(e) => {
              if (handleSearchIssue) {
                handleSearchIssue(e.currentTarget.value);
              }
            }}
          />
          <div className="flex items-center gap-1">
            {members &&
              members?.map((member) => {
                return (
                  <Avatar
                    onClick={() => handleChangeAssigne(member.id)}
                    key={member.id}
                    className={`h-7 w-8 cursor-pointer border-2 ${activeAssignee === member.id ? "border-primary" : "border-transparent"}`}
                  >
                    <AvatarImage src={member.profile_image_url} />
                    <AvatarFallback>
                      {member.display_name.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filterbar;
