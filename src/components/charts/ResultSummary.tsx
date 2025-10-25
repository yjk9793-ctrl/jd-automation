'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, Badge, Row, Col } from 'react-bootstrap';
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

const CustomTooltip = ({ active, payload, language }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="p-3 rounded" style={{background: 'rgba(0, 0, 0, 0.8)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
        <p className="mb-1 fw-bold">
          {language === 'ko' 
            ? (data.name === 'Automate' ? '자동화 가능' : 
               data.name === 'Co-pilot' ? 'AI 협업' : '인간 판단')
            : data.name
          }
        </p>
        <p className="mb-0">
          {language === 'ko' ? '작업 수' : 'Tasks'}: <strong>{data.value}</strong>
        </p>
        <p className="mb-0">
          {language === 'ko' ? '비율' : 'Percentage'}: <strong>{data.percent}%</strong>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload, language }: any) => {
  return (
    <div className="d-flex justify-content-center gap-3 flex-wrap">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="d-flex align-items-center">
          <div 
            className="me-2" 
            style={{
              width: '12px', 
              height: '12px', 
              backgroundColor: entry.color,
              borderRadius: '50%'
            }}
          />
          <span style={{color: '#ffffff', fontSize: '14px'}}>
            {language === 'ko' 
              ? (entry.value === 'Automate' ? '자동화 가능' : 
                 entry.value === 'Co-pilot' ? 'AI 협업' : '인간 판단')
              : entry.value
            }
          </span>
        </div>
      ))}
    </div>
  );
};

export function ResultSummary({ result, language = 'ko' }: ResultSummaryProps) {
  const t = useTranslation(language);

  if (!result) {
    return null;
  }

  const { summary } = result;
  const totalTasks = summary.total;
  const automateCount = summary.automate;
  const copilotCount = summary.copilot;
  const humanCriticalCount = summary.humanCritical;

  const chartData = [
    {
      name: 'Automate',
      value: automateCount,
      color: COLORS.Automate,
    },
    {
      name: 'Co-pilot',
      value: copilotCount,
      color: COLORS['Co-pilot'],
    },
    {
      name: 'Human-critical',
      value: humanCriticalCount,
      color: COLORS['Human-critical'],
    },
  ];

  const automationRate = totalTasks > 0 ? Math.round((automateCount / totalTasks) * 100) : 0;
  const copilotRate = totalTasks > 0 ? Math.round((copilotCount / totalTasks) * 100) : 0;
  const humanCriticalRate = totalTasks > 0 ? Math.round((humanCriticalCount / totalTasks) * 100) : 0;

  return (
    <div className="mb-4">
      <Row className="g-4">
        {/* Chart Section */}
        <Col lg={6}>
          <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                {language === 'ko' ? '자동화 분포' : 'Automation Distribution'}
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip language={language} />} />
                    <Legend content={<CustomLegend language={language} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Stats Section */}
        <Col lg={6}>
          <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                {language === 'ko' ? '핵심 지표' : 'Key Metrics'}
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="p-2 rounded-circle me-3" style={{background: 'rgba(16, 185, 129, 0.2)'}}>
                      <CheckCircle className="text-success" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                        {language === 'ko' ? '자동화 가능' : 'Automate'}
                      </h6>
                      <small style={{color: '#9ca3af'}}>
                        {language === 'ko' ? '완전 자동화 가능한 작업' : 'Fully automatable tasks'}
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <h4 className="fw-bold mb-0" style={{color: '#10b981'}}>
                      {automateCount}
                    </h4>
                    <small style={{color: '#10b981'}}>
                      {automationRate}%
                    </small>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="p-2 rounded-circle me-3" style={{background: 'rgba(59, 130, 246, 0.2)'}}>
                      <Target className="text-primary" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                        {language === 'ko' ? 'AI 협업' : 'Co-pilot'}
                      </h6>
                      <small style={{color: '#9ca3af'}}>
                        {language === 'ko' ? 'AI와 협업이 필요한 작업' : 'Tasks requiring AI collaboration'}
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <h4 className="fw-bold mb-0" style={{color: '#3b82f6'}}>
                      {copilotCount}
                    </h4>
                    <small style={{color: '#3b82f6'}}>
                      {copilotRate}%
                    </small>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="p-2 rounded-circle me-3" style={{background: 'rgba(245, 158, 11, 0.2)'}}>
                      <Clock className="text-warning" size={20} />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                        {language === 'ko' ? '인간 판단' : 'Human-critical'}
                      </h6>
                      <small style={{color: '#9ca3af'}}>
                        {language === 'ko' ? '인간의 판단이 필요한 작업' : 'Tasks requiring human judgment'}
                      </small>
                    </div>
                  </div>
                  <div className="text-end">
                    <h4 className="fw-bold mb-0" style={{color: '#f59e0b'}}>
                      {humanCriticalCount}
                    </h4>
                    <small style={{color: '#f59e0b'}}>
                      {humanCriticalRate}%
                    </small>
                  </div>
                </div>
              </div>

              <div className="pt-3" style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <TrendingUp className="text-success me-2" size={20} />
                    <span style={{color: '#ffffff'}}>
                      {language === 'ko' ? '평균 ROI' : 'Average ROI'}
                    </span>
                  </div>
                  <Badge bg="success" className="px-3 py-2">
                    {summary.averageROI.toFixed(0)}%
                  </Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* High Impact Tasks */}
      {summary.highImpactTasks && summary.highImpactTasks.length > 0 && (
        <Card className="mt-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
          <Card.Header className="bg-transparent border-0">
            <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>
              {language === 'ko' ? '고효과 작업' : 'High Impact Tasks'}
            </h5>
            <p className="text-muted small mb-0" style={{color: '#9ca3af'}}>
              {language === 'ko' 
                ? '높은 ROI를 제공하는 자동화 가능한 작업들'
                : 'High ROI automatable tasks'
              }
            </p>
          </Card.Header>
          <Card.Body>
            <Row className="g-3">
              {summary.highImpactTasks.map((task, index) => (
                <Col md={6} lg={4} key={index}>
                  <Card className="border-0" style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
                    <Card.Body className="p-3">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="fw-bold mb-0" style={{color: '#ffffff'}}>
                          {task.title}
                        </h6>
                        <Badge bg="success" className="px-2 py-1">
                          {task.roiEstimate}%
                        </Badge>
                      </div>
                      <p className="text-muted small mb-0" style={{color: '#9ca3af'}}>
                        {task.sourceText.length > 80 
                          ? `${task.sourceText.substring(0, 80)}...`
                          : task.sourceText
                        }
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}