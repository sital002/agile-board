import z from "zod";

export const SignUpSchema = z
  .object({
    display_name: z
      .string()
      .trim()
      .min(3, { message: "Name must be atleast 3 characters" })
      .max(64, {
        message: "Name must be atmost 64 characters",
      }),
    email: z.string().trim().email({
      message: "Invaild Email",
    }),

    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be atleast 8 characters" })
      .max(64, {
        message: "Password must be atmost 64 characters",
      }),
    confirm_password: z
      .string()
      .trim()
      .min(8, { message: "Password must be atleast 8 characters" })
      .max(64, {
        message: "Password must be atmost 64 characters",
      }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and confirm password must be same",
  });
