import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Header from "../components/header";
import Filterbar from "../components/filterbar";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";
import Column from "@/components/column";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  columnId: number;
  position: number;
};

export type ColumnType = {
  id: number;
  title: string;
  position: number;
  tasks: TaskType[];
};

const initialData: ColumnType[] = [
  {
    id: 1,
    title: "To Do",
    position: 1,
    tasks: [
      { id: "1", title: "Task 1", description: "Description 1", columnId: 1, position: 1 },
      { id: "2", title: "Task 2", description: "Description 2", columnId: 1, position: 2 },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    position: 2,
    tasks: [
      { id: "3", title: "Task 3", description: "Description 3", columnId: 2, position: 1 },
      { id: "4", title: "Task 4", description: "Description 4", columnId: 2, position: 2 },
    ],
  },
  {
    id: 3,
    title: "Done",
    position: 3,
    tasks: [],
  },
];

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>(initialData);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState<string>("");

  console.log(columns);

  const dragHandler = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceColumnIndex = columns.findIndex((col) => col.id === parseInt(source.droppableId));
    const destinationColumnIndex = columns.findIndex((col) => col.id === parseInt(destination.droppableId));
    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    const [removed] = sourceColumn.tasks.splice(source.index, 1);
    removed.columnId = parseInt(destination.droppableId); // Update the columnId
    destinationColumn.tasks.splice(destination.index, 0, removed);

    // Update positions in the destination column
    destinationColumn.tasks = destinationColumn.tasks.map((task, index) => ({
      ...task,
      position: index + 1,
    }));

    // Update positions in the source column if it's different from the destination
    if (sourceColumn !== destinationColumn) {
      sourceColumn.tasks = sourceColumn.tasks.map((task, index) => ({
        ...task,
        position: index + 1,
      }));
    }

    const updatedColumns = [...columns];
    updatedColumns[sourceColumnIndex] = sourceColumn;
    updatedColumns[destinationColumnIndex] = destinationColumn;

    setColumns(updatedColumns);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const headingHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newColumn: ColumnType = {
      id: Math.max(...columns.map((col) => col.id)) + 1,
      title: heading,
      position: columns.length + 1,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
    setHeading("");
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
          {columns.sort((a, b) => a.position - b.position).map((column) => (
            <Column
              key={column.id}
              column={column}
              columns={columns}
              setColumns={setColumns}
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
                e.stopPropagation();
                setOpen(true);
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
              <X
                onClick={() => setOpen(false)}
                className="dark:bg-gray-700 bg-gray-200 rounded-md cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
