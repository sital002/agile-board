import { useIssues } from "@/api/issues";
import { Issue } from "@/schema/schema";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type FilteredIssuedType = {
  filteredIssue: Issue[];
  searchIssue: string;
  activeAssignee: string | null;
  handleSearchIssue: (value: string) => void;
  handleChangeAssigne: (value: string | null) => void;
};
const FilteredIssueContext = createContext<FilteredIssuedType | null>(null);

interface FilteredIssuesProviderProps {
  children: ReactNode;
}
const FilteredIssuesProvider = ({ children }: FilteredIssuesProviderProps) => {
  const [searchIssue, setSearchIssue] = useState("");
  const [activeAssignee, setActiveAssignee] = useState<string | null>("");

  const handleSearchIssue = (value: string) => {
    setSearchIssue(value);
  };

  function handleChangeAssigne(assignee: string | null) {
    const newAssignee = assignee === activeAssignee ? "" : assignee;
    setActiveAssignee(newAssignee);
  }
  const { data: issues } = useIssues();
  const filteredByAssignee = useMemo(() => {
    if (!issues) return [];
    if (activeAssignee === "") return issues;
    if (activeAssignee === null)
      return issues.filter((issue) => issue.assigneeId === null);
    return issues.filter((issue) => issue.assigneeId === activeAssignee);
  }, [activeAssignee, issues]);

  const filteredIssues = useMemo(() => {
    return filteredByAssignee.filter((issue) =>
      issue.title.toLowerCase().includes(searchIssue.toLowerCase()),
    );
  }, [filteredByAssignee, searchIssue]);
  return (
    <FilteredIssueContext.Provider
      value={{
        searchIssue,
        activeAssignee,
        filteredIssue: filteredIssues,
        handleChangeAssigne,
        handleSearchIssue,
      }}
    >
      {children}
    </FilteredIssueContext.Provider>
  );
};

export const useFilteredIssue = () => {
  const context = useContext(FilteredIssueContext);
  if (!context)
    throw new Error(
      "useFilteredIssue must be used inside FilteredContext Provider",
    );
  return context;
};

export { FilteredIssuesProvider };
