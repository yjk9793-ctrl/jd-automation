import { NextRequest, NextResponse } from 'next/server';
import { getLLMClient } from '@/lib/llmClient';
import { jdParser } from '@/lib/jdParser';
import { defaultScorer } from '@/lib/scoring';
import { AnalysisRequest, AnalysisResult, TaskItem, APIResponse } from '@/types';
import { z } from 'zod';

// 요청 스키마 검증
const AnalysisRequestSchema = z.object({
  jd: z.object({
    text: z.string().min(10, 'JD 텍스트는 최소 10자 이상이어야 합니다'),
    fileName: z.string().optional(),
    fileType: z.string().optional(),
  }),
  options: z.object({
    includeRecipe: z.boolean().optional().default(false),
    detailLevel: z.enum(['basic', 'detailed']).optional().default('basic'),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // FormData 또는 JSON 처리
    let jd, options;
    
    const contentType = request.headers.get('content-type');
    if (contentType && contentType.includes('multipart/form-data')) {
      // FormData 처리
      const formData = await request.formData();
      const jdText = formData.get('jd') as string;
      const file = formData.get('file') as File;
      
      if (!jdText) {
        return NextResponse.json(
          { success: false, error: 'JD 텍스트가 필요합니다.' },
          { status: 400 }
        );
      }
      
      jd = {
        text: jdText,
        fileName: file?.name || 'input.txt',
        fileType: file?.type || 'text/plain'
      };
      options = { includeRecipe: false, detailLevel: 'basic' };
    } else {
      // JSON 처리
      const body = await request.json();
      const validatedData = AnalysisRequestSchema.parse(body);
      const validated = validatedData;
      jd = validated.jd;
      options = validated.options;
    }

    // JD 파싱
    const parsedJD = await jdParser.parseJD(jd);
    
    // LLM 클라이언트 초기화
    const llmClient = getLLMClient();
    
    // 작업 추출
    let taskExtractions;
    try {
      taskExtractions = await llmClient.extractTasks(jd.text);
    } catch (error) {
      console.error('Task extraction error:', error);
      // 데모 데이터로 폴백
      taskExtractions = llmClient.getDemoTaskExtractions();
    }
    
    // 각 작업에 대한 자동화 평가
    const tasks: TaskItem[] = [];
    
    for (const extraction of taskExtractions) {
      try {
        let evaluation;
        try {
          evaluation = await llmClient.evaluateAutomation(extraction);
        } catch (error) {
          console.error('Automation evaluation error:', error);
          // 데모 평가로 폴백
          evaluation = llmClient.getDemoEvaluation(extraction);
        }
        
        const scoringResult = defaultScorer.calculateScore(evaluation.criteria);
        
        // 키워드 기반 휴리스틱 점수
        const keywordScore = defaultScorer.calculateKeywordScore(
          `${extraction.title} ${extraction.description}`
        );
        
        // 최종 점수 조합 (LLM 70% + 휴리스틱 30%)
        const finalScore = Math.round(
          scoringResult.score * 0.7 + keywordScore.automation * 0.3
        );
        
        // 최종 카테고리 결정
        const finalCategory = scoringResult.confidence > 0.7 
          ? scoringResult.category 
          : (keywordScore.automation > 60 ? 'Automate' : 'Human-critical');

        const task: TaskItem = {
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: extraction.title,
          sourceText: extraction.description,
          category: finalCategory,
          score: finalScore,
          roiEstimate: defaultScorer.estimateROI(evaluation.criteria, finalCategory),
          difficulty: defaultScorer.estimateDifficulty(evaluation.criteria, finalCategory),
          risks: defaultScorer.assessRisks(evaluation.criteria, finalCategory),
          safeguards: defaultScorer.suggestSafeguards(evaluation.criteria, finalCategory),
          tools: evaluation.tools,
          reasoning: evaluation.reasoning,
          estimatedTime: getEstimatedTime(finalCategory, defaultScorer.estimateDifficulty(evaluation.criteria, finalCategory)),
          recipe: {
            inputs: [],
            outputs: [],
            flowMermaid: '',
            steps: [],
            codeSamples: [],
            tests: [],
            monitoring: [],
          },
        };

        // 레시피 생성 (옵션이 활성화된 경우)
        if (options?.includeRecipe && finalCategory !== 'Human-critical') {
          try {
            const recipe = await llmClient.generateRecipe(task);
            task.recipe = recipe;
          } catch (error) {
            console.warn('레시피 생성 실패:', error);
          }
        }

        tasks.push(task);
      } catch (error) {
        console.error(`작업 평가 실패: ${extraction.title}`, error);
        // 실패한 작업도 기본 정보로 추가
        tasks.push({
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: extraction.title,
          sourceText: extraction.description,
          category: 'Human-critical',
          score: 20,
          roiEstimate: 10,
          difficulty: 5,
          risks: ['평가 실패'],
          safeguards: ['수동 검토 필요'],
          tools: [],
          reasoning: '자동화 평가 중 오류가 발생했습니다.',
          estimatedTime: '평가 불가',
          recipe: {
            inputs: [],
            outputs: [],
            flowMermaid: '',
            steps: [],
            codeSamples: [],
            tests: [],
            monitoring: [],
          },
        });
      }
    }

    // 결과 요약 생성
    const summary = {
      total: tasks.length,
      automate: tasks.filter(t => t.category === 'Automate').length,
      copilot: tasks.filter(t => t.category === 'Co-pilot').length,
      humanCritical: tasks.filter(t => t.category === 'Human-critical').length,
      averageROI: tasks.reduce((sum, t) => sum + t.roiEstimate, 0) / tasks.length,
      highImpactTasks: tasks
        .filter(t => t.category === 'Automate' && t.roiEstimate > 60)
        .sort((a, b) => b.roiEstimate - a.roiEstimate)
        .slice(0, 5),
    };

    const result: AnalysisResult = {
      tasks,
      summary,
      metadata: {
        analyzedAt: new Date().toISOString(),
        jdLength: jd.text.length,
        processingTime: Date.now() - startTime,
      },
    };

    const response: APIResponse<AnalysisResult> = {
      success: true,
      data: result,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('JD 분석 실패:', error);
    
    // 더 구체적인 오류 메시지 제공
    let errorMessage = '분석 중 오류가 발생했습니다.';
    let statusCode = 500;
    
    if (error instanceof z.ZodError) {
      errorMessage = '입력 데이터가 올바르지 않습니다.';
      statusCode = 400;
    } else if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'API 키가 설정되지 않았습니다. 데모 모드로 실행됩니다.';
        statusCode = 200; // 데모 모드이므로 성공으로 처리
      } else {
        errorMessage = error.message;
      }
    }
    
    const errorResponse: APIResponse<never> = {
      error: errorMessage,
      code: 'ANALYSIS_FAILED',
      details: error instanceof z.ZodError ? error.errors : undefined,
    };

    return NextResponse.json(errorResponse, { status: statusCode });
  }
}

// 예상 구현 시간 계산
function getEstimatedTime(category: string, difficulty: number): string {
  const baseHours = {
    'Automate': 8,
    'Co-pilot': 16,
    'Human-critical': 32,
  };

  const hours = baseHours[category as keyof typeof baseHours] * difficulty;
  
  if (hours < 8) return '1일 이내';
  if (hours < 40) return '1주일 이내';
  if (hours < 160) return '1개월 이내';
  return '1개월 이상';
}
