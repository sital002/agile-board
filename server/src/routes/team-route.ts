import express from "express";
import {
  deleteTeam,
  getTeams,
  removeTeammember,
  updateTeamMembers,
} from "../controller/team-controller";
import { isProjectCreator, isProjectMember } from "../middleware/project";

const teamRouter = express.Router();

teamRouter.get("/:projectId", isProjectMember, getTeams);

// Add team member to a project
teamRouter.put(
  "/update-member/:projectId",
  isProjectCreator,
  updateTeamMembers
);
teamRouter.put("/remove-member/:projectId", isProjectCreator, removeTeammember);

// Admin route
teamRouter.delete("/:id", deleteTeam);

export default teamRouter;
