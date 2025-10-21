'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ShareBar } from '@/components/layout/ShareBar';
import { JDInput } from '@/components/forms/JDInput';
import { ResultSummary } from '@/components/charts/ResultSummary';
import { TaskList } from '@/components/charts/TaskList';
import { TaskDetail } from '@/components/charts/TaskDetail';
import { DetailedReport } from '@/components/charts/DetailedReport';
import { AgentAdvice } from '@/components/charts/AgentAdvice';
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

  // 언어 변경 디버깅
  const handleLanguageChange = (newLanguage: Language) => {
    console.log('Language changing from', language, 'to', newLanguage);
    setLanguage(newLanguage);
  };

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
          onLanguageChange={handleLanguageChange}
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
                <ResultSummary result={analysisResult} language={language} />

                {/* 메인 컨텐츠 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 작업 목록 */}
                  <TaskList
                    tasks={analysisResult.tasks}
                    selectedTask={selectedTask}
                    onTaskSelect={handleTaskSelect}
                    language={language}
                  />

                  {/* 작업 상세 */}
                  {selectedTask ? (
                    <TaskDetail
                      task={selectedTask}
                      onGenerateRecipe={handleGenerateRecipe}
                      language={language}
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

                {/* 에이전트 활용 조언 */}
                <AgentAdvice 
                  language={language} 
                  jobRole={analysisResult.jobRole || 'General'} 
                />
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
        <div className="text-center mb-20">
          {/* 상단 배지 */}
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm font-medium animate-fade-in">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              AI-Powered Job Description Analysis
            </span>
          </div>
          
          {/* 메인 타이틀 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-gradient text-shadow animate-slide-up leading-tight">
            {t.hero.title}
            <br />
            <span className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground font-normal">
              {t.hero.subtitle}
            </span>
          </h1>
          
          {/* 서브 타이틀 */}
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-6 animate-fade-in">
              실시간 JD 분석부터 에이전트화 전략까지<br />
              <span className="text-primary font-semibold">한 곳에서 가능한 원스톱 AI 플랫폼</span>
            </h2>
          </div>
          
          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-scale-in">
            <Button 
              size="lg" 
              onClick={handleDemo}
              className="h-14 px-10 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Play className="h-6 w-6 mr-3" />
              {t.hero.demoButton}
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => document.getElementById('jd-input')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-14 px-10 text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRight className="h-6 w-6 mr-3" />
              {t.hero.startButton}
            </Button>
          </div>

          {/* 특징 카드들 - ThinkingData 스타일 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                    {t.hero.features.automation.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t.hero.features.automation.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors duration-300">
                    {t.hero.features.roi.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t.hero.features.roi.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                    {t.hero.features.guide.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {t.hero.features.guide.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 통계 섹션 - ThinkingData 스타일 */}
        <div className="py-20 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                1500+개 기업이 선택한<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  쉽고 빠른 글로벌 원스톱 AI 플랫폼
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  10배
                </div>
                <div className="text-lg text-gray-300 font-semibold mb-1">더 빠른 실행</div>
                <div className="text-sm text-gray-400">AI 분석 속도</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  2배
                </div>
                <div className="text-lg text-gray-300 font-semibold mb-1">더 높은 성과</div>
                <div className="text-sm text-gray-400">업무 효율성</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  95%
                </div>
                <div className="text-lg text-gray-300 font-semibold mb-1">정확도</div>
                <div className="text-sm text-gray-400">AI 분석 정확도</div>
              </div>
              
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-lg text-gray-300 font-semibold mb-1">실시간 분석</div>
                <div className="text-sm text-gray-400">언제든지 사용</div>
              </div>
            </div>
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

        {/* 프로세스 섹션 - ThinkingData 스타일 */}
        <div className="py-20 mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                JD가 움직이는 전 과정을<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  풀퍼널로 연결합니다
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                우리 서비스 속 JD를 이해하고 비즈니스를 성장시키기 위한 모든 과정을 하나로
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* 1단계 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">수집</h3>
                <p className="text-gray-300 text-sm">
                  모든 JD 데이터를<br />
                  실시간으로 수집
                </p>
              </div>
              
              {/* 2단계 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">분석</h3>
                <p className="text-gray-300 text-sm">
                  복잡한 JD도<br />
                  쉽게 이해하도록 가공
                </p>
              </div>
              
              {/* 3단계 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">실행</h3>
                <p className="text-gray-300 text-sm">
                  AI 분석으로<br />
                  빠른 인사이트 파악
                </p>
              </div>
              
              {/* 4단계 */}
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">개선</h3>
                <p className="text-gray-300 text-sm">
                  실시간 모니터링 및<br />
                  N차 분석을 통한 개선
                </p>
              </div>
            </div>
          </div>
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
