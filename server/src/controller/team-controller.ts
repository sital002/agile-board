import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getTeams(req: Request, res: Response) {
  try {
    const projectId = req.params.projectId || req.body.projectId;
    if (!projectId)
      return res.status(400).json({ error: "Project ID is required" });

    const teams = await prisma.team.findFirst({
      where: {
        projectId,
      },
      include: {
        members: true,
      },
    });
    if (teams) {
      return res.status(200).json(teams.members);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function deleteTeam(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Team IDj is required" });

    const team = await prisma.team.delete({
      where: {
        id,
      },
    });
    if (team) {
      return res.status(200).json(team);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function updateTeamMembers(req: Request, res: Response) {
  try {
    if (!req.user)
      return res.status(400).json({ error: "You arenot loggedin" });
    const id = req.params.projectId;
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Members are required" });
    const memberExists = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!memberExists)
      return res.status(400).json({ error: "Member does not exist" });

    const project = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        creator: true,
      },
    });
    if (project?.creator.id !== req.user.id) {
      return res.status(400).json({ error: "You aren't the creator" });
    }
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
    if (team) {
      return res.status(200).json(team);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}

export async function removeTeammember(req: Request, res: Response) {
  try {
    const id = req.params.projectId;

    const { member } = req.body;
    if (!member) return res.status(400).json({ error: "Members are required" });

    const project = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        creator: true,
      },
    });
    if (project?.creator.id !== req.user?.id) {
      return res.status(400).json({ error: "Unauthorized" });
    }
    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        members: {
          delete: member,
        },
      },
    });
    if (team) {
      return res.status(200).json(team);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "An error occurred" });
  }
}
