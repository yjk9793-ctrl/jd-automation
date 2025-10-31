import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  if (!code) return NextResponse.redirect('/');

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://jdxwork.com'}/api/auth/oauth/google/callback`;

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    
    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error('Google OAuth token error:', errorText);
      console.error('Redirect URI:', redirectUri);
      return NextResponse.redirect('/?error=oauth_failed');
    }
    
    const tokenJson = await tokenRes.json();
    if (!tokenJson.id_token) {
      console.error('No id_token in response:', tokenJson);
      return NextResponse.redirect('/?error=oauth_failed');
    }
    
    const idToken = tokenJson.id_token as string;
    // Parse id_token (JWT) to get email
    const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
    const email: string = payload.email;
    const name: string | undefined = payload.name;

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) user = await prisma.user.create({ data: { email, password: 'oauth_google', name } });

    const token = await signToken({ id: user.id, email: user.email });
    await setAuthCookie(token);
    return NextResponse.redirect('/');
  } catch (e) {
    return NextResponse.redirect('/');
  }
}


