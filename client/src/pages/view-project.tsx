import { ProjectTable } from "@/components/project-list-table";

const ProjectList = () => {
  return (
    <div className="w-full p-4">
        <h1 className="text-3xl font-semibold my-4">Project List</h1>
      <ProjectTable />
    </div>
  );
};

export default ProjectList;
