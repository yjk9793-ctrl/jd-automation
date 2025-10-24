'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Badge, ProgressBar, Alert, Modal, Form, Tab, Tabs, ListGroup, Table, Spinner } from 'react-bootstrap';
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
  Play
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

  return (
    <div className="min-vh-100" data-bs-theme="dark">
      {/* Header */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      {/* Hero Section */}
      <section className="py-5 bg-gradient" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'}}>
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="text-center text-lg-start">
              <div className="fade-in">
                <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill jdx-pulse">
                  <Rocket className="me-2" size={16} />
                  {language === 'ko' ? 'AI 에이전트 자동화 플랫폼' : 'AI Agent Automation Platform'}
                </Badge>
                
                <h1 className="display-4 fw-bold mb-4 jdx-gradient">
                  {t.hero.title}
                </h1>
                
                <p className="lead mb-4 text-light">
                  {t.hero.subtitle}
                </p>
                
                <p className="text-muted mb-5">
                  {t.hero.description}
                </p>
                
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="btn-jdx px-4 py-3 rounded-pill"
                    onClick={handleDemo}
                  >
                    <Play className="me-2" size={20} />
                    {t.hero.demoButton}
                  </Button>
                  
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    className="btn-jdx-outline px-4 py-3 rounded-pill"
                    onClick={() => document.getElementById('jd-input')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <ArrowRight className="me-2" size={20} />
                    {t.hero.startButton}
                  </Button>
                </div>
              </div>
            </Col>
            
            <Col lg={6} className="text-center">
              <div className="position-relative">
                <div className="jdx-card p-5 rounded-4">
                  <Brain className="text-primary mb-4" size={80} />
                  <h3 className="h4 mb-3">{language === 'ko' ? 'AI 분석 엔진' : 'AI Analysis Engine'}</h3>
                  <p className="text-muted">
                    {language === 'ko' 
                      ? '최신 AI 기술로 JD를 분석하여 자동화 가능성을 찾아드립니다'
                      : 'Analyze JDs with latest AI technology to find automation opportunities'
                    }
                  </p>
                </div>
                
                {/* Floating elements */}
                <div className="position-absolute top-0 start-0 translate-middle">
                  <div className="jdx-card p-3 rounded-circle jdx-glow">
                    <Zap className="text-warning" size={24} />
                  </div>
                </div>
                
                <div className="position-absolute top-0 end-0 translate-middle">
                  <div className="jdx-card p-3 rounded-circle jdx-glow" style={{animationDelay: '1s'}}>
                    <Target className="text-success" size={24} />
                  </div>
                </div>
                
                <div className="position-absolute bottom-0 start-50 translate-middle">
                  <div className="jdx-card p-3 rounded-circle jdx-glow" style={{animationDelay: '2s'}}>
                    <TrendingUp className="text-info" size={24} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3 jdx-gradient">
                {language === 'ko' ? '주요 기능' : 'Key Features'}
              </h2>
              <p className="lead text-muted">
                {language === 'ko' 
                  ? 'JDX가 제공하는 강력한 AI 분석 기능들을 확인해보세요'
                  : 'Discover the powerful AI analysis features that JDX provides'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {t.hero.features.map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <Card className="card-jdx h-100 border-0">
                  <Card.Body className="p-4 text-center">
                    <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3 jdx-glow">
                      {index === 0 && <Brain className="text-primary" size={32} />}
                      {index === 1 && <Zap className="text-warning" size={32} />}
                      {index === 2 && <Target className="text-success" size={32} />}
                    </div>
                    <h5 className="fw-bold mb-3">{feature.title}</h5>
                    <p className="text-muted">{feature.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-5 bg-light" data-bs-theme="light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3">
                {language === 'ko' ? '1500+개 기업이 선택한' : 'Trusted by 1500+ Companies'}
              </h2>
              <p className="lead text-muted">
                {language === 'ko' 
                  ? '쉽고 빠른 글로벌 원스톱 AI 플랫폼'
                  : 'Easy and Fast Global One-Stop AI Platform'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {[
              { icon: <Zap className="text-warning" size={40} />, value: '10배', label: language === 'ko' ? '더 빠른 실행' : 'Faster Execution' },
              { icon: <TrendingUp className="text-success" size={40} />, value: '2배', label: language === 'ko' ? '더 높은 성과' : 'Higher Performance' },
              { icon: <Award className="text-primary" size={40} />, value: '95%', label: language === 'ko' ? '정확도' : 'Accuracy' },
              { icon: <Clock className="text-info" size={40} />, value: '24/7', label: language === 'ko' ? '실시간 분석' : 'Real-time Analysis' }
            ].map((stat, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="card-jdx h-100 border-0 text-center">
                  <Card.Body className="p-4">
                    <div className="mb-3">{stat.icon}</div>
                    <h3 className="display-6 fw-bold text-primary mb-2">{stat.value}</h3>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Process Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold mb-3 jdx-gradient">
                {language === 'ko' ? '작동 원리' : 'How It Works'}
              </h2>
              <p className="lead text-muted">
                {language === 'ko' 
                  ? '4단계로 간단하게 JD를 분석하고 자동화 방안을 제시합니다'
                  : 'Analyze JDs and suggest automation solutions in 4 simple steps'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {[
              {
                step: '01',
                title: language === 'ko' ? '수집' : 'Collect',
                description: language === 'ko' ? 'JD 데이터를 수집하고 전처리합니다' : 'Collect and preprocess JD data',
                icon: <FileText className="text-primary" size={48} />,
                color: 'primary'
              },
              {
                step: '02',
                title: language === 'ko' ? '분석' : 'Analyze',
                description: language === 'ko' ? 'AI가 업무를 분석하고 자동화 가능성을 평가합니다' : 'AI analyzes tasks and evaluates automation potential',
                icon: <Brain className="text-success" size={48} />,
                color: 'success'
              },
              {
                step: '03',
                title: language === 'ko' ? '실행' : 'Execute',
                description: language === 'ko' ? '자동화 방안을 실행하고 모니터링합니다' : 'Execute automation solutions and monitor',
                icon: <Rocket className="text-warning" size={48} />,
                color: 'warning'
              },
              {
                step: '04',
                title: language === 'ko' ? '개선' : 'Improve',
                description: language === 'ko' ? '성과를 측정하고 지속적으로 개선합니다' : 'Measure performance and continuously improve',
                icon: <TrendingUp className="text-info" size={48} />,
                color: 'info'
              }
            ].map((process, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="card-jdx h-100 border-0 text-center position-relative">
                  <Card.Body className="p-4">
                    <Badge bg={process.color} className="position-absolute top-0 start-50 translate-middle rounded-pill px-3 py-2">
                      {process.step}
                    </Badge>
                    
                    <div className="mt-4 mb-3">
                      <div className={`jdx-card p-4 rounded-circle d-inline-flex jdx-glow`}>
                        {process.icon}
                      </div>
                    </div>
                    
                    <h5 className="fw-bold mb-3">{process.title}</h5>
                    <p className="text-muted">{process.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* JD Input Section */}
      <section id="jd-input" className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="card-jdx border-0">
                <Card.Header className="bg-transparent border-0 text-center py-4">
                  <h2 className="h3 fw-bold mb-2 jdx-gradient">
                    {language === 'ko' ? 'JD 분석 시작하기' : 'Start JD Analysis'}
                  </h2>
                  <p className="text-muted mb-0">
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
        <section className="py-5">
          <Container>
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="h3 fw-bold mb-0 jdx-gradient">
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
                      <Card className="card-jdx h-100 border-0 d-flex align-items-center justify-content-center">
                        <Card.Body className="text-center py-5">
                          <Target className="text-muted mb-3" size={48} />
                          <h5 className="fw-bold mb-2 jdx-gradient">
                            {t.analysis.selectTask}
                          </h5>
                          <p className="text-muted">
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
                  <Alert variant="info" className="alert-jdx">
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