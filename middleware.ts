import { NextResponse, type NextRequest } from 'next/server';
import { cookies as nextCookies } from 'next/headers';

const publicPaths = ['/auth'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.some((p) => pathname.startsWith(p));

  if (isPublicPath) {
    return NextResponse.next();
  }

  const cookieStore = await nextCookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    const loginUrl = new URL('/auth/sign-in', request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
