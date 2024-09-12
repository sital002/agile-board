import { Request, Response } from "express";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import prisma from "../db/prisma";
import z from "zod";

const columnSchmea = z.object({
  name: z
    .string({
      required_error: "name field is missing",
    })
    .min(3, "Column name must be at least 3 characters long")
    .max(50, "Column name must be at most 50 characters long"),
  projectId: z
    .string({
      required_error: "projectId field is missing",
    })
    .min(1, "Project ID is required"),
});
export const createColumn = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const result = columnSchmea.safeParse(req.body);
    if (!result.success)
      throw new ApiError(400, result.error.errors[0].message);
    const { name, projectId } = result.data;
    const column = await prisma.column.create({
      data: {
        name,
        projectId,
      },
    });
    if (column) {
      res
        .status(201)
        .json(new ApiResponse("Column created successfully", column));
    }
  }
);

export const getColumns = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw new ApiError(400, "You are not logged in");
  const projectId = req.params.projectId;
  if (!projectId) throw new ApiError(400, "Project ID is required");
  const columns = await prisma.column.findMany({
    where: {
      projectId: projectId,
    },
  });
  if (!columns) throw new ApiError(404, "No columns found");
  res
    .status(200)
    .json(new ApiResponse("Columns retrieved successfully", columns));
});
export const deleteColumn = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const id = req.params.id;
    if (!id) throw new ApiError(400, "Column ID is required");

    const column = await prisma.column.delete({
      where: {
        id,
      },
    });

    if (!column) throw new ApiError(500, "Failed to delete column");
    res
      .status(200)
      .json(new ApiResponse("Column deleted successfully", column));
  }
);

export const updateColumn = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(400, "You are not logged in");
    const id = req.params.id;
    if (!id) throw new ApiError(400, "Column ID is required");
    const { name } = req.body;
    const column = await prisma.column.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    if (!column) throw new ApiError(500, "Failed to update column");
    res
      .status(200)
      .json(new ApiResponse("Column updated successfully", column));
  }
);
