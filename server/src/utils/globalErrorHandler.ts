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
      error: err.message,
      statusCode: err.statusCode,
      success: err.success,
    });
  } else {
    return res.status(500).json({
      error: "Internal server error",
      statusCode: 500,
      success: false,
    });
  }
};
