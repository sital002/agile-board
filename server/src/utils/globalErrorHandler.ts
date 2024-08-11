import type { Request, NextFunction, Response } from "express";
import { ApiError } from "./ApiError";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
      success: err.success,
    });
  }
  if (err instanceof Error) {
    res.status(500).json({
      error: err.message,
      statusCode: 500,
      success: false,
    });
  }
  if (err instanceof ZodError) {
    res.status(400).json({
      error: err.errors,
      statusCode: 400,
      success: false,
    });
  } else {
    res.status(500).json({
      error: "Internal server error",
      statusCode: 500,
      success: false,
    });
  }
};
