import express from "express";
import {
  createTeam,
  deleteTeam,
  getTeams,
  updateTeam,
  updateTeamMembers,
} from "../controller/team-controller";

const teamRouter = express.Router();

teamRouter.post("/new", createTeam);
teamRouter.get("/:projectId", getTeams);
teamRouter.delete("/:id", deleteTeam);
teamRouter.put("/:id", updateTeam);
teamRouter.put("/update-member/:id", updateTeamMembers);

export default teamRouter;
