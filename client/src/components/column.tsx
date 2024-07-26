import { Ellipsis } from "lucide-react";
import Messagecard from "./message-card";
import { useState } from "react";

const Column = ({ title }: { title: string }) => {
    const[open,setOpen]=useState<boolean>(false)
  return (
    <div className="border-2 border-gray-500 h-fit min-w-[450px] max-w-[450px] rounded-sm p-1 relative">
      <div className="flex justify-between items-center">
        <h1 className="p-4 text-xl font-semibold">{title}</h1>
        <Ellipsis onClick={()=>setOpen(!open)} className="cursor-pointer mr-2" />
      </div>
      {open && <div className="w-full max-w-[30%] p-3 absolute left-[68%] top-[6%] bg-black border-2 border-gray-700 shadow-md">
        <p className="cursor-pointer select-none">Delete</p>
      </div>}
      <div className="flex flex-col gap-y-2">
        <Messagecard />
        <Messagecard />
        <Messagecard />
        <Messagecard />
        <Messagecard />
      </div>
    </div>
  );
};

export default Column;
