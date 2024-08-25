import e, { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import z from "zod";
import prisma from "../db/prisma";
import { ApiResponse } from "../utils/ApiResponse";

const commentSchema = z.object({
  content: z.string().min(1),
  issueId: z.string(),
});
export const createComment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "You are not logged in");

    const result = commentSchema.safeParse(req.body);
    if (!result.success)
      throw new ApiError(400, result.error.errors[0].message);

    const validIssue = await prisma.issue.findUnique({
      where: {
        id: result.data.issueId,
      },
    });
    if (!validIssue) throw new ApiError(404, "Invalid issue Id");
    const newComment = await prisma.comment.create({
      data: {
        content: result.data.content,
        issueId: result.data.issueId,
        authorId: req.user.id,
      },
    });
    if (!newComment) throw new ApiError(500, "Failed to create comment");
    res
      .status(201)
      .json(new ApiResponse("Comment created successfully", newComment));
  }
);

export const getComments = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(401, "You are not logged in");

  const issueId = req.params.issueId;
  const comments = await prisma.comment.findMany({
    where: {
      issueId,
    },
    include: {
      replies: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!comments) throw new ApiError(404, "No comments found");
  return res
    .status(200)
    .json(new ApiResponse("Comments retrieved successfully", comments));
});

export const updateComment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "You are not logged in");

    const result = commentSchema.safeParse(req.body);
    if (!result.success)
      throw new ApiError(400, result.error.errors[0].message);
    const commentId = req.params.commentId || req.body.commentId;

    const comment = await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content: result.data.content,
      },
    });
    if (!comment) throw new ApiError(500, "Failed to update comment");
    return res
      .status(200)
      .json(new ApiResponse("Comment updated successfully", comment));
  }
);

export const deleteComment = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "You are not logged in");

    const commentId = req.params.commentId || req.body.commentId;
    const deletedComment = await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    if (!deletedComment) throw new ApiError(500, "Failed to delete comment");
    return res
      .status(200)
      .json(new ApiResponse("Comment deleted successfully", deletedComment));
  }
);
