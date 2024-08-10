import { TeamTable } from "@/components/team-list-table";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";

const demoData = ["first", "second", "third", "fourth"];

const Team = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [search]);

  return (
    <div className="w-full p-3">
      <Input
        value={search}
        onChange={changeHandler}
        className="max-w-sm mt-4"
        placeholder="Search member"
      />
      {open && (
        <div className="max-w-sm mb-3 border-2 rounded-md p-2">
          {demoData.map((ele, index) => {
            return <p key={index}>{ele}</p>;
          })}
        </div>
      )}
      <TeamTable />
    </div>
  );
};

export default Team;
