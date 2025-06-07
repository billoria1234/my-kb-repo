// app/signup/page.tsx

import SignUpForm from "@/components/auth/SignUpForm";


export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Create an Account</h1>
        <SignUpForm/>
      </div>
    </div>
  );
}
