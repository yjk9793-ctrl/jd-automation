import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { signToken, setAuthCookieInResponse } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jdxwork.com';
  
  console.log('Google OAuth callback:', { code: !!code, error, url: req.url });
  
  // 구글에서 에러가 발생한 경우
  if (error) {
    console.error('Google OAuth error from provider:', error);
    return NextResponse.redirect(`${baseUrl}/?error=oauth_failed&reason=${error}`);
  }
  
  if (!code) {
    console.error('No code in OAuth callback');
    return NextResponse.redirect(`${baseUrl}/?error=oauth_failed&reason=no_code`);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${baseUrl}/api/auth/oauth/google/callback`;

  console.log('OAuth config:', { 
    hasClientId: !!clientId, 
    hasClientSecret: !!clientSecret, 
    redirectUri 
  });

  if (!clientId || !clientSecret) {
    console.error('Missing Google OAuth credentials');
    return NextResponse.redirect(`${baseUrl}/?error=oauth_failed&reason=missing_credentials`);
  }

  try {
    console.log('Exchanging code for token...');
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
      console.error('Status:', tokenRes.status);
      console.error('Redirect URI:', redirectUri);
      console.error('Client ID:', clientId?.substring(0, 20) + '...');
      return NextResponse.redirect(`${baseUrl}/?error=oauth_failed&reason=token_exchange_failed`);
    }
    
    const tokenJson = await tokenRes.json();
    console.log('Token response:', { hasIdToken: !!tokenJson.id_token, hasAccessToken: !!tokenJson.access_token });
    
    if (!tokenJson.id_token) {
      console.error('No id_token in response:', tokenJson);
      return NextResponse.redirect(`${baseUrl}/?error=oauth_failed&reason=no_id_token`);
    }
    
    const idToken = tokenJson.id_token as string;
    // Parse id_token (JWT) to get email
    const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
    const email: string = payload.email;
    const name: string | undefined = payload.name;

    console.log('Parsed user info:', { email, name });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.log('Creating new user:', email);
      user = await prisma.user.create({ data: { email, password: 'oauth_google', name } });
    } else {
      console.log('Found existing user:', user.email);
    }

    const token = await signToken({ id: user.id, email: user.email });
    console.log('Setting auth cookie for user:', user.email);
    
    const response = NextResponse.redirect(`${baseUrl}/`);
    const responseWithCookie = setAuthCookieInResponse(response, token);
    
    console.log('OAuth callback success, redirecting to:', baseUrl);
    return responseWithCookie;
  } catch (e: any) {
    console.error('OAuth callback error:', e?.message || e);
    console.error('Stack:', e?.stack);
    return NextResponse.redirect(`${baseUrl}/?error=oauth_failed&reason=exception`);
  }
}


