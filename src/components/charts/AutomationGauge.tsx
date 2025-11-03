'use client';

import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { Zap, TrendingUp, Target } from 'lucide-react';

interface AutomationGaugeProps {
  result: AnalysisResult;
}

export function AutomationGauge({ result }: AutomationGaugeProps) {
  const { summary } = result;
  
  const automationPotential = summary.automationPotential;
  const scoreColor = 
    automationPotential >= 70 ? 'text-green-500' :
    automationPotential >= 50 ? 'text-yellow-500' : 'text-red-500';
  
  const bgColor = 
    automationPotential >= 70 ? 'from-green-500 to-emerald-500' :
    automationPotential >= 50 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-orange-500';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="card relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-10`} />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">자동화 잠재력</h3>
              <p className="text-sm text-gray-400">전체적인 자동화 가능성 평가</p>
            </div>
          </div>
        </div>

        {/* Circular Progress with Donut */}
        <div className="flex justify-center items-center relative py-12">
          {/* Large Circular Progress */}
          <div className="relative" style={{ width: '240px', height: '240px' }}>
            {/* Outer Circle Background */}
            <svg className="absolute inset-0 transform -rotate-90" width="240" height="240">
              <circle
                cx="120"
                cy="120"
                r="105"
                fill="none"
                stroke="#1f2937"
                strokeWidth="24"
                strokeLinecap="round"
              />
              {/* Progress Circle */}
              <circle
                cx="120"
                cy="120"
                r="105"
                fill="none"
                stroke={`url(#gradient-${automationPotential})`}
                strokeWidth="24"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 105}`}
                strokeDashoffset={`${2 * Math.PI * 105 * (1 - automationPotential / 100)}`}
                className="transition-all duration-1500 ease-out"
              />
              {/* Gradient Definition */}
              <defs>
                <linearGradient id={`gradient-${automationPotential}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-7xl font-bold ${scoreColor} mb-2 leading-none`}>
                {automationPotential}
              </div>
              <div className="text-xl text-gray-400 mb-1">%</div>
              <div className="text-sm text-gray-500">자동화 가능</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 bg-dark-700/50 rounded-lg backdrop-blur-sm border border-dark-600 hover:border-primary-500/50 transition-colors">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-white">{summary.automate}</div>
            <div className="text-xs text-gray-400">완전 자동화</div>
          </div>
          
          <div className="text-center p-4 bg-dark-700/50 rounded-lg backdrop-blur-sm border border-dark-600 hover:border-primary-500/50 transition-colors">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-white">{summary.copilot}</div>
            <div className="text-xs text-gray-400">AI 협업</div>
          </div>
          
          <div className="text-center p-4 bg-dark-700/50 rounded-lg backdrop-blur-sm border border-dark-600 hover:border-primary-500/50 transition-colors">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-white">{summary.averageScore}</div>
            <div className="text-xs text-gray-400">평균 점수</div>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="mt-6 p-4 bg-dark-700/50 rounded-lg backdrop-blur-sm border border-dark-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white mb-1">전체 작업 수</p>
              <p className="text-2xl font-bold text-primary-500">{summary.total}개</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">예상 ROI</p>
              <p className="text-2xl font-bold text-green-500">{summary.estimatedROI}%</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-6 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`px-4 py-2 rounded-full ${scoreColor} bg-opacity-20 border border-current`}
          >
            <span className="text-sm font-semibold">
              {automationPotential >= 70 ? '💡 높은 자동화 가능성' :
               automationPotential >= 50 ? '⚡ 적절한 자동화 가능성' : '⚠️ 자동화 검토 필요'}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

