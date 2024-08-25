import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Messagecard from "./message-card";
import { API } from "@/utils/api";
import type { Column, Issue } from "@/schema/schema";
import { isAxiosError } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface ColumnProps {
  column: Column;
  // columns: ColumnType[];
  // setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
}

const ColumnList: React.FC<ColumnProps> = ({ column }) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState("");
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [issue, setIssue] = useState<Issue>();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });

  async function getIssues(): Promise<Issue[]> {
    console.log("Inside getIssues");
    const res = await API.get(`/api/issues/${column.projectId}`);
    console.log(res.data);
    return res.data || [];
  }
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

  const addIssue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(column.projectId);
    try {
      const resp = await API.post("/api/issues/new", {
        title: newTask,
        projectId: column.projectId,
        columnId: column.id,
      });
      console.log(resp);
      if (resp) {
        queryClient.invalidateQueries({
          queryKey: ["issues"],
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (isAxiosError(err)) {
        console.log(err.response?.data);
      }
    } finally {
      setNewTask("");
      setOpen(false);
    }
    // setIssue(resp.data);
  };

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
          style={{
            backgroundColor: snapshot.isDraggingOver ? "gray" : "",
          }}
          className="max-h-[500px] min-w-[300px] rounded-sm border-2 p-1"
        >
          <div className="text-md mb-2 px-2 font-medium">{column.name}</div>
          <div className="h-[300px] overflow-auto p-1 scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary-foreground scrollbar-thumb-rounded-full">
            {data &&
              data.length > 0 &&
              data?.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="relative my-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {column.id == task.columnId ? (
                        <Messagecard issue={task} />
                      ) : null}
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
          {!open && (
            <p
              onClick={(e) => {
                e.stopPropagation(), setOpen(true);
              }}
              className="cursor-pointer p-2 font-semibold"
            >
              + Create Issue
            </p>
          )}
          {open && (
            <div onClick={(e) => e.stopPropagation()}>
              <form onSubmit={addIssue}>
                <Input
                  ref={inputRef}
                  onChange={issueHandler}
                  value={newTask}
                  className="my-2 w-full rounded-none border-none outline-none focus:outline"
                  placeholder="Enter your issue..."
                />
                <Button
                  ref={submitBtnRef}
                  disabled={newTask.trim().length === 0}
                  className="ml-auto w-fit"
                  variant="secondary"
                  size="sm"
                >
                  Create
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default ColumnList;
