'use client';

import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { Zap, Brain, Users, TrendingUp, Target, Clock, DollarSign } from 'lucide-react';

interface InfographicSummaryProps {
  result: AnalysisResult;
}

export function InfographicSummary({ result }: InfographicSummaryProps) {
  const { summary, tasks } = result;
  
  const quickWins = tasks.filter(t => t.roiEstimate >= 50 && t.difficulty <= 2);
  const avgTimeSavings = summary.estimatedROI;

  const keyMetrics = [
    {
      icon: Target,
      label: '전체 작업',
      value: summary.total,
      unit: '개',
      color: 'from-blue-500 to-blue-600',
      description: '분석된 총 작업 수'
    },
    {
      icon: Zap,
      label: '자동화 가능',
      value: summary.automate,
      unit: '개',
      color: 'from-green-500 to-green-600',
      description: '완전 자동화 가능 작업'
    },
    {
      icon: Brain,
      label: 'AI 협업',
      value: summary.copilot,
      unit: '개',
      color: 'from-yellow-500 to-yellow-600',
      description: 'AI로 보조 가능 작업'
    },
    {
      icon: TrendingUp,
      label: '예상 ROI',
      value: summary.estimatedROI,
      unit: '%',
      color: 'from-purple-500 to-purple-600',
      description: '투자 대비 회수율'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Main Header */}
      <div className="card bg-gradient-to-r from-primary-500/20 to-blue-500/20 border border-primary-500/30">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">
              분석 결과 인포그래픽
            </h2>
            <p className="text-gray-300">
              {result.jobRole || '분석된 직무'}의 자동화 잠재력을 한눈에 확인하세요
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {keyMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {metric.value}
                  <span className="text-2xl text-gray-400 ml-1">{metric.unit}</span>
                </div>
                <div className="text-sm font-medium text-gray-300 mb-1">{metric.label}</div>
                <div className="text-xs text-gray-500">{metric.description}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Wins Highlight */}
      {quickWins.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/30"
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Quick Wins 발견!</h3>
              <p className="text-gray-300 mb-4">
                높은 ROI와 낮은 구현 난이도를 가진 <strong className="text-green-400">{quickWins.length}개</strong>의 작업을 즉시 시작하세요.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {quickWins.slice(0, 4).map((task, idx) => (
                  <div key={idx} className="p-3 bg-dark-700/50 rounded-lg border border-green-500/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{task.title}</span>
                      <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                        ROI {task.roiEstimate}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>난이도: {task.difficulty}/5</span>
                      <span>점수: {task.score}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Automation Potential Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-bold text-white">완전 자동화</h3>
            </div>
            <div className="text-3xl font-bold text-green-500 mb-2">{summary.automate}</div>
            <div className="text-sm text-gray-400">{(summary.automate / summary.total * 100).toFixed(1)}%</div>
            <div className="mt-4 h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(summary.automate / summary.total) * 100}%` }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-bold text-white">AI 협업</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">{summary.copilot}</div>
            <div className="text-sm text-gray-400">{(summary.copilot / summary.total * 100).toFixed(1)}%</div>
            <div className="mt-4 h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(summary.copilot / summary.total) * 100}%` }}
                transition={{ duration: 1, delay: 0.9 }}
                className="h-full bg-yellow-500"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="card relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
          <div className="relative">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-bold text-white">인간 중심</h3>
            </div>
            <div className="text-3xl font-bold text-red-500 mb-2">{summary.humanCritical}</div>
            <div className="text-sm text-gray-400">{(summary.humanCritical / summary.total * 100).toFixed(1)}%</div>
            <div className="mt-4 h-2 bg-dark-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(summary.humanCritical / summary.total) * 100}%` }}
                transition={{ duration: 1, delay: 1 }}
                className="h-full bg-red-500"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-dark-700 rounded-lg">
          <div className="text-2xl font-bold text-primary-500 mb-1">{summary.averageScore}</div>
          <div className="text-sm text-gray-400">평균 점수</div>
        </div>
        <div className="text-center p-4 bg-dark-700 rounded-lg">
          <div className="text-2xl font-bold text-green-500 mb-1">{summary.automationPotential}%</div>
          <div className="text-sm text-gray-400">자동화 잠재력</div>
        </div>
        <div className="text-center p-4 bg-dark-700 rounded-lg">
          <div className="text-2xl font-bold text-purple-500 mb-1">{summary.estimatedROI}%</div>
          <div className="text-sm text-gray-400">예상 ROI</div>
        </div>
        <div className="text-center p-4 bg-dark-700 rounded-lg">
          <div className="text-2xl font-bold text-blue-500 mb-1">
            {quickWins.length}
          </div>
          <div className="text-sm text-gray-400">Quick Wins</div>
        </div>
      </div>
    </motion.div>
  );
}

