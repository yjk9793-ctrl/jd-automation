import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    console.log('GET /api/auth/me - checking authentication');
    const authUser = await getUserFromRequest(req);
    
    if (!authUser) {
      console.log('GET /api/auth/me - no authenticated user found');
      return NextResponse.json({ authenticated: false });
    }
    
    console.log('GET /api/auth/me - authUser found:', authUser.email);
    
    // 데이터베이스에서 전체 사용자 정보 가져오기
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true, email: true, name: true },
    });
    
    if (!user) {
      console.log('GET /api/auth/me - user not found in database');
      return NextResponse.json({ authenticated: false });
    }
    
    console.log('GET /api/auth/me - returning user:', user.email);
    return NextResponse.json({ authenticated: true, user });
  } catch (error: any) {
    console.error('GET /api/auth/me - error:', error?.message || error);
    return NextResponse.json({ authenticated: false });
  }
}


