import { z } from "zod";

// Zod validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  // rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Zod validation schema
export const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters long")
      .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.enum(["student", "lecturer", "admin"]),
    matricNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.role === "student") {
        return data.matricNumber && data.matricNumber.trim() !== "";
      }
      return true;
    },
    {
      message: "Matriculation number is required for students",
      path: ["matricNumber"],
    }
  )
  .refine(
    (data) => {
      if (data.role === "student" && data.matricNumber) {
        return /^u\d{4}\/\d+$/.test(data.matricNumber);
      }
      return true;
    },
    {
      message: "Matriculation number must be in the format u2019/5570108",
      path: ["matricNumber"],
    }
  );

export type SignupFormData = z.infer<typeof signupSchema>;
