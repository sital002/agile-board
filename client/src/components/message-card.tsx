import React, { useState } from "react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import IssueCard from "./issue-details-card";
import { Issue } from "@/schema/schema";

interface MessagecardProps {
  issue: Issue;
}

const Messagecard = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement> & MessagecardProps
>(({ issue, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  function handleOpenIssue() {
    setOpen(true);
  }

  return (
    <>
      <Card
        onClick={handleOpenIssue}
        ref={ref}
        {...props}
        className={`group cursor-pointer select-none rounded-md p-3 shadow-md hover:bg-secondary ${props.className}`}
      >
        <div className="flex justify-between gap-3">
          <div className="relative flex">
            <Tooltip>
              <TooltipTrigger>
                <p className="mr-6 w-full text-left text-sm group-hover:underline">
                  {issue.title}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{issue.title}</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Pencil
                  size={15}
                  className="absolute right-0 ml-1 hidden self-end group-hover:block"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Summary</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="flex items-center justify-between py-3">
          <Tooltip>
            <TooltipTrigger>
              {issue.assignee === null ? (
                <Avatar className="h-5 w-auto">
                  <AvatarFallback className="uppercase">UN</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-5 w-auto">
                  <AvatarImage src={issue?.assignee?.profile_image_url || ""} />
                  <AvatarFallback className="uppercase">
                    {issue?.assignee?.display_name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {issue.assignee ? issue.assignee.display_name : "Unassigned"}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </Card>
      {open && (
        <Dialog
          open={open}
          onOpenChange={() => {
            setOpen(false);
          }}
        >
          <DialogTitle className="sr-only">{issue.title}</DialogTitle>
          <DialogContent className="h-[600px] overflow-y-scroll">
            <IssueCard id={issue.id} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
});

export default Messagecard;
