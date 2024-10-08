import { PrismaClient, User } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { env } from "../utils/env";

const prisma = new PrismaClient();

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.["access_token"] || req.header("x-access-server");
  console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ status: false, error: "Token isnot provided" });
  }
  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;
    if (!payload)
      return res.status(401).json({ status: false, error: "Unauthorized" });
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
      include: {
        currentProject: true,
      },
    });
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ status: false, error: "Unauthorized" });
  }
}
