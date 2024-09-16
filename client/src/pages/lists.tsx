import { issueColumns } from "@/components/issue-columns";
import { DataTable } from "../components/data-table";
import Filterbar from "../components/filterbar";
import { IssuesProvider } from "@/hooks/useIssues";
import { useIssues } from "@/api/issues";
import { useMemo, useState } from "react";

export default function Lists() {
  const { data: issues, isLoading } = useIssues();
  const [searchIssue, setSearchIssue] = useState("");
  const [activeAssignee, setActiveAssignee] = useState("");

  const filteredByAssignee = useMemo(() => {
    if (!issues) return [];
    return activeAssignee === ""
      ? issues
      : issues.filter((issue) => issue.assigneeId === activeAssignee);
  }, [activeAssignee, issues]);
  const filteredIssues = useMemo(() => {
    return filteredByAssignee.filter((issue) =>
      issue.title.toLowerCase().includes(searchIssue),
    );
  }, [filteredByAssignee, searchIssue]);

  return (
    <div className="w-full p-3 px-2">
      <p className="text-lg">Lists</p>
      <IssuesProvider>
        <Filterbar
          setSearchIssue={setSearchIssue}
          searchIssue={searchIssue}
          activeAssignee={activeAssignee}
          setActiveAssignee={setActiveAssignee}
        />
        <DataTable
          columns={issueColumns}
          data={isLoading ? [] : filteredIssues}
        />
      </IssuesProvider>
    </div>
  );
}
