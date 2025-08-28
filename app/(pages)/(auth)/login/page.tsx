"use client";
import MotionWrapper from "@/app/helpers/MotionHelper";
import Link from "next/link";
import { FaFileArchive, FaEye, FaEyeSlash } from "react-icons/fa";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/schemas/schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      // rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error) {
        toast.error("Invalid credentials"); // always comes back here
        return;
      }
      if (session.data?.user?.role === "student") {
        router.push("/student/dashboard");
        toast.success("Welcome Student");
      } else if (session.data?.user?.role === "admin") {
        router.push("/admin/dashboard");
        toast.success("Welcome Admin");
      } else {
        router.push("/lecturer/dashboard");
        toast.success("Welcome Lecturer");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="fixed inset-0 z-[500] w-full bg-darkBg text-white flex flex-col items-center justify-center">
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
          Sign into your account
        </h1>
        <p className="w-fit px-3 flex items-center gap-3">
          <span className="text-gray-500 font-medium text-sm">Or</span>
          <Link
            href="/signup"
            className="text-xs text-brightPurple font-medium underline hover:text-[#EBD3F8] transition-colors"
          >
            create a new account
          </Link>
        </p>
      </MotionWrapper>

      {/* form */}
      <MotionWrapper className="w-[80%] md:w-1/3 mt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          {/* Remember Me and Forgot Password */}
          <div className="w-full flex items-end justify-end">
            {/* <div className="flex items-center space-x-2">
              <input
                {...register("rememberMe")}
                type="checkbox"
                id="rememberMe"
                className="w-4 h-4 text-brightPurple bg-transparent border-gray-600 rounded focus:ring-brightPurple focus:ring-2"
              />
              <label
                htmlFor="rememberMe"
                className="text-xs text-gray-300 cursor-pointer"
              >
                Remember me
              </label>
            </div> */}
            <Link
              href="/forgot-password"
              className="text-sm text-brightPurple hover:text-[#EBD3F8] transition-colors underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brightPurple hover:bg-mainPurple text-white font-semibold py-3 px-4 
            rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 
            focus:ring-brightPurple focus:ring-offset-2 focus:ring-offset-darkBg disabled:opacity-50 
            disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </MotionWrapper>
    </section>
  );
}

export default Login;
