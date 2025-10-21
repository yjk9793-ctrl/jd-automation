'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ShareBar } from '@/components/layout/ShareBar';
import { JDInput } from '@/components/forms/JDInput';
import { ResultSummary } from '@/components/charts/ResultSummary';
import { TaskList } from '@/components/charts/TaskList';
import { TaskDetail } from '@/components/charts/TaskDetail';
import { DetailedReport } from '@/components/charts/DetailedReport';
import { PDFExportDialog } from '@/components/export/PDFExportDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  TrendingUp, 
  Zap, 
  Users, 
  Target,
  ArrowRight,
  Lightbulb,
  BarChart3,
  FileText,
  Download
} from 'lucide-react';
import { JDInput as JDInputType, AnalysisResult, TaskItem } from '@/types';
import { getSampleJD, getDemoResult } from '@/lib/demoData';
import { useTranslation, Language } from '@/lib/i18n';
import { Toaster } from 'sonner';

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [language, setLanguage] = useState<Language>('ko');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');
  
  const t = useTranslation(language);

  const handleAnalyze = async (jd: JDInputType) => {
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jd,
          options: {
            includeRecipe: true,
            detailLevel: 'detailed'
          }
        }),
      });

      if (!response.ok) {
        throw new Error('분석 실패');
      }

      const result = await response.json();
      
      if (result.success) {
        setAnalysisResult(result.data);
        setSelectedTask(undefined);
      } else {
        throw new Error(result.error || '알 수 없는 오류');
      }
    } catch (error) {
      console.error('분석 오류:', error);
      alert('JD 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDemo = () => {
    const sampleJD = getSampleJD('hr');
    const demoResult = getDemoResult('hr');
    
    setAnalysisResult(demoResult);
    setSelectedTask(undefined);
    setShowDemo(true);
  };

  const handleAnalyzeDemo = async (jd: JDInputType) => {
    // 데모 모드에서는 실제 API 호출 없이 샘플 결과 반환
    const demoResult = getDemoResult('hr');
    setAnalysisResult(demoResult);
    setSelectedTask(undefined);
    setShowDemo(true);
  };

  const handleTaskSelect = (task: TaskItem) => {
    setSelectedTask(task);
  };

  const handleGenerateRecipe = async () => {
    if (!selectedTask) return;

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: selectedTask,
          includeCode: true,
          includeDiagram: true
        }),
      });

      if (!response.ok) {
        throw new Error('레시피 생성 실패');
      }

      const result = await response.json();
      
      if (result.success) {
        // 선택된 작업의 레시피 업데이트
        setSelectedTask(prev => prev ? { ...prev, recipe: result.data } : undefined);
      } else {
        throw new Error(result.error || '알 수 없는 오류');
      }
    } catch (error) {
      console.error('레시피 생성 오류:', error);
      alert('레시피 생성 중 오류가 발생했습니다.');
    }
  };

  if (analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header 
          showSettings={false} 
          language={language}
          onLanguageChange={setLanguage}
        />
        
        <ShareBar 
          result={analysisResult}
          selectedTasks={selectedTask ? [selectedTask.id] : []}
        />

        <main className="container mx-auto px-4 py-6">
          <div className="space-y-6">
            {/* 뷰 모드 전환 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'summary' ? 'default' : 'outline'}
                  onClick={() => setViewMode('summary')}
                  size="sm"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {t.analysis.overview}
                </Button>
                <Button
                  variant={viewMode === 'detailed' ? 'default' : 'outline'}
                  onClick={() => setViewMode('detailed')}
                  size="sm"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t.analysis.details}
                </Button>
              </div>
              
              <Button
                onClick={() => setShowExportDialog(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Download className="h-4 w-4 mr-2" />
                {t.common.export} PDF
              </Button>
            </div>

            {viewMode === 'summary' ? (
              <>
                {/* 결과 요약 */}
                <ResultSummary result={analysisResult} />

                {/* 메인 컨텐츠 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 작업 목록 */}
                  <TaskList
                    tasks={analysisResult.tasks}
                    selectedTask={selectedTask}
                    onTaskSelect={handleTaskSelect}
                  />

                  {/* 작업 상세 */}
                  {selectedTask ? (
                    <TaskDetail
                      task={selectedTask}
                      onGenerateRecipe={handleGenerateRecipe}
                    />
                  ) : (
                    <Card className="flex items-center justify-center min-h-[400px]">
                      <CardContent className="text-center">
                        <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold mb-2">{t.analysis.selectTask}</h3>
                        <p className="text-muted-foreground">
                          {t.analysis.noTaskSelected}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </>
            ) : (
              <DetailedReport result={analysisResult} selectedTasks={selectedTask ? [selectedTask] : []} />
            )}

            {/* 데모 모드 표시 */}
            {showDemo && (
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                    <Lightbulb className="h-4 w-4" />
                    <span className="font-medium">{t.analysis.demoMode}</span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                    {t.analysis.demoModeDescription}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        {/* PDF Export Dialog */}
        {showExportDialog && (
          <PDFExportDialog
            result={analysisResult}
            isOpen={showExportDialog}
            onClose={() => setShowExportDialog(false)}
          />
        )}

        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 다크 테마 배경 애니메이션 요소 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl floating-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl floating" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-rose-500/15 to-orange-500/15 rounded-full blur-3xl floating" style={{animationDelay: '6s'}}></div>
      </div>
      
      <Header 
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 mb-6 glass rounded-full animate-fade-in">
            <span className="text-sm font-medium text-gradient">
              AI-Powered Job Description Analysis
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient text-shadow animate-slide-up">
            {t.hero.title}
            <br />
            <span className="text-primary">{t.hero.titleHighlight}</span> {t.hero.subtitle}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto whitespace-pre-line animate-fade-in">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-scale-in">
            <Button 
              size="lg" 
              onClick={handleDemo}
              className="h-12 px-8 btn-modern micro-interaction"
            >
              <Play className="h-5 w-5 mr-2" />
              {t.hero.demoButton}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('jd-input')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-12 px-8 border-2 hover:bg-accent transition-all micro-interaction glass"
            >
              <ArrowRight className="h-5 w-5 mr-2" />
              {t.hero.startButton}
            </Button>
          </div>

          {/* 특징 카드들 - 다크 테마 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="dark-card micro-interaction animate-fade-in dark-glow">
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center floating dark-pulse">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gradient dark-text-glow">{t.hero.features.automation.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.hero.features.automation.description}
                </p>
              </CardContent>
            </Card>
            
            <Card className="dark-card micro-interaction animate-fade-in dark-glow" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-secondary flex items-center justify-center floating-delayed dark-pulse">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gradient dark-text-glow">{t.hero.features.roi.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.hero.features.roi.description}
                </p>
              </CardContent>
            </Card>
            
            <Card className="dark-card micro-interaction animate-fade-in dark-glow" style={{animationDelay: '0.4s'}}>
              <CardContent className="p-6 text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full gradient-accent flex items-center justify-center floating dark-pulse" style={{animationDelay: '2s'}}>
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2 text-gradient dark-text-glow">{t.hero.features.guide.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.hero.features.guide.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* JD 입력 섹션 */}
        <div id="jd-input">
          <JDInput 
            onAnalyze={handleAnalyze}
            isLoading={isAnalyzing}
            sampleData={getSampleJD('hr')}
          />
        </div>

        {/* 데모 모드 안내 */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <Lightbulb className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-700 dark:text-blue-300">
              {language === 'ko' 
                ? '현재 데모 모드입니다. 실제 OpenAI API 키를 설정하면 더 정확한 분석을 받을 수 있습니다.'
                : 'Currently in demo mode. Set up your OpenAI API key for more accurate analysis.'}
            </span>
          </div>
        </div>

        {/* 사용 통계 */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <div className="text-2xl font-bold text-primary">1,000+</div>
              <div className="text-sm text-muted-foreground">{t.stats.analyzed}</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <div className="text-2xl font-bold text-primary">75%</div>
              <div className="text-sm text-muted-foreground">{t.stats.averageROI}</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <div className="text-2xl font-bold text-primary">3초</div>
              <div className="text-sm text-muted-foreground">{t.stats.analysisTime}</div>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">{t.stats.available}</div>
            </div>
          </div>
        </div>
      </main>
      
      <Toaster />
    </div>
  );
}
