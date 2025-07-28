"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser, login } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  // ✅ Check if user is already logged in
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setIsAuthenticated(true);
      if (currentUser.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/blog");
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(username, password);

    if (result === "admin") {
      router.push("/admin");
    } else if (result === "user") {
      router.push("/blog");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin or user"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
