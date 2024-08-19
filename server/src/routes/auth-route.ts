import express from "express";
import {
  forgotPassword,
  getMyProfile,
  logout,
  userSignin,
  userSignup,
  verifyEmail,
} from "../controller/auth-controller";
import { authenticate } from "../middleware/authenticate";
const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);
authRouter.get("/logout", logout);
authRouter.get("/verify-email", verifyEmail);
authRouter.get("/me", authenticate, getMyProfile);
authRouter.post("forgot-password", forgotPassword);
authRouter.post("reset-password", forgotPassword);
export default authRouter;
