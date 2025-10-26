import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AnalysisType, AnalysisResult, TaskItem, TaskCategory, DifficultyLevel } from '@/types';
import { GeminiLLMClient } from '@/lib/geminiClient';

const AnalysisRequestSchema = z.object({
  type: z.enum(['enterprise', 'personal']),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = AnalysisRequestSchema.parse(body);
    const { type, content, email } = validatedData;

    // Simulate AI analysis (replace with actual AI service)
    const analysisResult = await performAnalysis(type, content);

    // Store result (in production, save to database)
    const resultId = `analysis_${Date.now()}`;
    
    const result: AnalysisResult = {
      id: resultId,
      type: type as AnalysisType,
      jobRole: extractJobRole(content),
      summary: analysisResult.summary,
      tasks: analysisResult.tasks,
      recommendations: analysisResult.recommendations,
      nextSteps: analysisResult.nextSteps,
      createdAt: new Date().toISOString(),
      aiSummary: analysisResult.aiSummary, // Add aiSummary from analysis result
    };

    // Send email with results
    await sendAnalysisEmail(email, result);

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error('Analysis error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request data',
        details: error.errors,
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      error: 'Analysis failed. Please try again.',
    }, { status: 500 });
  }
}

async function performAnalysis(type: AnalysisType, content: string) {
  try {
    // Try to use Gemini API if available
    const geminiClient = new GeminiLLMClient();
    const result = await geminiClient.analyzeJobDescription(content, type);
    console.log('Gemini API analysis completed');
    return result;
  } catch (error) {
    console.error('Gemini API failed, using fallback:', error);
    // Fallback to mock data if API fails
    return getMockAnalysisResults();
  }
}

function getMockAnalysisResults() {
  const tasks: TaskItem[] = [
    {
      id: 'task-1',
      title: '문서 처리 및 분석',
      sourceText: '문서를 읽고 분석하여 핵심 정보를 추출합니다.',
      category: 'Automate' as TaskCategory,
      score: 85,
      roiEstimate: 300,
      difficulty: 2 as DifficultyLevel,
      risks: ['데이터 품질 의존성', '복잡한 문서 형식'],
      safeguards: ['품질 검증 프로세스', '다양한 형식 지원'],
      tools: [
        { name: 'OCR', purpose: '문서 텍스트 추출', alternatives: ['Tesseract', 'AWS Textract'] },
        { name: 'NLP', purpose: '자연어 처리', alternatives: ['OpenAI GPT', 'Claude'] },
      ],
      reasoning: '문서 처리 작업은 패턴이 명확하고 반복적이어서 AI 에이전트로 자동화하기 적합합니다.',
      estimatedTime: '2-4주',
    },
    {
      id: 'task-2',
      title: '고객 상담 및 응답',
      sourceText: '고객 문의에 대해 적절한 답변을 제공합니다.',
      category: 'AI-Copilot' as TaskCategory,
      score: 70,
      roiEstimate: 200,
      difficulty: 3 as DifficultyLevel,
      risks: ['복잡한 상황 처리', '감정적 대응 필요'],
      safeguards: ['인간 검토 프로세스', '에스컬레이션 규칙'],
      tools: [
        { name: 'Chatbot', purpose: '기본 상담 응답', alternatives: ['Dialogflow', 'Rasa'] },
        { name: 'Knowledge Base', purpose: '정보 검색', alternatives: ['Elasticsearch', 'Pinecone'] },
      ],
      reasoning: '일반적인 문의는 AI가 처리할 수 있지만, 복잡한 상황은 인간의 판단이 필요합니다.',
      estimatedTime: '4-6주',
    },
    {
      id: 'task-3',
      title: '전략적 의사결정',
      sourceText: '비즈니스 전략을 수립하고 중요한 결정을 내립니다.',
      category: 'Human-Critical' as TaskCategory,
      score: 20,
      roiEstimate: 50,
      difficulty: 5 as DifficultyLevel,
      risks: ['복잡한 비즈니스 맥락', '윤리적 고려사항'],
      safeguards: ['전문가 검토', '다각도 분석'],
      tools: [
        { name: 'Analytics', purpose: '데이터 분석', alternatives: ['Tableau', 'Power BI'] },
        { name: 'Simulation', purpose: '시나리오 분석', alternatives: ['Monte Carlo', 'Decision Trees'] },
      ],
      reasoning: '전략적 의사결정은 창의성과 직관이 필요하여 AI보다는 인간의 영역입니다.',
      estimatedTime: '8-12주',
    },
  ];

  const summary = {
    total: tasks.length,
    automate: tasks.filter(t => t.category === 'Automate').length,
    copilot: tasks.filter(t => t.category === 'AI-Copilot').length,
    humanCritical: tasks.filter(t => t.category === 'Human-Critical').length,
    averageScore: Math.round(tasks.reduce((sum, task) => sum + task.score, 0) / tasks.length),
    estimatedROI: Math.round(tasks.reduce((sum, task) => sum + task.roiEstimate, 0) / tasks.length),
    automationPotential: Math.round((tasks.filter(t => t.category !== 'Human-Critical').length / tasks.length) * 100),
  };

  const recommendations = [
    '문서 처리 업무를 우선적으로 AI 에이전트로 전환하세요.',
    '고객 상담 업무는 AI와 인간의 협업 모델을 도입하세요.',
    '전략적 의사결정은 AI를 보조 도구로 활용하세요.',
  ];

  const nextSteps = [
    'AI 에이전트 개발 로드맵 수립',
    '필요 기술 스택 및 인력 확보',
    '단계별 구현 계획 수립',
    '성과 측정 지표 설정',
  ];

  return {
    summary,
    tasks,
    recommendations,
    nextSteps,
    aiSummary: `이 직무의 자동화 가능성은 매우 높습니다. 총 3개 작업 중 1개는 완전 자동화가 가능하며, 1개는 AI 협업을 통해 생산성을 크게 향상시킬 수 있습니다. 문서 처리 작업은 패턴이 명확하고 반복적이어서 AI 에이전트로 자동화하면 시간을 80% 이상 절약할 수 있습니다. 고객 상담은 AI가 기본 문의를 처리하고 복잡한 경우에만 인간이 개입하는 하이브리드 모델이 적합합니다. 전략적 의사결정은 창의성과 직관이 필요하여 인간의 영역이지만, AI는 데이터 분석과 시나리오 시뮬레이션을 통해 보조 역할을 할 수 있습니다. 예상 ROI는 평균 183%로 투자 대비 매우 높은 효율을 보이며, 자동화 잠재력은 67%입니다.`,
  };
}

function extractJobRole(content: string): string {
  // Simple job role extraction (replace with more sophisticated logic)
  const commonRoles = ['개발자', '마케터', '영업', 'HR', '재무', '운영', '고객서비스'];
  const foundRole = commonRoles.find(role => content.includes(role));
  return foundRole || 'General';
}

async function sendAnalysisEmail(email: string, result: AnalysisResult) {
  // Mock email sending (replace with actual email service)
  console.log(`Sending analysis results to ${email}`);
  console.log('Analysis result:', result);
  
  // In production, use a service like SendGrid, AWS SES, or Nodemailer
  // await emailService.send({
  //   to: email,
  //   subject: 'AI Agent Analysis Results',
  //   html: generateEmailHTML(result),
  // });
}
