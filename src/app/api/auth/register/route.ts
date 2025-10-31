import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { hashPassword, signToken, setAuthCookieInResponse } from '@/lib/auth';

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    console.log('POST /api/auth/register - starting registration');
    const body = await req.json();
    console.log('Registration request body:', { email: body.email, hasPassword: !!body.password, hasName: !!body.name });
    
    const { email, password, name } = RegisterSchema.parse(body);
    console.log('Parsed registration data:', { email, passwordLength: password.length, name });

    console.log('Checking for existing user...');
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('User already exists:', email);
      return NextResponse.json({ success: false, error: '이미 가입된 이메일입니다.' }, { status: 400 });
    }

    console.log('Hashing password...');
    const passwordHash = await hashPassword(password);
    console.log('Password hashed, creating user...');
    
    const user = await prisma.user.create({ 
      data: { email, password: passwordHash, name } 
    });
    console.log('User created successfully:', user.id, user.email);

    console.log('Signing token...');
    const token = await signToken({ id: user.id, email: user.email });
    console.log('Token signed, creating response...');
    
    const response = NextResponse.json({ 
      success: true, 
      data: { id: user.id, email: user.email, name: user.name } 
    });
    
    const responseWithCookie = setAuthCookieInResponse(response, token);
    console.log('Registration successful, returning response');
    return responseWithCookie;
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      const errorMessage = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return NextResponse.json({ 
        success: false, 
        error: `유효하지 않은 입력입니다: ${errorMessage}`,
        details: error.errors 
      }, { status: 400 });
    }
    
    // Prisma 에러 처리
    if (error.code === 'P2002') {
      console.error('Unique constraint violation:', error.meta);
      return NextResponse.json({ 
        success: false, 
        error: '이미 가입된 이메일입니다.' 
      }, { status: 400 });
    }
    
    console.error('Unexpected error:', error.message, error.stack);
    return NextResponse.json({ 
      success: false, 
      error: `회원가입에 실패했습니다: ${error.message || '알 수 없는 오류'}` 
    }, { status: 500 });
  }
}


