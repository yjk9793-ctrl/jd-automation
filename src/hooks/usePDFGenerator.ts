'use client';

import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AnalysisResult } from '@/types';

interface PDFGeneratorProps {
  result: AnalysisResult;
}

export function usePDFGenerator({ result }: PDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // PDF 생성
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // 제목
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('JDX 자동화 분석 리포트', margin, margin + 10);

      // 분석 타입
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text(
        `분석 타입: ${result.type === 'enterprise' ? '기업 분석' : '개인 분석'}`,
        margin,
        margin + 25
      );

      // 생성 날짜
      pdf.setFontSize(12);
      pdf.text(
        `생성일: ${new Date(result.createdAt).toLocaleDateString('ko-KR')}`,
        margin,
        margin + 35
      );

      // 요약 정보
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('분석 요약', margin, margin + 50);

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      
      const summaryData = [
        `총 작업 수: ${result.summary.total}개`,
        `완전 자동화: ${result.summary.automate}개`,
        `AI 협업: ${result.summary.copilot}개`,
        `인간 중심: ${result.summary.humanCritical}개`,
        `자동화 잠재력: ${result.summary.automationPotential}%`,
        `평균 점수: ${result.summary.averageScore}`,
        `예상 ROI: ${result.summary.estimatedROI}%`
      ];

      summaryData.forEach((item, index) => {
        pdf.text(item, margin, margin + 65 + (index * 8));
      });

      // 작업 목록
      let currentY = margin + 130;
      
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('작업 분석 결과', margin, currentY);
      currentY += 15;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      result.tasks.forEach((task, index) => {
        // 페이지 넘김 체크
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = margin;
        }

        // 작업 제목
        pdf.setFont('helvetica', 'bold');
        const titleLines = pdf.splitTextToSize(`${index + 1}. ${task.title}`, contentWidth);
        pdf.text(titleLines, margin, currentY);
        currentY += titleLines.length * 5;

        // 카테고리
        pdf.setFont('helvetica', 'normal');
        pdf.text(`카테고리: ${task.category}`, margin, currentY);
        currentY += 6;

        // 점수
        pdf.text(`자동화 점수: ${task.score}/100`, margin, currentY);
        currentY += 6;

        // ROI
        pdf.text(`예상 ROI: ${task.roiEstimate}%`, margin, currentY);
        currentY += 6;

        // 난이도
        pdf.text(`구현 난이도: ${task.difficulty}`, margin, currentY);
        currentY += 6;

        // 예상 시간
        pdf.text(`예상 구현 시간: ${task.estimatedTime}`, margin, currentY);
        currentY += 6;

        // 추론
        const reasoningLines = pdf.splitTextToSize(`추론: ${task.reasoning}`, contentWidth);
        pdf.text(reasoningLines, margin, currentY);
        currentY += reasoningLines.length * 5 + 10;

        // 도구 목록
        if (task.tools && task.tools.length > 0) {
          pdf.text('필요 도구:', margin, currentY);
          currentY += 6;
          task.tools.forEach((tool) => {
            const toolText = `- ${tool.name}: ${tool.purpose}`;
            const toolLines = pdf.splitTextToSize(toolText, contentWidth);
            pdf.text(toolLines, margin + 5, currentY);
            currentY += toolLines.length * 5;
          });
          currentY += 5;
        }

        // 위험 요소
        if (task.risks && task.risks.length > 0) {
          pdf.text('위험 요소:', margin, currentY);
          currentY += 6;
          task.risks.forEach((risk) => {
            const riskLines = pdf.splitTextToSize(`- ${risk}`, contentWidth);
            pdf.text(riskLines, margin + 5, currentY);
            currentY += riskLines.length * 5;
          });
          currentY += 5;
        }

        // 안전장치
        if (task.safeguards && task.safeguards.length > 0) {
          pdf.text('안전장치:', margin, currentY);
          currentY += 6;
          task.safeguards.forEach((safeguard) => {
            const safeguardLines = pdf.splitTextToSize(`- ${safeguard}`, contentWidth);
            pdf.text(safeguardLines, margin + 5, currentY);
            currentY += safeguardLines.length * 5;
          });
          currentY += 10;
        }
      });

      // 권장사항
      if (result.recommendations && result.recommendations.length > 0) {
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('권장사항', margin, currentY);
        currentY += 15;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        result.recommendations.forEach((recommendation) => {
          const recLines = pdf.splitTextToSize(`• ${recommendation}`, contentWidth);
          pdf.text(recLines, margin, currentY);
          currentY += recLines.length * 5;
        });
      }

      // 다음 단계
      if (result.nextSteps && result.nextSteps.length > 0) {
        if (currentY > pageHeight - 40) {
          pdf.addPage();
          currentY = margin;
        }

        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('다음 단계', margin, currentY);
        currentY += 15;

        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        result.nextSteps.forEach((step) => {
          const stepLines = pdf.splitTextToSize(`• ${step}`, contentWidth);
          pdf.text(stepLines, margin, currentY);
          currentY += stepLines.length * 5;
        });
      }

      // 푸터
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(
          `JDX 자동화 분석 플랫폼 - ${i}/${pageCount}`,
          margin,
          pageHeight - 10
        );
      }

      // 파일 다운로드
      const fileName = `JDX_분석결과_${result.type}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (err) {
      console.error('PDF 생성 오류:', err);
      setError('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePDF,
    isGenerating,
    error
  };
}

