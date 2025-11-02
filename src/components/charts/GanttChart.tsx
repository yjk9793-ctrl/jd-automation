'use client';

import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

interface GanttChartProps {
  result: AnalysisResult;
}

export function GanttChart({ result }: GanttChartProps) {
  const { tasks } = result;

  // 간단한 간트 차트 데이터 생성
  const ganttData = tasks.slice(0, 6).map((task, index) => ({
    id: task.id,
    name: task.title.length > 30 ? task.title.substring(0, 30) + '...' : task.title,
    start: index * 2,
    duration: task.difficulty + 1,
    category: task.category,
    progress: 0, // 아직 시작하지 않음
  }));

  const maxDuration = Math.max(...ganttData.map(d => d.start + d.duration));

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate': return 'bg-green-500';
      case 'AI-Copilot': return 'bg-yellow-500';
      case 'Human-Critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <span>프로젝트 간트 차트</span>
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        에이전트별 예상 구현 일정을 한눈에 확인하세요.
      </p>

      {/* Gantt Chart */}
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center space-x-4 px-4 py-2 bg-dark-700 rounded-lg">
          <div className="w-48 text-sm font-semibold text-gray-300">작업</div>
          <div className="flex-1">
            <div className="grid grid-cols-12 gap-2 text-xs text-gray-400 text-center">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i}>{i + 1}주</div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks */}
        {ganttData.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-4 px-4 py-3 bg-dark-700/50 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <div className="w-48">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(task.category)}`} />
                <span className="text-sm text-gray-200">{task.name}</span>
              </div>
            </div>
            <div className="flex-1 relative">
              {/* Timeline Grid */}
              <div className="grid grid-cols-12 gap-2">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="h-8 bg-dark-800 border border-dark-700 rounded" />
                ))}
              </div>
              {/* Task Bar */}
              <div className="absolute inset-0 grid grid-cols-12 gap-2">
                <div
                  className={`${getCategoryColor(task.category)} opacity-70 rounded h-8 flex items-center justify-center text-white text-xs font-medium`}
                  style={{
                    gridColumn: `${task.start + 1} / span ${task.duration}`,
                  }}
                >
                  {task.duration}주
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-green-500" />
          <span className="text-sm text-gray-300">완전 자동화</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500" />
          <span className="text-sm text-gray-300">AI 협업</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-red-500" />
          <span className="text-sm text-gray-300">인간 중심</span>
        </div>
      </div>
    </motion.div>
  );
}

