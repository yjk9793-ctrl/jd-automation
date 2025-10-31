import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const authUser = await getUserFromRequest(req);
    if (!authUser) {
      return NextResponse.json({ authenticated: false });
    }
    
    // 데이터베이스에서 전체 사용자 정보 가져오기
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: { id: true, email: true, name: true },
    });
    
    if (!user) {
      return NextResponse.json({ authenticated: false });
    }
    
    return NextResponse.json({ authenticated: true, user });
  } catch (error) {
    console.error('Failed to get user:', error);
    return NextResponse.json({ authenticated: false });
  }
}


