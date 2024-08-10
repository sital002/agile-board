import { DataTable } from "@/components/data-table";
import { teamsColumns } from "@/components/team-columns";
import { Input } from "@/components/ui/input";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

async function getTeams() {
  const result = await API.get(
    `/api/teams/${localStorage.getItem("currentProjectId")}`
  );
  // const data = teamSchema.array().safeParse(result.data);
  // console.log(data.error?.errors);
  console.log(result.data);
  return result.data ?? [];
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

  return (
    <div className="w-full p-3">
      <Input
        value={search}
        onChange={changeHandler}
        className="max-w-sm mt-4"
        placeholder="Search member"
      />

      <DataTable
        columns={teamsColumns}
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Team;
