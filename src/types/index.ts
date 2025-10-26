export type Language = 'ko' | 'en';

export type AnalysisType = 'enterprise' | 'personal';

export type TaskCategory = 'Automate' | 'AI-Copilot' | 'Human-Critical';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export interface Tool {
  name: string;
  purpose: string;
  alternatives: string[];
}

export interface InputOutput {
  name: string;
  type: string;
  source: string;
  description?: string;
}

export interface CodeSample {
  lang: 'ts' | 'py' | 'js';
  label: string;
  code: string;
}

export interface TaskRecipe {
  overview: string;
  inputs: InputOutput[];
  outputs: InputOutput[];
  steps: RecipeStep[];
  codeSamples: CodeSample[];
  flowMermaid: string;
  testing: string[];
  monitoring: string[];
}

export interface RecipeStep {
  title: string;
  description: string;
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
  estimatedTime: string;
  recipe?: TaskRecipe;
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
  logo: string;
  testimonial: string;
  author: string;
  position: string;
  metrics: {
    productivity: string;
    efficiency: string;
    costSavings: string;
  };
}

export interface ContactForm {
  name: string;
  department: string;
  email: string;
  company: string;
  inquiry: string;
  type: 'enterprise' | 'consulting' | 'general';
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
  image?: string;
}
