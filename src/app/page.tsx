'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, Badge, Alert, Modal, Form, Tab, Tabs, ListGroup, Table, Spinner } from 'react-bootstrap';
import { Header } from '@/components/layout/Header';
import { ShareBar } from '@/components/layout/ShareBar';
import { Footer } from '@/components/layout/Footer';
import { JDInput } from '@/components/forms/JDInput';
import { ResultSummary } from '@/components/charts/ResultSummary';
import { TaskList } from '@/components/charts/TaskList';
import { TaskDetail } from '@/components/charts/TaskDetail';
import { DetailedReport } from '@/components/charts/DetailedReport';
import { AgentAdvice } from '@/components/charts/AgentAdvice';
import { OverviewSummary } from '@/components/charts/OverviewSummary';
import { PDFExportDialog } from '@/components/export/PDFExportDialog';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Download,
  FileText,
  Users, 
  Settings,
  Globe,
  ChevronRight,
  Star,
  Award,
  Rocket,
  Shield,
  Lightbulb,
  ArrowRight,
  Play,
  ArrowDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';
import { AnalysisResult, TaskItem } from '@/types';
import { useTranslation, Language } from '@/lib/i18n';
import { getDemoResult } from '@/lib/demoData';

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | undefined>(undefined);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [language, setLanguage] = useState<Language>('ko');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [viewMode, setViewMode] = useState<'summary' | 'detailed'>('summary');
  const [currentCase, setCurrentCase] = useState(0);

  const t = useTranslation(language);

  const handleAnalyze = async (jd: string, file?: File) => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append('jd', jd);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('분석 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      setAnalysisResult(result);
      setShowDemo(false);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDemo = () => {
    const demoResult = getDemoResult('hr');
    setAnalysisResult(demoResult);
    setShowDemo(true);
  };

  const handleTaskSelect = (task: TaskItem) => {
    setSelectedTask(task);
  };

  const handleGenerateRecipe = async (task: TaskItem) => {
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      const result = await response.json();
      if (result.success) {
        setSelectedTask(prev => prev ? { ...prev, recipe: result.data } : undefined);
      } else {
        throw new Error(result.error || '알 수 없는 오류');
      }
    } catch (error) {
      console.error('Recipe generation error:', error);
      alert('레시피 생성 중 오류가 발생했습니다.');
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    console.log('Language changing to:', newLanguage);
    setLanguage(newLanguage);
  };

  // 성공 사례 데이터
  const successCases = [
    {
      company: '글로벌 IT 기업 A사',
      industry: 'IT/소프트웨어',
      challenge: 'HR 채용 프로세스의 반복 업무로 인한 비효율성',
      solution: 'JDX를 통한 AI 에이전트 자동화 도입',
      results: [
        { metric: '400%', label: '채용 프로세스 효율성 향상' },
        { metric: '100%', label: '자동화된 업무 비율' },
        { metric: '50%', label: '채용 담당자 업무 시간 단축' }
      ]
    },
    {
      company: '제조업 B사',
      industry: '제조업',
      challenge: '복잡한 JD 분석과 매칭 프로세스의 수동 처리',
      solution: 'JDX AI 에이전트를 활용한 스마트 매칭 시스템',
      results: [
        { metric: '93.5%', label: '정확한 업무 매칭률' },
        { metric: '13,000개', label: '자동 분석된 JD 수' },
        { metric: '30분', label: '평균 분석 시간 단축' }
      ]
    },
    {
      company: '금융 서비스 C사',
      industry: '금융',
      challenge: '규제 준수를 위한 복잡한 업무 프로세스 관리',
      solution: 'JDX 기반 규제 준수 자동화 에이전트 구축',
      results: [
        { metric: '51.1%', label: '업무 정확도 향상' },
        { metric: '32.7%', label: '처리 시간 단축' },
        { metric: '100%', label: '규제 준수율' }
      ]
    },
    {
      company: '마케팅 에이전시 D사',
      industry: '마케팅',
      challenge: '고객사의 JD 분석과 맞춤형 솔루션 제안',
      solution: 'JDX를 활용한 고객 맞춤형 AI 에이전트 추천',
      results: [
        { metric: '24,907%', label: 'ROAS 달성' },
        { metric: '21%', label: '고객 만족도 향상' },
        { metric: '10배', label: '제안서 작성 효율성' }
      ]
    },
    {
      company: '스타트업 E사',
      industry: '스타트업',
      challenge: '제한된 인력으로 다양한 업무를 효율적으로 처리',
      solution: 'JDX AI 에이전트를 통한 업무 자동화',
      results: [
        { metric: '6,000+', label: '자동화된 업무 건수' },
        { metric: '80%', label: '업무 효율성 향상' },
        { metric: '23.5%', label: '인력 비용 절감' }
      ]
    }
  ];

    return (
    <div className="min-vh-100" style={{background: '#ffffff'}}>
      {/* Header */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      {/* Hero Section - Vircle Style */}
      <section className="py-5" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'}}>
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="text-center text-lg-start">
              <div className="fade-in">
                <h1 className="display-3 fw-bold mb-4" style={{color: '#1a202c', lineHeight: '1.2'}}>
                  {language === 'ko' ? 'JD를 넘어 AI 에이전트 자동화를 위한' : 'Beyond JD, for AI Agent Automation'}
                  <br />
                  <span style={{color: '#667eea'}}>
                    {language === 'ko' ? '맞춤 전략을 만듭니다' : 'Custom Strategy'}
                  </span>
                </h1>
                
                <p className="lead mb-5" style={{color: '#4a5568', lineHeight: '1.6'}}>
                  {language === 'ko' 
                    ? 'JD 뒤에 숨은 업무의 자동화 가능성을 파악해야\n기업이 성장할 수 있습니다.'
                    : 'You need to understand the automation potential behind JD\nfor companies to grow.'
                  }
                </p>
                
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="px-5 py-3 rounded-pill fw-bold"
                    onClick={handleDemo}
                    style={{background: '#667eea', border: 'none', fontSize: '1.1rem'}}
                  >
                    {language === 'ko' ? '컨설팅 신청' : 'Request Consultation'}
                  </Button>
                  
                  <Button 
                    variant="outline-primary" 
                    size="lg" 
                    className="px-5 py-3 rounded-pill fw-bold"
                    onClick={() => document.getElementById('jd-input')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{fontSize: '1.1rem'}}
                  >
                    {language === 'ko' ? '무료 체험하기' : 'Try Free'}
                  </Button>
                </div>
            </div>
            </Col>
            
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <div className="p-5 rounded-4" style={{background: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
                  <Brain className="mb-4" size={80} style={{color: '#667eea'}} />
                  <h3 className="h4 mb-3" style={{color: '#1a202c'}}>
                    {language === 'ko' ? 'AI 에이전트 자동화' : 'AI Agent Automation'}
                  </h3>
                  <p style={{color: '#4a5568'}}>
                    {language === 'ko' 
                      ? 'JD 분석부터 맞춤형 AI 에이전트 추천까지\n원스톱 솔루션을 제공합니다'
                      : 'From JD analysis to customized AI agent recommendations\nWe provide one-stop solutions'
                    }
                  </p>
          </div>
      </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Success Cases Section - Vircle Style */}
      <section className="py-5" style={{background: '#ffffff'}}>
        <Container>
          <Row className="text-center mb-6">
            <Col>
              <h2 className="display-4 fw-bold mb-4" style={{color: '#1a202c', lineHeight: '1.2'}}>
                {language === 'ko' ? '성공 사례' : 'Success Cases'}
              </h2>
              <p className="lead" style={{color: '#4a5568', lineHeight: '1.6'}}>
                {language === 'ko' 
                  ? 'AI 에이전트 자동화의 성장을 함께하는 JDX'
                  : 'JDX growing together with AI agent automation'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-center align-items-center gap-3">
            <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setCurrentCase(prev => prev > 0 ? prev - 1 : successCases.length - 1)}
                  className="rounded-circle"
                  style={{width: '40px', height: '40px'}}
                >
                  <ChevronLeft size={20} />
            </Button>
                
                <div className="text-center" style={{minWidth: '200px'}}>
                  <h5 className="fw-bold mb-0" style={{color: '#1a202c'}}>
                    {successCases[currentCase].company}
                  </h5>
                  <small style={{color: '#4a5568'}}>
                    {successCases[currentCase].industry}
                  </small>
                </div>
                
            <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setCurrentCase(prev => prev < successCases.length - 1 ? prev + 1 : 0)}
                  className="rounded-circle"
                  style={{width: '40px', height: '40px'}}
                >
                  <ChevronRightIcon size={20} />
            </Button>
          </div>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="border-0" style={{background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                <Card.Body className="p-5">
                  <div className="row align-items-center">
                    <Col md={6}>
                      <h4 className="fw-bold mb-3" style={{color: '#1a202c'}}>
                        {successCases[currentCase].challenge}
                      </h4>
                      <p className="mb-4" style={{color: '#4a5568'}}>
                        {successCases[currentCase].solution}
                      </p>
                    </Col>
                    <Col md={6}>
                      <div className="row g-3">
                        {successCases[currentCase].results.map((result, index) => (
                          <Col key={index}>
                            <div className="text-center p-3 rounded" style={{background: '#f7fafc'}}>
                              <h3 className="fw-bold mb-1" style={{color: '#667eea'}}>
                                {result.metric}
                              </h3>
                              <p className="small mb-0" style={{color: '#4a5568'}}>
                                {result.label}
                              </p>
                            </div>
                          </Col>
                        ))}
                      </div>
                    </Col>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="text-center mt-4">
            <Col>
              <Button 
                variant="outline-primary" 
                className="px-4 py-2 rounded-pill"
                onClick={() => setCurrentCase(0)}
              >
                {language === 'ko' ? '전체 성공사례 확인' : 'View All Success Cases'}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section - Vircle Style */}
      <section className="py-5" style={{background: '#f8fafc'}}>
        <Container>
          <Row className="text-center mb-6">
            <Col>
              <h2 className="display-4 fw-bold mb-4" style={{color: '#1a202c', lineHeight: '1.2'}}>
                {language === 'ko' ? 'JDX의 핵심 기능' : 'Core Features of JDX'}
              </h2>
              <p className="lead" style={{color: '#4a5568', lineHeight: '1.6'}}>
                {language === 'ko' 
                  ? 'JD 분석부터 AI 에이전트 추천까지, 모든 것을 한 곳에서'
                  : 'From JD analysis to AI agent recommendations, everything in one place'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="h-100 border-0" style={{background: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
                <Card.Body className="p-4 text-center">
                  <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: '#e6f3ff'}}>
                    <FileText className="text-primary" size={32} />
                  </div>
                  <h5 className="fw-bold mb-4" style={{color: '#1a202c', lineHeight: '1.3'}}>
                    {language === 'ko' ? 'JD 자동 분석' : 'Automatic JD Analysis'}
                  </h5>
                  <p style={{color: '#4a5568', lineHeight: '1.6'}}>
                    {language === 'ko' 
                      ? 'JD를 입력하면 AI가 자동으로 분석하여 자동화 가능성을 판단합니다'
                      : 'AI automatically analyzes JD and determines automation potential'
                    }
                  </p>
                </Card.Body>
            </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0" style={{background: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
                <Card.Body className="p-4 text-center">
                  <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: '#f0f9ff'}}>
                    <Brain className="text-info" size={32} />
                  </div>
                  <h5 className="fw-bold mb-4" style={{color: '#1a202c', lineHeight: '1.3'}}>
                    {language === 'ko' ? 'AI 에이전트 추천' : 'AI Agent Recommendation'}
                  </h5>
                  <p style={{color: '#4a5568', lineHeight: '1.6'}}>
                    {language === 'ko' 
                      ? '표준직무DB를 분석하여 최적의 AI 에이전트를 추천합니다'
                      : 'Analyzes standard job database to recommend optimal AI agents'
                    }
                  </p>
                </Card.Body>
            </Card>
            </Col>
            
            <Col md={6} lg={4}>
              <Card className="h-100 border-0" style={{background: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
                <Card.Body className="p-4 text-center">
                  <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: '#f0fdf4'}}>
                    <Target className="text-success" size={32} />
                  </div>
                  <h5 className="fw-bold mb-4" style={{color: '#1a202c', lineHeight: '1.3'}}>
                    {language === 'ko' ? '맞춤형 솔루션' : 'Customized Solutions'}
                  </h5>
                  <p style={{color: '#4a5568', lineHeight: '1.6'}}>
                    {language === 'ko' 
                      ? '개별 기업에 맞춤화된 AI 에이전트를 추천합니다'
                      : 'Recommends customized AI agents for individual companies'
                    }
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* JD Input Section */}
      <section id="jd-input" className="py-5" style={{background: '#ffffff'}}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="border-0" style={{background: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}}>
                <Card.Header className="bg-transparent border-0 text-center py-5">
                  <h2 className="h3 fw-bold mb-3" style={{color: '#1a202c', lineHeight: '1.3'}}>
                    {language === 'ko' ? 'JD 분석 시작하기' : 'Start JD Analysis'}
                  </h2>
                  <p style={{color: '#4a5568', lineHeight: '1.6'}}>
                    {language === 'ko' 
                      ? '분석하고 싶은 Job Description을 입력하거나 파일을 업로드하세요'
                      : 'Enter the Job Description you want to analyze or upload a file'
                    }
                  </p>
                </Card.Header>
                
                <Card.Body className="p-4">
                  <JDInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} language={language} />
                </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Analysis Results */}
      {analysisResult && (
        <section className="py-5" style={{background: '#f8fafc'}}>
          <Container>
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="h3 fw-bold mb-0" style={{color: '#1a202c'}}>
                    {language === 'ko' ? '분석 결과' : 'Analysis Results'}
                  </h2>
                  
                  <div className="d-flex gap-2">
                    <Button
                      variant={viewMode === 'summary' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => setViewMode('summary')}
                    >
                      <BarChart3 className="me-1" size={16} />
                      {language === 'ko' ? '요약' : 'Summary'}
                    </Button>
                    
                    <Button
                      variant={viewMode === 'detailed' ? 'primary' : 'outline-primary'}
                      size="sm"
                      onClick={() => setViewMode('detailed')}
                    >
                      <FileText className="me-1" size={16} />
                      {language === 'ko' ? '상세' : 'Detailed'}
                    </Button>
                    
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => setShowExportDialog(true)}
                    >
                      <Download className="me-1" size={16} />
                      {t.common.export} PDF
                    </Button>
          </div>
        </div>
              </Col>
            </Row>

            {viewMode === 'summary' ? (
              <>
                {/* Overview Summary */}
                <Row className="mb-4">
                  <Col>
                    <OverviewSummary result={analysisResult} language={language} />
                  </Col>
                </Row>

                {/* Main Content - 3 Column Grid */}
                <Row className="g-4">
                  {/* Task List - 1 Column */}
                  <Col xl={4}>
                    <TaskList
                      tasks={analysisResult.tasks}
                      selectedTask={selectedTask}
                      onTaskSelect={handleTaskSelect}
                      language={language}
                    />
                  </Col>

                  {/* Task Detail - 2 Columns */}
                  <Col xl={8}>
                    {selectedTask ? (
                      <TaskDetail
                        task={selectedTask}
                        onGenerateRecipe={handleGenerateRecipe}
                        language={language}
                      />
                    ) : (
                      <Card className="h-100 border-0 d-flex align-items-center justify-content-center" style={{background: 'white', boxShadow: '0 5px 15px rgba(0,0,0,0.08)'}}>
                        <Card.Body className="text-center py-5">
                          <Target className="mb-3" size={48} style={{color: '#a0aec0'}} />
                          <h5 className="fw-bold mb-2" style={{color: '#1a202c'}}>
                            {t.analysis.selectTask}
                          </h5>
                          <p style={{color: '#4a5568'}}>
                            {t.analysis.noTaskSelected}
                          </p>
                        </Card.Body>
                      </Card>
                    )}
                  </Col>
                </Row>

                {/* Agent Advice */}
                <Row className="mt-4">
                  <Col>
                    <AgentAdvice 
                      language={language} 
                      jobRole={analysisResult.jobRole || 'General'} 
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <Row>
                <Col>
                  <DetailedReport result={analysisResult} selectedTasks={selectedTask ? [selectedTask] : []} />
                </Col>
              </Row>
            )}

            {/* Demo Mode Alert */}
            {showDemo && (
              <Row className="mt-4">
                <Col>
                  <Alert variant="info" className="border-0" style={{background: '#e6f3ff', color: '#1a365d'}}>
                    <div className="d-flex align-items-center">
                      <Lightbulb className="me-2" size={20} />
            <div>
                        <strong>{language === 'ko' ? '데모 모드' : 'Demo Mode'}</strong>
                        <p className="mb-0 mt-1">
                          {language === 'ko' 
                            ? '현재 데모 데이터로 분석 결과를 보여드리고 있습니다. 실제 JD를 입력하여 분석해보세요.'
                            : 'Currently showing analysis results with demo data. Enter a real JD to analyze.'
                          }
                        </p>
            </div>
          </div>
                  </Alert>
                </Col>
              </Row>
            )}
          </Container>
        </section>
      )}

      {/* Footer */}
      <Footer language={language} />

      {/* PDF Export Dialog */}
      <PDFExportDialog
        isOpen={showExportDialog}
        onClose={() => setShowExportDialog(false)}
        analysisResult={analysisResult}
        language={language}
      />
    </div>
  );
}