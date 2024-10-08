import { Check, Eye, Menu, Paperclip, Share, ThumbsUp } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/utils/api";
import type { Comment, Issue } from "@/schema/schema";
import { Textarea } from "./ui/text-area";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useUser } from "@/hooks/useUser";
import { useState } from "react";
import { useTeams } from "@/api/team";
import CommentSection from "./comment-section";
import moment from "moment";

type IssueCardProps = {
  id: string;
};

async function getIssue(id: string) {
  const result = await API.get(`/api/issues/single/${id}`);
  return result.data.data as Issue & { comments: Comment[] };
}
const IssueCard = ({ id }: IssueCardProps) => {
  const { user } = useUser();

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["issues", id],
    queryFn: () => getIssue(id),
  });
  const [comment, setComment] = useState("");
  const mutation = useMutation({
    mutationFn: () => {
      return API.post(`/api/comments/new`, {
        content: comment,
        issueId: id,
      });
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["comments", id],
      });
      setComment("");
    },
  });

  function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!comment.trim()) return;
    mutation.mutate();
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-6 pr-7">
          <Eye size={20} />
          <ThumbsUp size={20} />
          <Share size={20} />
          <Menu size={20} />
        </div>
      </div>
      <div className="flex">
        <div className="w-full p-3">
          <div className="my-4">
            <h1 className="text-lg font-medium">{data?.title}</h1>
            <div className="my-4 flex gap-x-3">
              <Button
                className="flex gap-x-3"
                size={"sm"}
                variant={"secondary"}
              >
                <Paperclip size={16} />
                Attach
              </Button>
            </div>
          </div>

          <div className="my-4">
            <h1 className="my-2 font-normal">Description</h1>
            {data?.description && <p>{data.description}</p>}
            <Textarea
              className="w-full"
              defaultValue={data?.description}
              placeholder="Add a description"
            />
          </div>
          <div>
            <h1>Activity</h1>
            <div className="my-4 flex items-center gap-x-2">
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
                  src={user?.profile_image_url || ""}
                  alt={user?.display_name || ""}
                />
                <AvatarFallback>
                  {user?.display_name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <form onSubmit={addComment} className="w-full">
                <Input
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                />
              </form>
            </div>
          </div>
          <div>
            <CommentSection issueId={id} />
          </div>
        </div>

        <div className="mt-4 w-full max-w-[40%] p-3 text-lg">
          <>
            <div className="flex justify-between text-lg">
              <p>Assignee</p>
              {data && <AssigneeCard issue={data} />}
            </div>
            <div className="my-3 flex items-center justify-between text-lg">
              <p>{"Label"}</p>
              <p>{""}</p>
            </div>
            <div className="my-3 flex items-center justify-between text-lg">
              <p>{"Start Date"}</p>
              <p>{moment(data?.createdAt).format("MMMM Do YYYY")}</p>
            </div>
            <div className="my-3 flex items-center justify-between text-lg">
              <p>{"Due Date"}</p>
              {/* <p>
                {data && data?.dueDate
                  ? new Date(data.dueDate).toLocaleDateString()
                  : new Date(data!.createdAt).toLocaleDateString()}
              </p> */}
              <DatePicker />
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default IssueCard;

interface AssigneeCardProps {
  issue: Issue;
}

function AssigneeCard({ issue }: AssigneeCardProps) {
  const { user } = useUser();
  const [value, setValue] = useState(issue.assigneeId || "");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useTeams(user!.currentProjectId || "");

  const mutation = useMutation({
    mutationFn: (data: Issue) =>
      API.put(`/api/issues/${issue.id}`, {
        ...data,
        assigneeId: value,
      }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["issues"],
      });
      setOpen(false);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="flex cursor-pointer items-center gap-x-2"
          role="combobox"
          aria-expanded={open}
        >
          <Avatar>
            <AvatarImage
              src={issue.assignee?.profile_image_url || ""}
              alt={issue.assignee?.display_name}
            />
            <AvatarFallback className="uppercase">
              {issue.assignee?.display_name
                ? issue.assignee?.display_name.slice(0, 2)
                : "UN"}
            </AvatarFallback>
          </Avatar>
          <p>{issue.assigneeId ? issue.assignee?.display_name : "Assign"}</p>
        </div>
      </PopoverTrigger>
      <>
        <PopoverContent className="mr-10 w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search member..." />
            <CommandList>
              <CommandEmpty>No member found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setValue("");
                    console.log(issue, "tkdf");
                    mutation.mutate({
                      ...issue,
                      assigneeId: "",
                    });
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === "" ? "opacity-100" : "opacity-0",
                    )}
                  />
                  Unassign
                </CommandItem>
                {data && data?.length > 0
                  ? data.map((member) => (
                      <CommandItem
                        key={member.display_name}
                        value={member.id}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          console.log(issue, "tkdf");

                          mutation.mutate({
                            ...issue,
                            assigneeId:
                              currentValue === value ? "" : currentValue,
                          });
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === member.id ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {member.display_name}
                      </CommandItem>
                    ))
                  : null}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </>
    </Popover>
  );
}

export function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={() => {
            setOpen(false);
            setDate(date);
          }}
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  );
}
