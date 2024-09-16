import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Header from "../components/header";
import Filterbar from "../components/filterbar";
import { Check, X } from "lucide-react";
import { Input } from "../components/ui/input";
import ColumnList from "@/components/column";
import { API } from "@/utils/api";
import { Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { useColumns } from "@/api/column";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const Board: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState<string>("");
  const { user } = useUser();
  const id = user?.currentProjectId || "";
  const { data: columns } = useColumns();

  const dragHandler = (result: DropResult) => {
    console.log(result);
    // const { source, destination } = result;
    // if (!destination) return;
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // )
    //   return;
    // const sourceColumnIndex = columns.findIndex(
    //   (col) => col.projectId === parseInt(source.droppableId)
    // );
    // const destinationColumnIndex = columns.findIndex(
    //   (col) => col.projectId === parseInt(destination.droppableId)
    // );
    // const sourceColumn = columns[sourceColumnIndex];
    // const destinationColumn = columns[destinationColumnIndex];
    // const [removed] = sourceColumn.tasks.splice(source.index, 1);
    // removed.columnId = parseInt(destination.droppableId); // Update the columnId
    // destinationColumn.tasks.splice(destination.index, 0, removed);
    // // Update positions in the destination column
    // destinationColumn.tasks = destinationColumn.tasks.map((task, index) => ({
    //   ...task,
    //   position: index + 1,
    // }));
    // // Update positions in the source column if it's different from the destination
    // if (sourceColumn !== destinationColumn) {
    //   sourceColumn.tasks = sourceColumn.tasks.map((task, index) => ({
    //     ...task,
    //     position: index + 1,
    //   }));
    // }
    // const updatedColumns = [...columns];
    // updatedColumns[sourceColumnIndex] = sourceColumn;
    // updatedColumns[destinationColumnIndex] = destinationColumn;
    // setColumns(updatedColumns);
  };

  const closeHandler = () => {
    setOpen(false);
  };
  const queryClient = useQueryClient();

  const columnMutation = useMutation({
    mutationFn: (data: { name: string; projectId: string }) =>
      API.post("/api/columns/new", data),
    onSuccess: () => {
      setHeading("");
      queryClient.invalidateQueries({ queryKey: ["columns"] });
    },
  });
  const headingHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    columnMutation.mutate({
      name: heading,
      projectId: id,
    });
  };

  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [open]);

  if (!id) return <Navigate to="/projects" />;

  return (
    <div className="w-full overflow-hidden px-8">
      <Header />
      <Filterbar />
      <div className="flex w-full gap-2 overflow-auto scrollbar">
        <DragDropContext onDragEnd={dragHandler}>
          {columns &&
            columns.length > 0 &&
            columns.map((column) => (
              <ColumnList key={column.id} column={column} />
            ))}
        </DragDropContext>
        <div className="flex w-full max-w-[300px] flex-col gap-y-2">
          {open && (
            <form
              className="flex flex-col gap-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!heading.trim() && !id) return;
                columnMutation.mutate({
                  name: heading,
                  projectId: id,
                });
              }}
            >
              <Input
                placeholder="Enter title"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full min-w-[250px] rounded-none"
              />
              <div className="flex gap-x-2 self-end">
                <Check
                  onClick={headingHandler}
                  className="cursor-pointer rounded-md bg-gray-200 dark:bg-black"
                />
                <X
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-md bg-gray-200 dark:bg-black"
                />
              </div>
            </form>
          )}
          {!open && (
            <>
              <Button
                className="w-full"
                variant={"outline"}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                  if (!heading) return;
                }}
              >
                Add heading
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
