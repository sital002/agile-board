import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { issueSchema } from "../schema/issue-schema";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";

const prisma = new PrismaClient();

export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(400).json({ error: "Unauthorized" });
    return;
  }
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
  return res.status(201).json(issue);
});

export const getIssues = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "Unauthorized");
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
    .json(new ApiResponse("Issues retrieved successfully", issues));
  // return new ApiResponse(200, "", issues).send();
});

export async function deleteIssue(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Issue ID is required" });

    const issue = await prisma.issue.delete({
      where: {
        id,
      },
    });
    return res.status(200).json(new ApiResponse("Issue deleted successfully"));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function updateIssue(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const id = req.params.issueId || req.body.issueId;
    if (!id) return res.status(400).json({ error: "Issue ID is required" });

    const result = issueSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const { title, description, assigneeId } = result.data;
    if (assigneeId) {
      const isValidAssignee = await prisma.user.findUnique({
        where: {
          id: assigneeId,
        },
      });
      if (!isValidAssignee)
        return res.status(400).json({ error: "Invalid assignee ID" });
    }
    const issue = await prisma.issue.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        assigneeId: assigneeId || null,
      },
    });
    if (!issue) return res.status(404).json({ error: "Issue not found" });
    return res.status(200).json(issue);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

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
      },
    });
    if (!issue) throw new ApiError(404, "Issue not found");
    return res
      .status(200)
      .json(new ApiResponse("Issue retrieved successfully", issue));
  }
);
