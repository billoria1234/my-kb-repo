// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session types
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      // Add any other custom properties you need
    } & DefaultSession["user"];
  }

  /**
   * Extends the built-in user types
   */
  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    image?: string;
    // Add any other custom properties you need
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT types
   */
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
    image?: string;
    // Add any other custom properties you need
  }
}