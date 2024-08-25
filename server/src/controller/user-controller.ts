import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { SignUpSchema } from "../schema/user-schema";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

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

export const updateCurrentProject = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const projectId = req.body.projectId || req.params.projectId;
    if (!projectId) throw new ApiError(400, "Project ID is required");
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        currentProjectId: projectId,
      },
    });
    if (!user) throw new ApiError(400, "User not found");
    return res
      .status(200)
      .json(new ApiResponse("Project updated successfully"));
  }
);
