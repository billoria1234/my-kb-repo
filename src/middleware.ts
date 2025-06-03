// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add common headers or auth checks here
  const response = NextResponse.next();
  response.headers.set('x-version', '1.0');
  return response;
}