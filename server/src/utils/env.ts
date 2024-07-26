import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.string().default("development"),
  DRIZZLE_DATABASE_URL: z.string(),
  JWT_SECRET: z.string().default("secret"),
});
export const env = envSchema.parse(process.env);
