import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "../../src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/ui/form";
import { Input } from "../../src/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { API } from "@/utils/api";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { isAxiosError } from "axios";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  email: z.string().email({ message: "invalid email" }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type FormInputType = z.infer<typeof formSchema>;

function Login() {
  const navigate = useNavigate();
  const form = useForm<FormInputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
    try {
      setLoading(true);
      const resp = await API.post(`/api/auth/signin`, data);
      console.log(resp);
      if (resp.status) {
        navigate("/create");
        queryClient.invalidateQueries({
          queryKey: ["user"],
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
      if (isAxiosError(error)) {
        toast({
          title: "Something went wrong",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen items-center justify-center px-2">
      <Card className="w-full max-w-lg p-3">
        <h1 className="my-2 text-center text-2xl font-semibold">Signin</h1>
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
              Don't have an account{" "}
              <Link to={"/signup"} className="underline">
                Signup
              </Link>
            </p>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
