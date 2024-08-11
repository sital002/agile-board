import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

async function getAllIssue() {
  const result = await API.get(
    `/api/issues/${localStorage.getItem("currentProjectId")}`
  );
  return result.data;
}
export default function Lists() {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllIssue,
  });
  return (
    <div className="p-3 w-full px-2 overflow-hidden">
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
