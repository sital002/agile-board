import express from "express";
import {
  createUser,
  getUsers,
  getUsersById,
  updateCurrentProject,
} from "../controller/user-controller";
import { isProjectMember } from "../middleware/project";

const userRouter = express.Router();

userRouter.post("/new", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUsersById);
userRouter.put(
  "/change-current-project/:projectId",
  isProjectMember,
  updateCurrentProject
);
export default userRouter;
