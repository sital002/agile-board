import type { Request, NextFunction, Response } from "express";
import { ApiError } from "./ApiError";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (res.headersSent) return;
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      success: err.success,
    });
  } else {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
