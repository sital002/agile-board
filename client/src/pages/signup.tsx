import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";

const EmailSchema = z.object({
  email: z.string().email({
    message: "Invaild Email",
  }),
});

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // console.log(email, password);
    try {
      const data = EmailSchema.parse({ email });
      setEmailError("");
      console.log(data.email);
      const res = await axios.post("http://localhost:3001/auth/signup", data);
      console.log(res.data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.map((err) => {
          if (err.path[0] === "email") {
            setEmailError(err.message);
          }
        });
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
          <h2 className="text-xl text-center">Create a new account</h2>
          <Input
            placeholder="Email"
            className="my-3"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <p className="text-destructive my-2">{emailError}</p>
          <Button className="w-full">Sign up</Button>
        </form>
        <p className="text-center py-3">
          Already have an account{" "}
          <Link to={"/signin"} className="underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;
