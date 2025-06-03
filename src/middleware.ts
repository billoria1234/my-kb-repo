// src/middleware.ts
import { NextResponse, NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default async function middleware(req: NextRequest) {
  const sessionCookie = req.cookies.get('next-auth.session-token') 
                      || req.cookies.get('__Secure-next-auth.session-token');

  const { pathname } = req.nextUrl;

  if (pathname === '/' || sessionCookie) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', req.url));
}