import z from "zod";
import { env } from "../utils/env";
import type { CookieOptions, Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { SignUpSchema } from "../schema/user-schema";
import { createTransport } from "../utils/nodemailer.config";
import { asyncHandler } from "../utils/AsyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

function generateAccessToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    }
  );
}

function generateRefreshToken(id: string) {
  return jwt.sign(
    {
      id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    }
  );
}

const prisma = new PrismaClient();

const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function userSignup(req: Request, res: Response) {
  const result = SignUpSchema.safeParse(req.body);
  if (!result.success) {
    console.log(result.error.errors);
    return res.status(400).send(result.error.errors);
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    const verificationCode = crypto.randomUUID();

    const newUser = await prisma.user.create({
      data: {
        verification_code: verificationCode,
        display_name: result.data.display_name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
    // const { data, error } = await resend.emails.send({
    //   from: "Agile Board <onboarding@resend.dev>",
    //   to: ["sitaladhikari002@gmail.com"],
    //   subject: "Verify your Email",
    //   html: `
    //   <h1>Verify your email</h1>
    //   <p>Click the link below to verify your email</p>
    //   <button><a href="http://localhost:3000/auth/verify-email?code=${verificationCode}">Verify Email</a></button>
    //   `,
    // });
    // if (error) {
    //   return res.status(400).json({ error });
    // }

    let data = await createTransport.sendMail({
      from: "agileboard.test.com.np",
      to: newUser.email,
      subject: "Account Vefification",
      html: `
      <h1>Verify your email</h1>
      <p>Click the link below to verify your email</p>
      <button><a href=" https://google.com?code=${verificationCode}">Verify Email</a></button>
      `,
    });
    if (newUser)
      return res
        .status(200)
        .json({ message: "User created successfully", newUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export async function userSignin(req: Request, res: Response) {
  console.log("hit");
  const result = SignInSchema.safeParse(req.body);
  console.log(result);
  if (!result.success) {
    console.log(result.error);
    return res.status(400).json(result.error.errors);
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isPasswordValid = await bcrypt.compare(
      result.data.password,
      user.password
    );
    if (!isPasswordValid)
      return res.status(400).json({ message: "Invalid password" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);

    const options: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    };
    return res
      .status(201)
      .cookie("access_token", accessToken, options)
      .cookie("refresh_token", refreshToken, options)
      .send({
        status: true,
        message: "User logged In Successfully",
        access_token: accessToken,
        refresh_token: refreshToken,
      });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return res.status(500).json(error.message);
    return res.status(500).json("An error occurred");
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const code = req.query.code;
  if (!code) return res.status(400).json({ message: "code is required" });
  const user = await prisma.user.findFirst({
    where: {
      verification_code: code as string,
    },
  });
  console.log(user);
  if (!user) return res.status(400).json({ message: "Invalid code" });
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      primary_email_verified: true,
    },
  });
  return res.send("Email verified successfully");
}
export async function logout(_: Request, res: Response) {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.status(200).json({ message: "Logged out successfully" });
}

export async function getMyProfile(req: Request, res: Response) {
  if (!req.user)
    return res.status(401).json({ status: false, message: "Unauthorized" });
  return res.status(200).json({ user: req.user, status: true });
}

const emailSchema = z.string().email();

export const forgotPassword = asyncHandler(async (req: Request) => {
  const result = emailSchema.safeParse(req.body?.email);
  if (!result.success) throw new ApiError(400, "Invalid email format");

  const user = await prisma.user.findUnique({
    where: {
      email: result.data,
    },
  });
  if (!user) throw new ApiError(400, "User not found");
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiry = Date.now() + 1000 * 60 * 60 * 24;
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      reset_token: resetToken,
      reset_token_expiry: new Date(resetTokenExpiry),
    },
  });
  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
  const mailOptions = {
    from: "agileboard.test.com.np",
    to: user.email,
    subject: "Reset Password",
    html: `
    <h1>Reset your password</h1>
    <p>Click the link below to reset your password</p>
    <a href="${resetUrl}">Reset Password</a>
    `,
  };
  await createTransport.sendMail(mailOptions);
  return new ApiResponse(200, "Reset link sent to your email");
});

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, "Password must be 8 charactor long")
    .max(64, "Password must be at most 64 charactor long"),
});
export const resetPassword = asyncHandler(async (req: Request) => {
  const result = resetPasswordSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, "Invalid password format");
  const user = await prisma.user.findFirst({
    where: {
      reset_token: result.data.token,
      reset_token_expiry: {
        gt: new Date(),
      },
    },
  });
  if (!user) throw new ApiError(400, "Invalid or expired token");
  const hashedPassword = await bcrypt.hash(result.data.token, 10);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      reset_token: null,
      reset_token_expiry: null,
    },
  });
  return new ApiResponse(200, "Password reset successfully");
});
