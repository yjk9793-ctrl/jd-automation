'use client';

import React, { useState, useMemo } from 'react';
import { Card, Badge, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { 
  Filter, 
  Search, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Shield,
  Code,
  ArrowRight
} from 'lucide-react';
import { TaskItem, TaskCategory, DifficultyLevel } from '@/types';
import { useTranslation, Language } from '@/lib/i18n';

interface TaskListProps {
  tasks: TaskItem[];
  selectedTask?: TaskItem;
  onTaskSelect: (task: TaskItem) => void;
  language?: Language;
}

type FilterType = 'all' | TaskCategory;
type SortType = 'score' | 'roi' | 'difficulty' | 'title';

export function TaskList({ tasks, selectedTask, onTaskSelect, language = 'ko' }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const t = useTranslation(language);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.sourceText.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 카테고리 필터
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.category === filter);
    }

    // 정렬
    filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'roi':
          aValue = a.roiEstimate;
          bValue = b.roiEstimate;
          break;
        case 'difficulty':
          aValue = a.difficulty;
          bValue = b.difficulty;
          break;
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return filtered;
  }, [tasks, searchTerm, filter, sortBy, sortOrder]);

  const getCategoryColor = (category: TaskCategory) => {
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

  const getCategoryIcon = (category: TaskCategory) => {
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

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    if (difficulty <= 2) return 'success';
    if (difficulty <= 3) return 'warning';
    return 'danger';
  };

  const getDifficultyText = (difficulty: DifficultyLevel) => {
    const levels = language === 'ko' 
      ? ['매우 쉬움', '쉬움', '보통', '어려움', '매우 어려움']
      : ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
    return levels[difficulty - 1] || levels[2];
  };

  return (
    <Card className="h-100 border-0" style={{background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)'}}>
      <Card.Header className="bg-transparent border-0">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="fw-bold mb-0" style={{color: '#ffffff'}}>
            {language === 'ko' ? '작업 목록' : 'Task List'}
          </h5>
          <Badge bg="primary" className="px-3 py-2">
            {filteredAndSortedTasks.length} {language === 'ko' ? '개' : 'tasks'}
          </Badge>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-3">
          <InputGroup className="mb-3">
            <InputGroup.Text style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff'}}>
              <Search size={16} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder={language === 'ko' ? '작업 검색...' : 'Search tasks...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff'}}
            />
          </InputGroup>

          <Row className="g-2">
            <Col md={6}>
              <Form.Select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff'}}
              >
                <option value="all">{language === 'ko' ? '모든 카테고리' : 'All Categories'}</option>
                <option value="Automate">{language === 'ko' ? '자동화 가능' : 'Automate'}</option>
                <option value="Co-pilot">{language === 'ko' ? 'AI 협업' : 'Co-pilot'}</option>
                <option value="Human-critical">{language === 'ko' ? '인간 판단' : 'Human-critical'}</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-') as [SortType, 'asc' | 'desc'];
                  setSortBy(newSortBy);
                  setSortOrder(newSortOrder);
                }}
                style={{background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff'}}
              >
                <option value="score-desc">{language === 'ko' ? '점수 높은 순' : 'Score (High to Low)'}</option>
                <option value="score-asc">{language === 'ko' ? '점수 낮은 순' : 'Score (Low to High)'}</option>
                <option value="roi-desc">{language === 'ko' ? 'ROI 높은 순' : 'ROI (High to Low)'}</option>
                <option value="roi-asc">{language === 'ko' ? 'ROI 낮은 순' : 'ROI (Low to High)'}</option>
                <option value="difficulty-asc">{language === 'ko' ? '난이도 쉬운 순' : 'Difficulty (Easy to Hard)'}</option>
                <option value="difficulty-desc">{language === 'ko' ? '난이도 어려운 순' : 'Difficulty (Hard to Easy)'}</option>
                <option value="title-asc">{language === 'ko' ? '제목 A-Z' : 'Title A-Z'}</option>
                <option value="title-desc">{language === 'ko' ? '제목 Z-A' : 'Title Z-A'}</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </Card.Header>

      <Card.Body className="p-0" style={{maxHeight: '600px', overflowY: 'auto'}}>
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-5">
            <Filter className="text-muted mb-3" size={48} style={{color: '#6b7280'}} />
            <h6 className="text-muted" style={{color: '#ffffff'}}>
              {language === 'ko' ? '검색 결과가 없습니다' : 'No tasks found'}
            </h6>
            <p className="text-muted small" style={{color: '#ffffff'}}>
              {language === 'ko' 
                ? '다른 검색어나 필터를 시도해보세요'
                : 'Try different search terms or filters'
              }
            </p>
          </div>
        ) : (
          <div className="p-3">
            {filteredAndSortedTasks.map((task) => (
              <Card
                key={task.id}
                className={`mb-3 cursor-pointer transition-all ${
                  selectedTask?.id === task.id ? 'border-primary' : 'border-secondary'
                }`}
                onClick={() => onTaskSelect(task)}
                style={{
                  background: selectedTask?.id === task.id 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: selectedTask?.id === task.id 
                    ? '1px solid #3b82f6' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer'
                }}
              >
                <Card.Body className="p-3">
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center mb-2">
                        <Badge 
                          bg={getCategoryColor(task.category)} 
                          className="me-2 d-flex align-items-center"
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
                          className="small border"
                          style={{borderColor: 'rgba(255, 255, 255, 0.3)'}}
                        >
                          {getDifficultyText(task.difficulty)}
                        </Badge>
                      </div>
                      <h6 className="fw-bold mb-2" style={{color: '#ffffff'}}>
                        {task.title}
                      </h6>
                      <p className="text-muted small mb-2" style={{color: '#ffffff'}}>
                        {task.sourceText.length > 100 
                          ? `${task.sourceText.substring(0, 100)}...`
                          : task.sourceText
                        }
                      </p>
                    </div>
                    <div className="text-end">
                      <div className="d-flex align-items-center mb-1">
                        <TrendingUp className="text-success me-1" size={14} />
                        <span className="fw-bold" style={{color: '#10b981'}}>
                          {task.score}%
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <Clock className="text-muted me-1" size={14} style={{color: '#6b7280'}} />
                        <span className="small" style={{color: '#ffffff'}}>
                          {task.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <span className="small me-3" style={{color: '#ffffff'}}>
                        ROI: <strong style={{color: '#f59e0b'}}>{task.roiEstimate}%</strong>
                      </span>
                    </div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="d-flex align-items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onTaskSelect(task);
                      }}
                    >
                      {language === 'ko' ? '자세히 보기' : 'View Details'}
                      <ArrowRight className="ms-1" size={14} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}