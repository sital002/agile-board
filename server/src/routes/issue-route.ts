import express from "express";
import {
  createIssue,
  deleteIssue,
  getIssues,
  updateIssue,
} from "../controller/isssue-controller";
import { isProjectMember } from "../middleware/project";

const issueRouter = express.Router();

issueRouter.post("/new", isProjectMember, createIssue);
issueRouter.get("/:projectId", isProjectMember, getIssues);
issueRouter.delete("/:id", isProjectMember, deleteIssue);
issueRouter.put("/:id", isProjectMember, updateIssue);

export default issueRouter;
