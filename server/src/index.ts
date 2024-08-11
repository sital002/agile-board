import express from "express";
import cors from "cors";

import projectRouter from "./routes/project-route";
import userRouter from "./routes/user-route";
import authRouter from "./routes/auth-route";
import cookieParser from "cookie-parser";
import columnRouter from "./routes/column-route";
import { authenticate } from "./middleware/authenticate";
import issueRouter from "./routes/issue-route";
import teamRouter from "./routes/team-route";
import { globalErrorHandler } from "./utils/globalErrorHandler";
import { setApiResponse } from "./utils/ApiResponse";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(setApiResponse);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", authenticate, projectRouter);
app.use("/api/columns", authenticate, columnRouter);
app.use("/api/issues", authenticate, issueRouter);
app.use("/api/teams", authenticate, teamRouter);

app.use(globalErrorHandler);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
