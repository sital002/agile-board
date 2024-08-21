import { projectColumns } from "@/components/project-columns";
import { ProjectDataTable } from "@/components/project-data-table";
import { Button } from "@/components/ui/button";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function getProjects() {
  const result = await API.get(`/api/projects`);
  return result.data;
}

const ProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return (
    <div className="w-full px-2">
      <div className="flex items-center gap-6">
        <h1 className="my-4 text-lg">Project</h1>
        <Button asChild>
          <Link to="/create">Create</Link>
        </Button>
      </div>
      <ProjectDataTable
        columns={projectColumns}
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProjectList;
