import { Response } from "express";

export class ApiResponse {
  protected message: string;
  protected success: boolean;
  protected data: any;

  constructor(message: string, data?: any) {
    this.message = message;
    this.success = true;
    this.data = data;
  }
}
