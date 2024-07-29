import { z } from "zod";

export const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional().default(""),
  userId: z.number(),
});
