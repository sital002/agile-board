import express from "express";
import {
  getMyProfile,
  userSignin,
  userSignup,
  verifyEmail,
} from "../controller/auth-controller";
import { authenticate } from "../middleware/authenticate";
const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);
authRouter.get("/verify-email", verifyEmail);
authRouter.get("/me", authenticate, getMyProfile);
export default authRouter;
