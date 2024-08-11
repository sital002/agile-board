import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
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
  id: z.number(),
  projectId: z.number(),
  name: z.string(),
  description: z.string().nullable(),
});

const issueSchema = z.object({
  id: z.number(),
  columnId: z.number(),
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
  assignee: z.string().nullable(),
  Column: columnSchema,
});

const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  creator: userSchema,
});

const teamSchema = z.object({
  id: z.number(),
  members: userSchema.array(),
  Project: projectSchema,
});

export type Team = z.infer<typeof teamSchema>;
export type User = z.infer<typeof userSchema>;

export type Column = z.infer<typeof columnSchema>;
export type Project = z.infer<typeof projectSchema>;

export type Issue = z.infer<typeof issueSchema>;
export { issueSchema, columnSchema, projectSchema, teamSchema };
