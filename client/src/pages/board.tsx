import Header from "../components/header";
import Filterbar from "../components/filterbar";
import Column from "../components/column";
import { Check, Plus, X } from "lucide-react";
import { Input } from "../components/ui/input";
import React, { useEffect, useRef, useState } from "react";

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
    setTitle('')
  };

  useEffect(()=>{
    divRef.current?.scrollTo(divRef.current.scrollWidth,0)
  },[open,title])

  return (
    <div className="w-full px-8 overflow-hidden">
      <Header />
      <Filterbar />
      <div className="flex">
        <div
          ref={divRef}
          className="flex gap-x-3 w-full  overflow-x-scroll h-[600px] overflow-y-scroll p-4 "
        >
          {column.map((ele, index) => {
            return <Column key={index} title={ele} />;
          })}
          {open && (
            <div className="relative">
              <Input
                onChange={changeHandler}
                value={title}
                className="min-w-[300px] text-black"
              />
              <div className="flex items-center absolute left-[75%] gap-x-2 p-2">
                <Check
                  onClick={approveHandler}
                  size={30}
                  className="cursor-pointer bg-gray-700 rounded-md p-1"
                />
                <X
                  onClick={() => {
                    setOpen(false), setTitle("");
                  }}
                  size={30}
                  className="cursor-pointer bg-gray-700 rounded-md p-1"
                />
              </div>
            </div>
          )}
          <Plus
            onClick={clickHandler}
            size={40}
            strokeWidth={0.9}
            className="min-w-[40px] cursor-pointer bg-gray-700 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Board;
