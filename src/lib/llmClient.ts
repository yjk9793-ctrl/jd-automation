import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { LLMConfig, LLMProvider, TaskExtraction, AutomationCriteria, TaskRecipe } from '@/types';

export class LLMClient {
  private config: LLMConfig;
  private openai?: OpenAI;
  private anthropic?: Anthropic;

  constructor(config: LLMConfig) {
    this.config = config;
    this.initializeClients();
  }

  private initializeClients() {
    if (this.config.provider === 'openai' && process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }

    if (this.config.provider === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
      this.anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
      });
    }
  }

  async extractTasks(jdText: string): Promise<TaskExtraction[]> {
    // 데모 모드 또는 API 키가 없는 경우 샘플 데이터 반환
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_')) {
      return this.getDemoTaskExtractions();
    }

    const prompt = `다음 Job Description에서 수행해야 할 '작업'들을 구체적인 동사+목적어 형태로 목록화하세요. 
각 작업은 독립적이고 구체적이어야 하며, 너무 큰 작업은 세분화하세요.

JD 내용:
${jdText}

응답 형식:
[
  {
    "title": "작업명",
    "description": "작업 설명",
    "keywords": ["키워드1", "키워드2"],
    "complexity": "low|medium|high"
  }
]

JSON 배열로만 응답하세요.`;

    const response = await this.callLLM(prompt);
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse task extraction response:', error);
      return [];
    }
  }

  private getDemoTaskExtractions(): TaskExtraction[] {
    return [
      {
        title: "지원자 서류 스크리닝",
        description: "지원자 서류 스크리닝 및 1차 필터링",
        keywords: ["서류", "스크리닝", "필터링", "자격요건"],
        complexity: "medium"
      },
      {
        title: "면접 일정 조율",
        description: "면접 일정 조율 및 면접관 배정",
        keywords: ["면접", "일정", "조율", "배정"],
        complexity: "low"
      },
      {
        title: "채용 제안서 작성",
        description: "채용 제안서 작성 및 협상",
        keywords: ["제안서", "협상", "조건", "계약"],
        complexity: "high"
      },
      {
        title: "신입사원 온보딩 관리",
        description: "신입사원 온보딩 체크리스트 관리",
        keywords: ["온보딩", "신입사원", "체크리스트", "교육"],
        complexity: "medium"
      },
      {
        title: "월별 채용 현황 리포트 작성",
        description: "월별 채용 현황 리포트 작성",
        keywords: ["리포트", "현황", "통계", "분석"],
        complexity: "medium"
      }
    ];
  }

  async evaluateAutomation(task: TaskExtraction): Promise<{
    category: 'Automate' | 'Co-pilot' | 'Human-critical';
    score: number;
    criteria: AutomationCriteria;
    reasoning: string;
    roiEstimate: number;
    risks: string[];
    safeguards: string[];
    tools: Array<{ name: string; purpose: string; alt?: string[] }>;
    difficulty: 1 | 2 | 3 | 4 | 5;
  }> {
    // 데모 모드 또는 API 키가 없는 경우 샘플 데이터 반환
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_')) {
      return this.getDemoEvaluation(task);
    }

    const prompt = `다음 작업의 자동화 가능성을 평가하세요.

작업: ${task.title}
설명: ${task.description}
키워드: ${task.keywords.join(', ')}
복잡도: ${task.complexity}

평가 기준:
1. 반복성 (0-100): 얼마나 반복적으로 수행되는가
2. 규칙기반 (0-100): 명확한 규칙과 절차가 있는가
3. 정형데이터 (0-100): 구조화된 데이터를 다루는가
4. API접근성 (0-100): 외부 시스템/API와 연동 가능한가
5. 품질기준 (0-100): 객관적 품질 기준이 명확한가
6. 보안규정 (0-100): 보안/규정 준수 요구사항 (높을수록 제약)
7. 고유맥락 (0-100): 특별한 맥락이나 판단이 필요한가 (높을수록 제약)

응답 형식:
{
  "category": "Automate|Co-pilot|Human-critical",
  "score": 0-100,
  "criteria": {
    "repeatability": 0-100,
    "ruleBased": 0-100,
    "structuredData": 0-100,
    "apiAccess": 0-100,
    "qualityCriteria": 0-100,
    "securityCompliance": 0-100,
    "uniqueContext": 0-100
  },
  "reasoning": "2-3문장으로 평가 근거 설명",
  "roiEstimate": 0-100,
  "risks": ["리스크1", "리스크2"],
  "safeguards": ["가드레일1", "가드레일2"],
  "tools": [
    {
      "name": "도구명",
      "purpose": "용도",
      "alt": ["대체도구1", "대체도구2"]
    }
  ],
  "difficulty": 1-5
}

JSON으로만 응답하세요.`;

    const response = await this.callLLM(prompt);
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse automation evaluation response:', error);
      throw new Error('자동화 평가 실패');
    }
  }

  private getDemoEvaluation(task: TaskExtraction): {
    category: 'Automate' | 'Co-pilot' | 'Human-critical';
    score: number;
    criteria: AutomationCriteria;
    reasoning: string;
    roiEstimate: number;
    risks: string[];
    safeguards: string[];
    tools: Array<{ name: string; purpose: string; alt?: string[] }>;
    difficulty: 1 | 2 | 3 | 4 | 5;
  } {
    // 작업별 데모 평가 데이터
    const demoEvaluations: Record<string, any> = {
      "지원자 서류 스크리닝": {
        category: 'Automate',
        score: 85,
        criteria: {
          repeatability: 90,
          ruleBased: 85,
          structuredData: 80,
          apiAccess: 75,
          qualityCriteria: 70,
          securityCompliance: 40,
          uniqueContext: 30
        },
        reasoning: "명확한 자격 요건과 키워드 기반으로 자동화 가능하며, 규칙 기반 필터링이 효과적입니다.",
        roiEstimate: 75,
        risks: ["잘못된 필터링으로 인한 우수 인재 누락"],
        safeguards: ["다단계 검증 프로세스", "인간 검토 단계", "필터링 기준 정기 업데이트"],
        tools: [
          { name: "ATS 시스템", purpose: "자동 서류 스크리닝", alt: ["Workday", "Greenhouse"] },
          { name: "AI 스크리닝 도구", purpose: "키워드 매칭 및 점수 계산", alt: ["HireVue", "Pymetrics"] }
        ],
        difficulty: 2
      },
      "면접 일정 조율": {
        category: 'Automate',
        score: 80,
        criteria: {
          repeatability: 85,
          ruleBased: 80,
          structuredData: 90,
          apiAccess: 85,
          qualityCriteria: 70,
          securityCompliance: 30,
          uniqueContext: 25
        },
        reasoning: "캘린더 API와 알림 시스템을 통해 자동화 가능하며, 충돌 방지 로직으로 안전하게 처리할 수 있습니다.",
        roiEstimate: 60,
        risks: ["이중 예약", "면접관 일정 충돌", "시간대 오류"],
        safeguards: ["실시간 캘린더 동기화", "충돌 검사", "자동 알림 시스템"],
        tools: [
          { name: "Google Calendar API", purpose: "일정 관리", alt: ["Outlook Calendar", "Calendly"] },
          { name: "Slack Bot", purpose: "면접관 알림", alt: ["Microsoft Teams", "Discord"] }
        ],
        difficulty: 3
      },
      "채용 제안서 작성": {
        category: 'Co-pilot',
        score: 45,
        criteria: {
          repeatability: 60,
          ruleBased: 40,
          structuredData: 50,
          apiAccess: 30,
          qualityCriteria: 35,
          securityCompliance: 70,
          uniqueContext: 80
        },
        reasoning: "개별 협상 상황과 맞춤형 조건이 필요하여 완전 자동화는 어렵지만, 템플릿과 가이드를 통한 반자동화가 가능합니다.",
        roiEstimate: 40,
        risks: ["개별 상황 미반영", "법적 리스크", "조건 협상 오류"],
        safeguards: ["인간 검토 필수", "법무팀 승인", "템플릿 기반 작성"],
        tools: [
          { name: "문서 템플릿", purpose: "제안서 양식 제공", alt: ["Notion", "Google Docs"] },
          { name: "AI 어시스턴트", purpose: "초안 작성 지원", alt: ["ChatGPT", "Claude"] }
        ],
        difficulty: 4
      }
    };

    // 기본값 설정
    const defaultEvaluation = {
      category: 'Human-critical' as const,
      score: 25,
      criteria: {
        repeatability: 40,
        ruleBased: 30,
        structuredData: 35,
        apiAccess: 20,
        qualityCriteria: 25,
        securityCompliance: 60,
        uniqueContext: 85
      },
      reasoning: "복잡한 판단과 개별적 맥락이 필요하여 자동화가 어려운 작업입니다.",
      roiEstimate: 20,
      risks: ["맥락 이해 부족", "예외 상황 처리 실패"],
      safeguards: ["인간 검토 필수", "단계별 승인", "전문가 컨설팅"],
      tools: [
        { name: "워드 프로세서", purpose: "문서 작성", alt: ["Google Docs", "Notion"] }
      ],
      difficulty: 5
    };

    return demoEvaluations[task.title] || defaultEvaluation;
  }

  async generateRecipe(task: any): Promise<TaskRecipe> {
    // 데모 모드 또는 API 키가 없는 경우 샘플 데이터 반환
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your_')) {
      return this.getDemoRecipe(task);
    }

    const prompt = `다음 작업에 대한 자동화 레시피를 생성하세요.

작업: ${task.title}
설명: ${task.description}
카테고리: ${task.category}

다음을 포함한 상세 레시피를 만들어주세요:
1. 입력/출력 스키마
2. Mermaid 플로우차트
3. 구현 단계
4. TypeScript와 Python 코드 예시
5. 테스트 케이스
6. 모니터링 지표

응답 형식:
{
  "inputs": [
    {"name": "입력명", "type": "데이터타입", "source": "출처"}
  ],
  "outputs": [
    {"name": "출력명", "type": "데이터타입", "target": "대상"}
  ],
  "flowMermaid": "mermaid 플로우차트 코드",
  "steps": ["단계1", "단계2", "단계3"],
  "codeSamples": [
    {
      "lang": "ts",
      "label": "TypeScript 예시",
      "code": "코드 내용"
    },
    {
      "lang": "py", 
      "label": "Python 예시",
      "code": "코드 내용"
    }
  ],
  "tests": ["테스트케이스1", "테스트케이스2"],
  "monitoring": ["모니터링지표1", "모니터링지표2"]
}

JSON으로만 응답하세요.`;

    const response = await this.callLLM(prompt);
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse recipe response:', error);
      throw new Error('레시피 생성 실패');
    }
  }

  private getDemoRecipe(task: any): TaskRecipe {
    // 작업별 데모 레시피 데이터
    const demoRecipes: Record<string, TaskRecipe> = {
      "지원자 서류 스크리닝": {
        inputs: [
          { name: "이력서", type: "PDF/DOCX", source: "지원자 업로드" },
          { name: "자격 요건", type: "JSON", source: "JD 파싱" }
        ],
        outputs: [
          { name: "스크리닝 결과", type: "JSON", target: "ATS 시스템" },
          { name: "점수 리포트", type: "PDF", target: "채용 담당자" }
        ],
        flowMermaid: `graph TD
    A[이력서 업로드] --> B[문서 파싱]
    B --> C[키워드 추출]
    C --> D[자격 요건 매칭]
    D --> E[점수 계산]
    E --> F[임계값 확인]
    F --> G{합격?}
    G -->|Yes| H[1차 통과]
    G -->|No| I[불합격 처리]
    H --> J[인간 검토 큐]
    I --> K[결과 저장]`,
        steps: [
          "이력서 문서를 텍스트로 변환",
          "자격 요건 키워드 추출",
          "이력서 내용과 키워드 매칭",
          "가중치 기반 점수 계산",
          "임계값 기준으로 합격/불합격 결정",
          "결과를 ATS 시스템에 저장"
        ],
        codeSamples: [
          {
            lang: "ts",
            label: "TypeScript 예시",
            code: `interface ResumeScreening {
  resume: string;
  requirements: string[];
  weights: Record<string, number>;
}

function screenResume(screening: ResumeScreening): ScreeningResult {
  const keywords = extractKeywords(screening.resume);
  const matches = findMatches(keywords, screening.requirements);
  const score = calculateScore(matches, screening.weights);
  
  return {
    score,
    passed: score >= 70,
    matchedKeywords: matches,
    recommendations: generateRecommendations(score)
  };
}`
          },
          {
            lang: "py",
            label: "Python 예시",
            code: `import re
from typing import List, Dict

def screen_resume(resume_text: str, requirements: List[str]) -> Dict:
    keywords = extract_keywords(resume_text)
    matches = find_keyword_matches(keywords, requirements)
    score = calculate_weighted_score(matches)
    
    return {
        'score': score,
        'passed': score >= 70,
        'matched_keywords': matches,
        'confidence': calculate_confidence(score, len(matches))
    }`
          }
        ],
        tests: [
          "자격 요건 100% 매칭 시 100점 확인",
          "자격 요건 50% 매칭 시 50점 확인",
          "빈 이력서 처리 확인",
          "잘못된 파일 형식 처리 확인"
        ],
        monitoring: [
          "스크리닝 정확도",
          "처리 시간",
          "인간 검토 비율",
          "최종 채용 성공률"
        ]
      }
    };

    // 기본 레시피
    const defaultRecipe: TaskRecipe = {
      inputs: [
        { name: "입력 데이터", type: "Text", source: "사용자 입력" }
      ],
      outputs: [
        { name: "처리 결과", type: "JSON", target: "시스템" }
      ],
      flowMermaid: `graph TD
    A[시작] --> B[데이터 입력]
    B --> C[처리]
    C --> D[결과 출력]
    D --> E[완료]`,
      steps: [
        "데이터 준비",
        "처리 로직 실행",
        "결과 검증",
        "출력 생성"
      ],
      codeSamples: [
        {
          lang: "ts",
          label: "TypeScript 예시",
          code: `// 기본 처리 함수
function processTask(input: string): string {
  return input.toUpperCase();
}`
        }
      ],
      tests: [
        "기본 입력 처리 테스트",
        "예외 상황 처리 테스트"
      ],
      monitoring: [
        "처리 시간",
        "성공률",
        "오류율"
      ]
    };

    return demoRecipes[task.title] || defaultRecipe;
  }

  private async callLLM(prompt: string): Promise<string> {
    const timeout = setTimeout(() => {
      throw new Error('LLM 호출 시간 초과');
    }, this.config.timeout);

    try {
      let response: string;

      if (this.config.provider === 'openai' && this.openai) {
        const completion = await this.openai.chat.completions.create({
          model: this.config.model,
          messages: [
            {
              role: 'system',
              content: '당신은 자동화 컨설턴트입니다. 정확하고 구체적인 답변을 제공하세요.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.maxTokens,
        });

        response = completion.choices[0]?.message?.content || '';
      } else if (this.config.provider === 'anthropic' && this.anthropic) {
        const message = await this.anthropic.messages.create({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        });

        response = message.content[0]?.type === 'text' ? message.content[0].text : '';
      } else {
        throw new Error('지원하지 않는 LLM 프로바이더 또는 API 키가 설정되지 않음');
      }

      clearTimeout(timeout);
      return response;
    } catch (error) {
      clearTimeout(timeout);
      console.error('LLM 호출 실패:', error);
      throw new Error(`LLM 호출 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }
}

// 싱글톤 인스턴스
let llmClient: LLMClient | null = null;

export function getLLMClient(): LLMClient {
  if (!llmClient) {
    const provider = (process.env.LLM_PROVIDER as LLMProvider) || 'openai';
    const model = process.env.OPENAI_MODEL || process.env.ANTHROPIC_MODEL || 'gpt-4-turbo-preview';
    
    llmClient = new LLMClient({
      provider,
      model,
      temperature: 0.3,
      maxTokens: 4000,
      timeout: 30000,
    });
  }

  return llmClient;
}
