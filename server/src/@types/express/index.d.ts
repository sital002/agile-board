// index.d.ts
import { User } from "@prisma/client";
import { Request } from "express";
export {};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
