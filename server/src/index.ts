import express from "express";
import projectRouter from "./routes/project-route";
import userRouter from "./routes/user-route";

import dotenv from "dotenv";
import { env } from "./utils/env";
import authRouter from "./routes/auth-route";
const app = express();

app.use(express.json());

app.use("/me", async (req, res) => {
  // const url = "https://api.stack-auth.com/v1/api/users/me";
  console.log(env.STACK_AUTH_SERVER_KEY, env.PROJECT_ID);
  const headers = {
    "x-stack-access-type": "server",
    "x-stack-project-id": env.PROJECT_ID,
    "x-stack-server-secret": env.STACK_AUTH_SERVER_KEY,
    "x-stack-access-token": "access token from headers",
    "x-stack-refresh-token": "refresh token from headers",
  };

  const url = "https://api.stack-auth.com/api/v1/users";
  const options = {
    method: "POST",
    headers: headers,
    body: '{"display_name":"John Doe","profile_image_url":"https://example.com/image.jpg","client_metadata":{"key":"value"},"server_metadata":{"key":"value"},"primary_email":"johndoe@example.com","primary_email_verified":true,"primary_email_auth_enabled":true,"password":"password","selected_team_id":"team-id"}',
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  // res.json({ message: "Hello World" });
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
