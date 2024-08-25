import z from "zod";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { Request, Response } from "express";
import prisma from "../db/prisma";
import { ApiResponse } from "../utils/ApiResponse";

const replySchema = z.object({
  content: z.string().min(1),
  issueId: z.string(),
  commentId: z.string(),
});

export const createReply = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");

  const result = replySchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const validCommentId = await prisma.comment.findUnique({
    where: {
      id: result.data.commentId,
    },
  });
  if (!validCommentId) throw new ApiError(404, "Invalid comment Id");
  const newReply = await prisma.reply.create({
    data: {
      content: result.data.content,
      commentId: result.data.commentId,
      authorId: req.user.id,
    },
  });
  if (!newReply) throw new ApiError(500, "Failed to reply to comment");
  return res
    .status(201)
    .json(new ApiResponse("Reply created successfully", newReply));
});

export const getReplies = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");

  const commentId = req.params.commentId;
  const replies = await prisma.reply.findMany({
    where: {
      commentId,
    },
  });
  if (!replies) throw new ApiError(404, "No replies found");
  return res
    .status(200)
    .json(new ApiResponse("Replies retrieved successfully", replies));
});

export const updateReply = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");

  const result = replySchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const replyId = req.params.replyId || req.body.replyId;
  const updatedReply = await prisma.reply.update({
    where: {
      id: replyId,
    },
    data: {
      content: result.data.content,
    },
  });
  if (!updatedReply) throw new ApiError(500, "Failed to update reply");
  return res
    .status(200)
    .json(new ApiResponse("Reply updated successfully", updatedReply));
});

export const deleteReply = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");

  const replyId = req.params.replyId;
  const deletedReply = await prisma.reply.delete({
    where: {
      id: replyId,
    },
  });
  if (!deletedReply) throw new ApiError(500, "Failed to delete reply");
  return res.status(200).json(new ApiResponse("Reply deleted successfully"));
});
