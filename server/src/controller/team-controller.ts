import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export async function createTeam(req: Request, res: Response) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const projectId = Number(req.params.projectId);
    if (!projectId)
      return res.status(400).json({ error: "Project ID is required" });
    const team = await prisma.team.create({
      data: {
        name,
        projectId: projectId,
      },
    });
    if (team) {
      res.status(201).json(team);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getTeams(req: Request, res: Response) {
  try {
    const projectId = Number(req.params.projectId);
    if (!projectId)
      return res.status(400).json({ error: "Project ID is required" });

    const teams = await prisma.team.findMany({
      where: {
        projectId: projectId,
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

export async function updateTeam(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Team ID is required" });
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        name,
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
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "Team ID is required" });
    const { members } = req.body;
    if (!members)
      return res.status(400).json({ error: "Members are required" });

    const team = await prisma.team.update({
      where: {
        id,
      },
      data: {
        members,
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
