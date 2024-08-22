import express from "express";
import {
  createProject,
  getProjectById,
  getAllProjects,
  getProjects,
  deleteProject,
  editProject,
} from "../controller/project-controller";
import { isProjectCreator } from "../middleware/project";
import { isAdmin } from "../middleware/admin";

const projectRouter = express.Router();

projectRouter.post("/new", createProject);
projectRouter.get("/", getProjects);
projectRouter.delete("/:projectId", isAdmin, isProjectCreator, deleteProject);
projectRouter.put("/:projectId", isAdmin, isProjectCreator, editProject);
projectRouter.get("/:projectId", getProjectById);

// Admin route
projectRouter.get("/all", getAllProjects);
// projectRouter.get("/:id")

export default projectRouter;
