import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { IssuesProvider } from "@/hooks/useIssues";
import { useIssues } from "@/api/issues";
import { useState } from "react";

export default function Lists() {
  const { data: issues } = useIssues();
  const [filteredIssues, setFilteredIssues] = useState(issues || []);

  const handleSearchIssue = (currentValue: string) => {
    setFilteredIssues(() => {
      if (!issues) return [];
      return issues.filter((issue) =>
        issue.title.toLowerCase().includes(currentValue),
      );
    });
  };
  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <IssuesProvider>
        <Filterbar handleSearchIssue={handleSearchIssue} />
        <DataTable columns={issueColumns} data={filteredIssues} />
      </IssuesProvider>
    </div>
  );
}
