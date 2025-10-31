import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'auth_token';
const ALGORITHM = 'HS256';

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET || 'dev_secret_change_me';
  return new TextEncoder().encode(secret);
}

export async function signToken(payload: Record<string, unknown>) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey());
}

export function setAuthCookieInResponse(response: NextResponse, token: string) {
  // Vercel 프로덕션 환경에서는 https를 사용하므로 secure: true
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  
  // 쿠키 옵션 설정 - 모든 환경에서 작동하도록 최적화
  // sameSite를 'none'으로 설정하면 secure가 필수입니다
  const cookieOptions: any = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  };
  
  // Production에서는 secure 필수
  if (isProduction) {
    cookieOptions.secure = true;
  }
  
  response.cookies.set(AUTH_COOKIE, token, cookieOptions);
  
  // Set-Cookie 헤더를 직접 확인하여 제대로 설정되었는지 검증
  const setCookieHeader = response.headers.get('set-cookie');
  console.log('Setting auth cookie:', { 
    name: AUTH_COOKIE, 
    hasToken: !!token, 
    tokenLength: token?.length,
    isProduction,
    secure: cookieOptions.secure,
    path: cookieOptions.path,
    sameSite: cookieOptions.sameSite,
    setCookieHeader: setCookieHeader?.substring(0, 100) // 처음 100자만 로그
  });
  
  if (!setCookieHeader || !setCookieHeader.includes(AUTH_COOKIE)) {
    console.error('WARNING: Set-Cookie header not properly set!', setCookieHeader);
  }
  
  return response;
}

export function removeAuthCookieInResponse(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE, '', { path: '/', maxAge: 0 });
  return response;
}

export async function getUserFromRequest(req: NextRequest): Promise<{ id: string; email: string } | null> {
  try {
    const allCookies = req.cookies.getAll();
    console.log('All cookies:', allCookies.map(c => c.name));
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    console.log('Auth cookie found:', !!token, 'Token length:', token?.length);
    
    if (!token) {
      console.log('No auth token found in cookies');
      return null;
    }
    
    const { payload } = await jwtVerify(token, getSecretKey());
    console.log('Token verified, user:', payload.email);
    return { id: String(payload.id), email: String(payload.email) };
  } catch (error: any) {
    console.error('Failed to verify token:', error?.message);
    return null;
  }
}


