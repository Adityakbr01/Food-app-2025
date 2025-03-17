"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useLoginUserMutation } from "@/Redux/Slice/UserApiSlice"

// Validation Schema
const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  // In a real app, you would use your Redux hook
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // Submit Handler
  const [loginUserMutation] = useLoginUserMutation(); // Extract the mutation function

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await loginUserMutation(data).unwrap(); // Call the mutation function correctly
  
      toast.success("Login successful! 🎉");
      reset();
    } catch (err: any) {
      console.log("Login Error:", err);
  
      const errorMessage = err?.data?.message || "Login failed! ❌";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <Card className="w-full max-w-md p-6 shadow-xl border border-gray-800 bg-gray-900 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-white text-2xl">Login to Your Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className="bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500 pl-10"
                />
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Mail size={20} />
                </div>
              </div>
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-blue-400 text-sm hover:text-blue-300">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                  className="bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500 pl-10 pr-10"
                />
                <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Lock size={20} />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/Register" className="text-blue-400 hover:text-blue-300">
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

