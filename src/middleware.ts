import { NextResponse, type NextRequest } from 'next/server';

/**
 * Edge middleware. Runs before every matched request.
 * Use it for auth gates, redirects, locale handling, A/B flags, or request headers.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Forward the current pathname so server components can read it without parsing the URL.
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
