import { DataTable } from "@/components/data-table";
import { projectColumns } from "@/components/project-columns";
import { Button } from "@/components/ui/button";
import { Project } from "@/schema/schema";
import { API } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

async function getProjects() {
  const result = await API.get(`/api/projects`);
  return result.data;
}

const initialData: Project = {
  id: "",
  name: "",
  description: "",
  creator: {
    id: "",
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
  // console.log("the data", data);

  const tempdata = new Array(6).fill(initialData);
  return (
    <div className="w-full px-2">
      <div className="flex items-center gap-6">
        <h1 className="my-4 text-lg">Project</h1>
        <Button asChild>
          <Link to="/create">Create</Link>
        </Button>
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
