import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  PROJECT_ID: z.string(),
  STACK_AUTH_PUBLISHABLE_KEY: z.string(),
  STACK_AUTH_SERVER_KEY: z.string(),
  JWT_SECRET: z.string().default("secret"),
});
export const env = envSchema.parse(process.env);
