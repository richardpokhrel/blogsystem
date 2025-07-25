import { LoginForm } from "@/components/login-form";


export default function Login() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <LoginForm />
            </div>
        </div>
    )
}