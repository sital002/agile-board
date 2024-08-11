import { NextFunction, Request, Response } from "express";

export type FunctionType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const asyncHandler = (func: FunctionType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
};
