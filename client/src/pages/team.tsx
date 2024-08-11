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
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const currentProjectId = localStorage.getItem("currentProjectId") ?? "";
async function getTeams() {
  const result = await API.get(`/api/teams/${currentProjectId}`);
  return result.data.members ?? [];
}

const Team = () => {
  const [search, setSearch] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.email.value);
    const email = e.currentTarget.email.value;
    try {
      const result = await API.put(
        `/api/teams/update-member/${currentProjectId}`,
        {
          email: email,
        }
      );
      console.log(result.data);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-3">
      <Dialog>
        <div className="flex gap-3 items-center">
          <Input
            value={search}
            onChange={changeHandler}
            className="max-w-sm my-4"
            placeholder="Search member"
          />
          <DialogTrigger asChild>
            <Button>Add</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg" aria-describedby={undefined}>
            <DialogTitle>Add Member</DialogTitle>
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <Input placeholder="Email" name="email" className="my-2" />
              <Button>Add</Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>

      <DataTable
        columns={teamsColumns}
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Team;
