import { Ellipsis } from "lucide-react";
import Messagecard from "./message-card";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

type Title = {
  id: string;
  title: string;
  user: string;
};

const Column = ({ id, title }: { id: number; title: Title[] }) => {
  const [open, setOpen] = useState<boolean>(false);

  // const issues = [
  //   {
  //     id:' 1',
  //     title: "Create navbar component",
  //     user: "Sora",
  //   },
  //   {
  //     id: '2',
  //     title: "Create Sidebar component",
  //     user: "Nora",
  //   },
  //   {
  //     id:'3',
  //     title: "Create dashboard component",
  //     user: "Dora",
  //   },
  // ];

  return (
    <Droppable droppableId={`${id}`}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          style={{ backgroundColor: snapshot.isDraggingOver ? "grey" : "" }}
          ref={provided.innerRef}
          className="border-2 border-gray-500 h-fit min-w-[200px] max-w-[300px] rounded-sm p-1 relative"
        >
          <div className="flex justify-between items-center">
            <h1 className="p-4 text-md font-semibold">{"title"}</h1>
            <Ellipsis
              onClick={() => setOpen(!open)}
              className="cursor-pointer mr-2"
            />
          </div>
          {open && (
            <div className="w-full max-w-[30%] p-3 absolute left-[68%] top-[6%] dark:bg-gray-700 bg-white rounded-md border-2 border-gray-700 shadow-md">
              <p className="cursor-pointer select-none">Delete</p>
            </div>
          )}
          <div className="flex flex-col gap-y-2">
            {title.map((issue, index) => (
              <Draggable key={issue.id} draggableId={issue.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Messagecard issueTitle={issue.title} user={issue.user} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
