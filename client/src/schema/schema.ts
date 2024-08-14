import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  display_name: z.string(),
  isSubscribed: z.boolean(),
  profile_image_url: z.string().nullable(),
  created_at: z.string().refine((date) => new Date(date).toLocaleDateString()),
  updated_at: z
    .string()
    .nullable()
    .refine((date) => date && new Date(date).toLocaleDateString()),
});

const columnSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

const issueSchema = z.object({
  id: z.string(),
  columnId: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string().refine((date) => new Date(date).toLocaleDateString()),
  updatedAt: z
    .string()
    .nullable()
    .refine((date) => date && new Date(date).toLocaleDateString()),
  dueDate: z
    .string()
    .nullable()
    .refine((date) => date && new Date(date)),
  assignee: userSchema.nullable(),
  assigneeId: z.string().nullable(),
  column: columnSchema,
});

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  creator: userSchema,
});

const teamSchema = z.object({
  id: z.string(),
  members: userSchema.array(),
  Project: projectSchema,
});

export type Team = z.infer<typeof teamSchema>;
export type User = z.infer<typeof userSchema>;

export type Column = z.infer<typeof columnSchema>;
export type Project = z.infer<typeof projectSchema>;

export type Issue = z.infer<typeof issueSchema>;
export { issueSchema, columnSchema, projectSchema, teamSchema };
