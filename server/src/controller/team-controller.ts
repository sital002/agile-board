import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getTeams(req: Request, res: Response) {
  try {
    const projectId = Number(req.params.projectId);
    if (!projectId)
      return res.status(400).json({ error: "Project ID is required" });

    const teams = await prisma.team.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        members: true,
        Project: true,
      },
    });
    if (teams) {
      res.status(200).json(teams);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function deleteTeam(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Team ID is required" });

    const team = await prisma.team.delete({
      where: {
        id,
      },
    });
    if (team) {
      res.status(200).json(team);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function updateTeamMembers(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.projectId);
    if (isNaN(id))
      return res.status(400).json({ error: "Team ID is mnust be number" });
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
          update: member,
        },
      },
    });
    if (team) {
      res.status(200).json(team);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function removeTeammember(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.projectId);
    if (isNaN(id))
      return res.status(400).json({ error: "Team ID must be a number" });
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
      res.status(200).json(team);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}
