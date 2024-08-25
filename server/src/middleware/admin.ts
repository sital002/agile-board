import { NextFunction, Request, Response } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user) return res.status(400).json({ error: "You aren't logged in" });
  if (req.user.role === "ADMIN") return next("route");
  return next();
}
