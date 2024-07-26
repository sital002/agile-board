import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="border-2 border-gray-700 shadow-md p-1 flex flex-col rounded-md absolute left-[10%] top-[8%] bg-white dark:bg-slate-800  z-10">
      <p className="text-xl font-semibold p-1">Recent</p>
      <div>
        <div className="flex items-center gap-x-4 py-2 p-2 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-md cursor-pointer select-none">
          <img
            className="w-[15%]"
            src="https://sitaladhikari111-1721917254800.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=xxlarge"
            alt=""
          />
          <div>
            <h1 className="font-medium ">Agile Board</h1>
            <p className="text-sm opacity-90">Software project</p>
          </div>
        </div>
        <div className="flex items-center gap-x-4 py-2 p-2 dark:hover:bg-gray-700 hover:bg-gray-200 rounded-md cursor-pointer select-none">
          <img
            className="w-[15%]"
            src="https://sitaladhikari111-1721917254800.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=xxlarge"
            alt=""
          />
          <div>
            <h1 className="font-medium ">Agile Board</h1>
            <p className="text-sm opacity-90">Software project</p>
          </div>
        </div>
      </div>
      <p className="cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 p-3 rounded-md">
        View All Projects
      </p>
      <Link to={'/create'} className="cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 p-3 rounded-md">
        Create new project
      </Link>
    </div>
  );
};

export default Create;
