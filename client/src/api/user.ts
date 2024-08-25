import { Project, User } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "./api-response";

export interface UserWithProject extends User {
  currentProject: Project;
}

export async function getMyProfile() {
  const { data } = await API.get<ApiResponse<UserWithProject>>(`/api/auth/me`);
  return data.data;
}

export function useGetMyProfile() {
  return useQuery<UserWithProject | undefined, ApiError>({
    queryKey: ["user"],
    queryFn: getMyProfile,
  });
}
