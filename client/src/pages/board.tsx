import Header from "../components/header";
import Filterbar from "../components/filterbar";
import Column from "../components/column";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import React, { useEffect, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";

export type TaskType = {
  id: string;
  title: string;
  user: string;
  heading?: string;
};


const Board = () => {
  const [tasks, setTasks] = useState<TaskType[][]>([]);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState<string>("");

  const dragHandler = (result: DropResult) => {
    const { source, destination } = result;
    console.log(source)
    console.log(destination)
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    const sourceColumn = tasks[Number(source.droppableId)];
    const destinationColumn = tasks[Number(destination.droppableId)];
    const [removed] = sourceColumn.splice(source.index, 1);
    removed.heading = destinationColumn[destination.index].heading;
    destinationColumn.splice(destination.index, 0, removed);
    setTasks([...tasks]);
    
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const headingHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    tasks.push([{ heading: heading, id: Math.random().toString(), title: "", user: "" }]);
    console.log(tasks);
    setTasks([...tasks]);
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [open]);

  return (
    <div className="w-full px-8 overflow-hidden ">
      <Header />
      <Filterbar />
      <div className="flex gap-2 w-full overflow-x-auto scrollbar ">
        <DragDropContext onDragEnd={dragHandler}>
          {tasks?.map((column, index) => (
            <Column
              tasks={tasks}
              setTasks={setTasks}
              id={index}
              key={index}
              issue={column}
            />
          ))}
        </DragDropContext>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          {open && (
            <Input
              onChange={(e) => setHeading(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full min-w-[250px] rounded-none "
            />
          )}
          {!open && (
            <Plus
              onClick={(e) => {
                e.stopPropagation(), setOpen(true);
              }}
              size={30}
              className="dark:bg-slate-700 bg-gray-200 cursor-pointer ml-5"
            />
          )}
          {open && (
            <div className="flex gap-x-2 self-end">
              <Check
                onClick={headingHandler}
                className="dark:bg-gray-700 bg-gray-200 rounded-md cursor-pointer"
              />
              <X className="dark:bg-gray-700 bg-gray-200 rounded-md cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
