import { useComment } from "@/api/comments";
import { Comment } from "@/schema/schema";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";
import { Button } from "./ui/button";
interface CommentSectionProps {
  issueId: string;
}
export default function CommentSection({ issueId }: CommentSectionProps) {
  const { data, isLoading } = useComment(issueId);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="my-4 h-[600px] overflow-auto">
      {data?.length === 0 ? (
        <p>No comments</p>
      ) : (
        data?.map((comment) => (
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
      <p className="my-2 ml-3 rounded-xl bg-secondary px-2 py-2">
        {comment.content}
      </p>
      <Button
        variant={"link"}
        className="ml-4 h-4 w-fit px-0 text-sm font-thin underline"
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
  );
}
