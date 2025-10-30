import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://jdxwork.com'}/api/auth/oauth/google/callback`;
  const scope = encodeURIComponent('openid email profile');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&access_type=online&prompt=consent`;
  return NextResponse.redirect(url);
}


