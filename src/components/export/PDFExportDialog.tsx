'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AnalysisResult } from '@/types';
import { Language } from '@/lib/i18n';
import { Mail, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PDFExportDialogProps {
  analysisResult: AnalysisResult | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function PDFExportDialog({ analysisResult, isOpen, onClose, language }: PDFExportDialogProps) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [options, setOptions] = useState({
    includeTasks: true,
    includeRecipes: true,
    includeCode: true,
  });

  if (!isOpen || !analysisResult) return null;

  const handleSend = async () => {
    if (!email || !email.includes('@')) {
      toast.error('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisResult,
          email,
          options,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        toast.success('PDF가 성공적으로 전송되었습니다!');
        setTimeout(() => {
          onClose();
          setIsSent(false);
          setEmail('');
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to send PDF');
      }
    } catch (error) {
      console.error('Export error:', error);
      toast.error('PDF 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSending(false);
    }
  };

  const handleDownload = () => {
    // Create a simple text version for download
    const content = generatePDFContent(result, options);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jd-analysis-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('파일이 다운로드되었습니다!');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            PDF 내보내기
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSent ? (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">전송 완료!</h3>
              <p className="text-sm text-muted-foreground">
                PDF가 <strong>{email}</strong>로 전송되었습니다.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  이메일 주소
                </label>
                <Input
                  type="email"
                  placeholder="example@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSending}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">포함 옵션</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeTasks}
                      onChange={(e) => setOptions({ ...options, includeTasks: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">작업 목록 포함</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeRecipes}
                      onChange={(e) => setOptions({ ...options, includeRecipes: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">구현 레시피 포함</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.includeCode}
                      onChange={(e) => setOptions({ ...options, includeCode: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm">코드 샘플 포함</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSend}
                  disabled={isSending || !email}
                  className="flex-1"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      전송 중...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      이메일로 전송
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownload}
                  disabled={isSending}
                >
                  <Download className="h-4 w-4 mr-2" />
                  다운로드
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full"
                disabled={isSending}
              >
                취소
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                <AlertCircle className="h-3 w-3 inline mr-1" />
                이메일 전송 기능은 데모 모드입니다. 실제 환경에서는 이메일 서비스를 설정해야 합니다.
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function generatePDFContent(result: AnalysisResult, options: any): string {
  const { tasks, summary, metadata } = result;
  
  let content = `
========================================
JD Analysis Report
========================================

Analysis Date: ${new Date(metadata.analyzedAt).toLocaleString()}
Total Tasks: ${summary.total}
Average ROI: ${summary.averageROI.toFixed(1)}%

Task Distribution:
- Automation Possible: ${summary.automate} tasks
- AI Co-pilot: ${summary.copilot} tasks
- Human-Critical: ${summary.humanCritical} tasks

========================================
High Impact Tasks
========================================

${summary.highImpactTasks.map((task, idx) => `
${idx + 1}. ${task.title}
   Score: ${task.score}/100
   ROI: ${task.roiEstimate}%
   Category: ${task.category}
   Difficulty: ${task.difficulty}/5
   Estimated Time: ${task.estimatedTime}

   Source Text:
   ${task.sourceText}

   Evaluation Reasoning:
   ${task.reasoning}

   ${task.category === 'Automate' || task.category === 'Co-pilot' ? `
   Agent Type: ${getAgentType(task)}
   Key Features:
   - Automated execution
   - Error handling
   - Real-time monitoring
   
   Expected Effects:
   - ${task.roiEstimate}% time savings
   - Cost reduction
   - Quality improvement
   ` : ''}

   Risks:
   ${task.risks.map(r => `   - ${r}`).join('\n')}

   Safeguards:
   ${task.safeguards.map(s => `   - ${s}`).join('\n')}

   Required Tools:
   ${task.tools.map(t => `   - ${t.name}: ${t.purpose}`).join('\n')}

   ${options.includeRecipes && task.recipe ? `
   Implementation Recipe:
   Inputs:
   ${task.recipe.inputs.map(i => `   - ${i.name} (${i.type}): ${i.source}`).join('\n')}
   
   Outputs:
   ${task.recipe.outputs.map(o => `   - ${o.name} (${o.type}): ${o.source}`).join('\n')}
   
   Steps:
   ${task.recipe.steps.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}
   
   ${options.includeCode && task.recipe.codeSamples.length > 0 ? `
   Code Samples:
   ${task.recipe.codeSamples.map(cs => `
   ${cs.label}:
   ${cs.code}
   `).join('\n')}
   ` : ''}
   
   Tests:
   ${task.recipe.tests.map(t => `   - ${t}`).join('\n')}
   
   Monitoring:
   ${task.recipe.monitoring.map(m => `   - ${m}`).join('\n')}
   ` : ''}

   ${'='.repeat(40)}
`).join('\n')}

${options.includeTasks ? `
========================================
All Tasks
========================================

${tasks.map((task, idx) => `
${idx + 1}. ${task.title}
   Category: ${task.category}
   Score: ${task.score}/100
   ROI: ${task.roiEstimate}%
   Difficulty: ${task.difficulty}/5
`).join('\n')}
` : ''}

========================================
End of Report
========================================
`;

  return content;
}

function getAgentType(task: any): string {
  const title = task.title.toLowerCase();
  
  if (title.includes('data') || title.includes('process') || title.includes('extract')) {
    return 'Data Processing Agent';
  }
  if (title.includes('customer') || title.includes('support') || title.includes('inquiry')) {
    return 'Customer Service Agent';
  }
  if (title.includes('content') || title.includes('write') || title.includes('generate')) {
    return 'Content Generation Agent';
  }
  if (title.includes('analysis') || title.includes('analyze') || title.includes('report')) {
    return 'Analysis Agent';
  }
  if (title.includes('monitor') || title.includes('track') || title.includes('alert')) {
    return 'Monitoring Agent';
  }
  
  return 'Workflow Automation Agent';
}
