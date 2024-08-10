import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Messagecard from "./message-card";
import { API } from "@/utils/api";
import type { Column, Issue } from "@/schema/schema";

interface ColumnProps {
  column: Column;
  // columns: ColumnType[];
  // setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [issue, setIssue] = useState<Issue>();
  const [issues, setIssues] = useState<Issue[]>();

  // const addTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   if (newTask.trim().length === 0) {
  //     setOpen(false);
  //     return;
  //   }

  //   const newTaskObj: TaskType = {
  //     id: (
  //       Math.max(
  //         ...columns.flatMap((col) =>
  //           col.tasks.map((task) => parseInt(task.id, 10))
  //         )
  //       ) + 1
  //     ).toString(),
  //     title: newTask,
  //     description: "",
  //     columnId: column.id,
  //     position: column.tasks.length + 1,
  //   };

  //   const updatedColumns = columns.map((col) => {
  //     if (col.id === column.id) {
  //       return {
  //         ...col,
  //         tasks: [...col.tasks, newTaskObj],
  //       };
  //     }
  //     return col;
  //   });

  //   console.log("Updated Columns after adding task:", updatedColumns);
  //   setColumns(updatedColumns);
  //   setNewTask("");
  //   setOpen(false);
  // };

  const closeHandler = () => {
    if (open) setOpen(false);
  };

  const issueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addIssue = async () => {
    const resp = await API.post("/api/issues/new", {
      title: newTask,
      projectId: column.projectId,
      columnId: column.id,
    });
    console.log(resp);
    // setIssue(resp.data);
    setOpen(false);
  };

  useEffect(() => {
    const getIssue = async () => {
      const resp = await API.get(`/api/issues/${column.projectId}`);
      // console.log(resp.data);
      setIssues(resp.data);
    };
    getIssue();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [open]);

  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ backgroundColor: snapshot.isDraggingOver ? "grey" : "" }}
          className="border-2 h-fit min-w-[300px] rounded-sm p-1 relative"
        >
          <div className="font-medium text-md mb-2 px-2">{column.name}</div>
          <div className="flex flex-col gap-y-2">
            {issues?.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {column.id == task.columnId && (
                      <Messagecard
                        id={task.id.toString()}
                        issueTitle={task.title}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {!open && (
              <p
                onClick={(e) => {
                  e.stopPropagation(), setOpen(true);
                }}
                className="font-semibold cursor-pointer p-2"
              >
                + Create Issue
              </p>
            )}
            {open && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="border-2 border-gray-500 flex flex-col gap-y-4 p-1"
              >
                <Input
                  ref={inputRef}
                  onKeyUp={(e) => {
                    if (e.key == "Enter") submitBtnRef.current?.click();
                  }}
                  onChange={issueHandler}
                  value={newTask}
                  className="rounded-none border-none focus:outline-none "
                  placeholder="Enter your issue..."
                />
                <Button
                  ref={submitBtnRef}
                  disabled={newTask.trim().length === 0}
                  onClick={addIssue}
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
