import express from "express";
import {
  deleteTeam,
  getTeams,
  removeTeammember,
  updateTeamMembers,
} from "../controller/team-controller";

const teamRouter = express.Router();

teamRouter.get("/:projectId", getTeams);
teamRouter.delete("/:id", deleteTeam);

// Add team member to a project
teamRouter.put("/update-member/:projectId", updateTeamMembers);
teamRouter.put("/remove-member/:projectId", removeTeammember);

export default teamRouter;
