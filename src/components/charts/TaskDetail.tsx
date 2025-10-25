'use client';

import React, { useState } from 'react';
import { Card, Badge, Button, Tab, Tabs, Row, Col, ListGroup, Table, Alert } from 'react-bootstrap';
import { 
  Code, 
  Workflow, 
  FileText, 
  AlertTriangle, 
  Shield, 
  Wrench,
  Download,
  Copy,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Target
} from 'lucide-react';
import { TaskItem, TaskRecipe } from '@/types';
import { useTranslation, Language } from '@/lib/i18n';

interface TaskDetailProps {
  task: TaskItem;
  onGenerateRecipe?: (task: TaskItem) => Promise<void>;
  isGeneratingRecipe?: boolean;
  language?: Language;
}

type TabType = 'overview' | 'recipe' | 'code' | 'diagram';

export function TaskDetail({ task, onGenerateRecipe, isGeneratingRecipe = false, language = 'ko' }: TaskDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const t = useTranslation(language);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate':
        return 'success';
      case 'Co-pilot':
        return 'info';
      case 'Human-critical':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Automate':
        return <TrendingUp size={16} />;
      case 'Co-pilot':
        return <Shield size={16} />;
      case 'Human-critical':
        return <AlertTriangle size={16} />;
      default:
        return <Code size={16} />;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'success';
    if (difficulty <= 3) return 'warning';
    return 'danger';
  };

  const getDifficultyText = (difficulty: number) => {
    const levels = language === 'ko' 
      ? ['매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움']
      : ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
    return levels[difficulty - 1] || levels[2];
  };

  const copyToClipboard = async (text: string, codeType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(codeType);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderOverview = () => (
    <div>
      {/* Task Header */}
      <div className="mb-4">
        <div className="d-flex align-items-center mb-3">
          <Badge 
            bg={getCategoryColor(task.category)} 
            className="me-3 d-flex align-items-center"
          >
            {getCategoryIcon(task.category)}
            <span className="ms-1">
              {language === 'ko' 
                ? (task.category === 'Automate' ? '자동화' : 
                   task.category === 'Co-pilot' ? 'AI 협업' : '인간 판단')
                : task.category
              }
            </span>
          </Badge>
          <Badge 
            bg={getDifficultyColor(task.difficulty)}
            className="border"
            style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}
          >
            {getDifficultyText(task.difficulty)}
          </Badge>
        </div>
        
        <h4 className="fw-bold mb-3" style={{color: '#ffffff'}}>
          {task.title}
        </h4>
        
        <p className="text-muted mb-4" style={{color: '#ffffff'}}>
          {task.sourceText}
        </p>
      </div>

      {/* Key Metrics */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="text-center border-0" style={{background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)'}}>
            <Card.Body className="p-3">
              <TrendingUp className="text-success mb-2" size={24} />
              <h5 className="fw-bold mb-1" style={{color: '#10b981'}}>
                {task.score}%
              </h5>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '자동화 점수' : 'Automation Score'}
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0" style={{background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)'}}>
            <Card.Body className="p-3">
              <DollarSign className="text-warning mb-2" size={24} />
              <h5 className="fw-bold mb-1" style={{color: '#f59e0b'}}>
                {task.roiEstimate}%
              </h5>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '예상 ROI' : 'Expected ROI'}
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0" style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
            <Card.Body className="p-3">
              <Clock className="text-primary mb-2" size={24} />
              <h5 className="fw-bold mb-1" style={{color: '#3b82f6'}}>
                {task.estimatedTime}
              </h5>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '예상 시간' : 'Estimated Time'}
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center border-0" style={{background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
            <Card.Body className="p-3">
              <Target className="text-danger mb-2" size={24} />
              <h5 className="fw-bold mb-1" style={{color: '#ef4444'}}>
                {task.difficulty}/5
              </h5>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '난이도' : 'Difficulty'}
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reasoning */}
      <Card className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <Card.Header className="bg-transparent border-0">
          <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
            {language === 'ko' ? '분석 근거' : 'Analysis Reasoning'}
          </h6>
        </Card.Header>
        <Card.Body>
          <p className="mb-0" style={{color: '#ffffff'}}>
            {task.reasoning}
          </p>
        </Card.Body>
      </Card>

      {/* Risks and Safeguards */}
      <Row className="g-3">
        <Col md={6}>
          <Card className="h-100 border-0" style={{background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <h6 className="fw-bold mb-0 d-flex align-items-center" style={{color: '#ef4444'}}>
                <AlertTriangle className="me-2" size={16} />
                {language === 'ko' ? '리스크' : 'Risks'}
              </h6>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {task.risks.map((risk, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className="border-0 px-0 py-2" 
                    style={{background: 'transparent', color: '#ffffff'}}
                  >
                    • {risk}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 border-0" style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <h6 className="fw-bold mb-0 d-flex align-items-center" style={{color: '#10b981'}}>
                <Shield className="me-2" size={16} />
                {language === 'ko' ? '안전장치' : 'Safeguards'}
              </h6>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {task.safeguards.map((safeguard, index) => (
                  <ListGroup.Item 
                    key={index} 
                    className="border-0 px-0 py-2" 
                    style={{background: 'transparent', color: '#ffffff'}}
                  >
                    • {safeguard}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderRecipe = () => {
    if (!task.recipe) {
      return (
        <div className="text-center py-5">
          <Wrench className="text-muted mb-3" size={48} style={{color: '#6b7280'}} />
          <h6 className="text-muted mb-3" style={{color: '#ffffff'}}>
            {language === 'ko' ? '레시피가 생성되지 않았습니다' : 'No recipe generated'}
          </h6>
          <p className="text-muted small mb-4" style={{color: '#ffffff'}}>
            {language === 'ko' 
              ? 'AI 에이전트 구현을 위한 상세 레시피를 생성해보세요'
              : 'Generate a detailed recipe for AI agent implementation'
            }
          </p>
          {onGenerateRecipe && (
            <Button
              variant="primary"
              onClick={() => onGenerateRecipe(task)}
              disabled={isGeneratingRecipe}
              className="px-4 py-2"
            >
              {isGeneratingRecipe ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  {language === 'ko' ? '생성 중...' : 'Generating...'}
                </>
              ) : (
                <>
                  <Wrench className="me-2" size={16} />
                  {language === 'ko' ? '레시피 생성하기' : 'Generate Recipe'}
                </>
              )}
            </Button>
          )}
        </div>
      );
    }

    return (
      <div>
        {/* Recipe Overview */}
        <Card className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
          <Card.Header className="bg-transparent border-0">
            <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
              {language === 'ko' ? '레시피 개요' : 'Recipe Overview'}
            </h6>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <div className="d-flex align-items-center mb-2">
                  <FileText className="text-primary me-2" size={16} />
                  <span className="fw-bold" style={{color: '#ffffff'}}>
                    {language === 'ko' ? '입력' : 'Inputs'}: {task.recipe.inputs.length}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <Target className="text-success me-2" size={16} />
                  <span className="fw-bold" style={{color: '#ffffff'}}>
                    {language === 'ko' ? '출력' : 'Outputs'}: {task.recipe.outputs.length}
                  </span>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex align-items-center mb-2">
                  <Code className="text-info me-2" size={16} />
                  <span className="fw-bold" style={{color: '#ffffff'}}>
                    {language === 'ko' ? '코드 샘플' : 'Code Samples'}: {task.recipe.codeSamples.length}
                  </span>
                </div>
                <div className="d-flex align-items-center">
                  <CheckCircle className="text-warning me-2" size={16} />
                  <span className="fw-bold" style={{color: '#ffffff'}}>
                    {language === 'ko' ? '테스트' : 'Tests'}: {task.recipe.tests.length}
                  </span>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Inputs and Outputs */}
        <Row className="g-3 mb-4">
          <Col md={6}>
            <Card className="h-100 border-0" style={{background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)'}}>
              <Card.Header className="bg-transparent border-0">
                <h6 className="fw-bold mb-0" style={{color: '#3b82f6'}}>
                  {language === 'ko' ? '입력 데이터' : 'Input Data'}
                </h6>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {task.recipe.inputs.map((input, index) => (
                    <ListGroup.Item 
                      key={index} 
                      className="border-0 px-0 py-2" 
                      style={{background: 'transparent', color: '#ffffff'}}
                    >
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{input.name}</span>
                        <Badge bg="secondary" className="small">
                          {input.type}
                        </Badge>
                      </div>
                      <small className="text-muted" style={{color: '#9ca3af'}}>
                        {input.description || `${language === 'ko' ? '입력 데이터' : 'Input data'}: ${input.type}`}
                      </small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="h-100 border-0" style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
              <Card.Header className="bg-transparent border-0">
                <h6 className="fw-bold mb-0" style={{color: '#10b981'}}>
                  {language === 'ko' ? '출력 데이터' : 'Output Data'}
                </h6>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {task.recipe.outputs.map((output, index) => (
                    <ListGroup.Item 
                      key={index} 
                      className="border-0 px-0 py-2" 
                      style={{background: 'transparent', color: '#ffffff'}}
                    >
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">{output.name}</span>
                        <Badge bg="success" className="small">
                          {output.type}
                        </Badge>
                      </div>
                      <small className="text-muted" style={{color: '#9ca3af'}}>
                        {language === 'ko' ? '대상' : 'Target'}: {output.source}
                      </small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Steps */}
        <Card className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
          <Card.Header className="bg-transparent border-0">
            <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
              {language === 'ko' ? '구현 단계' : 'Implementation Steps'}
            </h6>
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {task.recipe.steps.map((step, index) => {
                // step이 문자열인 경우와 객체인 경우 모두 처리
                const stepTitle = typeof step === 'string' ? `Step ${index + 1}` : step.title;
                const stepDescription = typeof step === 'string' ? step : step.description;
                
                return (
                  <ListGroup.Item 
                    key={index} 
                    className="border-0 px-0 py-3" 
                    style={{background: 'transparent', color: '#ffffff'}}
                  >
                    <div className="d-flex">
                      <Badge 
                        bg="primary" 
                        className="me-3 d-flex align-items-center justify-content-center" 
                        style={{width: '24px', height: '24px', minWidth: '24px'}}
                      >
                        {index + 1}
                      </Badge>
                      <div className="flex-grow-1">
                        <h6 className="fw-bold mb-1" style={{color: '#ffffff'}}>
                          {stepTitle}
                        </h6>
                        <p className="mb-0" style={{color: '#ffffff'}}>
                          {stepDescription}
                        </p>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    );
  };

  const renderCode = () => {
    if (!task.recipe || !task.recipe.codeSamples.length) {
      return (
        <div className="text-center py-5">
          <Code className="text-muted mb-3" size={48} style={{color: '#6b7280'}} />
          <h6 className="text-muted mb-3" style={{color: '#ffffff'}}>
            {language === 'ko' ? '코드 샘플이 없습니다' : 'No code samples available'}
          </h6>
          <p className="text-muted small" style={{color: '#ffffff'}}>
            {language === 'ko' 
              ? '레시피를 먼저 생성해주세요'
              : 'Please generate a recipe first'
            }
          </p>
        </div>
      );
    }

    return (
      <div>
        {task.recipe.codeSamples.map((sample, index) => (
          <Card key={index} className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                  {sample.label}
                </h6>
                <div className="d-flex gap-2">
                  <Badge bg="secondary" className="px-2 py-1">
                    {sample.lang}
                  </Badge>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => copyToClipboard(sample.code, `code-${index}`)}
                    className="d-flex align-items-center"
                  >
                    {copiedCode === `code-${index}` ? (
                      <>
                        <CheckCircle className="me-1" size={14} />
                        {language === 'ko' ? '복사됨' : 'Copied'}
                      </>
                    ) : (
                      <>
                        <Copy className="me-1" size={14} />
                        {language === 'ko' ? '복사' : 'Copy'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <pre className="mb-0 p-3" style={{
                background: '#1a1a1a',
                color: '#ffffff',
                fontSize: '14px',
                lineHeight: '1.5',
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                <code>{sample.code}</code>
              </pre>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  const renderDiagram = () => {
    if (!task.recipe || !task.recipe.flowMermaid) {
      return (
        <div className="text-center py-5">
          <Workflow className="text-muted mb-3" size={48} style={{color: '#6b7280'}} />
          <h6 className="text-muted mb-3" style={{color: '#ffffff'}}>
            {language === 'ko' ? '플로우 다이어그램이 없습니다' : 'No flow diagram available'}
          </h6>
          <p className="text-muted small" style={{color: '#ffffff'}}>
            {language === 'ko' 
              ? '레시피를 먼저 생성해주세요'
              : 'Please generate a recipe first'
            }
          </p>
        </div>
      );
    }

    return (
      <Card className="border-0" style={{background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <Card.Header className="bg-transparent border-0">
          <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
            {language === 'ko' ? '작업 플로우' : 'Task Flow'}
          </h6>
        </Card.Header>
        <Card.Body>
          <div className="text-center">
            <Alert variant="info" className="border-0" style={{background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
              <Workflow className="me-2" size={16} />
              {language === 'ko' 
                ? 'Mermaid 다이어그램이 여기에 표시됩니다'
                : 'Mermaid diagram will be displayed here'
              }
            </Alert>
            <pre className="mt-3 p-3 rounded" style={{
              background: '#1a1a1a',
              color: '#ffffff',
              fontSize: '12px',
              overflow: 'auto'
            }}>
              {task.recipe.flowMermaid}
            </pre>
          </div>
        </Card.Body>
      </Card>
    );
  };

  return (
    <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
      <Card.Header className="bg-transparent border-0">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>
            {language === 'ko' ? '작업 상세' : 'Task Details'}
          </h5>
          <Badge bg="primary" className="px-3 py-2">
            {task.category}
          </Badge>
        </div>

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k as TabType)}
          className="mb-0"
        >
          <Tab eventKey="overview" title={
            <span className="d-flex align-items-center">
              <FileText className="me-1" size={16} />
              {language === 'ko' ? '개요' : 'Overview'}
            </span>
          } />
          <Tab eventKey="recipe" title={
            <span className="d-flex align-items-center">
              <Wrench className="me-1" size={16} />
              {language === 'ko' ? '레시피' : 'Recipe'}
            </span>
          } />
          <Tab eventKey="code" title={
            <span className="d-flex align-items-center">
              <Code className="me-1" size={16} />
              {language === 'ko' ? '코드' : 'Code'}
            </span>
          } />
          <Tab eventKey="diagram" title={
            <span className="d-flex align-items-center">
              <Workflow className="me-1" size={16} />
              {language === 'ko' ? '다이어그램' : 'Diagram'}
            </span>
          } />
        </Tabs>
      </Card.Header>

      <Card.Body className="p-0" style={{maxHeight: '600px', overflowY: 'auto'}}>
        <div className="p-3">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'recipe' && renderRecipe()}
          {activeTab === 'code' && renderCode()}
          {activeTab === 'diagram' && renderDiagram()}
        </div>
      </Card.Body>
    </Card>
  );
}