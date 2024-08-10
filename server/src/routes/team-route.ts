import express from "express";
import {
  createTeam,
  deleteTeam,
  getTeams,
  updateTeamMembers,
} from "../controller/team-controller";

const teamRouter = express.Router();

teamRouter.post("/new", createTeam);
teamRouter.get("/:projectId", getTeams);
teamRouter.delete("/:id", deleteTeam);

// Add team member to a project
teamRouter.put("/update-member/:projectId", updateTeamMembers);

export default teamRouter;
