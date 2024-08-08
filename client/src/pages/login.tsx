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

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
    console.log(data);
    try {
      
      const resp=await API.post(`/api/auth/signin`,{
        data
      })
      console.log(resp);
      if (resp.status) {
        navigate("/board");
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return (
    <div className="w-full mt-[10%] md:max-w-md lg:max-w-lg mx-auto border-2 p-3 rounded-md">
      <h1 className="text-2xl font-semibold text-center my-2">Signin</h1>
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
          <Button className="w-full" type="submit">
            Login
          </Button>
          <p>
            Don't have an account{" "}
            <Link to={"/signup"} className="underline">
              Signup
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}

export default Login;
