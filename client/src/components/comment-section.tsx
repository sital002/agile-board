import { updateComment, useComment } from "@/api/comments";
import { Comment } from "@/schema/schema";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface CommentSectionProps {
  issueId: string;
}
export default function CommentSection({ issueId }: CommentSectionProps) {
  const { data, isLoading } = useComment(issueId);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="my-4 h-[600px] overflow-auto">
      {data && data.length === 0 ? (
        <p>No comments</p>
      ) : (
        data &&
        data.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}
    </div>
  );
}

interface CommentCardProps {
  comment: Comment;
}
function CommentCard({ comment }: CommentCardProps) {
  const [editCommentToggle, setEditCommentToggle] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      updateComment({
        commentId: comment.id,
        content: commentContent,
        issueId: comment.issueId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.issueId],
      });
      setEditCommentToggle(false);
    },
  });
  const handleEditComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate();
  };
  return (
    <div className="my-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={comment.author?.profile_image_url || ""}
            alt={comment.author?.display_name || ""}
          />
          <AvatarFallback>
            {comment.author?.display_name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-medium">{comment.author.display_name}</p>
        <p className="text-sm font-thin">
          {moment(comment.createdAt).fromNow()}
        </p>
      </div>
      <div className="my-2 ml-3 px-2">
        {editCommentToggle ? (
          <>
            <form onSubmit={handleEditComment}>
              <Input
                value={commentContent}
                onChange={(e) => setCommentContent(e.currentTarget.value)}
              />
              <Button
                className="my-2 ml-2 bg-secondary-foreground"
                size={"sm"}
                disabled={!commentContent.trim().length}
              >
                Save
              </Button>
              <Button
                size={"sm"}
                className="my-2 ml-2 bg-secondary-foreground"
                onClick={() => {
                  setEditCommentToggle(false);
                  setCommentContent(comment.content);
                }}
              >
                Discard changes
              </Button>
            </form>
          </>
        ) : (
          <div>
            <p className="rounded-xl bg-secondary px-2 py-2">
              {comment.content}
            </p>
            <Button
              variant={"link"}
              className="ml-4 h-4 w-fit px-0 text-sm font-thin underline"
              onClick={() => setEditCommentToggle(true)}
            >
              Edit
            </Button>
            <Button
              variant={"link"}
              className="ml-2 h-4 w-fit px-0 text-sm font-thin underline"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
