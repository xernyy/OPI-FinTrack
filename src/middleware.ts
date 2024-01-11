import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { Database } from '@/types/database.types';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })


  // Retrieve the session from the cookie
  const { data: { session } } = await supabase.auth.getSession();

  // Define protected routes based on authentication status
  const protectedRoutesWhenUnauthenticated = ['/dashboard', '/project'];

  // Get the current path and origin
  const url = new URL(req.url);
  const path = url.pathname;
  const origin = url.origin;

  // Check for authentication and redirect if necessary
  if (!session && protectedRoutesWhenUnauthenticated.includes(path)) {
    // User is not authenticated but trying to access a protected route
    // Redirect to signin or another appropriate route using absolute URL
    return NextResponse.redirect(`${origin}/signin`);
  }

  // Proceed with the request if no redirection is needed
  return NextResponse.next();
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    '/dashboard',
    '/project',
  ],
};
