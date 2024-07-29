import express from "express";
import projectRouter from "./routes/project-route";
import userRouter from "./routes/user-route";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/projects", projectRouter);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
