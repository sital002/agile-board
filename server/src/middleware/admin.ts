import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";

export function isAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) return new ApiResponse(400, "You aren't logged in");
  if (req.user.role === "ADMIN") return next("route");
  next();
}
