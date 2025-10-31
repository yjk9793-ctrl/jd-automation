import { NextRequest, NextResponse } from 'next/server';
import { removeAuthCookieInResponse } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true });
  return removeAuthCookieInResponse(response);
}


