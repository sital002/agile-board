import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Messagecard from "./message-card";
import { TaskType, ColumnType } from "../pages/board";

interface ColumnProps {
  column: ColumnType;
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const Column: React.FC<ColumnProps> = ({ column, columns, setColumns }) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");

  const addTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (newTask.trim().length === 0) {
      setOpen(false);
      return;
    }

    const newTaskObj: TaskType = {
      id: (Math.max(...columns.flatMap((col) => col.tasks.map((task) => parseInt(task.id, 10)))) + 1).toString(),
      title: newTask,
      description: "",
      columnId: column.id,
      position: column.tasks.length + 1,
    };

    const updatedColumns = columns.map((col) => {
      if (col.id === column.id) {
        return {
          ...col,
          tasks: [...col.tasks, newTaskObj],
        };
      }
      return col;
    });

    console.log("Updated Columns after adding task:", updatedColumns);
    setColumns(updatedColumns);
    setNewTask("");
    setOpen(false);
  };

  const closeHandler = () => {
    if (open) setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [open]);
  console.log(open)

  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? "grey" : "" }}
          className="border-2 border-gray-500 h-fit min-w-[300px] rounded-sm p-1 relative"
        >
          <div className="font-bold text-lg mb-2">{column.title}</div>
          <div className="flex flex-col gap-y-2">
            {column.tasks
              .sort((a, b) => a.position - b.position)
              .map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Messagecard issueTitle={task.title} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
            {!open && (
              <p onClick={(e) => {e.stopPropagation(),setOpen(true)}} className="font-semibold cursor-pointer p-2">
                + Create Issue
              </p>
            )}
            {open && (
              <div onClick={(e) => e.stopPropagation()} className="border-2 border-gray-500 flex flex-col gap-y-4 p-1">
                <Input
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  className="rounded-none border-none focus:outline-none "
                  placeholder="Enter your issue..."
                />
                <Button
                  disabled={newTask.trim().length === 0}
                  onClick={addTaskHandler}
                  className="w-fit self-end"
                  variant="secondary"
                  size="sm"
                >
                  Create
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
