import express from "express";

import { isProjectMember } from "../middleware/project";
import {
  createReply,
  deleteReply,
  getReplies,
  updateReply,
} from "../controller/reply-controller";

const replyRouter = express.Router();

replyRouter.post("/new", isProjectMember, createReply);
replyRouter.get("/:commentId", isProjectMember, getReplies);
replyRouter.put("/:replyId", isProjectMember, updateReply);
replyRouter.delete("/:replyId", isProjectMember, deleteReply);

export default replyRouter;
