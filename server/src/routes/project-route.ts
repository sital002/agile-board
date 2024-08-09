import express from "express";
import {
  createProject,
  getProjectById,
  getProjects,
} from "../controller/project-controller";
import { authenticate } from "../middleware/authenticate";

const projectRouter = express.Router();

projectRouter.post("/new", authenticate, createProject);
projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);
// projectRouter.get("/:id")

export default projectRouter;
