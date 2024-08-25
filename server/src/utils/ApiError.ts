export class ApiError extends Error {
  statusCode: number;
  success: boolean;
  constructor(statusCode = 400, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}
