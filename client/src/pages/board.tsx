import Header from "../components/header";
import Filterbar from "../components/filterbar";
import Column from "../components/column";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Board = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState<string[]>([]);
  const divRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    setOpen(true);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const approveHandler = () => {
    setColumn([...column, title]);
    setOpen(false);
    setTitle("");
  };

  useEffect(() => {
    divRef.current?.scrollTo(divRef.current.scrollWidth, 0);
  }, [open, title]);

  const dragHandler = (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(column);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumn(items);
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <div className="w-full px-8 overflow-hidden">
        <Header />
        <Filterbar />
        <div className="flex">
          <div
            ref={divRef}
            className="flex gap-x-3 w-full overflow-x-scroll h-[600px] overflow-y-scroll p-4"
          >
            {column.map((ele, index) => {
              return <Column id={index} key={index} title={ele} />;
            })}
            {open && (
              <div className="relative">
                <Input
                  onChange={changeHandler}
                  value={title}
                  className="min-w-[300px]"
                />
                <div className="flex items-center absolute left-[75%] gap-x-2 p-2">
                  <Check
                    onClick={approveHandler}
                    size={30}
                    className="cursor-pointer dark:bg-gray-700 bg-gray-200 rounded-md p-1"
                  />
                  <X
                    onClick={() => {
                      setOpen(false);
                      setTitle("");
                    }}
                    size={30}
                    className="cursor-pointer dark:bg-gray-700 bg-gray-200 rounded-md p-1"
                  />
                </div>
              </div>
            )}
            <Plus
              onClick={clickHandler}
              size={40}
              strokeWidth={0.9}
              className="min-w-[40px] cursor-pointer dark:bg-gray-700 bg-gray-200 rounded-md"
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
