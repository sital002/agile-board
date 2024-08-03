import express from "express";
import { userSignin, userSignup } from "../controller/auth-controller";
const authRouter = express.Router();

authRouter.post("/signup", userSignup);
authRouter.post("/signin", userSignin);

export default authRouter;
