import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const prisma = new PrismaClient();

export const getTeams = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.projectId || req.body.projectId;
  if (!projectId) throw new ApiError(400, "Project ID is required");

  const teams = await prisma.team.findFirst({
    where: {
      projectId,
    },
    include: {
      members: true,
    },
  });
  return res
    .status(200)
    .json(new ApiResponse("Teams fetched successfully", teams || []));
});

export const deleteTeam = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) throw new ApiError(400, "Team ID is required");

  const team = await prisma.team.delete({
    where: {
      id,
    },
  });
  if (!team) throw new ApiError(500, "Failed to delete team");
  return res
    .status(200)
    .json(new ApiResponse("Team deleted successfully", team));
});

export const updateTeamMembers = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const id = req.params.projectId;
    const { email } = req.body;
    if (!email) throw new ApiError(400, "Email is required");
    const memberExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!memberExists) throw new ApiError(404, "Member not found");

    const project = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        creator: true,
      },
    });
    if (!project) throw new ApiError(404, "Project not found");
    if (project.creator.id !== req.user.id)
      throw new ApiError(400, "Unauthorized");
    const team = await prisma.team.update({
      where: {
        projectId: id,
      },
      data: {
        members: {
          connect: {
            id: memberExists.id,
          },
        },
      },
    });
    if (!team) throw new ApiError(500, "Failed to add member to team");
    return res.status(200).json(new ApiResponse("Member added", team));
  }
);

export const removeTeammember = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.projectId;
    if (!req.user) throw new ApiError(400, "You are not logged in");
    if (!id) throw new ApiError(400, "Project ID is required");
    const { member } = req.body;
    if (!member) throw new ApiError(400, "Member is required");

    const project = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        creator: true,
      },
    });
    if (!project) throw new ApiError(404, "Project not found");
    if (project.creator.id !== req.user.id)
      throw new ApiError(400, "Unauthorized");

    const teamExists = await prisma.team.findFirst({
      where: {
        projectId: id,
      },
      select: {
        members: true,
      },
    });
    if (!teamExists) throw new ApiError(404, "Team not found");
    const alreadyMember = teamExists.members.find(
      (value) => value.id === member
    );

    if (!alreadyMember) throw new ApiError(400, "You aren't  a team member");

    const team = await prisma.team.update({
      where: {
        projectId: id,
      },
      data: {
        members: {
          delete: {
            id: member,
          },
        },
      },
    });
    if (!team) throw new ApiError(500, "Failed to remove member from team");
    return res.status(200).json(new ApiResponse("Member removed", team));
  }
);
