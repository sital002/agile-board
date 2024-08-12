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
projectRouter.delete("/:id", isProjectCreator, deleteProject);
projectRouter.get("/:id", getProjectById);

// Admin route
projectRouter.get("/all", getAllProjects);
// projectRouter.get("/:id")

export default projectRouter;
