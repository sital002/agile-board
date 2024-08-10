import { Link } from "react-router-dom";
import { sidebarlist } from "../constant/navlist";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [width, setWidth] = useState(false);

  const clickHandler = () => {
    setWidth(!width);
  };

  return (
    <aside
      className={`w-full border-r ${
        !width ? "max-w-[50%] md:max-w-[30%] lg:max-w-[20%]" : "max-w-0 p-0"
      } absolute  p-6 h-screen select-none md:relative transition-all`}
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
            <h1 className="font-medium">Agile Board</h1>
            <p className="text-sm opacity-90">Software project</p>
          </div>
        </div>
        <div>
          {sidebarlist.map((ele, index) => (
            <div key={index}>
              <Link to={ele.url}>
                <div className="flex items-center gap-2 py-3 my-2 px-2 cursor-pointer hover:bg-secondary rounded-md">
                  <span>{ele.icon}</span>
                  <span className="text-sm opacity-60">{ele.name}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <hr />
      </div>
    </aside>
  );
};

export default Sidebar;
