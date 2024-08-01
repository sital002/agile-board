import { Link } from "react-router-dom";
import {  setting, sidebarlist } from "../constant/navlist";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [width, setWidth] = useState(false);

  const clickHandler = () => {
    setWidth(!width);
  };
  return (
    <aside
      className={`w-full ${
        !width ? "max-w-[50%] md:max-w-[30%] lg:max-w-[20%]" : "max-w-0 p-0"
      } absolute  bg-white dark:bg-black border-gray-200 dark:border-gray-700 border-2 p-6 h-screen max-h-fit select-none md:relative transition-all`}
    >
      <ChevronRight
        onClick={clickHandler}
        color="white"
        className="absolute left-[95%] bg-blue-500 rounded-full top-[10%] cursor-pointer"
      />
      <div className={width ? "hidden" : "block"}>
        <div className="flex items-center gap-x-4 py-6">
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
        <h1 className="text-md opacity-65 font-semibold">Planning</h1>
        <div>
          {sidebarlist.map((ele, index) => {
            return (
              <Link
                to={ele.url}
                key={index}
                className="flex items-center gap-x-4 py-3 px-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md"
              >
                <span>{ele.icon}</span>
                <span className="text-sm opacity-60">{ele.name}</span>
              </Link>
            );
          })}
        </div>
        <h1 className="text-md opacity-65 font-semibold">Development</h1>
        {/* <div>
          {development.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex my-2 text-sm items-center gap-x-4 py-3 px-2 cursor-pointer dark:hover:bg-gray-900 hover:bg-gray-200 rounded-md"
              >
                <span>{ele.icon}</span>
                <span className="text-sm opacity-60">{ele.name}</span>
              </div>
            );
          })}
        </div> */}
        <hr />
        <div className="mt-2">
          {setting.map((ele, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-x-4 p-3 cursor-pointer px-2 dark:hover:bg-gray-900 hover:bg-gray-200 rounded-md"
              >
                <span>{ele.icon}</span>
                <span className="text-md opacity-60">{ele.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
