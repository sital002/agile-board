export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface User {
  id: string;
  email: string;
  display_name: string;
  password: string;
  isSubscribed: boolean;
  verification_code: string;
  primary_email_verified: boolean;
  profile_image_url?: string;
  role: Role;
  created_at: string;
  updated_at: string;
  projects: Project[];
  issues: Issue[];
  teams: Team[];
  currentProjectId?: string;
  currentProject?: Project;
}

export interface Issue {
  id: string;
  title: string;
  assigneeId?: string;
  assignee?: User;
  description?: string;
  projectId: string;
  project: Project;
  attachments: string[];
  columnId: string;
  column: Column;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
  creator: User;
  columns: Column[];
  issues: Issue[];
  team?: Team;
  user: User[];
}

export interface Team {
  id: string;
  projectId: string;
  project: Project;
  members: User[];
}

export interface Column {
  id: string;
  name: string;
  description?: string;
  issues: Issue[];
  projectId: string;
  project: Project;
}

export type Comment = {
  id: string;
  issueId: string;
  issue: Issue;
  authorId: string;
  author: User;
  content: string;
  createdAt: string;
  updatedAt: string;
};
