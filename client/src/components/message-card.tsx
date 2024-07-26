import { Ellipsis, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react";

const Messagecard = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>((props, ref) => {
  return (
    <div ref={ref} {...props} className={`p-3 border-2 border-gray-700 rounded-md shadow-md cursor-pointer select-none ${props.className}`}>
      <div className="flex justify-between">
        <div className="flex">
          <p className="w-full max-w-[90%] text-left">
            ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
          </p>
          <Pencil size={17} className="self-end" />
        </div>
        <Ellipsis size={60} className="cursor-pointer self-start" />
      </div>
      <div className="flex justify-between py-3 items-center">
        <p>Sora</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
});

export default Messagecard;
