import express from "express";
import cors from "cors";

import projectRouter from "./routes/project-route";
import userRouter from "./routes/user-route";
import authRouter from "./routes/auth-route";
import { Resend } from "resend";
import { env } from "./utils/env";
import cookieParser from "cookie-parser";
import columnRouter from "./routes/column-route";
import { authenticate } from "./middleware/authenticate";
import issueRouter from "./routes/issue-route";
import teamRouter from "./routes/team-route";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", authenticate, projectRouter);
app.use("/api/columns", authenticate, columnRouter);
app.use("/api/issues", authenticate, issueRouter);
app.use("/api/teams", authenticate, teamRouter);

const resend = new Resend(env.RESEND_API_KEY);

app.get("/", async (req, res) => {
  const { data, error } = await resend.emails.send({
    from: "Agile Board <onboarding@resend.dev>",
    to: ["sitaladhikari002@gmail.com"],
    subject: "Verify Eail",
    html: "<strong>Your verification link is here 04343!</strong>",
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ data });
});

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
