import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { projectSchema } from "../schema/project-schema";
import prisma from "../db/prisma";

export async function createProject(req: Request, res: Response) {
  try {
    const result = projectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    if (!req.user) return res.status(400).json({ error: "Unauthorized" });

    const project = await prisma.project.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        creatorId: req.user.id,
        team: {
          create: {
            members: {
              connect: {
                id: req.user.id,
              },
            },
          },
        },
      },
    });
    if (project) {
      logger("Project created successfully");
      res.status(201).json(project);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getAllProjects(_req: Request, res: Response) {
  try {
    const projects = await prisma.project.findMany();

    if (projects) {
      logger("Projects fetched successfully");
      res.status(200).json(projects);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}
export async function getProjects(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unathorized" });

    const projects = await prisma.project.findMany({
      where: {
        team: {
          members: {
            some: {
              id: req.user.id,
            },
          },
        },
      },
      include: {
        creator: true,
      },
    });

    if (projects) {
      logger("Projects fetched successfully");
      return res.status(200).json(projects);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const projectId = req.params.projectId || req.body.projectId;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (project) {
      logger("Project fetched successfully");
      res.status(200).json(project);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unathorized" });
    const projectId = req.params.projectId || req.body;
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    if (project) {
      res.status(200).json(project);
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(500).json({ error: "An error occurred" });
  }
}
