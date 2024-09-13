import { z } from "zod";

const envSchma = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string({
    required_error: "Missing NEXT_PUBLIC_SERVER_URL",
  }),
});

export const env = envSchma.parse(process.env);
