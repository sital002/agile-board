import { Request, Response, NextFunction } from "express";

export class ApiResponse {
  protected message: string;
  protected success: boolean;
  protected statusCode: number;
  protected data: any;
  private static res: Response;

  constructor(statusCode = 200, message: string, data?: any) {
    this.message = message;
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    if (!ApiResponse.res) {
      throw new Error(
        "Response object not set. Call ApiResponse.setResponse(res) first."
      );
    }
    ApiResponse.res.status(this.statusCode).json(this);
  }

  static setResponse(res: Response) {
    ApiResponse.res = res;
  }
}

export const setApiResponse = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  ApiResponse.setResponse(res);
  next();
};

//
class ARes {
  protected message: string;
  protected success: boolean;
  protected statusCode: number;
  protected data: any;
  private static res: Response;
  constructor(statusCode = 200, message: string, data?: any) {
    this.message = message;
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
  }
}
