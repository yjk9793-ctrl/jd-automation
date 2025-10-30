import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, name } = RegisterSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: '이미 가입된 이메일입니다.' }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({ data: { email, password: passwordHash, name } });

    const token = await signToken({ id: user.id, email: user.email });
    await setAuthCookie(token);

    return NextResponse.json({ success: true, data: { id: user.id, email: user.email, name: user.name } });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: '유효하지 않은 입력입니다.', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: '회원가입에 실패했습니다.' }, { status: 500 });
  }
}


