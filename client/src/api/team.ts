import { Team } from "@/schema/schema";
import { ApiResponse } from "./api-response";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

async function getTeams(projectId: string) {
  const { data } = await API.get<ApiResponse<Team>>(`/api/teams/${projectId}`);
  console.log(data);
  return data.data?.members || [];
}

export function useTeams(projectId: string) {
  return useQuery({
    queryKey: ["teams"],
    queryFn: () => getTeams(projectId),
  });
}
