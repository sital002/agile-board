import { useAuth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await useAuth();
  if (!user) return redirect("/login");
  redirect("/dashboard");
}
