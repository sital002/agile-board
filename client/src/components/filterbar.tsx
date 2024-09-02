import { ChartSpline, Settings2 } from "lucide-react";
import SelectOption from "./select";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useTeams } from "@/api/team";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useIssuesContext } from "@/hooks/useIssues";

const Filterbar = () => {
  const { user } = useUser();
  const { data: members } = useTeams(user?.currentProjectId || "");
  const { issues, setFilteredIssues } = useIssuesContext();
  const [name, setName] = useState("");
  const [activeAssignee, setActiveAssignee] = useState("");
  function handleChangeAssigne(assignee: string) {
    setActiveAssignee((prev) => (prev === assignee ? "" : assignee));
    if (assignee === activeAssignee) {
      setFilteredIssues(issues);
      // console.log(issues);
      return;
    }
    const newIssues = issues.filter((issue) => issue.assigneeId === assignee);
    setFilteredIssues(newIssues);
  }
  const handleSearch = () => {
    const newIssues = issues.filter((issue) =>
      issue.title.toLowerCase().includes(name.toLowerCase()),
    );
    setFilteredIssues(newIssues);
  };

  return (
    <div className="sticky left-0 top-0 flex select-none items-center justify-between py-2">
      <div className="flex w-full max-w-[40%] justify-between">
        <div className="flex w-full items-center justify-between md:max-w-[60%]">
          <Input
            className="mr-5 w-full md:max-w-[90%]"
            placeholder="Search"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              handleSearch();
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

      <div className="hidden items-center gap-x-4 md:flex">
        <SelectOption />
        <ChartSpline size={25} className="cursor-pointer rounded-md p-1" />
        <Settings2 size={25} className="cursor-pointer rounded-md p-1" />
      </div>
    </div>
  );
};

export default Filterbar;
