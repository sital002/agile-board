import express from "express";
import {
  createProject,
  getProjectById,
  getAllProjects,
  getProjects,
} from "../controller/project-controller";
import { authenticate } from "../middleware/authenticate";

const projectRouter = express.Router();

projectRouter.post("/new", authenticate, createProject);
projectRouter.get("/", authenticate, getProjects);
projectRouter.get("/all", authenticate, getAllProjects);
projectRouter.get("/:id", getProjectById);
// projectRouter.get("/:id")

export default projectRouter;
