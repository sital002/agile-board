import express from "express";
import {
  createProject,
  getProjectById,
  getAllProjects,
  getProjects,
  deleteProject,
} from "../controller/project-controller";
import { isProjectCreator } from "../middleware/project";

const projectRouter = express.Router();

projectRouter.post("/new", createProject);
projectRouter.get("/", getProjects);
projectRouter.delete("/:projectId", isProjectCreator, deleteProject);
projectRouter.get("/:projectId", getProjectById);

// Admin route
projectRouter.get("/all", getAllProjects);
// projectRouter.get("/:id")

export default projectRouter;
