import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === '/resume.pdf') {
    return NextResponse.rewrite(new URL('/resume', request.url));
  }

  return NextResponse.next();
}