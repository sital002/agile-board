import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "./api-response";
import { Comment } from "@/schema/schema";

export async function getComments(issueId: string) {
  const { data } = await API.get<ApiResponse<Comment[]>>(
    `/api/comments/${issueId}`,
  );
  return data.data || [];
}

export function useComment(issueId: string) {
  return useQuery<Comment[], ApiError>({
    queryKey: ["comments", issueId],
    queryFn: () => getComments(issueId),
    enabled: !!issueId,
  });
}

export function updateComment({
  commentId,
  content,
  issueId,
}: {
  commentId: string;
  content: string;
  issueId: string;
}) {
  return API.put<ApiResponse<Comment>>(`/api/comments/${commentId}`, {
    content,
    issueId,
  });
}
