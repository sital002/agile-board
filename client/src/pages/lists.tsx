import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { useIssues } from "@/api/issues";

export default function Lists() {
  const { data, isLoading } = useIssues();

  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <Filterbar />
      <DataTable
        columns={issueColumns}
        data={data || []}
        isLoading={isLoading}
      />
    </div>
  );
}
