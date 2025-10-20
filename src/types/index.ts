export type TaskCategory = 'Automate' | 'Co-pilot' | 'Human-critical';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export type LLMProvider = 'openai' | 'anthropic';

export interface Tool {
  name: string;
  purpose: string;
  alt?: string[];
}

export interface InputOutput {
  name: string;
  type: string;
  source: string;
}

export interface CodeSample {
  lang: 'ts' | 'py';
  label: string;
  code: string;
}

export interface TaskRecipe {
  inputs: InputOutput[];
  outputs: InputOutput[];
  flowMermaid: string;
  steps: string[];
  codeSamples: CodeSample[];
  tests: string[];
  monitoring: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  sourceText: string;
  category: TaskCategory;
  score: number; // 0-100
  roiEstimate: number; // % 절감 추정
  difficulty: DifficultyLevel;
  risks: string[];
  safeguards: string[];
  tools: Tool[];
  recipe: TaskRecipe;
  reasoning: string; // 2-3문장 근거 설명
  estimatedTime: string; // 예상 구현 시간
}

export interface AnalysisResult {
  tasks: TaskItem[];
  summary: {
    total: number;
    automate: number;
    copilot: number;
    humanCritical: number;
    averageROI: number;
    highImpactTasks: TaskItem[];
  };
  metadata: {
    analyzedAt: string;
    jdLength: number;
    processingTime: number;
  };
}

export interface JDInput {
  text: string;
  fileName?: string;
  fileType?: string;
}

export interface AnalysisRequest {
  jd: JDInput;
  options?: {
    includeRecipe?: boolean;
    detailLevel?: 'basic' | 'detailed';
  };
}

export interface RecipeRequest {
  task: TaskItem;
  includeCode?: boolean;
  includeDiagram?: boolean;
}

export interface ExportOptions {
  format: 'pdf' | 'markdown';
  includeTasks: string[]; // task IDs
  includeRecipes?: boolean;
  includeCode?: boolean;
}

export interface UserSettings {
  dataStorage: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'ko' | 'en';
  notifications: boolean;
}

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  temperature: number;
  maxTokens: number;
  timeout: number;
}

export interface ScoringWeights {
  repeatability: number;
  ruleBased: number;
  structuredData: number;
  apiAccess: number;
  qualityCriteria: number;
  securityCompliance: number;
  uniqueContext: number;
}

export interface TaskExtraction {
  title: string;
  description: string;
  keywords: string[];
  complexity: 'low' | 'medium' | 'high';
}

export interface AutomationCriteria {
  repeatability: number; // 0-100
  ruleBased: number; // 0-100
  structuredData: number; // 0-100
  apiAccess: number; // 0-100
  qualityCriteria: number; // 0-100
  securityCompliance: number; // 0-100 (higher = more restrictive)
  uniqueContext: number; // 0-100 (higher = more context dependent)
}

export interface ErrorResponse {
  error: string;
  code: string;
  details?: any;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
}

export type APIResponse<T> = SuccessResponse<T> | ErrorResponse;
