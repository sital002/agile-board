"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { API } from "@/utils/api";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormInputType = z.infer<typeof formSchema>;

export function LoginForm() {
  const form = useForm<FormInputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit: SubmitHandler<FormInputType> = async (data: any) => {
    try {
      setLoading(true);
      setError(null);
      const resp = await API.post(`/api/auth/signin`, data);
      if (resp.status === 200) {
        console.log(resp);
        router.replace("/dashboard");
        router.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message ?? "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen items-center justify-center px-2">
      <Card className="w-full max-w-lg p-3">
        <h1 className="my-2 text-center text-2xl font-semibold">Signin</h1>
        {<p className="text-destructive">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={`w-full`} type="submit" disabled={loading}>
              {loading ? "Loading" : "Login"}
            </Button>
            <p>
              Don &apos;t have an account{" "}
              <Link href={"/signup"} className="underline">
                Signup
              </Link>
            </p>
          </form>
        </Form>
      </Card>
    </div>
  );
}
