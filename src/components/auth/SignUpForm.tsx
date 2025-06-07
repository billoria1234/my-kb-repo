"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface FormData {
  email: string;
  password: string;
  username: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: ""
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // 1. First create the user via our custom endpoint
      const signupResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      // First check if response is JSON
      const contentType = signupResponse.headers.get("content-type");
      let errorMessage = "Signup failed";

      if (contentType?.includes("application/json")) {
        const errorData = await signupResponse.json();
        errorMessage = errorData.message || errorMessage;
      } else {
        const text = await signupResponse.text();
        errorMessage = text || errorMessage;
      }

      if (!signupResponse.ok) {
        throw new Error(errorMessage);
      }

      // 2. Then automatically log the user in
      const loginResult = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }

      // 3. Redirect to protected page
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Signup error:", err);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
    </form>
  );
}