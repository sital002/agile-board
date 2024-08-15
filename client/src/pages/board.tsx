import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Header from "../components/header";
import Filterbar from "../components/filterbar";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";
import ColumnList from "@/components/column";
import { API } from "@/utils/api";
import type { Column } from "@/schema/schema";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

type ProjectInfo = {
  id: string;
  name: string;
  userId: string;
  description: string;
};

const Board: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState<string>("");
  const { user } = useUser();
  const id = user?.currentProjectId || "";

  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    id: "",
    name: "",
    userId: "",
    description: "",
  });
  const [newColumn, setNewColumn] = useState();
  const navigate = useNavigate();

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

  const headingHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const resp = await API.post("/api/columns/new", {
      name: heading,
      projectId: projectInfo.id,
    });
    setNewColumn(resp.data);
    setHeading("");
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [open]);

  const getProjectDetails = useCallback(async () => {
    if (!id) return navigate("/create");
    const resp = await API.get(`/api/projects/${id}`);
    setProjectInfo(resp.data);
  }, [id, navigate]);

  const getColumn = useCallback(async () => {
    if (!id) return navigate("/create");
    const resp = await API.get(`/api/columns/${id}`);
    setColumns(resp.data);
    // console.log(resp.data)
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return navigate("/create");
    getProjectDetails();
    getColumn();
  }, [getColumn, getProjectDetails, id, navigate]);

  useEffect(() => {
    getColumn();
  }, [getColumn, newColumn]);

  return (
    <div className="w-full overflow-hidden px-8">
      <Header />
      <Filterbar />
      <div className="flex w-full gap-2 overflow-x-scroll scrollbar">
        <DragDropContext onDragEnd={dragHandler}>
          {columns?.map((column) => (
            <ColumnList key={column.id} column={column} />
          ))}
        </DragDropContext>
        <div className="flex w-full max-w-[300px] flex-col gap-y-2">
          {open && (
            <Input
              placeholder="enter title"
              onChange={(e) => setHeading(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full min-w-[250px] rounded-none"
            />
          )}
          {!open && (
            <Plus
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
                if (!heading) return;
              }}
              size={25}
              className="ml-5 cursor-pointer rounded-md bg-secondary"
            />
          )}
          {open && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
