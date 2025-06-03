import { SignInForm } from "../../components/auth/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Or&nbsp;
            <Link 
              href="/signup" 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
            </Link>
          </p>
        </div>

        <SignInForm />

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link 
            href="/signup" 
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
