"use client";

import { useRegisterUserMutation } from "@/Redux/Slice/UserApiSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import Link from "next/link";

// ✅ **Validation Schema**
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").nonempty("Name is required"),
  email: z.string().email("Please provide a valid email"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .regex(/\d/, "Password must contain a number")
    .regex(/[a-zA-Z]/, "Password must contain a letter"),
  phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
});

export default function Register() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ **React Hook Form Setup**
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // ✅ **Submit Handler**
  const onSubmit = async (data: any) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully! 🎉");
      reset();
    } catch (err: any) {
      console.log("Registration Error:", err);

      const errorMessage = Array.isArray(err?.data?.errors)
        ? err.data.errors.map((e: any) => e.msg).join(", ")
        : err?.data?.errors?.msg || err?.data?.message || "Registration failed! ❌";

      toast.error(errorMessage);

      // Server errors ko UI pe dikhane ke liye
      if (Array.isArray(err?.data?.errors)) {
        err.data.errors.forEach((e: any) => {
          setError(e.param, { message: e.msg });
        });
      }
    }
  };


  const fields = [
    { name: "name", type: "text", placeholder: "Enter your name", icon: <User size={20} /> },
    { name: "email", type: "email", placeholder: "Enter your email", icon: <Mail size={20} /> },
    { name: "phoneNumber", type: "tel", placeholder: "Enter your phone number", icon: <Phone size={20} /> },
  ] as const;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <Card className="w-full max-w-md p-6 shadow-xl border border-gray-800 bg-gray-900 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-white text-2xl">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {fields.map((field, index) => (
              <div key={index} className="flex flex-col gap-2 relative">
                <Label htmlFor={field.name} className="text-white capitalize">
                  {field.name.replace(/([A-Z])/g, " $1")}
                </Label>
                <div className="relative">
                  <Input
                    type={field.type}
                    {...register(field.name)}
                    placeholder={field.placeholder}
                    className="bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500 pl-10"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    {field.icon}
                  </div>
                </div>
                {errors[field.name] && <p className="text-red-500">{errors[field.name]?.message as string}</p>}
              </div>
            ))}

            {/* Password Field */}
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
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
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/Login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
