'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser } from "@/utils/userAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const success = loginUser(username, password);
    if (success) {
      toast.success("Login successful!");
      router.push("/"); // redirect to homepage or user dashboard
    } else {
      toast.error("Invalid username or password.");
    }
  };

  return (
    <Card className="max-w-sm mx-auto mt-20">
      <CardHeader>
        <CardTitle className="text-center text-2xl">User Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
