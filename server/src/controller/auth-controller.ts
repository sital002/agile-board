import z from "zod";
import { env } from "../utils/env";
import type { Request, Response } from "express";

const headers = {
  "x-stack-access-type": "server",
  "x-stack-project-id": env.PROJECT_ID,
  "x-stack-server-secret": env.STACK_AUTH_SERVER_KEY,
};

const EmailSchema = z.object({
  email: z.string().email({
    message: "Invaild Email",
  }),
});

const SignInSchema = z.object({
  email: z.string().email({
    message: "Invaild Email",
  }),
  password: z.string(),
});

export async function userSignup(req: Request, res: Response) {
  const result = EmailSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).send(result.error.errors[0]);
  }
  try {
    const response = fetch("https://api.stack-auth.com/api/v1/users", {
      headers,
    });
    console.log(response);
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
}

export async function userSignin(req: Request, res: Response) {
  const result = SignInSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.errors);
  }
  try {
    const response = fetch("https://api.stack-auth.com/api/v1/users", {
      headers,
    });
    console.log(response);
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
}

export async function forgotPassword(req: Request, res: Response) {}
