'use client';

import React from 'react';
import { Card, Row, Col, Badge, ProgressBar } from 'react-bootstrap';
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

  if (!result) {
    return null;
  }

  const { summary } = result;
  const totalTasks = summary.total;
  const automateCount = summary.automate;
  const copilotCount = summary.copilot;
  const humanCriticalCount = summary.humanCritical;
  
  const automationRate = totalTasks > 0 ? Math.round((automateCount / totalTasks) * 100) : 0;
  const copilotRate = totalTasks > 0 ? Math.round((copilotCount / totalTasks) * 100) : 0;
  const humanCriticalRate = totalTasks > 0 ? Math.round((humanCriticalCount / totalTasks) * 100) : 0;

  return (
    <div className="mb-4">
      {/* Main Overview Card */}
      <Card className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <Card.Header className="bg-transparent border-0 pb-0">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>
              {language === 'ko' ? '분석 결과 요약' : 'Analysis Summary'}
            </h5>
            <Badge bg="primary" className="px-3 py-2">
              {language === 'ko' ? 'AI 분석 완료' : 'AI Analysis Complete'}
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="pt-3">
          <Row className="g-4">
            {/* Total Score */}
            <Col md={3}>
              <div className="text-center">
                <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(59, 130, 246, 0.1)'}}>
                  <BarChart3 className="text-primary" size={32} />
                </div>
                <h3 className="fw-bold mb-2" style={{color: '#3b82f6'}}>
                  {summary.averageROI.toFixed(0)}%
                </h3>
                <p className="mb-0" style={{color: '#ffffff'}}>
                  {language === 'ko' ? '평균 ROI' : 'Average ROI'}
                </p>
              </div>
            </Col>

            {/* Automation Distribution */}
            <Col md={9}>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{color: '#ffffff'}}>
                    {language === 'ko' ? '자동화 분포' : 'Automation Distribution'}
                  </span>
                  <span className="small" style={{color: '#9ca3af'}}>
                    {totalTasks} {language === 'ko' ? '개 작업' : 'tasks'}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between small mb-1">
                      <span style={{color: '#10b981'}}>
                        {language === 'ko' ? '자동화 가능' : 'Automate'}
                      </span>
                      <span style={{color: '#ffffff'}}>{automateCount}</span>
                    </div>
                    <ProgressBar 
                      variant="success" 
                      now={automationRate} 
                      style={{height: '8px'}}
                    />
                  </div>
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between small mb-1">
                      <span style={{color: '#3b82f6'}}>
                        {language === 'ko' ? 'AI 협업' : 'Co-pilot'}
                      </span>
                      <span style={{color: '#ffffff'}}>{copilotCount}</span>
                    </div>
                    <ProgressBar 
                      variant="info" 
                      now={copilotRate} 
                      style={{height: '8px'}}
                    />
                  </div>
                  <div className="flex-fill">
                    <div className="d-flex justify-content-between small mb-1">
                      <span style={{color: '#ef4444'}}>
                        {language === 'ko' ? '인간 판단' : 'Human-critical'}
                      </span>
                      <span style={{color: '#ffffff'}}>{humanCriticalCount}</span>
                    </div>
                    <ProgressBar 
                      variant="danger" 
                      now={humanCriticalRate} 
                      style={{height: '8px'}}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Quick Insights */}
      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="h-100 border-0 text-center" style={{background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)'}}>
            <Card.Body className="p-3">
              <CheckCircle className="text-success mb-2" size={24} />
              <h6 className="fw-bold mb-1" style={{color: '#10b981'}}>
                {automateCount}
              </h6>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '자동화 가능' : 'Automate'}
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-0 text-center" style={{background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
            <Card.Body className="p-3">
              <Brain className="text-primary mb-2" size={24} />
              <h6 className="fw-bold mb-1" style={{color: '#3b82f6'}}>
                {copilotCount}
              </h6>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? 'AI 협업' : 'Co-pilot'}
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-0 text-center" style={{background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)'}}>
            <Card.Body className="p-3">
              <XCircle className="text-danger mb-2" size={24} />
              <h6 className="fw-bold mb-1" style={{color: '#ef4444'}}>
                {humanCriticalCount}
              </h6>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '인간 판단' : 'Human-critical'}
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="h-100 border-0 text-center" style={{background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)'}}>
            <Card.Body className="p-3">
              <TrendingUp className="text-warning mb-2" size={24} />
              <h6 className="fw-bold mb-1" style={{color: '#f59e0b'}}>
                {summary.averageROI.toFixed(0)}%
              </h6>
              <small style={{color: '#ffffff'}}>
                {language === 'ko' ? '평균 ROI' : 'Avg ROI'}
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recommendations */}
      <Row className="g-3">
        <Col md={4}>
          <Card className="h-100 border-0" style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
            <Card.Body className="p-3">
              <div className="d-flex align-items-center mb-2">
                <Target className="text-success me-2" size={20} />
                <h6 className="fw-bold mb-0" style={{color: '#10b981'}}>
                  {language === 'ko' ? '완전 자동화' : 'Full Automation'}
                </h6>
              </div>
              <p className="small mb-0" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? `${automateCount}개 작업을 AI 에이전트로 완전 자동화할 수 있습니다.`
                  : `${automateCount} tasks can be fully automated with AI agents.`
                }
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0" style={{background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)'}}>
            <Card.Body className="p-3">
              <div className="d-flex align-items-center mb-2">
                <Brain className="text-primary me-2" size={20} />
                <h6 className="fw-bold mb-0" style={{color: '#3b82f6'}}>
                  {language === 'ko' ? 'AI 협업' : 'AI Collaboration'}
                </h6>
              </div>
              <p className="small mb-0" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? `${copilotCount}개 작업에 AI 어시스턴트를 활용하여 효율성을 높일 수 있습니다.`
                  : `${copilotCount} tasks can benefit from AI assistant collaboration.`
                }
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100 border-0" style={{background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)'}}>
            <Card.Body className="p-3">
              <div className="d-flex align-items-center mb-2">
                <AlertTriangle className="text-danger me-2" size={20} />
                <h6 className="fw-bold mb-0" style={{color: '#ef4444'}}>
                  {language === 'ko' ? '인간 판단 필요' : 'Human Judgment'}
                </h6>
              </div>
              <p className="small mb-0" style={{color: '#ffffff'}}>
                {language === 'ko' 
                  ? `${humanCriticalCount}개 작업은 전문가의 판단과 경험이 필요합니다.`
                  : `${humanCriticalCount} tasks require expert judgment and experience.`
                }
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}