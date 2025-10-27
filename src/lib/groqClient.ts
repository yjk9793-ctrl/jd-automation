import { AnalysisType, TaskItem, TaskCategory, DifficultyLevel } from '@/types';

export class GroqLLMClient {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GROQ_API_KEY || '';
    
    console.log('=== GroqLLMClient Constructor ===');
    console.log('GROQ_API_KEY exists:', !!this.apiKey);
    console.log('GROQ_API_KEY length:', this.apiKey.length);
    
    if (!this.apiKey || this.apiKey === '') {
      console.error('❌ GROQ_API_KEY is not set!');
      const error = new Error('GROQ_API_KEY is not set in environment variables');
      error.name = 'GroqAPIKeyError';
      throw error;
    }
    
    console.log('✅ GROQ_API_KEY is set, initializing...');
    console.log('✅ Groq client initialized');
  }

  async analyzeJobDescription(content: string, type: AnalysisType): Promise<any> {
    try {
      console.log('=== Groq Analysis Started ===');
      
      const prompt = this.buildAnalysisPrompt(content, type);
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at analyzing job descriptions and identifying automation opportunities. Respond in Korean.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 4000,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('Groq API error:', error);
        throw new Error(`Groq API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices[0].message.content;

      console.log('✅ Groq API response received');
      const parsedData = this.parseAnalysisResponse(text);

      // Generate summary
      const summaryText = await this.generateSummary(content, parsedData);
      parsedData.aiSummary = summaryText;

      console.log('✅ Groq analysis completed');
      return parsedData;
    } catch (error) {
      console.error('Groq API error:', error);
      throw new Error('Failed to analyze with Groq API');
    }
  }

  private async generateSummary(originalContent: string, analysisData: any): Promise<string> {
    try {
      const prompt = `다음은 분석된 직무 설명입니다. 500자 이내로 상세한 분석 내용을 요약해주세요.

원본 내용:
${originalContent.substring(0, 500)}...

분석 결과 요약:
- 총 작업 수: ${analysisData.summary.total}개
- 완전 자동화 가능: ${analysisData.summary.automate}개
- AI 협업 가능: ${analysisData.summary.copilot}개
- 인간 중심 필수: ${analysisData.summary.humanCritical}개
- 평균 자동화 점수: ${analysisData.summary.averageScore}/100
- 예상 ROI: ${analysisData.summary.estimatedROI}%
- 자동화 잠재력: ${analysisData.summary.automationPotential}%

작업별 상세 정보:
${analysisData.tasks.map((task: any, i: number) =>
  `${i+1}. ${task.title} (${task.category}) - 점수: ${task.score}/100, ROI: ${task.roiEstimate}%, 난이도: ${task.difficulty}/5`
).join('\n')}

다음 내용을 포함하여 500자 이내로 상세히 요약해주세요:
1. 이 직무의 자동화 가능성 전체 평가
2. 주요 자동화 가능 작업들의 특징과 이점
3. AI 협업이 필요한 작업들과 그 이유
4. 인간 중심 작업들과 보유해야 할 영역
5. 구체적인 자동화 전략과 예상 효과
6. ROI와 생산성 향상에 대한 인사이트

상세하고 전문적인 톤으로 작성해주세요:`;

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at summarizing analysis results. Respond in Korean.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Summary generation failed');
      }

      const data = await response.json();
      let summary = data.choices[0].message.content.trim();

      // 500자 제한
      if (summary.length > 500) {
        summary = summary.substring(0, 500) + '...';
      }

      return summary;
    } catch (error) {
      console.error('Summary generation error:', error);
      return 'AI 분석을 통해 자동화 가능성을 평가했습니다.';
    }
  }

  private buildAnalysisPrompt(content: string, type: AnalysisType): string {
    const jobType = type === 'enterprise' ? 'Job Description' : 'Resume';
    
    return `다음 ${jobType}을 분석하여 한국어로 상세한 분석을 제공해주세요.

내용:
${content}

다음을 제공해주세요:
1. 자동화 가능한 작업들 (제목, 설명, 자동화 점수 0-100, ROI 추정, 난이도 1-5)
2. AI 협업에 적합한 작업들 (제목, 설명, 점수, ROI, 난이도)
3. 인간 중심 핵심 작업들 (제목, 설명, 점수, ROI, 난이도)
4. 구현을 위한 권장사항
5. 다음 단계

다음 JSON 구조로 응답하세요:
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
      "title": "작업 제목",
      "sourceText": "원본 텍스트",
      "category": "Automate" | "AI-Copilot" | "Human-Critical",
      "score": number,
      "roiEstimate": number,
      "difficulty": number,
      "reasoning": "이 카테고리인 이유",
      "estimatedTime": "시간 추정",
      "tools": [{"name": "도구 이름", "purpose": "용도", "alternatives": ["대안1"]}],
      "risks": ["위험1"],
      "safeguards": ["안전장치1"]
    }
  ],
  "recommendations": ["권장사항1", "권장사항2"],
  "nextSteps": ["단계1", "단계2"]
}

유효한 JSON만 응답하세요.`;
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
      console.error('Failed to parse Groq response:', error);
      throw new Error('Invalid response format from Groq');
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
      aiSummary: data.aiSummary || '',
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
}

