'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { Calendar, Clock, Rocket, CheckCircle } from 'lucide-react';

interface TimelineChartProps {
  result: AnalysisResult;
}

export function TimelineChart({ result }: TimelineChartProps) {
  const { tasks } = result;
  
  // 단계별 일정 생성 (간단한 예시)
  const phases = [
    { 
      name: 'Phase 1: 기초 인프라', 
      duration: '2-4주', 
      tasks: Math.min(tasks.filter(t => t.category === 'Automate').length, 3),
      color: 'bg-blue-500',
      icon: Calendar,
      description: 'AI 에이전트 개발 환경 구축'
    },
    { 
      name: 'Phase 2: 핵심 기능', 
      duration: '4-6주', 
      tasks: Math.min(tasks.filter(t => t.category === 'Automate').length, 5),
      color: 'bg-green-500',
      icon: Rocket,
      description: '자동화 가능 업무 에이전트 개발'
    },
    { 
      name: 'Phase 3: AI 협업', 
      duration: '3-5주', 
      tasks: tasks.filter(t => t.category === 'AI-Copilot').length,
      color: 'bg-yellow-500',
      icon: CheckCircle,
      description: 'AI 협업 기능 구현'
    },
    { 
      name: 'Phase 4: 최적화', 
      duration: '2-3주', 
      tasks: Math.min(tasks.length, 3),
      color: 'bg-purple-500',
      icon: Clock,
      description: '테스트 및 성능 최적화'
    },
  ];

  const totalWeeks = 13; // 2+4+6+3 = 13 weeks approximate
  const currentPhase = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <span>구현 타임라인</span>
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        예상 구현 일정과 단계별 작업을 확인하세요.
      </p>

      {/* Timeline */}
      <div className="space-y-6">
        {phases.map((phase, index) => {
          const IconComponent = phase.icon;
          const isCompleted = index < currentPhase;
          const isCurrent = index === currentPhase;
          
          return (
            <div key={index} className="relative">
              {/* Timeline Line */}
              {index < phases.length - 1 && (
                <div className="absolute left-6 top-16 h-full w-0.5 bg-dark-700" />
              )}
              
              {/* Phase Card */}
              <div className="relative flex items-start space-x-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: 'spring' }}
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${phase.color} ${
                    isCompleted ? 'ring-4 ring-green-500/20' : isCurrent ? 'ring-4 ring-primary-500/20 animate-pulse' : ''
                  }`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1 bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white">{phase.name}</h4>
                    <span className="text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full border border-primary-500/30">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{phase.description}</p>
                  
                  {/* Tasks Count */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      <span className="text-sm text-gray-300">작업: {phase.tasks}개</span>
                    </div>
                    {isCompleted && (
                      <span className="text-xs text-green-400 flex items-center space-x-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>완료</span>
                      </span>
                    )}
                    {isCurrent && (
                      <span className="text-xs text-primary-400 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                        <span>진행중</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-lg border border-primary-500/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">총 예상 기간</p>
            <p className="text-2xl font-bold text-white">{totalWeeks}주 (약 3개월)</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-1">전체 작업</p>
            <p className="text-2xl font-bold text-primary-500">{tasks.length}개</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">전체 진행률</span>
          <span className="text-sm font-bold text-primary-500">{Math.round((currentPhase / phases.length) * 100)}%</span>
        </div>
        <div className="w-full bg-dark-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentPhase / phases.length) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-3 bg-gradient-to-r from-primary-500 to-blue-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}

