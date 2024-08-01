import {
  Eye,
  Link,
  Menu,
  Paperclip,
  Share,
  ThumbsUp,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { detailsList } from "../constant/navlist";

const IssueCard = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2 items-center">
          <Checkbox />
          <p>John</p>
        </div>
        <div className="flex gap-x-6 pr-7">
          <Eye />
          <ThumbsUp />
          <Share />
          <Menu />
        </div>
      </div>
      <div className="flex">
        <div className="w-full p-3">
          <div className="my-4">
            <h1 className="font-semibold text-2xl">John Doe</h1>
            <div className="flex gap-x-3 my-4">
              <Button className="flex gap-x-3" variant={"secondary"}>
                <Paperclip />
                Attach
              </Button>
              {/* <Button className="flex gap-x-3" variant={"secondary"}>
                <BadgeAlert />
                Add a Child Issue
              </Button> */}
              <Button className="flex gap-x-3" variant={"secondary"}>
                <Link />
                Link Issue
              </Button>
            </div>
          </div>
          <div className="my-4">
            <h1 className="font-semibold">Description</h1>
            <p className="opacity-70">Add a description</p>
          </div>
          <div>
            <h1>Activity</h1>
            <div className="flex gap-x-2 items-center my-4">
              <span>Show:</span>
              <Button variant={"secondary"}>All</Button>
              <Button variant={"secondary"}>Comments</Button>
              <Button variant={"secondary"}>History</Button>
              <Button variant={"secondary"}>Work Log</Button>
              <Button variant={"secondary"}>Approvals</Button>
            </div>
            <div className="flex items-center gap-x-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Input className="h-[50px]" placeholder="Add a comment" />
            </div>
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-[40%] mt-4 p-3 text-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent className="flex justify-between text-lg">
              <p>Assignee</p>
              <div className="flex items-center gap-x-3">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>Assign to me</p>
              </div>
            </AccordionContent>

            <AccordionContent className="flex items-center justify-between text-lg">
              <p>Reporter</p>
              <div className="flex items-center gap-x-3">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>John doe</p>
              </div>
            </AccordionContent>

            {detailsList.map((ele, index) => {
              return (
                <AccordionContent key={index} className="flex items-center justify-between text-lg">
                  <p>{ele.name}</p>
                  <p>{ele.value}</p>
                </AccordionContent>
              );
            })}
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default IssueCard;
