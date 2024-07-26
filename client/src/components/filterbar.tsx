import { ChartSpline, Settings2, UserPlus } from "lucide-react";
import SelectOption from "./select";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Filterbar = () => {
  return (
    <div className="flex items-center justify-between py-8 select-none sticky left-0 top-0">
      <div className="w-full max-w-[40%] flex justify-between">
        <div className="flex items-center justify-between w-full max-w-[60%]">
          <Input className="w-full max-w-[90%]" placeholder="Search" />
          <div className="flex relative items-center">
            {Array(4)
              .fill(null)
              .map((_, index) => {
                return (
                  <Avatar
                    style={{ left: index * 35 }}
                    key={index}
                    className={`absolute cursor-pointer`}
                  >
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                );
              })}
          </div>
        </div>
        <UserPlus
          size={60}
          fill="white"
          strokeWidth={0.8}
          className="cursor-pointer self-start p-3 hover:bg-gray-700 rounded-full "
        />
      </div>

      <div className="flex items-center gap-x-4">
        <SelectOption />
        <ChartSpline
          size={40}
          className="cursor-pointer hover:bg-gray-700 rounded-md p-1"
        />
        <Settings2
          size={40}
          className="cursor-pointer hover:bg-gray-700 rounded-md p-1"
        />
      </div>
    </div>
  );
};

export default Filterbar;
