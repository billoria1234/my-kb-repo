// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth";
import { NextRequest } from "next/server";

export const GET = (request: NextRequest) => handlers.GET(request);
export const POST = (request: NextRequest) => handlers.POST(request);