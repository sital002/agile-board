import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { IssuesProvider, useIssuesContext } from "@/hooks/useIssues";

export default function Lists() {
  const { filteredIssues } = useIssuesContext();
  console.log(filteredIssues);
  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <IssuesProvider>
        <Filterbar />
        <DataTable columns={issueColumns} data={filteredIssues || []} />
      </IssuesProvider>
    </div>
  );
}
