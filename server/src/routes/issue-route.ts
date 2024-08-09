import express from "express";
import {
  createIssue,
  deleteIssue,
  getIssues,
} from "../controller/isssue-controller";

const issueRouter = express.Router();

issueRouter.post("/new", createIssue);
issueRouter.get("/:projectId", getIssues);
issueRouter.delete("/:id", deleteIssue);

export default issueRouter;
