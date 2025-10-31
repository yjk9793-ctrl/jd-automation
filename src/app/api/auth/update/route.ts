import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getUserFromRequest, hashPassword } from '@/lib/auth';

const UpdateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

export async function PUT(req: NextRequest) {
  try {
    console.log('PUT /api/auth/update - starting update');
    const user = await getUserFromRequest(req);
    
    if (!user) {
      console.log('PUT /api/auth/update - unauthorized');
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    console.log('Update request body:', { email: body.email, hasName: !!body.name, hasPassword: !!body.password });
    
    const updateData = UpdateUserSchema.parse(body);
    console.log('Parsed update data:', updateData);

    const updateFields: any = {};
    
    if (updateData.name !== undefined) {
      updateFields.name = updateData.name;
    }
    
    if (updateData.email !== undefined && updateData.email !== user.email) {
      // 이메일 변경 시 중복 확인
      const existing = await prisma.user.findUnique({ where: { email: updateData.email } });
      if (existing) {
        return NextResponse.json({ success: false, error: '이미 사용 중인 이메일입니다.' }, { status: 400 });
      }
      updateFields.email = updateData.email;
    }
    
    if (updateData.password !== undefined) {
      updateFields.password = await hashPassword(updateData.password);
    }

    console.log('Updating user with fields:', Object.keys(updateFields));
    
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateFields,
      select: { id: true, email: true, name: true },
    });

    console.log('User updated successfully:', updatedUser.email);
    
    return NextResponse.json({ 
      success: true, 
      data: updatedUser 
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return NextResponse.json({ 
        success: false, 
        error: `유효하지 않은 입력입니다: ${errorMessage}`,
        details: error.errors 
      }, { status: 400 });
    }
    
    if (error.code === 'P2002') {
      return NextResponse.json({ 
        success: false, 
        error: '이미 사용 중인 이메일입니다.' 
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: `정보 변경에 실패했습니다: ${error.message || '알 수 없는 오류'}` 
    }, { status: 500 });
  }
}

