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
import { API } from "@/utils/api";
import { Link } from "react-router-dom";

const formSchema = z
  .object({
    display_name: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({ message: "invalid email" }).min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirm_password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((value) => value.password === value.confirm_password, {
    message: "password not match",
    path: ["cpassword"],
  });

type FormInputType = z.infer<typeof formSchema>;

const onSubmit: SubmitHandler<FormInputType> = async (data) => {
  console.log(data);
  try {
    const resp = await API.post(`/api/auth/signup`, data);
    console.log(resp);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
  }
};

export function Signup() {
  const form = useForm<FormInputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      display_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  return (
    <div className="mx-auto mt-[7%] w-full rounded-md border-2 p-5 md:max-w-md lg:max-w-lg">
      <h1 className="my-2 text-center text-2xl font-semibold">
        Create Your Account
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="display_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="enter your confirm password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Signup
          </Button>
          <p>
            Already have an account{" "}
            <Link to={"/signin"} className="underline">
              Signin
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
