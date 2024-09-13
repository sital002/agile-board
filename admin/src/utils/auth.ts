import { User } from "@/types";
import { API } from "./api";
import { AxiosError } from "axios";

interface Auth {
  user: User | null;
  error: AxiosError | null;
}
export async function useAuth(): Promise<Auth> {
  let user = null;
  let error = null;
  try {
    const res = await API.get("/api/auth/me");
    if (res) {
      user = res.data?.data as User;
    }
  } catch (err) {
    // console.log(err.response.data);
    error = err as AxiosError;
  }
  return { user, error };
}
