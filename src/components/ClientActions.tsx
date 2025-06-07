// components/ClientActions.tsx
'use client';

import { Session } from "next-auth";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

type Props = {
  session: Session | null;
};

export default function ClientActions({ session }: Props) {
  if (session) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    );
  }

  return (
    <div className="flex gap-4">
      <Link
        href="/signin"
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
      >
        Sign In
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Sign Up
      </Link>
    </div>
  );
}
