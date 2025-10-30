import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  const user = await getUserFromRequest();
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const items = await prisma.analysis.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ success: true, items });
}


