'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Share2, 
  FileText, 
  FileDown, 
  Copy, 
  CheckCircle,
  ExternalLink,
  Settings
} from 'lucide-react';
import { AnalysisResult, ExportOptions } from '@/types';
import { ExportService } from '@/lib/export';

interface ShareBarProps {
  result: AnalysisResult;
  selectedTasks?: string[];
  onExportSettings?: () => void;
}

export function ShareBar({ result, selectedTasks = [], onExportSettings }: ShareBarProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    format: 'pdf',
    includeTasks: selectedTasks,
    includeRecipes: false,
    includeCode: false,
  });

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      if (exportOptions.format === 'pdf') {
        await ExportService.exportToPDF(result, exportOptions);
      } else {
        const markdown = ExportService.exportToMarkdown(result, exportOptions);
        ExportService.downloadMarkdown(markdown);
      }
    } catch (error) {
      console.error('내보내기 실패:', error);
      alert('내보내기 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareLink = ExportService.generateShareLink(result);
      await navigator.clipboard.writeText(shareLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (error) {
      console.error('공유 링크 생성 실패:', error);
      alert('공유 링크 생성에 실패했습니다.');
    }
  };

  const copyResults = async () => {
    try {
      const summary = `
JD 자동화 분석 결과

📊 요약:
• 총 작업: ${result.summary.total}개
• 자동화 가능: ${result.summary.automate}개 (${((result.summary.automate / result.summary.total) * 100).toFixed(1)}%)
• 반자동화: ${result.summary.copilot}개 (${((result.summary.copilot / result.summary.total) * 100).toFixed(1)}%)
• 사람 중심: ${result.summary.humanCritical}개 (${((result.summary.humanCritical / result.summary.total) * 100).toFixed(1)}%)
• 평균 ROI: ${result.summary.averageROI.toFixed(1)}%

🚀 고임팩트 자동화 기회:
${result.summary.highImpactTasks.map((task, index) => 
  `${index + 1}. ${task.title} (ROI ${task.roiEstimate}%)`
).join('\n')}

분석 일시: ${new Date(result.metadata.analyzedAt).toLocaleString('ko-KR')}
      `.trim();

      await navigator.clipboard.writeText(summary);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (error) {
      console.error('복사 실패:', error);
      alert('결과 복사에 실패했습니다.');
    }
  };

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* 좌측: 결과 요약 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                총 {result.summary.total}개 작업
              </Badge>
              <Badge variant="automate" className="text-sm">
                자동화 {result.summary.automate}개
              </Badge>
              <Badge variant="copilot" className="text-sm">
                반자동화 {result.summary.copilot}개
              </Badge>
              <Badge variant="humanCritical" className="text-sm">
                사람 중심 {result.summary.humanCritical}개
              </Badge>
            </div>
          </div>

          {/* 우측: 액션 버튼들 */}
          <div className="flex items-center gap-2">
            {/* 내보내기 설정 */}
            <div className="flex items-center gap-2">
              <select
                value={exportOptions.format}
                onChange={(e) => setExportOptions(prev => ({ 
                  ...prev, 
                  format: e.target.value as 'pdf' | 'markdown' 
                }))}
                className="px-3 py-1.5 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="pdf">PDF</option>
                <option value="markdown">Markdown</option>
              </select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={isExporting}
              >
                {isExporting ? (
                  <>
                    <Download className="h-4 w-4 mr-1 animate-spin" />
                    내보내는 중...
                  </>
                ) : (
                  <>
                    {exportOptions.format === 'pdf' ? (
                      <FileDown className="h-4 w-4 mr-1" />
                    ) : (
                      <FileText className="h-4 w-4 mr-1" />
                    )}
                    {exportOptions.format === 'pdf' ? 'PDF' : 'MD'} 내보내기
                  </>
                )}
              </Button>
            </div>

            {/* 설정 버튼 */}
            {onExportSettings && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onExportSettings}
              >
                <Settings className="h-4 w-4" />
              </Button>
            )}

            {/* 결과 복사 */}
            <Button
              variant="outline"
              size="sm"
              onClick={copyResults}
            >
              {copiedLink ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  요약 복사
                </>
              )}
            </Button>

            {/* 공유 링크 */}
            <Button
              variant="default"
              size="sm"
              onClick={handleShare}
            >
              {copiedLink ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  링크 복사됨
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4 mr-1" />
                  공유
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 선택된 작업 표시 */}
        {selectedTasks.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>선택된 작업:</span>
              <Badge variant="outline" className="text-xs">
                {selectedTasks.length}개 선택됨
              </Badge>
              <span className="text-xs">
                (선택된 작업만 내보내기에 포함됩니다)
              </span>
            </div>
          </div>
        )}

        {/* 내보내기 옵션 표시 */}
        {(exportOptions.includeRecipes || exportOptions.includeCode) && (
          <div className="mt-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>내보내기 옵션:</span>
              {exportOptions.includeRecipes && (
                <Badge variant="outline" className="text-xs">
                  레시피 포함
                </Badge>
              )}
              {exportOptions.includeCode && (
                <Badge variant="outline" className="text-xs">
                  코드 포함
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
