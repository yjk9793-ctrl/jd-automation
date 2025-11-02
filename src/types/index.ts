export type Language = 'ko' | 'en';

export type AnalysisType = 'enterprise' | 'personal';

export type TaskCategory = 'Automate' | 'AI-Copilot' | 'Human-Critical';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Tool {
  name: string;
  purpose: string;
  alternatives: string[];
}

export interface AgentFlowStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  input?: string; // 입력 데이터
  output?: string; // 출력 데이터
  processLogic?: string; // 처리 로직
}

export interface OperatorCompetency {
  category: string; // "Backend", "AI/ML", "DevOps" 등
  skills: {
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    priority: 'required' | 'preferred' | 'optional';
    description: string;
  }[];
}

export interface TeamRole {
  title: string;
  count: string; // "1-2명"
  responsibilities: string[];
  requiredSkills: string[];
  experienceLevel?: string;
}

export interface LearningResource {
  type: 'course' | 'documentation' | 'tutorial' | 'certification';
  title: string;
  provider: string;
  url: string;
  duration: string;
  level: string;
}

export interface DeploymentRequirement {
  category: string;
  requirements: string[];
}

export interface ImplementationMilestone {
  phase: string;
  title: string;
  duration: string;
  tasks: string[];
  deliverables: string[];
  checkpoints: string[];
}

export interface AgentDevelopmentSpec {
  flowSteps?: AgentFlowStep[]; // 에이전트 작동 플로우
  architecture?: string; // 시스템 아키텍처 설명
  endpoints?: string[]; // 필요한 API 엔드포인트
  dataModel?: string[]; // 데이터 모델 설명
  integrationPoints?: string[]; // 통합 포인트
}

export interface TaskItem {
  id: string;
  title: string;
  sourceText: string;
  category: TaskCategory;
  score: number;
  roiEstimate: number;
  difficulty: DifficultyLevel;
  risks: string[];
  safeguards: string[];
  tools: Tool[];
  reasoning: string;
  expectedEffects?: string[]; // 에이전트 개발 시 기대 효과
  samplePrompt?: string; // 샘플 명령어 프롬프트
  estimatedTime: string;
  // 상세 정보
  conversionPotential?: string; // 전환 가능성 (높음/중간/낮음)
  priority?: 'high' | 'medium' | 'low'; // 우선순위
  conversionBarriers?: string[]; // 전환 저해 요인
  estimatedAdoptionCost?: string; // 예상 도입 비용
  estimatedOperatingCost?: string; // 예상 운영 비용 (월간)
  estimatedSavingsCost?: string; // 예상 절감 비용 (연간)
  estimatedBuildPeriod?: string; // 예상 구축 기간
  technicalRequirements?: string[]; // 기술 요구사항
  shortDescription?: string; // 에이전트 역할과 기대 효과 설명 (100자 이내)
  developmentSpec?: AgentDevelopmentSpec; // 개발 스펙 정보
  // 에이전트 고도화를 위한 추가 필드
  agentIntroduction?: string; // 에이전트 소개 (200-300자)
  operatorCompetencies?: OperatorCompetency[]; // 운영자 역량
  teamComposition?: TeamRole[]; // 팀 구성
  technologyStack?: { category: string; items: string[] }[]; // 기술 스택
  deploymentRequirements?: DeploymentRequirement[]; // 배포 요구사항
  learningResources?: LearningResource[]; // 학습 리소스
  implementationMilestones?: ImplementationMilestone[]; // 구현 마일스톤
}

export interface AnalysisSummary {
  total: number;
  automate: number;
  copilot: number;
  humanCritical: number;
  averageScore: number;
  estimatedROI: number;
  automationPotential: number;
}

export interface AnalysisResult {
  id: string;
  type: AnalysisType;
  jobRole?: string;
  summary: AnalysisSummary;
  tasks: TaskItem[];
  recommendations: string[];
  nextSteps: string[];
  createdAt: string;
  aiSummary?: string;
}

export interface IndustryFeedback {
  id: string;
  company: string;
  industry: string;
  testimonial: string;
  author: string;
  position: string;
  metrics: {
    productivity: string;
    efficiency: string;
    costSavings: string;
  };
  logo?: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  image?: string;
}

export type ContactFormType = 'general' | 'enterprise' | 'technical' | 'partnership';

export interface ContactForm {
  name: string;
  department: string;
  email: string;
  company: string;
  inquiry: string;
  type: ContactFormType;
}

