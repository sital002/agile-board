import { useIssues } from "@/api/issues";
import { Issue } from "@/schema/schema";
import { createContext, useContext, useState } from "react";

interface IssueContextType {
  issues: Issue[];
  filteredIssues: Issue[];
  setFilteredIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
}
const IssuesContext = createContext<IssueContextType | null>(null);

interface IssuesProviderProps {
  children: React.ReactNode;
}
const IssuesProvider = ({ children }: IssuesProviderProps) => {
  const { data: issues } = useIssues();
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>(issues || []);
  return (
    <IssuesContext.Provider
      value={{ issues: issues || [], filteredIssues, setFilteredIssues }}
    >
      {children}
    </IssuesContext.Provider>
  );
};

export const useIssuesContext = () => {
  const context = useContext(IssuesContext);
  if (!context)
    throw new Error("useIssuesContext must be used within a IssuesProvider");
  return context;
};
export { IssuesProvider };
