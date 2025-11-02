'use client';

import { useState } from 'react';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';

interface RadarChartProps {
  result: AnalysisResult;
}

export function RadarChart({ result }: RadarChartProps) {
  const { tasks } = result;
  
  // 카테고리별 통계 계산
  const categories = ['Automate', 'AI-Copilot', 'Human-Critical'];
  const data = categories.map(category => {
    const categoryTasks = tasks.filter(t => t.category === category);
    const avgScore = categoryTasks.length > 0 
      ? Math.round(categoryTasks.reduce((sum, t) => sum + t.score, 0) / categoryTasks.length)
      : 0;
    const avgROI = categoryTasks.length > 0
      ? Math.round(categoryTasks.reduce((sum, t) => sum + t.roiEstimate, 0) / categoryTasks.length)
      : 0;
    const avgDifficulty = categoryTasks.length > 0
      ? Math.round(categoryTasks.reduce((sum, t) => sum + t.difficulty, 0) / categoryTasks.length)
      : 0;
    
    return {
      category: category === 'Automate' ? '자동화' : category === 'AI-Copilot' ? 'AI 협업' : '인간 중심',
      automationScore: avgScore,
      roi: Math.min(100, avgROI / 5), // 스케일 조정
      difficulty: avgDifficulty * 20, // 5점 만점을 100점으로
      potential: categoryTasks.length,
      timeSavings: avgScore * 0.8,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-800 border border-primary-500/50 rounded-lg p-4 shadow-xl">
          <p className="text-white font-bold mb-2">{label}</p>
          {payload.map((entry: any, idx: number) => (
            <p key={idx} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toFixed(0)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold">📊</span>
        </div>
        <span>다차원 역량 분석 (레이더 차트)</span>
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        카테고리별 자동화 점수, ROI, 난이도 등을 한눈에 비교할 수 있습니다.
      </p>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: '#e5e7eb', fontSize: 12, fontWeight: 600 }}
            />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => (
                <span style={{ color: '#e5e7eb' }}>{value}</span>
              )}
            />
            <Radar
              name="자동화 점수"
              dataKey="automationScore"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />
            <Radar
              name="ROI"
              dataKey="roi"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.4}
            />
            <Radar
              name="난이도"
              dataKey="difficulty"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.3}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="text-center p-3 bg-dark-700 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">{item.category}</div>
            <div className="text-2xl font-bold text-primary-500">{item.potential}개</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

