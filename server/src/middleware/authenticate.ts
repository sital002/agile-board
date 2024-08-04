import { PrismaClient, User } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { env } from "../utils/env";

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: User;
}

export async function authenticate(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.["access_token"] || req.header("x-access-server");
  if (!token) {
    return res.status(401).json({status:false, error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as JwtPayload;
    if (!payload) return res.status(401).json({ error: "Unauthorized" });
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
