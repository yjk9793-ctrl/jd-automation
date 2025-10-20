import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnalysisResult, TaskItem, ExportOptions } from '@/types';

export class ExportService {
  /**
   * PDF 내보내기
   */
  static async exportToPDF(result: AnalysisResult, options: ExportOptions): Promise<void> {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;

    // 헤더
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('JD 자동화 분석 결과', margin, yPosition);
    yPosition += 30;

    // 요약 정보
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    const summaryText = `
분석 일시: ${new Date(result.metadata.analyzedAt).toLocaleString('ko-KR')}
총 작업 수: ${result.summary.total}개
자동화 가능: ${result.summary.automate}개 (${((result.summary.automate / result.summary.total) * 100).toFixed(1)}%)
반자동화 권장: ${result.summary.copilot}개 (${((result.summary.copilot / result.summary.total) * 100).toFixed(1)}%)
사람 중심: ${result.summary.humanCritical}개 (${((result.summary.humanCritical / result.summary.total) * 100).toFixed(1)}%)
평균 ROI: ${result.summary.averageROI.toFixed(1)}%
처리 시간: ${(result.metadata.processingTime / 1000).toFixed(1)}초
    `.trim();

    const summaryLines = pdf.splitTextToSize(summaryText, pageWidth - 2 * margin);
    pdf.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * 6 + 20;

    // 작업 목록
    const filteredTasks = result.tasks.filter(task => 
      options.includeTasks.length === 0 || options.includeTasks.includes(task.id)
    );

    for (const task of filteredTasks) {
      // 새 페이지 체크
      if (yPosition > pageHeight - 100) {
        pdf.addPage();
        yPosition = margin;
      }

      // 작업 제목
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text(task.title, margin, yPosition);
      yPosition += 15;

      // 작업 정보
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const taskInfo = `
카테고리: ${task.category}
자동화 점수: ${task.score}점
예상 ROI: ${task.roiEstimate}%
구현 난이도: ${task.difficulty}/5
예상 시간: ${task.estimatedTime}
      `.trim();

      const infoLines = pdf.splitTextToSize(taskInfo, pageWidth - 2 * margin);
      pdf.text(infoLines, margin, yPosition);
      yPosition += infoLines.length * 5 + 10;

      // 작업 설명
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const description = task.sourceText.length > 200 
        ? task.sourceText.substring(0, 200) + '...'
        : task.sourceText;
      
      const descLines = pdf.splitTextToSize(description, pageWidth - 2 * margin);
      pdf.text(descLines, margin, yPosition);
      yPosition += descLines.length * 5 + 10;

      // 평가 근거
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('평가 근거:', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const reasoningLines = pdf.splitTextToSize(task.reasoning, pageWidth - 2 * margin);
      pdf.text(reasoningLines, margin, yPosition);
      yPosition += reasoningLines.length * 5 + 10;

      // 권장 도구
      if (task.tools.length > 0) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('권장 도구:', margin, yPosition);
        yPosition += 8;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const toolsText = task.tools.map(tool => `• ${tool.name}: ${tool.purpose}`).join('\n');
        const toolsLines = pdf.splitTextToSize(toolsText, pageWidth - 2 * margin);
        pdf.text(toolsLines, margin, yPosition);
        yPosition += toolsLines.length * 5 + 10;
      }

      // 리스크 및 가드레일
      if (task.risks.length > 0 || task.safeguards.length > 0) {
        if (task.risks.length > 0) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('리스크:', margin, yPosition);
          yPosition += 8;

          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          const risksText = task.risks.map(risk => `• ${risk}`).join('\n');
          const risksLines = pdf.splitTextToSize(risksText, pageWidth - 2 * margin);
          pdf.text(risksLines, margin, yPosition);
          yPosition += risksLines.length * 5 + 10;
        }

        if (task.safeguards.length > 0) {
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.text('가드레일:', margin, yPosition);
          yPosition += 8;

          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          const safeguardsText = task.safeguards.map(safeguard => `• ${safeguard}`).join('\n');
          const safeguardsLines = pdf.splitTextToSize(safeguardsText, pageWidth - 2 * margin);
          pdf.text(safeguardsLines, margin, yPosition);
          yPosition += safeguardsLines.length * 5 + 10;
        }
      }

      // 레시피 (옵션이 활성화된 경우)
      if (options.includeRecipes && task.recipe.steps.length > 0) {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        pdf.text('구현 레시피:', margin, yPosition);
        yPosition += 8;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const recipeText = task.recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n');
        const recipeLines = pdf.splitTextToSize(recipeText, pageWidth - 2 * margin);
        pdf.text(recipeLines, margin, yPosition);
        yPosition += recipeLines.length * 5 + 10;
      }

      yPosition += 20; // 작업 간 간격
    }

