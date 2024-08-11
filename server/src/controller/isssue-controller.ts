import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { issueSchema } from "../schema/issue-schema";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";

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

  const isAMember = await prisma.team.findFirst({
    where: {
      projectId: projectId,
      members: {
        some: {
          id: req.user.id,
        },
      },
    },
  });
  if (!isAMember)
    throw new ApiError(401, "You are not a member of this project");

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
      projectId,
      columnId,
    },
  });
  if (issue) {
    res.status(201).json(issue);
  }
});

export async function getIssues(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const projectId = Number(req.params.projectId);
    if (!projectId)
      return res.status(400).json({ error: "Project Id is required" });
    const isAMember = await prisma.team.findFirst({
      where: {
        projectId: projectId,
        members: {
          some: {
            id: req.user.id,
          },
        },
      },
    });
    if (!isAMember)
      return res
        .status(400)
        .json({ error: "You are not a member of this project" });

    const issues = await prisma.issue.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        Column: true,
        assignee: true,
      },
    });
    if (issues) {
      res.status(200).json(issues);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function deleteIssue(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Issue ID is required" });

    const issue = await prisma.issue.delete({
      where: {
        id,
      },
    });
    if (issue) {
      res.status(200).json(issue);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function updateIssue(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Issue ID is required" });

    const result = issueSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const { title, description, projectId, columnId } = result.data;
    const issue = await prisma.issue.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        projectId,
        columnId,
      },
    });
    if (issue) {
      res.status(200).json(issue);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}
