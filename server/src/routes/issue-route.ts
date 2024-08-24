import express from "express";
import {
  createIssue,
  deleteIssue,
  getIssue,
  getIssues,
  updateIssue,
} from "../controller/isssue-controller";
import { isProjectMember } from "../middleware/project";

const issueRouter = express.Router();

issueRouter.post("/new", isProjectMember, createIssue);
issueRouter.get("/:projectId", isProjectMember, getIssues);
issueRouter.get("/single/:issueId", isProjectMember, getIssue);
issueRouter.delete("/:id", isProjectMember, deleteIssue);
issueRouter.put("/:issueId", isProjectMember, updateIssue);
// issueRouter.patch("/update-assignee/:issueId", isProjectMember, updateIssue);

export default issueRouter;
