"use client";
import { sidebarOptions } from "../_utils/sidebar-options";
import ListItem from "./list-item";

export default function Sidebar() {
  return (
    <nav className="my-2 lg:w-[300px] h-full">
      <ul>
        {sidebarOptions.map((option, index) => (
          <li key={option.name + index} className="">
            <ListItem
              name={option.name}
              href={option.href}
              icon={option.icon}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
