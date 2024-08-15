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
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

async function getTeams(projectId: string) {
  if (!projectId) return [];
  const result = await API.get(`/api/teams/${projectId}`);
  return result.data ?? [];
}

const Team = () => {
  const [search, setSearch] = useState("");
  const { user } = useUser();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams(user!.currentProjectId || ""),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.email.value);
    const email = e.currentTarget.email.value;
    try {
      const result = await API.put(
        `/api/teams/update-member/${user!.currentProjectId}`,
        {
          email: email,
        },
      );
      console.log(result.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-3">
      <div className="flex items-center gap-3">
        <Input
          value={search}
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
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Team;
