import z from "zod";
import { env } from "../utils/env";
import type { Request, Response } from "express";
import axios, { isAxiosError } from "axios";
import { AxiosError } from "axios";

const headers = {
  "x-stack-access-type": "server",
  "x-stack-project-id": env.PROJECT_ID,
  "X-Stack-Secret-Server-Key": env.STACK_AUTH_SERVER_KEY,
};

const SignUpSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(3, { message: "Name must be atleast 3 characters" })
      .max(50, { message: "Name must be atmost 50 characters" }),
    email: z.string().email({
      message: "Invaild Email",
    }),

    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .max(64, {
        message: "Password must be atmost 64 characters",
      }),
    confirm_password: z
      .string()
      .min(8, { message: "Password must be atleast 8 characters" })
      .max(64, {
        message: "Password must be atmost 64 characters",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and confirm password must be same",
  });

const SignInSchema = z.object({
  email: z.string().email({
    message: "Invaild Email",
  }),
  password: z.string(),
});

export async function userSignup(req: Request, res: Response) {
  console.log("request hit");
  const result = SignUpSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send(result.error.errors);
  }
  const url = "https://api.stack-auth.com/api/v1/auth/password/sign-up";
  try {
    const response = await axios.post(
      url,
      {
        email: result.data.email,
        password: "1234568888",
        verification_callback_url: "http://localhost:3000/auth/verify-email",
      },
      {
        headers: headers,
      }
    );
    console.log(response.data);
  } catch (error) {
    if (error instanceof AxiosError) console.log(error.response?.data);
    if (error instanceof Error) res.status(500).json(error.message);
  }
}

export async function userSignin(req: Request, res: Response) {
  const result = SignInSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json(result.error.errors);
  }
  try {
    const response = await fetch("https://api.stack-auth.com/api/v1/users", {
      headers,
    });
    console.log(response);
  } catch (error) {
    if (error instanceof Error) res.status(500).json(error.message);
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ message: "code is required" });
  const url = "https://api.stack-auth.com/api/v1/contact-channels/verify";

  try {
    const response = await axios.post(
      url,
      {
        code: "code",
      },
      {
        headers: headers,
      }
    );
    console.log(response.data);
    res.status(200).json(response.data ?? "Verification successful");
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
      return res.status(500).json(error.response?.data);
    }
  }
}
