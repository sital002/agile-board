import { Button } from "./ui/button";
import { Bell, Settings } from "lucide-react";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { NavigationMenuDemo } from "./new-navbar";

const Navbar = () => {
  return (
    <header className="flex  justify-between p-4 border-b-2 border-gray-600">
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"secondary"}>More</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Your Work</DropdownMenuItem>
              <DropdownMenuItem>Create</DropdownMenuItem>
              <DropdownMenuItem>Filters</DropdownMenuItem>
              <DropdownMenuItem>Dashboards</DropdownMenuItem>
              <DropdownMenuItem>Teams</DropdownMenuItem>
              <DropdownMenuItem>Apps</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* New navigation menu */}
      <NavigationMenuDemo />
      <Button>Create</Button>
      <Input
        className="w-full max-w-[20%] hidden md:block"
        placeholder="Search"
      />
      <div className="flex items-center gap-x-2 md:gap-x-4">
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
