import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { userSchema } from "../schema/user-schema";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    const user = await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
      },
    });
    if (user) {
      logger("User created successfully");
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getUsers(req: Request, res: Response) {
  try {
    const user = await prisma.user.findMany();
    if (user) {
      logger("User fetched successfully");
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}

export async function getUsersById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "User ID must be a number" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      logger("User fetched successfully");
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
}
