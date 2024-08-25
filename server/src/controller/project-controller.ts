import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { projectSchema } from "../schema/project-schema";
import prisma from "../db/prisma";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

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
        columns: {
          createMany: {
            data: [
              { name: "To Do" },
              { name: "In Progress" },
              { name: "Done" },
            ],
          },
        },
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
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        currentProjectId: project.id,
      },
    });
    if (project && user) {
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

    if (!project) return res.status(404).json({ error: "Project not found" });
    return res.status(200).json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "Unauthorized");
    const projectId = req.params.projectId || req.body.projectId;
    if (!projectId) throw new ApiError(400, "Project ID is required");
    if (req.user.currentProjectId === projectId)
      throw new ApiError(400, "Cannot delete current project");

    const project = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    if (!project) throw new ApiError(404, "Project not found");
    return new ApiResponse(200, "Project deleted successfully").send();
  }
);

export const editProject = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "Unauthorized");
  const result = projectSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const projectId = req.params.projectId || req.body.projectId;
  if (!projectId) throw new ApiError(400, "Project ID is required");
  const updatedProject = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name: result.data.name,
      description: result.data.description,
    },
  });
  if (!updatedProject) throw new ApiError(404, "Project not found");
  return new ApiResponse(200, "Project updated successfully").send();
});
