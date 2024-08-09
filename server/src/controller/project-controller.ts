import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { projectSchema } from "../schema/project-schema";
const prisma = new PrismaClient();

export async function createProject(req: Request, res: Response) {
  try {
    const result = projectSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    if (!req.user) return res.status(400).json({ error: "Unathorized" });

    const project = await prisma.project.create({
      data: {
        userId: req.user.id,
        name: result.data.name,
        description: result.data.description,
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

export async function getProjects(_: Request, res: Response) {
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

export async function getProjectById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Project ID is required" });
    }
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Project ID must be a number" });
    }
    const project = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
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
