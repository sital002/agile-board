import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { issueSchema } from "../schema/issue-schema";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const prisma = new PrismaClient();

export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");
  const result = issueSchema.safeParse(req.body);
  if (!result.success) {
    throw new ApiError(400, "Invalid request body");
  }
  const { title, description, projectId, columnId } = result.data;

  const issue = await prisma.issue.create({
    data: {
      columnId,
      title,
      description,
      projectId,
    },
  });
  return res
    .status(201)
    .json(new ApiResponse("Issue created successfully", issue));
});

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");
  const projectId =
    req.user.currentProjectId || req.params.projectId || req.body.projectId;
  if (!projectId) throw new ApiError(400, "Project Id is required");

  const issues = await prisma.issue.findMany({
    where: {
      projectId,
    },
    include: {
      column: true,
      assignee: true,
    },
  });
  if (!issues) throw new ApiError(404, "No issues found");

  return res
    .status(200)
    .send(new ApiResponse("Issues retrieved successfully", issues));
});

export const getIssuesByAssignee = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");
  const assigneeId = req.params.assigneeId;
  if (!assigneeId) throw new ApiError(400, "Assignee ID is required");

  const issues = await prisma.issue.findMany({
    where: {
      assigneeId,
    },
    include: {
      column: true,
      assignee: true,
    },
  });
  if (!issues) throw new ApiError(404, "No issues found");

  return res
    .status(200)
    .send(new ApiResponse("Issues retrieved successfully", issues));
});

export const deleteIssue = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Issue ID is required");

  const issue = await prisma.issue.delete({
    where: {
      id,
    },
  });
  if (!issue) throw new ApiError(500, "Failed to delete issue");
  return res.status(200).json(new ApiResponse("Issue deleted successfully"));
});

export const updateIssue = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");
  const id = req.params.issueId || req.body.issueId;
  if (!id) throw new ApiError(400, "Issue ID is required");

  const result = issueSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const { title, description, assigneeId, columnId } = result.data;
  if (assigneeId) {
    const isValidAssignee = await prisma.user.findUnique({
      where: {
        id: assigneeId,
      },
    });
    if (!isValidAssignee) throw new ApiError(400, "Invalid assignee ID");
  }
  const issue = await prisma.issue.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      columnId: columnId,
      assigneeId: assigneeId || null,
    },
  });
  if (!issue) throw new ApiError(500, "Failed to update issue");
  return res
    .status(200)
    .json(new ApiResponse("Issue updated successfully", issue));
});

export const updateAssignee = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const issueId = req.params.issueId || req.body.issueId;
    if (!issueId) throw new ApiError(400, "Issue ID is required");

    const { assigneeId } = req.body;
    if (!assigneeId) throw new ApiError(400, "Assignee ID is required");
    const issue = await prisma.issue.update({
      where: {
        id: issueId,
      },
      data: {
        assigneeId,
      },
    });
    if (!issue) throw new ApiError(404, "Issue not found");
    return res
      .status(200)
      .json(new ApiResponse("Assignee updated successfully", issue));
  }
);

export const getSingleIssue = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const id = req.params.issueId || req.body.issueId;
    if (!id) throw new ApiError(400, "Issue ID is required");
    const issue = await prisma.issue.findUnique({
      where: {
        id,
      },
      include: {
        column: true,
        assignee: true,
        comments: true,
      },
    });
    if (!issue) throw new ApiError(404, "Issue not found");
    return res
      .status(200)
      .json(new ApiResponse("Issue retrieved successfully", issue));
  }
);
