import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Simple redirect logic - auth checking will be done client-side
  // If user tries to access dashboard, let the client components handle auth
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 