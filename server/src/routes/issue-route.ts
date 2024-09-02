import express from "express";
import {
  createIssue,
  deleteIssue,
  getIssues,
  getIssuesByAssignee,
  getSingleIssue,
  updateIssue,
} from "../controller/isssue-controller";
import { isProjectMember } from "../middleware/project";

const issueRouter = express.Router();

issueRouter.post("/new", isProjectMember, createIssue);
issueRouter.get("/:projectId", isProjectMember, getIssues);
issueRouter.get("/single/:issueId", isProjectMember, getSingleIssue);
issueRouter.delete("/:id", isProjectMember, deleteIssue);
issueRouter.put("/:issueId", isProjectMember, updateIssue);
issueRouter.get("assignee/:assigneeId", isProjectMember, getIssuesByAssignee);
// issueRouter.patch("/update-assignee/:issueId", isProjectMember, updateIssue);

export default issueRouter;
