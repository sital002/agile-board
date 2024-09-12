import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Messagecard from "./message-card";
import { API } from "@/utils/api";
import type { Column } from "@/schema/schema";
import { isAxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIssues } from "@/api/issues";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

  // const { filteredIssues } = useIssuesContext();
  const { data: issues } = useIssues();
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
          <div className="text-md mb-2 flex items-center justify-between px-2 font-medium">
            <p>{column.name}</p>
            <ColumActions columnId={column.id} />
          </div>
          <div className="h-[300px] overflow-auto p-1 scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary-foreground scrollbar-thumb-rounded-full">
            {issues &&
              issues.length > 0 &&
              issues?.map((task, index) => (
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

function ColumActions({ columnId }: { columnId: string }) {
  const queryClient = useQueryClient();
  const deleteColumnMutation = useMutation({
    mutationFn: (data: { columnId: string }) =>
      API.delete(`/api/columns/${data.columnId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => {
              deleteColumnMutation.mutate({
                columnId,
              });
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
