import { Ellipsis, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react";

const Messagecard = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`p-3 border-2 group border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900  rounded-md shadow-md cursor-pointer select-none ${props.className}`}
    >
      <div className="flex justify-between gap-3 ">
        <div className="flex relative">
          <p className="w-full  text-left text-sm mr-6 group-hover:underline">
            Create navbar component
          </p>
          <Pencil
            size={15}
            className="self-end hidden group-hover:block ml-1 absolute right-0"
          />
        </div>
        <Ellipsis size={20} className="cursor-pointer self-start" />
      </div>
      <div className="flex justify-between py-3 items-center">
        <p className="text-sm">Sora</p>
        <Avatar className="w-5 h-5">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
});

export default Messagecard;
