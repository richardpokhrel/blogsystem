import { SignupForm } from "@/components/sign-up"




export default function SignupPage() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <SignupForm/>
            </div>
        </div>
    )
}