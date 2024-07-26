import { headerIcon } from "../constant/navlist";

const Header = () => {
  return (
    <div className="flex justify-between py-6 sticky left-0 top-0">
      <h1 className="text-xl font-semibold">KAN board</h1>
      <div className="flex items-center gap-x-3">
        {headerIcon.map((ele, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-700 p-2 rounded-md"
            >
              <span>{ele?.name}</span>
              <span>{ele?.icon}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
