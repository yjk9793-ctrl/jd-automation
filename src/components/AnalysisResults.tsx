'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Target, 
  Clock, 
  DollarSign,
  Zap,
  Brain,
  Users,
  CheckCircle,
  AlertCircle,
  Download,
  Mail,
  ArrowRight,
  Star,
  Award,
  Lightbulb,
  Rocket
} from 'lucide-react';
import { AnalysisResult, TaskItem } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface AnalysisResultsProps {
  result: AnalysisResult;
  language: 'ko' | 'en';
}

export function AnalysisResults({ result, language }: AnalysisResultsProps) {
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations'>('overview');
  const t = useTranslation(language);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate': return 'text-green-500 bg-green-500/20';
      case 'AI-Copilot': return 'text-yellow-500 bg-yellow-500/20';
      case 'Human-Critical': return 'text-red-500 bg-red-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Automate': return Zap;
      case 'AI-Copilot': return Brain;
      case 'Human-Critical': return Users;
      default: return Target;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-500';
    if (difficulty <= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Award className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold mb-4 gradient-text">
          분석 결과 리포트
        </h2>
        <p className="text-xl text-gray-300">
          {result.type === 'enterprise' ? '기업 직무 분석' : '개인 역량 분석'} 완료
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="card-hover text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-blue-500 mb-2">{result.summary.total}</div>
          <div className="text-gray-400">총 분석 작업</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card-hover text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-green-500 mb-2">{result.summary.automate}</div>
          <div className="text-gray-400">완전 자동화 가능</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card-hover text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-yellow-500 mb-2">{result.summary.copilot}</div>
          <div className="text-gray-400">AI 협업 가능</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card-hover text-center"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-purple-500 mb-2">{result.summary.automationPotential}%</div>
          <div className="text-gray-400">자동화 잠재력</div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg mb-8">
        {[
          { id: 'overview', label: '개요', icon: BarChart3 },
          { id: 'detailed', label: '상세 분석', icon: PieChart },
          { id: 'recommendations', label: '권장사항', icon: Lightbulb },
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Chart Placeholder */}
          <div className="lg:col-span-2">
            <div className="card">
              <h3 className="text-xl font-semibold mb-6">자동화 가능성 분포</h3>
              <div className="h-64 bg-dark-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">차트 영역</p>
                  <p className="text-sm text-gray-500">실제 구현 시 Recharts 라이브러리 사용</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">핵심 지표</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">평균 점수</span>
                  <span className="font-semibold text-primary-500">{result.summary.averageScore}/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">예상 ROI</span>
                  <span className="font-semibold text-green-500">{result.summary.estimatedROI}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">자동화 잠재력</span>
                  <span className="font-semibold text-purple-500">{result.summary.automationPotential}%</span>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">다음 단계</h3>
              <div className="space-y-3">
                {result.nextSteps.slice(0, 3).map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-white">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'detailed' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {result.tasks.map((task, index) => {
            const IconComponent = getCategoryIcon(task.category);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover cursor-pointer"
                onClick={() => setSelectedTask(task)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(task.category)}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                      <p className="text-gray-400 mb-4">{task.sourceText}</p>
                      <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">점수: </span>
                          <span className="font-semibold text-primary-500">{task.score}/100</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">ROI: </span>
                          <span className="font-semibold text-green-500">{task.roiEstimate}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">소요시간: </span>
                          <span className="font-semibold text-blue-500">{task.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-400">난이도: </span>
                          <span className={`font-semibold ${getDifficultyColor(task.difficulty)}`}>
                            {task.difficulty}/5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {activeTab === 'recommendations' && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="card">
            <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <span>권장사항</span>
            </h3>
            <div className="space-y-4">
              {result.recommendations.map((recommendation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-dark-700 rounded-lg"
                >
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-300">{recommendation}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
              <Rocket className="w-6 h-6 text-green-500" />
              <span>실행 계획</span>
            </h3>
            <div className="space-y-4">
              {result.nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-4 bg-dark-700 rounded-lg"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>PDF 다운로드</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span>이메일 재발송</span>
        </button>
      </div>
    </motion.div>
  );
}
