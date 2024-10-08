import React, { useState } from "react";
import { Ellipsis, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogContent } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import IssueCard from "./issue-details-card";

interface MessagecardProps {
  issueTitle: string;
}

const Messagecard = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement> & MessagecardProps>(
  ({ issueTitle, ...props }, ref) => {
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
          className={`p-3 border-2 dark:bg-black group hover:bg-gray-200 dark:hover:bg-gray-900 rounded-md shadow-md cursor-pointer select-none ${props.className}`}
        >
          <div className="flex justify-between gap-3">
            <div className="flex relative">
              <Tooltip>
                <TooltipTrigger>
                  <p className="w-full text-left text-sm mr-6 group-hover:underline">{issueTitle}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{issueTitle}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Pencil size={15} className="self-end hidden group-hover:block ml-1 absolute right-0" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit Summaryr</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Ellipsis size={20} className="cursor-pointer self-start" />
          </div>
          <div className="flex justify-between py-3 items-center">
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="w-5 h-5">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>John Doe</p>
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
            <DialogTitle className="sr-only">{issueTitle}</DialogTitle>
            <DialogContent>
              <IssueCard />
            </DialogContent>
          </Dialog>
        )}
      </>
    );
  }
);

export default Messagecard;
