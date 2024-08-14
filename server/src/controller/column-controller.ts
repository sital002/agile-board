import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export async function createColumn(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unathorized" });
    const { name, projectId } = req.body;
    const column = await prisma.column.create({
      data: {
        name,
        projectId,
      },
    });
    if (column) {
      res.status(201).json(column);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getColumns(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unathorized" });
    const projectId = req.params.projectId;
    if (!projectId)
      return res.status(400).json({ error: "Project Id is required" });

    const columns = await prisma.column.findMany({
      where: {
        projectId: projectId,
      },
    });
    if (columns) {
      res.status(200).json(columns);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function deleteColumn(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unathorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Column ID is required" });

    const column = await prisma.column.delete({
      where: {
        id,
      },
    });
    if (column) {
      res.status(200).json(column);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function updateColumn(req: Request, res: Response) {
  try {
    if (!req.user) return res.status(400).json({ error: "Unathorized" });
    const id = req.params.id;
    if (!id) return res.status(400).json({ error: "Column ID is required" });
    const { name } = req.body;
    const column = await prisma.column.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    if (column) {
      res.status(200).json(column);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}
