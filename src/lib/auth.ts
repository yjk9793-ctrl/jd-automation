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
  // 하지만 개발 환경에서는 secure: false로 설정
  const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
  
  // 쿠키 옵션 설정 - 모든 환경에서 작동하도록 최적화
  const cookieOptions = {
    httpOnly: true,
    path: '/',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    ...(isProduction && { secure: true }), // Production에서만 secure
  };
  
  response.cookies.set(AUTH_COOKIE, token, cookieOptions);
  
  console.log('Setting auth cookie:', { 
    name: AUTH_COOKIE, 
    hasToken: !!token, 
    tokenLength: token?.length,
    isProduction,
    secure: cookieOptions.secure,
    domain: undefined, // 명시적으로 도메인 미설정 (현재 도메인 사용)
    path: cookieOptions.path,
    sameSite: cookieOptions.sameSite
  });
  
  // Set-Cookie 헤더 직접 확인을 위한 로그
  const cookieHeader = response.headers.get('set-cookie');
  console.log('Set-Cookie header:', cookieHeader);
  
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


