'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Zap, 
  Brain, 
  Target,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { AnalysisResult } from '@/types';
import { useTranslation, Language } from '@/lib/i18n';

interface OverviewSummaryProps {
  result: AnalysisResult;
  language: Language;
}

export function OverviewSummary({ result, language }: OverviewSummaryProps) {
  const t = useTranslation(language);
  const { summary } = result;

  // 자동화 가능성 계산
  const automationPotential = Math.round((summary.automate / summary.total) * 100);
  const copilotPotential = Math.round((summary.copilot / summary.total) * 100);
  const humanCritical = Math.round((summary.humanCritical / summary.total) * 100);

  // 전체 점수 계산 (가중 평균)
  const overallScore = Math.round(
    (summary.automate * 90 + summary.copilot * 60 + summary.humanCritical * 20) / summary.total
  );

  // 위험도 계산
  const riskLevel = summary.humanCritical > summary.automate ? 'high' : 
                   summary.humanCritical > summary.copilot ? 'medium' : 'low';

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <XCircle className="h-5 w-5" />;
      case 'medium': return <AlertTriangle className="h-5 w-5" />;
      case 'low': return <CheckCircle className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 메인 오버뷰 카드 */}
      <Card className="dark-card dark-glow overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <BarChart3 className="h-8 w-8" />
            {language === 'ko' ? '전체 진단 요약' : 'Overall Analysis Summary'}
          </CardTitle>
          <p className="text-blue-100">
            {language === 'ko' 
              ? 'JD 분석 결과를 한눈에 확인하세요' 
              : 'Get a comprehensive view of your JD analysis results'
            }
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 전체 점수 */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${overallScore * 2.51} 251`}
                    className="text-blue-500 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">{overallScore}</div>
                    <div className="text-sm text-gray-500">
                      {language === 'ko' ? '점' : 'pts'}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gradient dark-text-glow">
                {language === 'ko' ? '전체 점수' : 'Overall Score'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === 'ko' ? '자동화 가능성 종합 평가' : 'Comprehensive automation potential'}
              </p>
            </div>

            {/* 자동화 분포 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gradient dark-text-glow">
                {language === 'ko' ? '자동화 분포' : 'Automation Distribution'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">
                      {language === 'ko' ? '완전 자동화' : 'Full Automation'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">{automationPotential}%</span>
                </div>
                <Progress value={automationPotential} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">
                      {language === 'ko' ? 'AI 협업' : 'AI Co-pilot'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">{copilotPotential}%</span>
                </div>
                <Progress value={copilotPotential} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium">
                      {language === 'ko' ? '인간 중심' : 'Human-Critical'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">{humanCritical}%</span>
                </div>
                <Progress value={humanCritical} className="h-2" />
              </div>
            </div>

            {/* 핵심 지표 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gradient dark-text-glow">
                {language === 'ko' ? '핵심 지표' : 'Key Metrics'}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">
                      {language === 'ko' ? '평균 ROI' : 'Avg ROI'}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-500">{summary.averageROI}%</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">
                      {language === 'ko' ? '처리 시간' : 'Process Time'}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-green-500">
                    {result.metadata.processingTime}ms
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="flex items-center gap-2">
                    {getRiskIcon(riskLevel)}
                    <span className="text-sm font-medium">
                      {language === 'ko' ? '위험도' : 'Risk Level'}
                    </span>
                  </div>
                  <span className={`text-lg font-bold ${getRiskColor(riskLevel)}`}>
                    {language === 'ko' 
                      ? (riskLevel === 'high' ? '높음' : riskLevel === 'medium' ? '보통' : '낮음')
                      : (riskLevel === 'high' ? 'High' : riskLevel === 'medium' ? 'Medium' : 'Low')
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 빠른 인사이트 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="dark-card dark-glow hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{summary.automate}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ko' ? '자동화 가능' : 'Automate'}
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card dark-glow hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{summary.copilot}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ko' ? 'AI 협업' : 'Co-pilot'}
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card dark-glow hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-1">{summary.humanCritical}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ko' ? '인간 중심' : 'Human-Critical'}
            </div>
          </CardContent>
        </Card>

        <Card className="dark-card dark-glow hover:shadow-lg transition-shadow">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">{summary.total}</div>
            <div className="text-sm text-muted-foreground">
              {language === 'ko' ? '총 작업' : 'Total Tasks'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 권장사항 카드 */}
      <Card className="dark-card dark-glow">
        <CardHeader>
          <CardTitle className="text-gradient dark-text-glow flex items-center gap-2">
            <Activity className="h-5 w-5" />
            {language === 'ko' ? '권장사항' : 'Recommendations'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                {language === 'ko' ? '즉시 실행 가능' : 'Ready to Execute'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ko' 
                  ? `${summary.automate}개 작업이 완전 자동화 가능합니다.`
                  : `${summary.automate} tasks are ready for full automation.`
                }
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                {language === 'ko' ? 'AI 협업 추천' : 'AI Co-pilot Recommended'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ko' 
                  ? `${summary.copilot}개 작업에 AI 협업을 적용하세요.`
                  : `Apply AI co-pilot to ${summary.copilot} tasks.`
                }
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                {language === 'ko' ? '주의 필요' : 'Requires Attention'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ko' 
                  ? `${summary.humanCritical}개 작업은 인간의 판단이 필요합니다.`
                  : `${summary.humanCritical} tasks require human judgment.`
                }
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                {language === 'ko' ? '예상 효과' : 'Expected Impact'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === 'ko' 
                  ? `평균 ${summary.averageROI}%의 ROI를 기대할 수 있습니다.`
                  : `Expect an average ROI of ${summary.averageROI}%.`
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
