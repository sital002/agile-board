import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { IssuesProvider } from "@/hooks/useIssues";
import { useFilteredIssue } from "@/hooks/useFilteredIssues";

export default function Lists() {
  const { filteredIssue } = useFilteredIssue();
  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <IssuesProvider>
        <Filterbar />
        <DataTable columns={issueColumns} data={filteredIssue} />
      </IssuesProvider>
    </div>
  );
}
