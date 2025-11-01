export type Language = 'ko' | 'en';

export type AnalysisType = 'enterprise' | 'personal';

export type TaskCategory = 'Automate' | 'AI-Copilot' | 'Human-Critical';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Tool {
  name: string;
  purpose: string;
  alternatives: string[];
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

