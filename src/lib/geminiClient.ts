import { GoogleGenerativeAI } from '@google/generative-ai';
import { AnalysisType, TaskItem, TaskCategory, DifficultyLevel } from '@/types';

export class GeminiLLMClient {
  private genAI: GoogleGenerativeAI;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  async analyzeJobDescription(content: string, type: AnalysisType): Promise<any> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = this.buildAnalysisPrompt(content, type);

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      const parsedData = this.parseAnalysisResponse(text);
      
      // Generate summary
      const summaryText = await this.generateSummary(content, parsedData);
      parsedData.aiSummary = summaryText;
      
      return parsedData;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze with Gemini API');
    }
  }

  private async generateSummary(originalContent: string, analysisData: any): Promise<string> {
    try {
      const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const prompt = `다음은 분석된 직무 설명입니다. 100자 이내로 핵심 내용을 요약해주세요.

원본 내용:
${originalContent.substring(0, 200)}...

분석 결과 요약:
- 자동화 가능: ${analysisData.summary.automate}개
- AI 협업: ${analysisData.summary.copilot}개
- 인간 중심: ${analysisData.summary.humanCritical}개
- 평균 점수: ${analysisData.summary.averageScore}
- 예상 ROI: ${analysisData.summary.estimatedROI}%

100자 이내로 핵심 인사이트를 요약해주세요:`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let summary = response.text().trim();
      
      // 100자 제한
      if (summary.length > 100) {
        summary = summary.substring(0, 100) + '...';
      }
      
      return summary;
    } catch (error) {
      console.error('Summary generation error:', error);
      return 'AI 분석을 통해 자동화 가능성을 평가했습니다.';
    }
  }

  private buildAnalysisPrompt(content: string, type: AnalysisType): string {
    const jobType = type === 'enterprise' ? 'Job Description' : 'Resume';
    
    return `Analyze the following ${jobType} and provide a detailed analysis in Korean.

Content:
${content}

Please provide:
1. Tasks that can be automated (title, description, automation score 0-100, ROI estimate, difficulty 1-5)
2. Tasks suitable for AI copilot (title, description, score, ROI, difficulty)
3. Tasks that are human-critical (title, description, score, ROI, difficulty)
4. Recommendations for implementation
5. Next steps

Format your response as JSON with this structure:
{
  "summary": {
    "total": number,
    "automate": number,
    "copilot": number,
    "humanCritical": number,
    "averageScore": number,
    "estimatedROI": number,
    "automationPotential": number
  },
  "tasks": [
    {
      "id": "task-1",
      "title": "task title",
      "sourceText": "original text",
      "category": "Automate" | "AI-Copilot" | "Human-Critical",
      "score": number,
      "roiEstimate": number,
      "difficulty": number,
      "reasoning": "why this category",
      "estimatedTime": "time estimate",
      "tools": [{"name": "tool name", "purpose": "purpose", "alternatives": ["alt1"]}],
      "risks": ["risk1"],
      "safeguards": ["safeguard1"]
    }
  ],
  "recommendations": ["rec1", "rec2"],
  "nextSteps": ["step1", "step2"]
}

Respond only with valid JSON.`;
  }

  private parseAnalysisResponse(text: string): any {
    try {
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      return this.normalizeAnalysisResult(parsed);
    } catch (error) {
      console.error('Failed to parse Gemini response:', error);
      throw new Error('Invalid response format from Gemini');
    }
  }

  private normalizeAnalysisResult(data: any): any {
    // Ensure all tasks have correct format
    const tasks: TaskItem[] = data.tasks.map((task: any, index: number) => ({
      id: task.id || `task-${index + 1}`,
      title: task.title || 'Untitled Task',
      sourceText: task.sourceText || '',
      category: this.normalizeCategory(task.category),
      score: Math.min(100, Math.max(0, task.score || 50)),
      roiEstimate: task.roiEstimate || 100,
      difficulty: this.normalizeDifficulty(task.difficulty),
      reasoning: task.reasoning || 'No reasoning provided',
      estimatedTime: task.estimatedTime || '2-4주',
      tools: task.tools || [],
      risks: task.risks || [],
      safeguards: task.safeguards || [],
    }));

    return {
      summary: data.summary || this.generateDefaultSummary(tasks),
      tasks,
      recommendations: data.recommendations || [],
      nextSteps: data.nextSteps || [],
      aiSummary: data.aiSummary || '', // Preserve aiSummary if it exists
    };
  }

  private normalizeCategory(category: string): TaskCategory {
    if (category === 'Automate' || category === 'automate') return 'Automate';
    if (category === 'AI-Copilot' || category === 'AI-Copilot' || category === 'copilot') return 'AI-Copilot';
    return 'Human-Critical';
  }

  private normalizeDifficulty(difficulty: number): DifficultyLevel {
    if (difficulty < 1) return 1;
    if (difficulty > 5) return 5;
    return difficulty as DifficultyLevel;
  }

  private generateDefaultSummary(tasks: TaskItem[]) {
    return {
      total: tasks.length,
      automate: tasks.filter(t => t.category === 'Automate').length,
      copilot: tasks.filter(t => t.category === 'AI-Copilot').length,
      humanCritical: tasks.filter(t => t.category === 'Human-Critical').length,
      averageScore: Math.round(tasks.reduce((sum, t) => sum + t.score, 0) / tasks.length),
      estimatedROI: Math.round(tasks.reduce((sum, t) => sum + t.roiEstimate, 0) / tasks.length),
      automationPotential: Math.round((tasks.filter(t => t.category !== 'Human-Critical').length / tasks.length) * 100),
    };
  }

  getDemoTaskExtractions() {
    // Fallback demo data when API fails
    return [
      {
        id: 'task-1',
        title: '문서 처리 및 분석',
        sourceText: '문서를 읽고 분석하여 핵심 정보를 추출합니다.',
        category: 'Automate' as TaskCategory,
        score: 85,
        roiEstimate: 300,
        difficulty: 2 as DifficultyLevel,
        risks: ['데이터 품질 의존성'],
        safeguards: ['품질 검증 프로세스'],
        tools: [{ name: 'OCR', purpose: '문서 텍스트 추출', alternatives: ['Tesseract'] }],
        reasoning: '문서 처리 작업은 패턴이 명확합니다.',
        estimatedTime: '2-4주',
      },
    ];
  }
}
