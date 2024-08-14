import { DataTable } from "@/components/data-table";
import { projectColumns } from "@/components/project-columns";
import { Project, projectSchema } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";

async function getProjects() {
  const result = await API.get(`/api/projects`);
  const data = projectSchema.array().parse(result.data);
  return data;
}

const initialData: Project = {
  id: 0,
  name: "",
  description: "",
  creator: {
    id: 0,
    email: "",
    display_name: "",
    isSubscribed: false,
    profile_image_url: "",
    created_at: "",
    updated_at: "",
  },
};
const ProjectList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const tempdata = new Array(6).fill(initialData);
  return (
    <div className="w-full px-2">
      <div className="flex items-center gap-3">
        <h1 className="my-4 text-lg">Project List</h1>
      </div>
      <DataTable
        columns={projectColumns}
        data={isLoading ? tempdata : (data ?? [])}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ProjectList;
