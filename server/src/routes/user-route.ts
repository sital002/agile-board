import express from "express";
import {
  createUser,
  getUsers,
  getUsersById,
} from "../controller/user-controller";
const userRouter = express.Router();

userRouter.post("/new", createUser);
userRouter.get("/", getUsers);
userRouter.get("/:id", getUsersById);

export default userRouter;
