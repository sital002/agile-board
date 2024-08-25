import { useProjects } from "@/api/project";
import { projectColumns } from "@/components/project-columns";
import { ProjectDataTable } from "@/components/project-data-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const { data, isLoading } = useProjects();
  return (
    <div className="w-full px-2">
      <div className="flex items-center gap-6">
        <h1 className="my-4 text-lg">Project</h1>
        <Button asChild>
          <Link to="/create">Create</Link>
        </Button>
      </div>
      {isLoading && <p>Loading...</p>}
      <ProjectDataTable
        columns={projectColumns}
        data={data || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProjectList;
