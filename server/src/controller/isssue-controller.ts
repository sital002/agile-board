import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { issueSchema } from "../schema/issue-schema";

const prisma = new PrismaClient();
export async function createIssue(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const result = issueSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const { title, description, projectId, columnId } = result.data;
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
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getIssues(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });
    const projectId = Number(req.params.projectId);
    if (!projectId)
      return res.status(400).json({ error: "Project Id is required" });

    const issues = await prisma.issue.findMany({
      where: {
        projectId: projectId,
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
