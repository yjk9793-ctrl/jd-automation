import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getUserFromRequest } from '@/lib/auth';

const Schema = z.object({ type: z.string(), data: z.any() });

export async function POST(req: NextRequest) {
  const user = await getUserFromRequest(req);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const { type, data } = Schema.parse(body);
  const saved = await prisma.analysis.create({ data: { userId: user.id, type, data } });
  return NextResponse.json({ success: true, id: saved.id });
}


