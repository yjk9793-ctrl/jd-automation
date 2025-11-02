'use client';

import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { TrendingUp, Clock, Target, DollarSign, Zap, AlertCircle } from 'lucide-react';

interface ComparisonMatrixProps {
  result: AnalysisResult;
}

export function ComparisonMatrix({ result }: ComparisonMatrixProps) {
  const { tasks } = result;
  const topTasks = [...tasks].sort((a, b) => b.score - a.score).slice(0, 6);

  const metrics = [
    { key: 'score', label: '자동화 점수', icon: Target, color: 'text-blue-500' },
    { key: 'roiEstimate', label: '예상 ROI', icon: TrendingUp, color: 'text-green-500' },
    { key: 'difficulty', label: '구현 난이도', icon: AlertCircle, color: 'text-yellow-500', inverse: true },
  ];

  const getValueColor = (metric: typeof metrics[0], value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (metric.key === 'score') {
      return percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
    }
    if (metric.key === 'roiEstimate') {
      return percentage >= 70 ? 'bg-green-500' : percentage >= 50 ? 'bg-blue-500' : 'bg-gray-500';
    }
    if (metric.key === 'difficulty') {
      return percentage >= 70 ? 'bg-red-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-green-500';
    }
    return 'bg-gray-500';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate': return 'border-green-500 bg-green-500/10';
      case 'AI-Copilot': return 'border-yellow-500 bg-yellow-500/10';
      case 'Human-Critical': return 'border-red-500 bg-red-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const maxValues = {
    score: Math.max(...tasks.map(t => t.score)),
    roiEstimate: Math.max(...tasks.map(t => t.roiEstimate)),
    difficulty: 5,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span>에이전트 비교 매트릭스</span>
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        주요 에이전트들의 핵심 지표를 비교하여 우선순위를 결정하세요.
      </p>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-dark-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">에이전트</th>
              {metrics.map((metric) => {
                const IconComponent = metric.icon;
                return (
                  <th key={metric.key} className="px-4 py-3 text-center text-sm font-semibold text-gray-300">
                    <div className="flex items-center justify-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span>{metric.label}</span>
                    </div>
                  </th>
                );
              })}
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">종합</th>
            </tr>
          </thead>
          <tbody>
            {topTasks.map((task, index) => {
              const overallScore = (task.score + task.roiEstimate + ((6 - task.difficulty) * 20)) / 3;
              return (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors"
                >
                  {/* Agent Name */}
                  <td className="px-4 py-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.category === 'Automate' ? 'bg-green-500' :
                        task.category === 'AI-Copilot' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <div className="text-sm font-medium text-white">{task.title}</div>
                        <div className="text-xs text-gray-500">
                          {task.category === 'Automate' ? '자동화' :
                           task.category === 'AI-Copilot' ? 'AI 협업' : '인간 중심'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Metrics */}
                  {metrics.map((metric) => {
                    const value = task[metric.key as keyof typeof task] as number;
                    const percentage = (value / maxValues[metric.key as keyof typeof maxValues]) * 100;
                    
                    return (
                      <td key={metric.key} className="px-4 py-4">
                        <div className="flex flex-col items-center space-y-2">
                          <span className={`text-lg font-bold ${metric.color}`}>
                            {value}{metric.key === 'difficulty' ? '/5' : ''}
                          </span>
                          <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                              className={`h-full ${getValueColor(metric, value, maxValues[metric.key as keyof typeof maxValues])}`}
                            />
                          </div>
                        </div>
                      </td>
                    );
                  })}

                  {/* Overall Score */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-bold text-primary-500">
                        {Math.round(overallScore)}
                      </div>
                      <div className="text-xs text-gray-500">종합 점수</div>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 bg-dark-700/50 rounded-lg flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-300">높음 (70%+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-sm text-gray-300">보통 (50-70%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-300">낮음 (50% 미만)</span>
        </div>
      </div>
    </motion.div>
  );
}

