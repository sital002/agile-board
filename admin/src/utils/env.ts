import { z } from "zod";

const envSchma = z.object({
  SERVER_URL: z.string(),
});

export const env = envSchma.parse(process.env);
