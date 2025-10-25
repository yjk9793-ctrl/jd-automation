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

      {/* Hero Section - Dark Remember Style */}
      <section className="py-5 position-relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'}}>
        {/* Background Pattern */}
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-20">
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(111, 66, 193, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(233, 30, 99, 0.3) 0%, transparent 50%)'
          }}></div>
        </div>
        
        <Container className="position-relative">
          <Row className="align-items-center min-vh-75">
            <Col lg={8} className="text-center text-lg-start mx-auto">
              <div className="fade-in">
                {/* Main Title - Remember Style */}
                <h1 className="display-2 fw-bold mb-4 text-white" style={{lineHeight: '1.2'}}>
                  {language === 'ko' ? '계약을 만드는' : 'Creating Contracts with'}
                  <br />
                  <span className="text-warning">
                    {language === 'ko' ? '진짜 JD 자동화' : 'Real JD Automation'}
                  </span>
                </h1>
                
                <p className="display-6 fw-bold text-white mb-4">
                  {language === 'ko' 
                    ? '원하는 업무만 골라서, 시간과 비용은 아낀다고?'
                    : 'Choose only the work you want, while saving time and cost?'
                  }
                </p>
                
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start mb-5">
                  <Button 
                    variant="warning" 
                    size="lg" 
                    className="px-5 py-3 rounded-pill fw-bold text-dark"
                    onClick={handleDemo}
                    style={{fontSize: '1.1rem'}}
                  >
                    <Play className="me-2" size={20} />
                    {language === 'ko' ? '소개서 받기' : 'Get Brochure'}
                  </Button>
                  
                  <Button 
                    variant="outline-light" 
                    size="lg" 
                    className="px-5 py-3 rounded-pill fw-bold"
                    onClick={() => document.getElementById('jd-input')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{fontSize: '1.1rem'}}
                  >
                    <ArrowRight className="me-2" size={20} />
                    {language === 'ko' ? '견적 문의하기' : 'Request Quote'}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Pain Point Section - Dark Remember Style */}
      <section className="py-5" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'}}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3 text-white">
                {language === 'ko' ? 'JD 자동화의 어려움' : 'JD Automation Challenges'}
                <br />
                <span className="text-warning">
                  {language === 'ko' ? 'JDX로 해결하세요' : 'Solve with JDX'}
                </span>
              </h2>
            </Col>
          </Row>
          
          <Row className="g-4 mb-5">
            <Col md={6} lg={3}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-4">
                  <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(220, 53, 69, 0.2)'}}>
                    <XCircle className="text-danger" size={32} />
                  </div>
                  <h5 className="fw-bold mb-3 text-danger">
                    {language === 'ko' ? 'Paid 광고는 리드 전환율이 낮아' : 'Paid ads have low conversion rates'}
                  </h5>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-4">
                  <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(220, 53, 69, 0.2)'}}>
                    <Clock className="text-danger" size={32} />
                  </div>
                  <h5 className="fw-bold mb-3 text-danger">
                    {language === 'ko' ? '오프라인 행사는 품이 너무 많이 들어' : 'Offline events require too much effort'}
                  </h5>
                </Card.Body>
                </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-4">
                  <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(220, 53, 69, 0.2)'}}>
                    <FileText className="text-danger" size={32} />
            </div>
                  <h5 className="fw-bold mb-3 text-danger">
                    {language === 'ko' ? '콘텐츠 제작 인력 없는데, 외주 써야하나?' : 'No content team, need to outsource?'}
                  </h5>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-4">
                  <div className="jdx-card p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(220, 53, 69, 0.2)'}}>
                    <DollarSign className="text-danger" size={32} />
                  </div>
                  <h5 className="fw-bold mb-3 text-danger">
                    {language === 'ko' ? '비싸게 DB 구매했는데 우리 타깃과 안 맞아' : 'Expensive DB purchase but doesn\'t match our target'}
                  </h5>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* JDX Solution */}
          <Row className="text-center">
            <Col>
              <Card className="card-jdx border-0" style={{background: 'linear-gradient(135deg, #6f42c1 0%, #9c27b0 50%, #e91e63 100%)'}}>
                <Card.Body className="p-5 text-white">
                  <h3 className="display-5 fw-bold mb-4">
                    {language === 'ko' ? 'JDX' : 'JDX'}
                  </h3>
                  
                  <Row className="g-4">
                    <Col md={4}>
                      <div className="text-center">
                        <h4 className="fw-bold mb-3">
                          {language === 'ko' ? '시간과 예산이 적어도' : 'Even with limited time and budget'}
                        </h4>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <h4 className="fw-bold mb-3">
                          {language === 'ko' ? '원하는 업무만 골라서' : 'Choose only the work you want'}
                        </h4>
          </div>
                    </Col>
                    <Col md={4}>
                      <div className="text-center">
                        <h4 className="fw-bold mb-3">
                          {language === 'ko' ? 'AI로 쉽게 자동화 가능!' : 'Easily automate with AI!'}
                        </h4>
      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Performance Section - Dark Remember Style */}
      <section className="py-5" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'}}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3 text-white">
                {language === 'ko' ? 'JDX의 성과,' : 'JDX Performance,'}
            <br />
                <span className="text-warning">
                  {language === 'ko' ? '이미 숫자로 증명되었습니다' : 'Already Proven by Numbers'}
                </span>
              </h2>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-5">
                  <div className="jdx-card p-4 rounded-circle d-inline-flex mb-4" style={{background: 'rgba(25, 135, 84, 0.2)'}}>
                    <TrendingUp className="text-success" size={48} />
          </div>
                  <h3 className="display-3 fw-bold text-success mb-2">500</h3>
                  <h5 className="fw-bold text-white mb-3">
                    {language === 'ko' ? '평균 자동화 비용' : 'Average Automation Cost'}
                  </h5>
                  <p className="text-light mb-0">
                    {language === 'ko' ? '절감' : 'Reduction'}
                  </p>
                  <small className="text-muted">
                    {language === 'ko' ? 'HR 소프트웨어 A기업 사례' : 'HR Software A Company Case'}
                  </small>
                </Card.Body>
            </Card>
            </Col>
            
            <Col md={4}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-5">
                  <div className="jdx-card p-4 rounded-circle d-inline-flex mb-4" style={{background: 'rgba(13, 202, 240, 0.2)'}}>
                    <Target className="text-info" size={48} />
                  </div>
                  <h3 className="display-3 fw-bold text-info mb-2">1000</h3>
                  <h5 className="fw-bold text-white mb-3">
                    {language === 'ko' ? '리드 to 계약 성사율' : 'Lead to Contract Rate'}
                  </h5>
                  <p className="text-light mb-0">
                    {language === 'ko' ? '개선' : 'Improvement'}
                  </p>
                  <small className="text-muted">
                    {language === 'ko' ? '물류 솔루션 B기업 사례' : 'Logistics Solution B Company Case'}
                  </small>
                </Card.Body>
            </Card>
            </Col>
            
            <Col md={4}>
              <Card className="card-jdx h-100 border-0 text-center" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Body className="p-5">
                  <div className="jdx-card p-4 rounded-circle d-inline-flex mb-4" style={{background: 'rgba(111, 66, 193, 0.2)'}}>
                    <Users className="text-primary" size={48} />
                  </div>
                  <h3 className="display-3 fw-bold text-primary mb-2">300</h3>
                  <h5 className="fw-bold text-white mb-3">
                    {language === 'ko' ? '신규 고객 비중' : 'New Customer Ratio'}
                  </h5>
                  <p className="text-light mb-0">
                    {language === 'ko' ? '증대' : 'Increase'}
                  </p>
                  <small className="text-muted">
                    {language === 'ko' ? '자동차 렌탈 C기업 사례' : 'Car Rental C Company Case'}
                  </small>
                </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Process Section - Dark Remember Style */}
      <section className="py-5" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'}}>
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold mb-3 text-white">
                {language === 'ko' ? 'JDX, 어떻게 이용하나요?' : 'How to Use JDX?'}
              </h2>
              <p className="lead text-light">
                {language === 'ko' 
                  ? '원하는 업무를 고르고 AI가 분석하면 빠른 시간 내에 자동화 방안을 제시합니다'
                  : 'Choose the work you want and AI analyzes it to quickly suggest automation solutions'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {[
              {
                step: '1',
                title: language === 'ko' ? '업무 설정' : 'Task Setting',
                description: language === 'ko' ? '자동화하고 싶은 업무를 선택합니다' : 'Select the tasks you want to automate',
                icon: <Settings className="text-primary" size={48} />,
                color: 'primary'
              },
              {
                step: '2',
                title: language === 'ko' ? 'AI 분석' : 'AI Analysis',
                description: language === 'ko' ? 'AI가 업무를 분석하고 자동화 가능성을 평가합니다' : 'AI analyzes tasks and evaluates automation potential',
                icon: <Brain className="text-success" size={48} />,
                color: 'success'
              },
              {
                step: '3',
                title: language === 'ko' ? '방안 제시' : 'Solution Proposal',
                description: language === 'ko' ? '최적의 자동화 방안과 구현 가이드를 제공합니다' : 'Provides optimal automation solutions and implementation guides',
                icon: <Lightbulb className="text-warning" size={48} />,
                color: 'warning'
              },
              {
                step: '4',
                title: language === 'ko' ? '성과 측정' : 'Performance Measurement',
                description: language === 'ko' ? '자동화 성과를 측정하고 지속적으로 개선합니다' : 'Measures automation performance and continuously improves',
                icon: <BarChart3 className="text-info" size={48} />,
                color: 'info'
              }
            ].map((process, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="card-jdx h-100 border-0 text-center position-relative" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                  <Card.Body className="p-5">
                    <Badge bg={process.color} className="position-absolute top-0 start-50 translate-middle rounded-pill px-4 py-2 fw-bold" style={{fontSize: '1.1rem'}}>
                      {process.step}
                    </Badge>
                    
                    <div className="mt-5 mb-4">
                      <div className={`jdx-card p-4 rounded-circle d-inline-flex`} style={{background: `rgba(${process.color === 'primary' ? '111, 66, 193' : process.color === 'success' ? '25, 135, 84' : process.color === 'warning' ? '255, 193, 7' : '13, 202, 240'}, 0.2)`}}>
                        {process.icon}
          </div>
        </div>

                    <h4 className="fw-bold mb-3 text-white">{process.title}</h4>
                    <p className="text-light">{process.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* JD Input Section */}
      <section id="jd-input" className="py-5" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'}}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="card-jdx border-0" style={{background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)'}}>
                <Card.Header className="bg-transparent border-0 text-center py-4">
                  <h2 className="h3 fw-bold mb-2 text-white">
                    {language === 'ko' ? 'JD 분석 시작하기' : 'Start JD Analysis'}
                  </h2>
                  <p className="text-light mb-0">
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