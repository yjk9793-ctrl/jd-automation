'use client';

import React from 'react';
import { Card, Badge, Table, Row, Col, ListGroup } from 'react-bootstrap';
import { AnalysisResult, TaskItem } from '@/types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';

interface DetailedReportProps {
  result: AnalysisResult;
  selectedTasks?: TaskItem[];
}

const COLORS = {
  Automate: '#10b981',
  'Co-pilot': '#3b82f6',
  'Human-critical': '#f59e0b',
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded" style={{background: 'rgba(0, 0, 0, 0.8)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.2)'}}>
        <p className="mb-1 fw-bold">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="mb-0" style={{color: entry.color}}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function DetailedReport({ result, selectedTasks = [] }: DetailedReportProps) {
  if (!result) {
    return null;
  }

  const { tasks, summary } = result;

  // 차트 데이터 준비
  const categoryData = [
    { name: '자동화', value: summary.automate, color: COLORS.Automate },
    { name: 'AI 협업', value: summary.copilot, color: COLORS['Co-pilot'] },
    { name: '인간 판단', value: summary.humanCritical, color: COLORS['Human-critical'] },
  ];

  const difficultyData = tasks.map(task => ({
    name: task.title.length > 15 ? `${task.title.substring(0, 15)}...` : task.title,
    difficulty: task.difficulty,
    score: task.score,
    roi: task.roiEstimate,
  }));

  const roiData = tasks
    .filter(task => task.category === 'Automate')
    .sort((a, b) => b.roiEstimate - a.roiEstimate)
    .slice(0, 10)
    .map(task => ({
      name: task.title.length > 20 ? `${task.title.substring(0, 20)}...` : task.title,
      roi: task.roiEstimate,
      score: task.score,
    }));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate':
        return 'success';
      case 'Co-pilot':
        return 'info';
      case 'Human-critical':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'success';
    if (difficulty <= 3) return 'warning';
    return 'danger';
  };

  const getDifficultyText = (difficulty: number) => {
    const levels = ['매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움'];
    return levels[difficulty - 1] || levels[2];
  };

  return (
    <div className="detailed-report">
      {/* Header */}
      <Card className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <Card.Header className="bg-transparent border-0">
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="fw-bold mb-0" style={{color: '#ffffff'}}>
              상세 분석 리포트
            </h4>
            <Badge bg="primary" className="px-3 py-2">
              {tasks.length}개 작업 분석
            </Badge>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="g-4">
            <Col md={3}>
              <div className="text-center">
                <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(16, 185, 129, 0.2)'}}>
                  <CheckCircle className="text-success" size={32} />
                </div>
                <h3 className="fw-bold mb-2" style={{color: '#10b981'}}>
                  {summary.automate}
                </h3>
                <p className="mb-0" style={{color: '#ffffff'}}>자동화 가능</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(59, 130, 246, 0.2)'}}>
                  <Target className="text-primary" size={32} />
                </div>
                <h3 className="fw-bold mb-2" style={{color: '#3b82f6'}}>
                  {summary.copilot}
                </h3>
                <p className="mb-0" style={{color: '#ffffff'}}>AI 협업</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(245, 158, 11, 0.2)'}}>
                  <AlertTriangle className="text-warning" size={32} />
                </div>
                <h3 className="fw-bold mb-2" style={{color: '#f59e0b'}}>
                  {summary.humanCritical}
                </h3>
                <p className="mb-0" style={{color: '#ffffff'}}>인간 판단</p>
              </div>
            </Col>
            <Col md={3}>
              <div className="text-center">
                <div className="p-3 rounded-circle d-inline-flex mb-3" style={{background: 'rgba(245, 158, 11, 0.2)'}}>
                  <TrendingUp className="text-warning" size={32} />
                </div>
                <h3 className="fw-bold mb-2" style={{color: '#f59e0b'}}>
                  {summary.averageROI.toFixed(0)}%
                </h3>
                <p className="mb-0" style={{color: '#ffffff'}}>평균 ROI</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Charts Section */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0 d-flex align-items-center" style={{color: '#ffffff'}}>
                <PieChartIcon className="me-2" size={20} />
                카테고리 분포
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
            <Card.Header className="bg-transparent border-0">
              <h5 className="fw-bold mb-0 d-flex align-items-center" style={{color: '#ffffff'}}>
                <BarChart3 className="me-2" size={20} />
                난이도별 분포
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={difficultyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#ffffff"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#ffffff" fontSize={12} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="difficulty" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ROI Analysis */}
      {roiData.length > 0 && (
        <Card className="mb-4 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
          <Card.Header className="bg-transparent border-0">
            <h5 className="fw-bold mb-0 d-flex align-items-center" style={{color: '#ffffff'}}>
              <TrendingUp className="me-2" size={20} />
              ROI 분석 (상위 10개 작업)
            </h5>
          </Card.Header>
          <Card.Body className="p-4">
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis type="number" stroke="#ffffff" fontSize={12} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#ffffff" 
                    fontSize={12}
                    width={150}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="roi" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Tasks Table */}
      <Card className="border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
        <Card.Header className="bg-transparent border-0">
          <h5 className="fw-bold mb-0 d-flex align-items-center" style={{color: '#ffffff'}}>
            <Activity className="me-2" size={20} />
            작업 상세 목록
          </h5>
        </Card.Header>
        <Card.Body className="p-0">
          <div style={{maxHeight: '600px', overflowY: 'auto'}}>
            <Table responsive className="mb-0">
              <thead style={{background: 'rgba(255, 255, 255, 0.05)'}}>
                <tr>
                  <th style={{color: '#ffffff', border: 'none', padding: '16px'}}>작업명</th>
                  <th style={{color: '#ffffff', border: 'none', padding: '16px'}}>카테고리</th>
                  <th style={{color: '#ffffff', border: 'none', padding: '16px'}}>점수</th>
                  <th style={{color: '#ffffff', border: 'none', padding: '16px'}}>ROI</th>
                  <th style={{color: '#ffffff', border: 'none', padding: '16px'}}>난이도</th>
                  <th style={{color: '#ffffff', border: 'none', padding: '16px'}}>예상시간</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} style={{borderBottom: '1px solid rgba(255, 255, 255, 0.1)'}}>
                    <td style={{color: '#ffffff', border: 'none', padding: '16px'}}>
                      <div>
                        <h6 className="fw-bold mb-1" style={{color: '#ffffff'}}>
                          {task.title}
                        </h6>
                        <small className="text-muted" style={{color: '#9ca3af'}}>
                          {task.sourceText.length > 100 
                            ? `${task.sourceText.substring(0, 100)}...`
                            : task.sourceText
                          }
                        </small>
                      </div>
                    </td>
                    <td style={{color: '#ffffff', border: 'none', padding: '16px'}}>
                      <Badge bg={getCategoryColor(task.category)} className="px-2 py-1">
                        {task.category === 'Automate' ? '자동화' : 
                         task.category === 'Co-pilot' ? 'AI 협업' : '인간 판단'}
                      </Badge>
                    </td>
                    <td style={{color: '#ffffff', border: 'none', padding: '16px'}}>
                      <div className="d-flex align-items-center">
                        <div className="progress me-2" style={{width: '60px', height: '8px'}}>
                          <div 
                            className="progress-bar" 
                            style={{
                              width: `${task.score}%`,
                              background: task.score >= 70 ? '#10b981' : task.score >= 40 ? '#f59e0b' : '#ef4444'
                            }}
                          />
                        </div>
                        <span className="fw-bold">{task.score}%</span>
                      </div>
                    </td>
                    <td style={{color: '#ffffff', border: 'none', padding: '16px'}}>
                      <Badge bg="warning" className="px-2 py-1">
                        {task.roiEstimate}%
                      </Badge>
                    </td>
                    <td style={{color: '#ffffff', border: 'none', padding: '16px'}}>
                      <Badge bg={getDifficultyColor(task.difficulty)} className="px-2 py-1">
                        {getDifficultyText(task.difficulty)}
                      </Badge>
                    </td>
                    <td style={{color: '#ffffff', border: 'none', padding: '16px'}}>
                      <div className="d-flex align-items-center">
                        <Clock className="me-1" size={14} style={{color: '#6b7280'}} />
                        <span>{task.estimatedTime}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}