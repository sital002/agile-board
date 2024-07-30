import { navlist } from "../constant/navlist";
import { Button } from "./ui/button";
import { Bell, Settings } from "lucide-react";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between p-4 border-b-2 border-gray-600">
      <div></div>
      <div className="flex items-center gap-x-4">
        {navlist.map((ele, index) => {
          return (
            <div
              key={index}
              className="flex cursor-pointer select-none dark:hover:bg-gray-900 hover:bg-gray-200 rounded-md p-2"
            >
              <span className="text-md">{ele.name}</span>
              <span className="self-end">{ele.icon}</span>
            </div>
          );
        })}
      </div>
      <Button>Create</Button>
      <Input className="w-full max-w-[20%]" placeholder="Search" />
      <div className="flex items-center gap-x-4">
        <Bell size={20} />
        <ModeToggle />
        <Settings size={20} />
        <Link
          to={"/signin"}
          className="bg-primary text-primary-foreground px-3 py-2 rounded-md font-bold text-sm"
        >
          Signin
        </Link>
        <Link
          to={"/signup"}
          className="bg-primary text-primary-foreground px-3 py-2 rounded-md font-bold text-sm"
        >
          Signup
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
