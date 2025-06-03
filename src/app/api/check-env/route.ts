// app/api/check-env/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? "exists" : "missing",
    NODE_ENV: process.env.NODE_ENV,
  });
}