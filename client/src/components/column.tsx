import Messagecard from "./message-card";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import TitleDropdown from "./title-dropdown";
import { Input } from "./ui/input";
import { TaskType } from "../pages/board";
import { Button } from "./ui/button";
import React, { useEffect, useState } from "react";

interface ColumnProps {
  id: number;
  issue: TaskType[];
  tasks: TaskType[][];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[][]>>;
}

const Column = ({ id, issue, tasks, setTasks }: ColumnProps) => {
  const [open, setOpen] = useState(false);
  const [newIssue, setNewIssue] = useState("");

  const clickHandler = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const addTaskHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    if (newIssue.length === 0) return setOpen(false);
    const newTask: TaskType = {
      id: Math.random().toString(),
      title: newIssue,
      user: "",
    };
    console.log(tasks);
    tasks[index].push(newTask);
    console.log(tasks);
    setTasks([...tasks]);
    setNewIssue("");
    setOpen(false);
  };

  const closeHandler = () => {
    if (open) {
      setOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", closeHandler);
    return () => window.removeEventListener("click", closeHandler);
  }, [open]);

  console.log("issdu", issue);

  return (
    <Droppable key={id} droppableId={`${id}`}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          style={{ backgroundColor: snapshot.isDraggingOver ? "grey" : "" }}
          ref={provided.innerRef}
          className="border-2 border-gray-500 h-fit min-w-[300px]  rounded-sm p-1 relative"
        >
          <TitleDropdown
            setTasks={setTasks}
            tasks={tasks}
            issue={issue}
            index={id}
          />

          <div className="flex flex-col gap-y-2">
            {issue.map((issue, index) => (
              <Draggable key={issue.id} draggableId={issue.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {issue.title && (
                      <Messagecard issueTitle={issue.title} user={issue.user} />
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {!open && (
              <p
                onClick={clickHandler}
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
                  onChange={(e) => setNewIssue(e.target.value)}
                  value={newIssue}
                  className="rounded-none border-none focus:outline-none "
                  placeholder="enter your issue.."
                />
                <Button
                  disabled={newIssue.trim().length === 0}
                  onClick={(e) => addTaskHandler(e, id)}
                  className="w-fit self-end"
                  variant={"secondary"}
                  size={"sm"}
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
