"use client";

import { useRegisterUserMutation } from "@/Redux/Slice/UserApiSlice";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [serverErrors, setServerErrors] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()])
    );

    try {
      await registerUser(cleanedData).unwrap();
      toast.success("User registered successfully! 🎉");
      setFormData({ name: "", email: "", password: "", phoneNumber: "" });
      setServerErrors(null);
    } catch (err: any) {
      console.log("Registration Error:", err);

      const errorMessage = Array.isArray(err?.data?.errors)
        ? err.data.errors.map((e: any) => e.msg).join(", ")
        : err?.data?.errors?.msg || err?.data?.message || "Registration failed! ❌";

      setServerErrors(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 px-4">
      <Card className="w-full max-w-md p-6 shadow-xl border border-gray-800 bg-gray-900 rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-white text-2xl">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { name: "name", type: "text", placeholder: "Enter your name", icon: <User size={20} /> },
              { name: "email", type: "email", placeholder: "Enter your email", icon: <Mail size={20} /> },
              { name: "phoneNumber", type: "tel", placeholder: "Enter your phone number", icon: <Phone size={20} /> },
            ].map((field, index) => (
              <div key={index} className="flex flex-col gap-2 relative">
                <Label htmlFor={field.name} className="text-white capitalize">
                  {field.name.replace(/([A-Z])/g, " $1")}
                </Label>
                <div className="relative">
                  <Input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 text-white border-gray-700 focus:ring-2 focus:ring-blue-500 pl-10"
                  />
                  <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                    {field.icon}
                  </div>
                </div>
              </div>
            ))}

            {/* Password Field with Show/Hide Toggle */}
            <div className="flex flex-col gap-2 relative">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
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
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
