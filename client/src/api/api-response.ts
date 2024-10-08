export type ApiResponse<T = unknown> = {
  success: true;
  message: string;
  data?: T;
};
export type ApiError = {
  message: string;
  success: boolean;
};
