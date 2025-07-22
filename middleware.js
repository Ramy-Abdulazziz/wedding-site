import { updateSession } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server';

export async function middleware(req) {
  return await updateSession(req);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|$).*)',
  ],
};
