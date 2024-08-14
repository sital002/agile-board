import { z } from "zod";

export const issueSchema = z.object({
  title: z.string(),
  projectId: z.string(),
  columnId: z.string(),
  description: z.string().optional().default(""),
});
