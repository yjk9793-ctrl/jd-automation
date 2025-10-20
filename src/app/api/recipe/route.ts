import { NextRequest, NextResponse } from 'next/server';
import { getLLMClient } from '@/lib/llmClient';
import { RecipeRequest, TaskRecipe, APIResponse } from '@/types';
import { z } from 'zod';

// 요청 스키마 검증
const RecipeRequestSchema = z.object({
  task: z.object({
    id: z.string(),
    title: z.string(),
    sourceText: z.string(),
    category: z.enum(['Automate', 'Co-pilot', 'Human-critical']),
    score: z.number().min(0).max(100),
    roiEstimate: z.number().min(0).max(100),
    difficulty: z.number().min(1).max(5),
    risks: z.array(z.string()),
    safeguards: z.array(z.string()),
    tools: z.array(z.object({
      name: z.string(),
      purpose: z.string(),
      alt: z.array(z.string()).optional(),
    })),
    reasoning: z.string(),
    estimatedTime: z.string(),
    recipe: z.object({
      inputs: z.array(z.object({
        name: z.string(),
        type: z.string(),
        source: z.string(),
      })),
      outputs: z.array(z.object({
        name: z.string(),
        type: z.string(),
        target: z.string(),
      })),
      flowMermaid: z.string(),
      steps: z.array(z.string()),
      codeSamples: z.array(z.object({
        lang: z.enum(['ts', 'py']),
        label: z.string(),
        code: z.string(),
      })),
      tests: z.array(z.string()),
      monitoring: z.array(z.string()),
    }),
  }),
  includeCode: z.boolean().optional().default(true),
  includeDiagram: z.boolean().optional().default(true),
});

export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱 및 검증
    const body = await request.json();
    const validatedData = RecipeRequestSchema.parse(body);
    const { task, includeCode = true, includeDiagram = true } = validatedData;

    // LLM 클라이언트 초기화
    const llmClient = getLLMClient();
    
    // 레시피 생성
    const recipe = await llmClient.generateRecipe(task);

    // 코드와 다이어그램 포함 여부에 따라 필터링
    const finalRecipe: TaskRecipe = {
      ...recipe,
      codeSamples: includeCode ? recipe.codeSamples : [],
      flowMermaid: includeDiagram ? recipe.flowMermaid : '',
    };

    const response: APIResponse<TaskRecipe> = {
      success: true,
      data: finalRecipe,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('레시피 생성 실패:', error);
    
    const errorResponse: APIResponse<never> = {
      error: error instanceof Error ? error.message : '레시피 생성 중 오류가 발생했습니다',
      code: 'RECIPE_GENERATION_FAILED',
      details: error instanceof z.ZodError ? error.errors : undefined,
    };

    return NextResponse.json(errorResponse, { status: 400 });
  }
}
