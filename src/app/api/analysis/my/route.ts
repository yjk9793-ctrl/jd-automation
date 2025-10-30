import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const user = await getUserFromRequest();
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const list = await prisma.analysis.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ success: true, data: list });
}


