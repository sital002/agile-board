import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";

async function getAllIssue(projectId: string) {
  if (!projectId) return [];
  const result = await API.get(`/api/issues/${projectId}`);
  return result.data;
}
export default function Lists() {
  const { user } = useUser();
  const { data, isLoading } = useQuery({
    queryKey: ["issues"],
    queryFn: () => getAllIssue(user?.currentProjectId || ""),
  });

  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <Filterbar />
      <DataTable
        columns={issueColumns}
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
}
