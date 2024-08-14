import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { SignUpSchema } from "../schema/user-schema";

const prisma = new PrismaClient();

export async function createUser(req: Request, res: Response) {
  try {
    const result = SignUpSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }
    const userExists = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const verificationCode = crypto.randomUUID();
    const user = await prisma.user.create({
      data: {
        verification_code: verificationCode,
        password: result.data.password,
        display_name: result.data.display_name,
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

    const user = await prisma.user.findUnique({
      where: {
        id: id,
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
