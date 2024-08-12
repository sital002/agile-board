import express from "express";
import {
  createProject,
  getProjectById,
  getAllProjects,
  getProjects,
  deleteProject,
} from "../controller/project-controller";
import { isProjectCreator, isProjectMember } from "../middleware/project";

const projectRouter = express.Router();

projectRouter.post("/new", createProject);
projectRouter.get("/", isProjectMember, getProjects);
projectRouter.delete("/:projectId", isProjectCreator, deleteProject);
projectRouter.get("/:projectId", getProjectById);

// Admin route
projectRouter.get("/all", getAllProjects);
// projectRouter.get("/:id")

export default projectRouter;
