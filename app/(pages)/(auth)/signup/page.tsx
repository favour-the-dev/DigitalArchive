"use client";
import MotionWrapper from "@/app/helpers/MotionHelper";
import Link from "next/link";
import {
  FaFileArchive,
  FaEye,
  FaEyeSlash,
  FaChevronDown,
} from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormData, signupSchema } from "@/schemas/schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Role options
const roles = [
  { value: "student", label: "Student" },
  { value: "lecturer", label: "Lecturer" },
  { value: "admin", label: "Admin" },
] as const;

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      matricNumber: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setApiError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors from the server
        if (result.errors) {
          // Set specific field errors
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              setError(field as keyof SignupFormData, {
                type: "server",
                message: messages[0],
              });
            }
          });
        } else {
          // Set general error message
          setApiError(result.message || "Registration failed");
          toast.error(result.message || "Registration failed");
        }
        return;
      }

      // Success - show success message and redirect
      toast.success("Account created successfully! Please log in.");

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      setApiError("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="fixed inset-0 z-[500] w-full bg-darkBg text-white flex flex-col items-center justify-center py-8">
      <Link
        href="/"
        className="absolute top-[15px] left-[15px] text-sm text-brightPurple cursor-pointer flex items-center gap-1 mb-1"
      >
        <ChevronLeft className="mr-1" />
        Back to Home
      </Link>

      {/* header */}
      <MotionWrapper className="w-[80%] md:w-1/3 flex flex-col items-center gap-2">
        <Link href={"/"} className="flex items-center">
          <div className="bg-brightPurple text-white mr-2 w-8 h-8 md:w-10 md:h-10 rounded-full border-[2px] border-[#EBD3F8] flex items-center justify-center p-2">
            <FaFileArchive className="md:text-lg" />
          </div>
          <span className="text-[#EBD3F8] md:text-lg font-bold uppercase">
            Digital Archive System
          </span>
        </Link>
        <h1 className="text-lg md:text-xl text-white font-semibold capitalize text-center">
          Create your account
        </h1>
        <p className="w-fit px-3 flex items-center gap-3">
          <span className="text-gray-500 font-medium text-sm">
            Already have an account?
          </span>
          <Link
            href="/login"
            className="text-xs text-brightPurple font-medium underline hover:text-[#EBD3F8] transition-colors"
          >
            sign in here
          </Link>
        </p>
      </MotionWrapper>

      {/* form */}
      <MotionWrapper className="w-[80%] md:w-1/3 mt-6 overflow-y-scroll">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* General API Error */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          {/* Full Name Field */}
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-[#EBD3F8]"
            >
              Full Name
            </label>
            <input
              {...register("fullName")}
              type="text"
              id="fullName"
              className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:border-brightPurple focus:ring-brightPurple"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#EBD3F8]"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-600 focus:border-brightPurple focus:ring-brightPurple"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[#EBD3F8]"
            >
              Role
            </label>
            <div className="relative">
              <select
                {...register("role")}
                id="role"
                className={`w-full px-4 py-3 bg-darkBg border rounded-lg text-white focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                  errors.role
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-brightPurple focus:ring-brightPurple"
                }`}
              >
                {roles.map((role) => (
                  <option
                    key={role.value}
                    value={role.value}
                    className="bg-darkBg text-white"
                  >
                    {role.label}
                  </option>
                ))}
              </select>
              <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Matriculation Number Field - Only for students */}
          {watch("role") === "student" && (
            <div className="space-y-2">
              <label
                htmlFor="matricNumber"
                className="block text-sm font-medium text-[#EBD3F8]"
              >
                Matriculation Number
              </label>
              <input
                {...register("matricNumber")}
                type="text"
                id="matricNumber"
                className={`w-full px-4 py-3 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.matricNumber
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-brightPurple focus:ring-brightPurple"
                }`}
                placeholder="e.g., u2019/5570108"
              />
              {errors.matricNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.matricNumber.message}
                </p>
              )}
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#EBD3F8]"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                id="password"
                className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-brightPurple focus:ring-brightPurple"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brightPurple transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#EBD3F8]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className={`w-full px-4 py-3 pr-12 bg-transparent border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600 focus:border-brightPurple focus:ring-brightPurple"
                }`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-brightPurple transition-colors"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brightPurple hover:bg-mainPurple text-white font-semibold py-3 px-4 
            rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 
            focus:ring-brightPurple focus:ring-offset-2 focus:ring-offset-darkBg disabled:opacity-50 
            disabled:cursor-not-allowed mt-6"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </MotionWrapper>
    </section>
  );
}

export default Signup;
