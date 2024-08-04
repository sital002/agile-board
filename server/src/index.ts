import express from "express";
import cors from "cors";

import projectRouter from "./routes/project-route";
import userRouter from "./routes/user-route";
import authRouter from "./routes/auth-route";
import { Resend } from "resend";
import { env } from "./utils/env";
import cookieParser from 'cookie-parser'

const app = express();

app.use(cors({
  origin:'*',
  credentials:true
}));

app.use(express.json());
app.use(cookieParser())

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);
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
