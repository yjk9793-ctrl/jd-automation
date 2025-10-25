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
  ChevronRight as ChevronRightIcon,
  Sparkles,
  ArrowUpRight
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
      
      // 분석 결과 섹션으로 스크롤
      setTimeout(() => {
        const resultsSection = document.getElementById('analysis-results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
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
    
    // 분석 결과 섹션으로 스크롤
    setTimeout(() => {
      const resultsSection = document.getElementById('analysis-results');
      if (resultsSection) {
        resultsSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
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

  // ImpactFlow 스타일 통계 데이터
  const stats = [
    { value: '500+', label: language === 'ko' ? '분석된 JD' : 'Analyzed JDs' },
    { value: '95%', label: language === 'ko' ? '정확도' : 'Accuracy' },
    { value: '300%', label: language === 'ko' ? '효율성 향상' : 'Efficiency Gain' },
    { value: '24/7', label: language === 'ko' ? '실시간 분석' : 'Real-time Analysis' }
  ];

  // ImpactFlow 스타일 기능 데이터
  const features = [
    {
      icon: <Brain className="text-primary" size={24} />,
      title: language === 'ko' ? 'AI 기반 분석' : 'AI-Powered Analysis',
      description: language === 'ko' 
        ? '고급 AI 알고리즘으로 JD를 정확하게 분석하고 자동화 가능성을 평가합니다'
        : 'Advanced AI algorithms accurately analyze JDs and evaluate automation potential'
    },
    {
      icon: <Target className="text-success" size={24} />,
      title: language === 'ko' ? '맞춤형 솔루션' : 'Customized Solutions',
      description: language === 'ko' 
        ? '기업의 특성에 맞는 개별화된 AI 에이전트를 추천합니다'
        : 'Recommends personalized AI agents tailored to your company\'s characteristics'
    },
    {
      icon: <BarChart3 className="text-info" size={24} />,
      title: language === 'ko' ? '실시간 대시보드' : 'Real-time Dashboard',
      description: language === 'ko' 
        ? '분석 결과를 실시간으로 모니터링하고 성과를 추적합니다'
        : 'Monitor analysis results in real-time and track performance metrics'
    },
    {
      icon: <Shield className="text-warning" size={24} />,
      title: language === 'ko' ? '보안 및 규정준수' : 'Security & Compliance',
      description: language === 'ko' 
        ? '엔터프라이즈급 보안과 데이터 보호 정책을 준수합니다'
        : 'Enterprise-grade security and data protection compliance'
    }
  ];

  // ImpactFlow 스타일 성공 사례
  const successStories = [
    {
      company: '글로벌 IT 기업',
      industry: 'IT/소프트웨어',
      challenge: language === 'ko' ? '복잡한 채용 프로세스의 비효율성' : 'Inefficient complex hiring process',
      solution: language === 'ko' ? 'JDX AI 에이전트 도입' : 'JDX AI Agent Implementation',
      results: [
        { metric: '400%', label: language === 'ko' ? '채용 효율성 향상' : 'Hiring Efficiency' },
        { metric: '50%', label: language === 'ko' ? '시간 단축' : 'Time Reduction' },
        { metric: '95%', label: language === 'ko' ? '정확도' : 'Accuracy' }
      ],
      logo: '🏢'
    },
    {
      company: '제조업 리더',
      industry: '제조업',
      challenge: language === 'ko' ? '업무 프로세스 자동화 필요' : 'Need for process automation',
      solution: language === 'ko' ? 'JDX 맞춤형 솔루션' : 'JDX Custom Solution',
      results: [
        { metric: '300%', label: language === 'ko' ? '생산성 향상' : 'Productivity Gain' },
        { metric: '60%', label: language === 'ko' ? '비용 절감' : 'Cost Reduction' },
        { metric: '100%', label: language === 'ko' ? '자동화율' : 'Automation Rate' }
      ],
      logo: '🏭'
    },
    {
      company: '금융 서비스',
      industry: '금융',
      challenge: language === 'ko' ? '규제 준수 업무 자동화' : 'Compliance task automation',
      solution: language === 'ko' ? 'JDX 규정준수 솔루션' : 'JDX Compliance Solution',
      results: [
        { metric: '200%', label: language === 'ko' ? '처리 속도' : 'Processing Speed' },
        { metric: '99.9%', label: language === 'ko' ? '정확도' : 'Accuracy' },
        { metric: '0', label: language === 'ko' ? '규정 위반' : 'Compliance Violations' }
      ],
      logo: '🏦'
    }
  ];

    return (
    <div className="min-vh-100" style={{background: '#0a0a0a'}}>
      {/* Header */}
      <Header language={language} onLanguageChange={handleLanguageChange} />

      {/* Hero Section - ImpactFlow Style */}
      <section className="py-6" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)'}}>
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6} className="text-center text-lg-start">
              <div className="fade-in">
                {/* Badge */}
                <div className="d-inline-flex align-items-center px-3 py-2 rounded-pill mb-3" style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
                  <Sparkles className="me-2" size={16} style={{color: '#3b82f6'}} />
                  <span className="small fw-bold" style={{color: '#3b82f6'}}>
                    {language === 'ko' ? 'AI 기반 JD 분석 플랫폼' : 'AI-Powered JD Analysis Platform'}
                  </span>
                </div>

                <h1 className="display-4 fw-bold mb-5" style={{color: '#ffffff', lineHeight: '1.2'}}>
                  {language === 'ko' ? 'JD를 AI 에이전트로' : 'Transform JD into AI Agents'}
                  <br />
                  <span style={{color: '#3b82f6'}}>
                    {language === 'ko' ? '자동화하세요' : 'Automate Everything'}
                  </span>
                </h1>
                
                <p className="lead mb-5" style={{color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6'}}>
                  {language === 'ko' 
                    ? 'Job Description을 분석하여 AI 에이전트로 자동화 가능한 업무를 찾아내고,\n맞춤형 솔루션을 제공하는 혁신적인 플랫폼입니다.'
                    : 'An innovative platform that analyzes Job Descriptions to identify automatable tasks\nand provides customized AI agent solutions.'
                  }
                </p>
                
                <div className="d-flex justify-content-center justify-content-lg-start mb-4">
                  <Button 
                    variant="primary" 
                    className="px-5 py-3 rounded-pill fw-bold d-flex align-items-center"
                    onClick={() => document.getElementById('jd-input')?.scrollIntoView({ behavior: 'smooth' })}
                    style={{background: '#3b82f6', border: 'none', fontSize: '1rem'}}
                  >
                    <FileText className="me-2" size={20} />
                    {language === 'ko' ? '테스트해보기' : 'Test Now'}
                    <ArrowUpRight className="ms-2" size={16} />
                  </Button>
            </div>

                {/* Trust Indicators */}
                <div className="d-flex flex-wrap align-items-center gap-4 text-muted small">
                  <div className="d-flex align-items-center">
                    <CheckCircle className="me-1" size={16} style={{color: '#10b981'}} />
                    {language === 'ko' ? '무료 체험' : 'Free Trial'}
                  </div>
                  <div className="d-flex align-items-center">
                    <CheckCircle className="me-1" size={16} style={{color: '#10b981'}} />
                    {language === 'ko' ? '설치 불필요' : 'No Installation'}
                  </div>
                  <div className="d-flex align-items-center">
                    <CheckCircle className="me-1" size={16} style={{color: '#10b981'}} />
                    {language === 'ko' ? '즉시 시작' : 'Start Immediately'}
                  </div>
                </div>
              </div>
            </Col>
            
            <Col lg={6} className="text-center">
              <div className="position-relative">
                {/* Main Dashboard Preview */}
                <div className="p-4 rounded-3" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      <div className="p-2 rounded me-2" style={{background: '#3b82f6'}}>
                        <Brain size={20} style={{color: 'white'}} />
                      </div>
                      <div>
                        <h6 className="mb-0" style={{color: '#ffffff'}}>JDX Analytics</h6>
                        <small style={{color: '#9ca3af'}}>AI Analysis Dashboard</small>
                      </div>
                    </div>
                    <Badge bg="success" className="px-2 py-1">Live</Badge>
                  </div>
                  
                  {/* Mini Charts */}
                  <Row className="g-3">
                    <Col>
                      <div className="p-3 rounded" style={{background: 'rgba(59, 130, 246, 0.1)'}}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="small" style={{color: '#9ca3af'}}>자동화 가능</span>
                          <span className="fw-bold" style={{color: '#3b82f6'}}>85%</span>
                        </div>
                        <div className="progress" style={{height: '4px'}}>
                          <div className="progress-bar" style={{width: '85%', background: '#3b82f6'}}></div>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="p-3 rounded" style={{background: 'rgba(16, 185, 129, 0.1)'}}>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="small" style={{color: '#9ca3af'}}>효율성</span>
                          <span className="fw-bold" style={{color: '#10b981'}}>300%</span>
                        </div>
                        <div className="progress" style={{height: '4px'}}>
                          <div className="progress-bar" style={{width: '100%', background: '#10b981'}}></div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section - ImpactFlow Style */}
      <section className="py-6" style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)'}}>
        <Container>
          <Row className="text-center mb-6">
            <Col>
              <h2 className="h3 fw-bold mb-4" style={{color: '#ffffff'}}>
                {language === 'ko' ? '신뢰받는 AI 분석 플랫폼' : 'Trusted AI Analysis Platform'}
              </h2>
              <p className="text-muted" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? '전 세계 기업들이 선택한 JDX의 성과를 확인하세요'
                  : 'See the results that global companies have achieved with JDX'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col md={3} key={index}>
                <div className="text-center p-4 rounded-3" style={{background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <h3 className="display-6 fw-bold mb-2" style={{color: '#3b82f6'}}>
                    {stat.value}
                  </h3>
                  <p className="mb-0" style={{color: '#ffffff'}}>
                    {stat.label}
                  </p>
          </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Features Section - ImpactFlow Style */}
      <section className="py-6" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'}}>
        <Container>
          <Row className="text-center mb-6">
            <Col lg={8} className="mx-auto">
              <h2 className="display-5 fw-bold mb-4" style={{color: '#ffffff'}}>
                {language === 'ko' ? '왜 JDX를 선택해야 할까요?' : 'Why Choose JDX?'}
              </h2>
              <p className="lead" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? 'AI 기반의 혁신적인 기술로 업무 자동화의 새로운 패러다임을 제시합니다'
                  : 'We present a new paradigm for work automation with innovative AI-based technology'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <Card.Body className="p-4 text-center">
                    <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(59, 130, 246, 0.1)'}}>
                      {feature.icon}
                    </div>
                    <h5 className="fw-bold mb-3" style={{color: '#ffffff'}}>
                      {feature.title}
                    </h5>
                    <p className="text-muted" style={{color: '#ffffff'}}>
                      {feature.description}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Success Stories - ImpactFlow Style */}
      <section className="py-6" style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)'}}>
        <Container>
          <Row className="text-center mb-6">
            <Col>
              <h2 className="display-5 fw-bold mb-4" style={{color: '#ffffff'}}>
                {language === 'ko' ? '성공 사례' : 'Success Stories'}
              </h2>
              <p className="lead" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? '전 세계 기업들이 JDX로 달성한 놀라운 성과를 확인하세요'
                  : 'Discover the amazing results achieved by global companies with JDX'
                }
              </p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {successStories.map((story, index) => (
              <Col lg={4} key={index}>
                <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-3">
                      <div className="p-2 rounded me-3" style={{background: 'rgba(59, 130, 246, 0.1)'}}>
                        <span className="fs-4">{story.logo}</span>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>{story.company}</h6>
                        <small style={{color: '#ffffff'}}>{story.industry}</small>
                      </div>
          </div>

                    <h6 className="fw-bold mb-2" style={{color: '#ffffff'}}>
                      {story.challenge}
                    </h6>
                    <p className="text-muted small mb-3" style={{color: '#ffffff'}}>
                      {story.solution}
                    </p>
                    
                    <div className="row g-2">
                      {story.results.map((result, resultIndex) => (
                        <Col key={resultIndex}>
                          <div className="text-center p-2 rounded" style={{background: 'rgba(59, 130, 246, 0.1)'}}>
                            <h6 className="fw-bold mb-1" style={{color: '#3b82f6'}}>
                              {result.metric}
                            </h6>
                            <small style={{color: '#ffffff'}}>
                              {result.label}
                            </small>
                          </div>
                        </Col>
                      ))}
                    </div>
                  </Card.Body>
            </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* JD Input Section - ImpactFlow Style */}
      <section id="jd-input" className="py-6" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'}}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="text-center mb-6">
                <h2 className="display-5 fw-bold mb-4" style={{color: '#ffffff'}}>
                  {language === 'ko' ? '지금 바로 시작하세요' : 'Get Started Now'}
                </h2>
                <p className="lead" style={{color: '#ffffff'}}>
                  {language === 'ko' 
                    ? 'JD를 업로드하고 AI 분석 결과를 확인해보세요'
                    : 'Upload your JD and see the AI analysis results'
                  }
                </p>
              </div>
              
              <Card className="border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                <Card.Body className="p-5">
                  <JDInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} language={language} />
                </Card.Body>
            </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Analysis Results - ImpactFlow Style */}
      {analysisResult && (
        <section id="analysis-results" className="py-6" style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)', borderTop: '3px solid #3b82f6'}}>
          <Container>
            {/* Analysis Results Header */}
            <Row className="mb-4">
              <Col>
                <div className="text-center p-4 rounded-3 mb-4" style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div className="p-3 rounded-circle me-3" style={{background: 'rgba(59, 130, 246, 0.2)'}}>
                      <BarChart3 size={32} style={{color: '#3b82f6'}} />
                    </div>
                    <div className="text-start">
                      <h3 className="fw-bold mb-1" style={{color: '#ffffff'}}>
                        {language === 'ko' ? 'AI 분석 완료!' : 'AI Analysis Complete!'}
                      </h3>
                      <p className="mb-0" style={{color: '#9ca3af'}}>
                        {language === 'ko' 
                          ? 'JD 분석이 완료되었습니다. 아래 결과를 확인해보세요.'
                          : 'JD analysis is complete. Check the results below.'
                        }
                      </p>
                    </div>
          </div>
        </div>
              </Col>
            </Row>

            {/* Controls */}
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-end">
                  <div className="d-flex gap-2">
                    <Button
                      variant={viewMode === 'summary' ? 'primary' : 'outline-light'}
                      size="sm"
                      onClick={() => setViewMode('summary')}
                      style={viewMode === 'summary' ? {background: '#3b82f6', border: 'none'} : {borderColor: '#6b7280', color: '#ffffff'}}
                    >
                      <BarChart3 className="me-1" size={14} />
                      {language === 'ko' ? '요약' : 'Summary'}
                    </Button>
                    
                    <Button
                      variant={viewMode === 'detailed' ? 'primary' : 'outline-light'}
                      size="sm"
                      onClick={() => setViewMode('detailed')}
                      style={viewMode === 'detailed' ? {background: '#3b82f6', border: 'none'} : {borderColor: '#6b7280', color: '#ffffff'}}
                    >
                      <FileText className="me-1" size={14} />
                      {language === 'ko' ? '상세' : 'Detailed'}
                    </Button>
                    
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => setShowExportDialog(true)}
                      style={{borderColor: '#10b981', color: '#10b981'}}
                    >
                      <Download className="me-1" size={14} />
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
                      <Card className="h-100 border-0 d-flex align-items-center justify-content-center" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
                        <Card.Body className="text-center py-5">
                          <Target className="mb-3" size={48} style={{color: '#6b7280'}} />
                          <h5 className="fw-bold mb-2" style={{color: '#ffffff'}}>
                            {t.analysis.selectTask}
                          </h5>
                          <p style={{color: '#ffffff'}}>
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
              <Row className="mb-4">
                <Col>
                  <Alert variant="info" className="border-0" style={{background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid rgba(245, 158, 11, 0.2)'}}>
                    <div className="d-flex align-items-center">
                      <Lightbulb className="me-2" size={18} />
            <div>
                        <strong className="small">{language === 'ko' ? '데모 모드' : 'Demo Mode'}</strong>
                        <p className="mb-0 mt-1 small" style={{color: '#f59e0b'}}>
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