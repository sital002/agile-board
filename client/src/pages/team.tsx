import { useTeams } from "@/api/team";
import { DataTable } from "@/components/data-table";
import { teamsColumns } from "@/components/team-columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { API } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

const Teams = () => {
  const { user } = useUser();

  const { data, isLoading } = useTeams(user!.currentProjectId || "");
  const queryClient = useQueryClient();
  const [searchMember, setSearchMember] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setSearchMember(currentValue);
  };
  const filteredMembers = useMemo(() => {
    if (!data) return [];
    return data.filter((teamMember) =>
      teamMember.display_name
        .toLowerCase()
        .includes(searchMember.toLowerCase()),
    );
  }, [data, searchMember]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    try {
      const result = await API.put(
        `/api/teams/update-member/${user!.currentProjectId}`,
        {
          email: email,
        },
      );
      console.log(result.data);
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    } catch (error: unknown) {
      console.log(error);
    }
  };
  if (user && !user.currentProject) return <Navigate to="/projects" />;

  return (
    <div className="w-full p-3">
      <div className="flex items-center gap-3">
        <Input
          value={searchMember}
          onChange={changeHandler}
          className="my-4 max-w-sm"
          placeholder="Search member"
        />

        {user!.currentProject.creatorId === user!.id ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg" aria-describedby={undefined}>
              <DialogTitle>Add Member</DialogTitle>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input placeholder="Email" name="email" className="my-2" />
                <Button>Add</Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>

      <DataTable
        columns={teamsColumns}
        data={filteredMembers}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Teams;
