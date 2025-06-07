import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the built-in session types
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      username?: string;
      // Add any other custom properties you want in the session
    } & DefaultSession["user"];
  }

  /**
   * Extends the built-in user types
   */
  interface User extends DefaultUser {
    id: string;
    username?: string;
    // Add any other custom properties from your User model
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the built-in JWT types
   */
  interface JWT extends DefaultJWT {
    id: string;
    username?: string;
    // Add any other custom properties you want in the JWT
  }
}