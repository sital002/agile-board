import { z } from "zod";

const envSchema = z.object({
  VITE_SERVER_URL: z.string(),
});

// const  = import.meta.env;

export const env = envSchema.parse(import.meta.env);
