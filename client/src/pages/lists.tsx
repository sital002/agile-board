import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { IssuesProvider } from "@/hooks/useIssues";
import { useIssues } from "@/api/issues";

export default function Lists() {
  const { data: issues } = useIssues();
  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <IssuesProvider>
        <Filterbar />
        <DataTable columns={issueColumns} data={issues || []} />
      </IssuesProvider>
    </div>
  );
}
