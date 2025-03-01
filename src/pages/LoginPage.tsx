"use client";
import { login } from "@/apis/authService";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginPageComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await login({ email, password });

      if (response.accessToken) {
        // Lưu token vào localStorage hoặc cookies
        localStorage.setItem("token", response.accessToken);
        toast.success("Login successful!");
        // router.push("/dashboard"); // hoặc trang chính sau khi đăng nhập
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error((error as any).message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-80 h-80">
        <CardHeader className="text-center">Login</CardHeader>
        <div className="px-8">
          <Input
            className="py-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          <br />
          <Input
            className="py-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <br />
          <Button
            className="w-full"
            onClick={handleAction}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPageComponent;
