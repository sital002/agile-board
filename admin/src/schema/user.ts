import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  display_name: z.string(),
  email: z.string().email(),
  profile_image_url: z.string(),
  primary_email_verified: z.boolean(),
  isSubscribed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export const userValidator = userSchema.parse;
