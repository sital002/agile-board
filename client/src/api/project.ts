import type { Project } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "./api-response";

export async function getMyProjects() {
  const { data } = await API.get<ApiResponse<Project[]>>(`/api/projects`);
  return data.data || [];
}

export async function deleteProject(id: string) {
  return API.delete<ApiResponse<Project>>(`/api/projects/${id}`);
}

export function useProjects() {
  return useQuery<Project[], ApiError>({
    queryKey: ["projects"],
    queryFn: getMyProjects,
  });
}
