import type { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db/prisma";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";

export const isProjectCreator = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "You are not loggedin");

    const projectId = req.params.projectId || req.body.projectId;
    if (!projectId) throw new ApiError(400, "Project ID is required");
    if (isNaN(parseInt(projectId))) {
      throw new ApiError(400, "Project Id must be number");
    }

    const projectCreator = await prisma.project.findUnique({
      where: {
        id: parseInt(projectId),
      },
    });
    if (!projectCreator) throw new ApiError(404, "Project not found");
    if (projectCreator.creatorId !== req.user.id)
      throw new ApiError(401, "You are not the creator of this project");
    next();
  }
);

export const isProjectMember = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) throw new ApiError(400, "You aren't logged in");
    const projectId = req.params.projectId || req.body.projectId;

    if (!projectId) throw new ApiError(400, "Project Id is required");
    if (isNaN(parseInt(projectId))) {
      throw new ApiError(400, "Project Id must be number");
    }
    const members = await prisma.team.findFirst({
      where: {
        projectId: parseInt(projectId),
        AND: {
          members: {
            some: {
              id: req.user.id,
            },
          },
        },
      },
    });
    if (!members)
      throw new ApiError(400, "You are not the member of the project");
    next();
  }
);
