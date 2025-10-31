import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';
import { prisma } from '@/lib/db';

const Schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = Schema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });
    // 보안상 존재여부와 무관하게 성공 응답
    if (!user) return NextResponse.json({ success: true });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30분
    await prisma.passwordResetToken.create({ data: { token, userId: user.id, expiresAt } });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://jdxwork.com'}/reset?token=${token}`;

    // Email 발송 (선택사항 - 환경 변수가 없으면 콘솔에만 출력)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.default.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: '[JDX] 비밀번호 재설정',
          text: `다음 링크에서 비밀번호를 재설정하세요: ${resetUrl}`,
        });
      } catch (e) {
        console.log('Email send failed. Reset URL:', resetUrl);
      }
    } else {
      console.log('Password reset token (dev):', token);
      console.log('Reset URL:', resetUrl);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: '요청 처리에 실패했습니다.' }, { status: 500 });
  }
}
