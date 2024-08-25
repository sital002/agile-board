import express from "express";

import { isProjectMember } from "../middleware/project";
import {
  createReply,
  getReplies,
  updateReply,
} from "../controller/reply-controller";

const replyRouter = express.Router();

replyRouter.post("/new", isProjectMember, createReply);
replyRouter.get("/:commentId", isProjectMember, getReplies);
replyRouter.put("/:replyId", isProjectMember, updateReply);

export default replyRouter;
