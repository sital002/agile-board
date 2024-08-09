import express from "express";
import {
  createProject,
  getProjectById,
  getAllProjects,
  getProjects,
  deleteProject,
} from "../controller/project-controller";
import { authenticate } from "../middleware/authenticate";

const projectRouter = express.Router();

projectRouter.post("/new", createProject);
projectRouter.get("/", getProjects);
projectRouter.get("/all", getAllProjects);
projectRouter.delete("/:id", deleteProject);
projectRouter.get("/:id", getProjectById);
// projectRouter.get("/:id")

export default projectRouter;
