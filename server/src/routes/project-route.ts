import express from "express";
import {
  createProject,
  getProjectById,
  getProjects,
} from "../controller/project-controller";

const projectRouter = express.Router();

projectRouter.get("/new", createProject);
projectRouter.get("/", getProjects);
projectRouter.get("/:id", getProjectById);

export default projectRouter;