    // 파일 저장
    const fileName = `jd-automation-analysis-${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
  }

  /**
   * Markdown 내보내기
   */
  static exportToMarkdown(result: AnalysisResult, options: ExportOptions): string {
    let markdown = `# JD 자동화 분석 결과\n\n`;
    
    // 메타데이터
    markdown += `**분석 일시:** ${new Date(result.metadata.analyzedAt).toLocaleString('ko-KR')}\n`;
    markdown += `**JD 길이:** ${result.metadata.jdLength.toLocaleString()}자\n`;
    markdown += `**처리 시간:** ${(result.metadata.processingTime / 1000).toFixed(1)}초\n\n`;

    // 요약
    markdown += `## 📊 분석 요약\n\n`;
    markdown += `- **총 작업 수:** ${result.summary.total}개\n`;
    markdown += `- **자동화 가능:** ${result.summary.automate}개 (${((result.summary.automate / result.summary.total) * 100).toFixed(1)}%)\n`;
    markdown += `- **반자동화 권장:** ${result.summary.copilot}개 (${((result.summary.copilot / result.summary.total) * 100).toFixed(1)}%)\n`;
    markdown += `- **사람 중심:** ${result.summary.humanCritical}개 (${((result.summary.humanCritical / result.summary.total) * 100).toFixed(1)}%)\n`;
    markdown += `- **평균 ROI:** ${result.summary.averageROI.toFixed(1)}%\n\n`;

    // 고임팩트 작업
    if (result.summary.highImpactTasks.length > 0) {
      markdown += `## 🚀 고임팩트 자동화 기회\n\n`;
      result.summary.highImpactTasks.forEach((task, index) => {
        markdown += `${index + 1}. **${task.title}** - ROI ${task.roiEstimate}% (난이도 ${task.difficulty}/5)\n`;
      });
      markdown += `\n`;
    }

    // 작업 목록
    markdown += `## 📋 작업 상세 분석\n\n`;
    
    const filteredTasks = result.tasks.filter(task => 
      options.includeTasks.length === 0 || options.includeTasks.includes(task.id)
    );

