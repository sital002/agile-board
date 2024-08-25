import express from "express";
import {
  createComment,
  getComments,
  updateComment,
} from "../controller/comment-controller";
import { isProjectMember } from "../middleware/project";

const commentRouter = express.Router();

commentRouter.post("/new", isProjectMember, createComment);
commentRouter.get("/:issueId", isProjectMember, getComments);
commentRouter.put("/:commentId", isProjectMember, updateComment);

export default commentRouter;
