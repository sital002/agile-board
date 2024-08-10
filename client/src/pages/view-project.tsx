import { DataTable } from "@/components/data-table";
import { projectColumns } from "@/components/project-columns";
import { projectSchema } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

async function getProjects() {
  const result = await API.get(`/api/projects`);
  const data = projectSchema.array().parse(result.data);
  return data;
}
const ProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
  return (
    <div className="w-full px-2">
      <div className="flex items-center gap-3">
        <h1 className="text-lg my-4">Project List</h1>
      </div>
      <DataTable
        columns={projectColumns}
        data={data ?? []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProjectList;
