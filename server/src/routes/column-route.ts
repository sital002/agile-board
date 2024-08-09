import express from "express";
import {
  createColumn,
  deleteColumn,
  getColumns,
} from "../controller/column-controller";

const columnRouter = express.Router();

columnRouter.post("/new", createColumn);
columnRouter.get("/:projectId", getColumns);
columnRouter.delete("/:id", deleteColumn);
export default columnRouter;
