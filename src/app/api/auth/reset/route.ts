import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

const Schema = z.object({ token: z.string(), password: z.string().min(8) });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = Schema.parse(body);

    const record = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record || record.expiresAt < new Date()) {
      return NextResponse.json({ success: false, error: '토큰이 유효하지 않습니다.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    await prisma.user.update({ where: { id: record.userId }, data: { password: passwordHash } });
    await prisma.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: '재설정에 실패했습니다.' }, { status: 500 });
  }
}



