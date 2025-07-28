import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
