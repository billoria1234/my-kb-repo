// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server';

const publicRoutes = [
  '/',
  '/signin',
  '/signup',  // Make sure signup is explicitly listed
  '/auth/error',
  '/api/auth',
  '/_next',
  '/favicon.ico'
];

export const config = {
  matcher: ['/((?!_next/static|_next/image|images|fonts|icons|favicon.ico).*)'],
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.some(route => 
      pathname === route || 
      pathname.startsWith(route) ||
      pathname.startsWith('/_next/')
  )) {
    return NextResponse.next();
  }

  // Rest of your middleware logic...
  const sessionToken = req.cookies.get(
    process.env.NODE_ENV === 'production' 
      ? '__Secure-next-auth.session-token' 
      : 'next-auth.session-token'
  )?.value;

  if (!sessionToken) {
    const signInUrl = new URL('/signin', req.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}