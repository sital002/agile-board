import express from "express";
import {
  userSignin,
  userSignup,
  verifyEmail,
} from "../controller/auth-controller";
const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);
authRouter.get("/verify-email", verifyEmail);

export default authRouter;
