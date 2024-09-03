import { Column } from "@/schema/schema";
import { ApiError, ApiResponse } from "./api-response";
import { API } from "@/utils/api";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";

export async function getColums(projectId: string) {
  if (!projectId) throw new Error("Project ID is required");
  const { data } = await API.get<ApiResponse<Column[]>>(
    `/api/columns/${projectId}`,
  );
  return data.data || [];
}

export function useColumns() {
  const { user } = useUser();
  const projectId = user?.currentProjectId;
  return useQuery<Column[], ApiError>({
    queryKey: ["columns"],
    queryFn: () => getColums(projectId || ""),
    enabled: !!projectId,
  });
}
