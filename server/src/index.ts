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
import { logger } from "./middleware/logger";
import prisma from "./db/prisma";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://test.com"],
    credentials: true,
  })
);

function connectDB() {
  console.log("Connecting to database");
  prisma
    .$connect()
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.error("Error connecting to database", err);
    });
}

connectDB();

app.use(logger);

app.use(express.json());
app.use(cookieParser());

app.use(setApiResponse);

app.use("/api/auth", authRouter);
app.use("/api/users", authenticate, userRouter);
app.use("/api/projects", authenticate, projectRouter);
app.use("/api/columns", authenticate, columnRouter);
app.use("/api/issues", authenticate, issueRouter);
app.use("/api/teams", authenticate, teamRouter);

app.use(globalErrorHandler);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