    filteredTasks.forEach((task, index) => {
      const categoryEmoji = {
        'Automate': '🤖',
        'Co-pilot': '👥',
        'Human-critical': '👤'
      }[task.category];

      markdown += `### ${categoryEmoji} ${task.title}\n\n`;
      
      markdown += `**카테고리:** ${task.category}\n`;
      markdown += `**자동화 점수:** ${task.score}점\n`;
      markdown += `**예상 ROI:** ${task.roiEstimate}%\n`;
      markdown += `**구현 난이도:** ${task.difficulty}/5\n`;
      markdown += `**예상 시간:** ${task.estimatedTime}\n\n`;

      markdown += `**작업 설명:**\n${task.sourceText}\n\n`;

      markdown += `**평가 근거:**\n${task.reasoning}\n\n`;

      // 권장 도구
      if (task.tools.length > 0) {
        markdown += `**권장 도구:**\n`;
        task.tools.forEach(tool => {
          markdown += `- **${tool.name}:** ${tool.purpose}\n`;
          if (tool.alt && tool.alt.length > 0) {
            markdown += `  - 대체 도구: ${tool.alt.join(', ')}\n`;
          }
        });
        markdown += `\n`;
      }

      // 리스크
      if (task.risks.length > 0) {
        markdown += `**⚠️ 리스크:**\n`;
        task.risks.forEach(risk => {
          markdown += `- ${risk}\n`;
        });
        markdown += `\n`;
      }

      // 가드레일
      if (task.safeguards.length > 0) {
        markdown += `**🛡️ 가드레일:**\n`;
        task.safeguards.forEach(safeguard => {
          markdown += `- ${safeguard}\n`;
        });
        markdown += `\n`;
      }

      // 레시피 (옵션이 활성화된 경우)
      if (options.includeRecipes && task.recipe.steps.length > 0) {
        markdown += `**📝 구현 레시피:**\n\n`;
        
        if (task.recipe.inputs.length > 0) {
          markdown += `**입력 데이터:**\n`;
          task.recipe.inputs.forEach(input => {
            markdown += `- **${input.name}** (${input.type}) - 출처: ${input.source}\n`;
          });
          markdown += `\n`;
        }

        if (task.recipe.outputs.length > 0) {
          markdown += `**출력 데이터:**\n`;
          task.recipe.outputs.forEach(output => {
            markdown += `- **${output.name}** (${output.type}) - 대상: ${output.target}\n`;
          });
          markdown += `\n`;
        }

        markdown += `**구현 단계:**\n`;
        task.recipe.steps.forEach((step, stepIndex) => {
          markdown += `${stepIndex + 1}. ${step}\n`;
        });
        markdown += `\n`;

        // 코드 예시
        if (options.includeCode && task.recipe.codeSamples.length > 0) {
          markdown += `**코드 예시:**\n\n`;
          task.recipe.codeSamples.forEach(sample => {
            markdown += `**${sample.label}:**\n`;
            markdown += `\`\`\`${sample.lang}\n${sample.code}\n\`\`\`\n\n`;
          });
        }

        // 테스트 케이스
        if (task.recipe.tests.length > 0) {
          markdown += `**테스트 케이스:**\n`;
          task.recipe.tests.forEach(test => {
            markdown += `- ${test}\n`;
          });
          markdown += `\n`;
        }

        // 모니터링 지표
        if (task.recipe.monitoring.length > 0) {
          markdown += `**모니터링 지표:**\n`;
          task.recipe.monitoring.forEach(metric => {
            markdown += `- ${metric}\n`;
          });
          markdown += `\n`;
        }

        // Mermaid 다이어그램
        if (task.recipe.flowMermaid) {
          markdown += `**플로우 다이어그램:**\n\n`;
          markdown += `\`\`\`mermaid\n${task.recipe.flowMermaid}\n\`\`\`\n\n`;
        }
      }

      markdown += `---\n\n`;
    });

    return markdown;
  }

  /**
   * Markdown을 파일로 다운로드
   */
  static downloadMarkdown(markdown: string, filename?: string): void {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `jd-automation-analysis-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * 공유 링크 생성 (로컬 스토리지 기반)
   */
  static generateShareLink(result: AnalysisResult): string {
    const shareId = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 로컬 스토리지에 저장 (24시간 후 만료)
    const shareData = {
      result,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
    
    localStorage.setItem(`share_${shareId}`, JSON.stringify(shareData));
    
    // 공유 링크 반환
    return `${window.location.origin}/share/${shareId}`;
  }

  /**
   * 공유 데이터 로드
   */
  static loadShareData(shareId: string): AnalysisResult | null {
    try {
      const shareData = localStorage.getItem(`share_${shareId}`);
      if (!shareData) return null;

      const parsed = JSON.parse(shareData);
      
      // 만료 체크
      if (new Date() > new Date(parsed.expiresAt)) {
        localStorage.removeItem(`share_${shareId}`);
        return null;
      }

      return parsed.result;
    } catch (error) {
      console.error('공유 데이터 로드 실패:', error);
      return null;
    }
  }
}
