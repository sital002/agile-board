import { Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Input } from "./ui/input";
import { TaskType } from "../pages/board";
import { useEffect, useState } from "react";

type TitleDropdownProps = {
  tasks: TaskType[][];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[][]>>;
  index: number;
  issue:TaskType[]
};

export default function TitleDropdown({
  tasks,
  setTasks,
  index,
}: TitleDropdownProps) {
  const [title, setTitle] = useState<string>("");
  const [open, setOpen] = useState<boolean>();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const closeHandler=()=>{
    if(!open){
      setOpen(false)
    }
  }

  const clickHandler = (index: number) => {
    if (!title) {
      setOpen(false);
      return;
    }

    tasks[index].forEach((task) => {
      task.heading = title;
    }
    );
    console.log('task',tasks);
    setTasks([...tasks]);
    setTitle("");
    setOpen(false);
  };
  
  useEffect(()=>{
    window.addEventListener('click',closeHandler)
    return ()=>window.removeEventListener('click',closeHandler)
  },[open])

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(true)}>
      <DropdownMenuTrigger asChild>
        <p onClick={(e)=>e.preventDefault()} className="p-3 cursor-pointer font-semibold">{tasks[index][0].heading}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] border-none ">
        <DropdownMenuGroup className="border-none ">
          <Input
            onChange={changeHandler}
            value={title}
            className="rounded-sm "
            placeholder="Title..."
          />
          <div className="flex absolute left-[70%] top-full gap-x-2 mt-1">
            <Check
              onClick={() => clickHandler(index)}
              size={30}
              className="dark:bg-gray-700 bg-gray-200 rounded-md cursor-pointer"
            />
            <X
              onClick={() => setOpen(false)}
              size={30}
              className="dark:bg-gray-700 bg-gray-200 rounded-md cursor-pointer"
            />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
