import express from "express";
import {
  createColumn,
  deleteColumn,
  getColumns,
  updateColumn,
} from "../controller/column-controller";

const columnRouter = express.Router();

columnRouter.post("/new", createColumn);
columnRouter.get("/:projectId", getColumns);
columnRouter.delete("/:id", deleteColumn);
columnRouter.put("/:id", updateColumn);
export default columnRouter;
