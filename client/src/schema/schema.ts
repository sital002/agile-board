import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  display_name: z.string(),
  isSubscribed: z.boolean(),
  profile_image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
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
  createdAt: z.string(),
  updatedAt: z.string(),
  dueDate: z.string().nullable(),
  assignee: z.string().nullable(),
  Column: columnSchema,
});

const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  creator: userSchema,
});

export type Column = z.infer<typeof columnSchema>;
export type Project = z.infer<typeof projectSchema>;

export type Issue = z.infer<typeof issueSchema>;
export { issueSchema, columnSchema, projectSchema };
