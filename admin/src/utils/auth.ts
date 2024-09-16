"use server";
import { User } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Auth {
  user: User | null;
  error: string | null;
}
export async function useAuth(): Promise<Auth> {
  let user = null;
  let error = null;
  try {
    const accessToken = cookies().get("access_token");
    console.log(accessToken);

    const response = await fetch("http://localhost:3000/api/v1/auth/me", {
      headers: {
        "Set-Cookie": accessToken?.value || "",
      },
    });
    if (!response) throw new Error("Error getting data");
    const data = await response.json();
    if (!data) throw new Error("Error parsing data");
    user = data?.data as User;
  } catch (err: unknown) {
    // console.log(err.response.data);
    if (err instanceof Error) {
      error = err.message;
    }
  }
  return { user, error };
}
