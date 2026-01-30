import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_PATHS = ['/estates', '/overview', '/security', '/staff', '/scope', '/vendors', '/budgets', '/settings', '/leads'];

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  // If visiting app.chatmanconcierge.com root, redirect to /login
  if (hostname.startsWith('app.') && pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect dashboard routes — require auth cookie
  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );

  if (isProtected) {
    const token = request.cookies.get('security_auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/estates/:path*', '/overview/:path*', '/security/:path*', '/staff/:path*', '/scope/:path*', '/vendors/:path*', '/budgets/:path*', '/settings/:path*', '/leads/:path*'],
};
