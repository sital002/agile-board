import { z } from "zod";

export const issueSchema = z.object({
  title: z.string(),
  projectId: z.string(),
  columnId: z.string(),
  assigneeId: z.string().optional().nullable(),
  dueDate: z.string().nullable().optional(),
  description: z.string().optional().default(""),
});
