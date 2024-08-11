export class ApiResponse {
  protected message: string;
  protected success: boolean;
  protected statusCode: number;
  protected data: any;

  constructor(statusCode = 200, message: string, data: any) {
    this.message = message;
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
  }
}
