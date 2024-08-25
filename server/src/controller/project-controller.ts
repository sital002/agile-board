import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { projectSchema } from "../schema/project-schema";
import prisma from "../db/prisma";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const result = projectSchema.safeParse(req.body);
    if (!result.success)
      throw new ApiError(400, result.error.errors[0].message);

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
    if (!project) throw new ApiError(500, "Failed to create project");
    if (project && user) {
      logger("Project created successfully");
      res
        .status(201)
        .json(new ApiResponse("Project created successfully", project));
    }
  }
);

export const getAllProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await prisma.project.findMany();
    res
      .status(200)
      .json(new ApiResponse("Projects fetched successfully", projects));
  }
);
export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");

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

  return res
    .status(200)
    .json(new ApiResponse("Projects fetched successfully", projects));
});
export const getProjectById = asyncHandler(
  async (req: Request, res: Response) => {
    const projectId = req.params.projectId || req.body.projectId;
    if (!projectId) throw new ApiError(400, "Project ID is required");

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) throw new ApiError(404, "Project not found");
    return res.status(200).json(new ApiResponse("Project fetched", project));
  }
);

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
    return res
      .status(200)
      .json(new ApiResponse("Project deleted successfully"));
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
  return res.status(200).json(new ApiResponse("Project updated successfully"));
});
