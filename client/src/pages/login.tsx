import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { z } from "zod";
import axios from "axios";
import { Link } from "react-router-dom";
import { FacebookIcon, GithubIcon } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({
    message: "Invaild Email",
  }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be less than 64 characters"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // console.log(email, password);
    try {
      const data = loginSchema.parse({ email, password });
      console.log(data);
      setEmailError("");
      setPasswordError("");
      const res = await axios.post("http://localhost:3001/auth/login", data);
      console.log(res.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.map((err) => {
          console.log(err.path[0]);
          if (err.path[0] === "email") {
            setEmailError(err.message);
          }
          if (err.path[0] === "password") {
            setPasswordError(err.message);
          }
        });
        // console.log(error.errors);
        // setEmailError(error.errors[0].message);
        // setPasswordError(error.errors[1].message);
      }
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
  return (
    <div className="flex justify-center h-screen items-center ">
      <Card className="p-3 w-full max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl text-center">Sign In</h2>
          <Input
            placeholder="Email"
            className="my-3"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <p className="text-destructive my-2">{emailError}</p>
          <Input
            placeholder="Password"
            className="my-3"
            type="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          {passwordError && (
            <p className="text-destructive my-2">{passwordError}</p>
          )}
          <div className="flex justify-center my-3 gap-2">
            <GithubIcon
              size={33}
              className="border rounded-lg p-1 cursor-pointer"
            />
            <FacebookIcon
              size={33}
              className="border rounded-lg p-1 cursor-pointer"
            />
            <GithubIcon
              size={33}
              className="border rounded-lg p-1 cursor-pointer"
            />
          </div>
          <Button className="w-full">Sign In</Button>
        </form>
        <p className="text-center py-3">
          Don't have an account?{" "}
          <Link to={"/signup"} className="underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}
