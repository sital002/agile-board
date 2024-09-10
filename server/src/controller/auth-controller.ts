import z, { any } from "zod";
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

export const userSignup = asyncHandler(async (req: Request, res: Response) => {
  const result = SignUpSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);

  const userExists = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });
  if (userExists) throw new ApiError(400, "User already exists");

  const hashedPassword = await bcrypt.hash(result.data.password, 10);
  const verificationCode = crypto.randomUUID();
  if (!hashedPassword) throw new ApiError(500, "Failed to hash password");

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
  if (!newUser) throw new ApiError(500, "Failed to create user");
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser.id);
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
    .json(new ApiResponse("User created successfully", newUser));
});

export const userSignin = asyncHandler(async (req: Request, res: Response) => {
  const result = SignInSchema.safeParse(req.body);
  if (!result.success) throw new ApiError(400, result.error.errors[0].message);
  const user = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });
  if (!user) throw new ApiError(400, "User not found");
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    user.password
  );
  if (!isPasswordValid) throw new ApiError(400, "Invalid password");

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
    .send(
      new ApiResponse("User logged In Successfully", {
        status: true,
        access_token: accessToken,
        refresh_token: refreshToken,
      })
    );
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const code = req.query.code;
  if (!code) throw new ApiError(400, "Code is required");
  const user = await prisma.user.findFirst({
    where: {
      verification_code: code as string,
    },
  });
  if (!user) throw new ApiError(400, "Invalid code");
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      primary_email_verified: true,
    },
  });
  return res.status(200).json(new ApiResponse("Email verified successfully"));
});
export const logout = asyncHandler(async (_: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  return res.status(200).json(new ApiResponse("Logged out successfully"));
});

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(401, "You are not logged in");
    return res.status(200).json(new ApiResponse("User profile", req.user));
  }
);
const emailSchema = z.string().email();

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
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

    return res
      .status(200)
      .json(new ApiResponse("Reset link sent to your email"));
  }
);

const resetPasswordSchema = z.object({
  token: z.string(),
  password: z
    .string()
    .min(8, "Password must be 8 charactor long")
    .max(64, "Password must be at most 64 charactor long"),
});
export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
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
    if (!hashedPassword) throw new ApiError(500, "Failed to reset password");
    return res.status(200).json(new ApiResponse("Password reset successfully"));
  }
);
