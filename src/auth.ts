import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Simulated user lookup (replace with DB check)
        const user = {
          id: "1",
          email: credentials?.email,
          name: "Test User",
        };

        // You should validate credentials here
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Always return null if user is invalid
        if (user) {
          return user as User;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
