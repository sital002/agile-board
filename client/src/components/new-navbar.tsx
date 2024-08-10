"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Plus, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CreateTeam from "./create-team";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Dashboard",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Teams",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Lists",
//     href: "/lists",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
// ];

const list = [
  {
    icon: <Plus />,
    name: "Invite People",
  },
  {
    icon: <User />,
    name: "Create a Team",
  },
];

export function NavigationMenuDemo() {
  const [open, setOpen] = React.useState(false);
  return (
    <NavigationMenu className="hidden lg:block">
      {open && <CreateTeam open={open} setOpen={setOpen} />}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Your Work</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] ">
              <ListItem href="/board" title="Recent Projects">
                Agile Board
              </ListItem>
              <ListItem href="/create" title="Create Project">
                Create a new project
              </ListItem>
              <ListItem href="/projects" title="VIew All Projects">
                View all projects
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Teams</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-[300px] p-3">
              <h1 className="text-xl font-semibold">Your Collaborators</h1>
              <div className="flex gap-x-3 items-center my-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Sital Adhikari</p>
              </div>
              {list.map((ele, index) => {
                return (
                  <span
                    onClick={() => setOpen(true)}
                    key={index}
                    className="flex gap-x-3 p-3 cursor-pointer hover:bg-secondary rounded-md"
                  >
                    {ele.icon}
                    <p>{ele.name}</p>
                  </span>
                );
              })}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to={"/docs"}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
