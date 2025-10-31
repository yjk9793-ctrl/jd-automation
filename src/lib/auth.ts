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
  
  // 쿠키 옵션 설정
  const maxAge = 60 * 60 * 24 * 7; // 7 days
  const sameSite = 'lax';
  const path = '/';
  const httpOnly = true;
  const secure = isProduction;
  
  // Set-Cookie 헤더 문자열 직접 생성 (더 안정적)
  let cookieValue = `${AUTH_COOKIE}=${token}; Path=${path}; Max-Age=${maxAge}; SameSite=${sameSite}`;
  if (httpOnly) cookieValue += '; HttpOnly';
  if (secure) cookieValue += '; Secure';
  
  // 기존 Set-Cookie 헤더 가져오기
  const existingCookies = response.headers.get('set-cookie');
  
  // 새로운 쿠키 추가
  if (existingCookies) {
    response.headers.set('Set-Cookie', `${existingCookies}, ${cookieValue}`);
  } else {
    response.headers.set('Set-Cookie', cookieValue);
  }
  
  console.log('Setting auth cookie:', { 
    name: AUTH_COOKIE, 
    hasToken: !!token, 
    tokenLength: token?.length,
    isProduction,
    secure,
    path,
    sameSite,
    cookieHeader: cookieValue.substring(0, 100)
  });
  
  // 검증
  const setCookieHeader = response.headers.get('set-cookie');
  if (!setCookieHeader || !setCookieHeader.includes(AUTH_COOKIE)) {
    console.error('WARNING: Set-Cookie header not properly set!', setCookieHeader);
  } else {
    console.log('✓ Cookie header successfully set');
  }
  
  return response;
}

export function removeAuthCookieInResponse(response: NextResponse) {
  // Set-Cookie 헤더를 직접 설정하여 쿠키 삭제
  const cookieValue = `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=lax; HttpOnly`;
  const existingCookies = response.headers.get('set-cookie');
  
  if (existingCookies) {
    response.headers.set('Set-Cookie', `${existingCookies}, ${cookieValue}`);
  } else {
    response.headers.set('Set-Cookie', cookieValue);
  }
  
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


