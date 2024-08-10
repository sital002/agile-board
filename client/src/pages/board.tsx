import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Header from "../components/header";
import Filterbar from "../components/filterbar";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";
import Column from "@/components/column";
import { API } from "@/utils/api";
import { useParams } from "react-router-dom";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  columnId: number;
  position: number;
};

export type ColumnType = {
  id: number;
  projectId: number;
  name: string;
  // position: number;
  // tasks: TaskType[];
};

type ProjectInfo = {
  id: string;
  name: string;
  userId: string;
  description: string;
};

const Board: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState<string>("");
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    id: "",
    name: "",
    userId: "",
    description: "",
  });
  const [newColumn, setNewColumn] = useState();

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

  const getProjectDetails = async () => {
    const resp = await API.get(`/api/projects/${id}`);
    setProjectInfo(resp.data);
  };

  const getColumn = async () => {
    const resp = await API.get(`/api/columns/${id}`);
    setColumns(resp.data);
    // console.log(resp.data)
  };

  useEffect(() => {
    getProjectDetails();
    getColumn();
    localStorage.setItem('currentProjectId',id as string)
  }, []);

  useEffect(() => {
    getColumn();
  }, [newColumn]);

  return (
    <div className="w-full px-8 overflow-hidden ">
      <Header projectTitle={projectInfo?.name} />
      <Filterbar />
      <div className="flex gap-2 w-full overflow-x-scroll scrollbar">
        <DragDropContext onDragEnd={dragHandler}>
          {columns?.map((column) => (
            <Column key={column.projectId} column={column} />
          ))}
        </DragDropContext>
        <div className="flex flex-col gap-y-2 w-full max-w-[300px]">
          {open && (
            <Input
              placeholder="enter title"
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
                if (!heading) return;
              }}
              size={25}
              className="rounded-md bg-secondary cursor-pointer ml-5"
            />
          )}
          {open && (
            <div className="flex gap-x-2 self-end">
              <Check
                onClick={headingHandler}
                className="dark:bg-black bg-gray-200 rounded-md cursor-pointer"
              />
              <X
                onClick={() => setOpen(false)}
                className="dark:bg-black bg-gray-200 rounded-md cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
