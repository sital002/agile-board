import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError, ApiResponse } from "@/api/api-response";
import { AxiosError } from "axios";

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
  const queryClient = useQueryClient();

  const loginMutation = useMutation<
    ApiResponse,
    AxiosError<ApiError>,
    FormInputType
  >({
    mutationFn: (data: FormInputType) => API.post(`/api/auth/signin`, data),
    onSuccess: () => {
      navigate("/projects");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="mx-auto flex h-screen items-center justify-center px-2">
      <Card className="w-full max-w-lg p-3">
        <h1 className="my-2 text-center text-2xl font-semibold">Signin</h1>
        {
          <p className="my-2 text-sm text-red-500">
            {loginMutation.isError &&
              loginMutation.error.response?.data.message}
          </p>
        }
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
            <Button
              className={`w-full`}
              type="submit"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Loading" : "Login"}
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
