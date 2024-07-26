import { Ellipsis } from "lucide-react";
import Messagecard from "./message-card";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ id, title }: { id: number; title: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Droppable droppableId={`droppable-${id}`}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          style={{ backgroundColor: snapshot.isDraggingOver ? 'grey' : '' }}
          ref={provided.innerRef}
          className="border-2 border-gray-500 h-fit min-w-[450px] max-w-[450px] rounded-sm p-1 relative"
        >
          <div className="flex justify-between items-center">
            <h1 className="p-4 text-xl font-semibold">{title}</h1>
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
            {Array(5)
              .fill(null)
              .map((_, index) => {
                return (
                  <Draggable
                    key={index}
                    draggableId={`draggable-${id}-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Messagecard />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
