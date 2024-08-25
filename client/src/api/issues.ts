import { Issue } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "./api-response";
import { useUser } from "@/hooks/useUser";

export async function getIssues(projectId: string) {
  if (!projectId) throw new Error("Project ID is required");

  const { data } = await API.get<ApiResponse<Issue[]>>(
    `/api/issues/${projectId}`,
  );
  return data.data || [];
}

export function useIssues() {
  const { user } = useUser();
  const projectId = user?.currentProjectId;
  return useQuery<Issue[], ApiError>({
    queryKey: ["issues"],
    queryFn: () => getIssues(projectId || ""),
    enabled: !!projectId,
  });
}
