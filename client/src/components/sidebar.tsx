import { Link } from "react-router-dom";
import { development, setting, sidebarlist } from "../constant/navlist";

const Sidebar = () => {
  return (
    <aside className="w-full max-w-[18%] border-gray-600 border-r-2 p-6 h-screen max-h-fit select-none sticky left-0 top-0">
      <div className="flex items-center gap-x-4 py-6">
        <img
          className="w-[15%]"
          src="https://sitaladhikari111-1721917254800.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10406?size=xxlarge"
          alt=""
        />
        <div>
          <h1 className="font-semibold">Agile Board</h1>
          <p>Software project</p>
        </div>
      </div>
      <h1 className="text-md opacity-65 font-semibold">Planning</h1>
      <div>
        {sidebarlist.map((ele, index) => {
          return (
            <Link
              to={ele.url}
              key={index}
              className="flex items-center gap-x-4 py-3 px-2 cursor-pointer hover:bg-gray-700 rounded-md"
            >
              <span>{ele.icon}</span>
              <span className="text-sm opacity-60">{ele.name}</span>
            </Link>
          );
        })}
      </div>
      <h1 className="text-md opacity-65 font-semibold">Development</h1>
      <div>
        {development.map((ele, index) => {
          return (
            <div
              key={index}
              className="flex my-2 text-sm items-center gap-x-4 py-3 px-2 cursor-pointer hover:bg-gray-700 rounded-md"
            >
              <span>{ele.icon}</span>
              <span className="text-sm opacity-60">{ele.name}</span>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="mt-2">
        {setting.map((ele, index) => {
          return (
            <div
              key={index}
              className="flex items-center gap-x-4 p-3 cursor-pointer px-2 hover:bg-gray-700 rounded-md"
            >
              <span>{ele.icon}</span>
              <span className="text-md opacity-60">{ele.name}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
