'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Clock, Target, CheckCircle } from 'lucide-react';
import { AnalysisResult } from '@/types';
import { useTranslation, Language } from '@/lib/i18n';

interface ResultSummaryProps {
  result: AnalysisResult;
  language?: Language;
}

const COLORS = {
  Automate: '#10b981', // green-500
  'Co-pilot': '#3b82f6', // blue-500
  'Human-critical': '#f59e0b', // amber-500
};

const COLORS_DARK = {
  Automate: '#059669', // green-600
  'Co-pilot': '#2563eb', // blue-600
  'Human-critical': '#d97706', // amber-600
};

export function ResultSummary({ result, language = 'ko' }: ResultSummaryProps) {
  const { summary } = result;
  const t = useTranslation(language);

  const pieData = [
    {
      name: t.task.category.automate,
      value: summary.automate,
      category: 'Automate',
      fill: COLORS.Automate,
    },
    {
      name: t.task.category.copilot,
      value: summary.copilot,
      category: 'Co-pilot',
      fill: COLORS['Co-pilot'],
    },
    {
      name: t.task.category.humanCritical,
      value: summary.humanCritical,
      category: 'Human-critical',
      fill: COLORS['Human-critical'],
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value}개 작업 ({((data.value / summary.total) * 100).toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}</span>
            <Badge variant="outline" className="text-xs">
              {entry.payload.value}개
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 요약 통계 */}
      <Card className="dark-card dark-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gradient dark-text-glow">{t.summary.totalTasks}</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.total}</div>
          <p className="text-xs text-muted-foreground">{language === 'ko' ? '분석된 작업' : 'Analyzed tasks'}</p>
        </CardContent>
      </Card>

      <Card className="dark-card dark-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gradient dark-text-glow">{t.summary.averageROI}</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.averageROI.toFixed(0)}%</div>
          <p className="text-xs text-muted-foreground">{language === 'ko' ? '시간 절감 예상' : 'Expected time savings'}</p>
        </CardContent>
      </Card>

      <Card className="dark-card dark-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gradient dark-text-glow">{t.summary.automateTasks}</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{summary.automate}</div>
          <p className="text-xs text-muted-foreground">
            {((summary.automate / summary.total) * 100).toFixed(1)}% {language === 'ko' ? '비율' : 'ratio'}
          </p>
        </CardContent>
      </Card>

      <Card className="dark-card dark-glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gradient dark-text-glow">{language === 'ko' ? '처리 시간' : 'Processing Time'}</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(result.metadata.processingTime / 1000).toFixed(1)}s
          </div>
          <p className="text-xs text-muted-foreground">{language === 'ko' ? '분석 소요 시간' : 'Analysis time'}</p>
        </CardContent>
      </Card>

      {/* 도넛 차트 */}
      <Card className="md:col-span-2 lg:col-span-4 dark-card dark-glow">
        <CardHeader>
          <CardTitle className="text-gradient dark-text-glow">{language === 'ko' ? '자동화 기회 분포' : 'Automation Opportunity Distribution'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 고임팩트 작업 */}
      {summary.highImpactTasks.length > 0 && (
        <Card className="md:col-span-2 lg:col-span-4 dark-card dark-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gradient dark-text-glow">
              <TrendingUp className="h-5 w-5 text-green-500" />
              {t.summary.highImpactTasks}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summary.highImpactTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="p-4 border rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
                    <Badge variant="automate" className="ml-2 flex-shrink-0">
                      {task.roiEstimate}% ROI
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      난이도 {task.difficulty}/5
                    </Badge>
                    <span>•</span>
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
