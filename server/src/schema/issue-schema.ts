import { z } from "zod";

export const issueSchema = z.object({
  title: z.string(),
  projectId: z.number(),
  columnId: z.number(),
  description: z.string().optional().default(""),
});
