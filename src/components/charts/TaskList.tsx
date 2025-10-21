'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('score');
  const [searchQuery, setSearchQuery] = useState('');
  const t = useTranslation(language);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // 필터 적용
    if (filter !== 'all') {
      filtered = filtered.filter(task => task.category === filter);
    }

    // 검색 적용
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.sourceText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬 적용
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'roi':
          return b.roiEstimate - a.roiEstimate;
        case 'difficulty':
          return a.difficulty - b.difficulty;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, filter, sortBy, searchQuery]);

  const getCategoryIcon = (category: TaskCategory) => {
    switch (category) {
      case 'Automate':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'Co-pilot':
        return <Code className="h-4 w-4 text-blue-500" />;
      case 'Human-critical':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getCategoryVariant = (category: TaskCategory) => {
    switch (category) {
      case 'Automate':
        return 'automate' as const;
      case 'Co-pilot':
        return 'copilot' as const;
      case 'Human-critical':
        return 'humanCritical' as const;
    }
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case 1:
      case 2:
        return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-200';
      case 3:
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200';
      case 4:
      case 5:
        return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-200';
    }
  };

  const categoryCounts = {
    all: tasks.length,
    Automate: tasks.filter(t => t.category === 'Automate').length,
    'Co-pilot': tasks.filter(t => t.category === 'Co-pilot').length,
    'Human-critical': tasks.filter(t => t.category === 'Human-critical').length,
  };

  return (
    <Card className="w-full dark-card dark-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient dark-text-glow">
          <Filter className="h-5 w-5" />
          {t.analysis.tasks} ({filteredAndSortedTasks.length}{language === 'ko' ? '개' : ' items'})
        </CardTitle>
        
        {/* 필터 및 검색 */}
        <div className="space-y-4">
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'Automate', 'Co-pilot', 'Human-critical'] as const).map(category => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                size="sm"
                className="micro-interaction dark-glow"
                onClick={() => setFilter(category)}
                className="h-8"
              >
                {category === 'all' 
                  ? (language === 'ko' ? '전체' : 'All') 
                  : t.task.category[category === 'Automate' ? 'automate' : 
                                   category === 'Co-pilot' ? 'copilot' : 
                                   'humanCritical']}
                {category !== 'all' && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    {categoryCounts[category]}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* 검색 및 정렬 */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={language === 'ko' ? '작업 검색...' : 'Search tasks...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring input-modern dark-border-glow"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring input-modern dark-border-glow"
            >
              <option value="score">{language === 'ko' ? '점수순' : 'By Score'}</option>
              <option value="roi">{language === 'ko' ? 'ROI순' : 'By ROI'}</option>
              <option value="difficulty">{language === 'ko' ? '난이도순' : 'By Difficulty'}</option>
              <option value="title">{language === 'ko' ? '제목순' : 'By Title'}</option>
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
        {filteredAndSortedTasks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{language === 'ko' ? '조건에 맞는 작업이 없습니다.' : 'No tasks match the criteria.'}</p>
          </div>
        ) : (
          filteredAndSortedTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md micro-interaction dark-card dark-glow ${
                selectedTask?.id === task.id
                  ? 'border-primary bg-primary/5 shadow-md dark-glow'
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onTaskSelect(task)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  {getCategoryIcon(task.category)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm mb-1 line-clamp-2 text-gradient dark-text-glow">
                      {task.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {task.sourceText}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant={getCategoryVariant(task.category)} className="dark-glow">
                  {t.task.category[task.category === 'Automate' ? 'automate' : 
                                 task.category === 'Co-pilot' ? 'copilot' : 
                                 'humanCritical']}
                </Badge>
                
                <Badge variant="outline" className="text-xs dark-glow">
                  {task.score}{language === 'ko' ? '점' : ' pts'}
                </Badge>
                
                <Badge variant="outline" className="text-xs dark-glow">
                  ROI {task.roiEstimate}%
                </Badge>
                
                <Badge 
                  variant="outline" 
                  className={`text-xs dark-glow ${getDifficultyColor(task.difficulty)}`}
                >
                  {language === 'ko' ? '난이도' : 'Difficulty'} {task.difficulty}/5
                </Badge>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {task.estimatedTime}
                </div>
              </div>

              {/* 리스크 및 가드레일 표시 */}
              {(task.risks.length > 0 || task.safeguards.length > 0) && (
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex gap-4 text-xs">
                    {task.risks.length > 0 && (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertTriangle className="h-3 w-3" />
                        <span>{task.risks.length}개 리스크</span>
                      </div>
                    )}
                    {task.safeguards.length > 0 && (
                      <div className="flex items-center gap-1 text-blue-600">
                        <Shield className="h-3 w-3" />
                        <span>{task.safeguards.length}개 가드레일</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
