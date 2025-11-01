import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

const Schema = z.object({ token: z.string().min(10), password: z.string().min(8) });

export async function POST(req: NextRequest) {
  try {
    const { token, password } = Schema.parse(await req.json());
    const record = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record || record.expiresAt < new Date()) {
      return NextResponse.json({ success: false, error: '유효하지 않거나 만료된 토큰' }, { status: 400 });
    }
    const passwordHash = await hashPassword(password);
    await prisma.user.update({ where: { id: record.userId }, data: { password: passwordHash } });
    await prisma.passwordResetToken.delete({ where: { token } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: '변경 실패' }, { status: 400 });
  }
}



