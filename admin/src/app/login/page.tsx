import { Metadata } from "next";
import { LoginForm } from "./_components/login-form";
import { useAuth } from "@/utils/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Agile Board - Login",
  description:
    "This is a simple admin dashboard for Agile Board. It is built using Next.js (App Router). It can be used to manage the users, projects, and tasks of the Agile Board. It is a simple and easy-to-use dashboard that can be used by the admin to manage the Agile Board.",
};

export default async function Login() {
  const { user } = await useAuth();
  if (user) return redirect("/dashboard");
  return (
    <div>
      <LoginForm />
    </div>
  );
}
