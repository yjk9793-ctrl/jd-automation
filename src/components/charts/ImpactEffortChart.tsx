'use client';

import { useState } from 'react';
import { Cell, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { Zap, Clock, Target, TrendingUp } from 'lucide-react';

interface ImpactEffortChartProps {
  result: AnalysisResult;
}

export function ImpactEffortChart({ result }: ImpactEffortChartProps) {
  const { tasks } = result;

  const quadrants = [
    { name: 'Quick Wins', color: '#10b981', icon: Zap },
    { name: 'Major Projects', color: '#3b82f6', icon: Target },
    { name: 'Fill-Ins', color: '#f59e0b', icon: Clock },
    { name: 'Thankless Tasks', color: '#6b7280', icon: TrendingUp },
  ];

  // Impact vs Effort 계산
  const data = tasks.map(task => ({
    name: task.title,
    impact: task.roiEstimate, // ROI가 Impact
    effort: (6 - task.difficulty) * 20, // 난이도 낮을수록 effort 낮음 (역순)
    score: task.score,
    category: task.category,
    roi: task.roiEstimate,
  }));

  const getQuadrant = (impact: number, effort: number) => {
    if (impact >= 50 && effort >= 50) return 'Quick Wins';
    if (impact >= 50 && effort < 50) return 'Major Projects';
    if (impact < 50 && effort >= 50) return 'Fill-Ins';
    return 'Thankless Tasks';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate': return '#10b981';
      case 'AI-Copilot': return '#f59e0b';
      case 'Human-Critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-dark-800 border border-primary-500/50 rounded-lg p-4 shadow-xl">
          <p className="text-white font-bold mb-2">{data.name}</p>
          <p className="text-sm text-gray-300">영향도: {data.impact}%</p>
          <p className="text-sm text-gray-300">노력도: {data.effort}%</p>
          <p className="text-sm text-primary-500">점수: {data.score}/100</p>
          <p className="text-sm text-green-500">ROI: {data.roi}%</p>
        </div>
      );
    }
    return null;
  };

  // Quadrant별 통계
  const quadrantStats = quadrants.map(quad => {
    const tasksInQuad = data.filter(item => 
      getQuadrant(item.impact, item.effort) === quad.name
    );
    return {
      ...quad,
      count: tasksInQuad.length,
      avgROI: tasksInQuad.length > 0
        ? Math.round(tasksInQuad.reduce((sum, t) => sum + t.roi, 0) / tasksInQuad.length)
        : 0,
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="card"
    >
      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span>영향도 vs 노력도 매트릭스</span>
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        각 작업의 비즈니스 영향도와 구현 노력도를 비교하여 우선순위를 결정하세요.
      </p>
      
      {/* Scatter Chart */}
      <div className="h-96 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              type="number" 
              dataKey="effort" 
              name="노력도" 
              unit="%" 
              domain={[0, 100]}
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <YAxis 
              type="number" 
              dataKey="impact" 
              name="영향도" 
              unit="%" 
              domain={[0, 100]}
              tick={{ fill: '#9ca3af' }}
              axisLine={{ stroke: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              x={50} 
              stroke="#6b7280" 
              strokeDasharray="5 5" 
              label={{ value: "평균 노력도", position: "top", fill: "#9ca3af" }}
            />
            <ReferenceLine 
              y={50} 
              stroke="#6b7280" 
              strokeDasharray="5 5" 
              label={{ value: "평균 영향도", position: "right", fill: "#9ca3af" }}
            />
            {['Automate', 'AI-Copilot', 'Human-Critical'].map(category => (
              <Scatter
                key={category}
                name={category === 'Automate' ? '자동화' : category === 'AI-Copilot' ? 'AI 협업' : '인간 중심'}
                data={data.filter(item => item.category === category)}
                fill={getCategoryColor(category)}
              />
            ))}
            <Legend formatter={(value) => <span style={{ color: '#e5e7eb' }}>{value}</span>} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Quadrant Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quadrantStats.map((quad, idx) => {
          const IconComponent = quad.icon;
          return (
            <div
              key={idx}
              className="relative bg-dark-700 rounded-lg p-4 border-2 transition-all hover:border-primary-500/50"
              style={{ borderColor: `${quad.color}40` }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <IconComponent className="w-5 h-5" style={{ color: quad.color }} />
                <h4 className="font-semibold text-white text-sm">{quad.name}</h4>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold" style={{ color: quad.color }}>
                  {quad.count}개
                </p>
                <p className="text-xs text-gray-400">평균 ROI: {quad.avgROI}%</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quadrant Descriptions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary-500/10 to-blue-500/10 rounded-lg border border-primary-500/30">
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-bold text-white">Quick Wins:</span> 높은 영향도, 낮은 노력도 - 즉시 시작하세요!
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-bold text-white">Major Projects:</span> 높은 영향도, 높은 노력도 - 장기 프로젝트로 계획하세요
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-bold text-white">Fill-Ins:</span> 낮은 영향도, 높은 노력도 - 여유 있을 때 처리
        </p>
        <p className="text-sm text-gray-300">
          <span className="font-bold text-white">Thankless Tasks:</span> 낮은 영향도, 낮은 노력도 - 필요 시 수행
        </p>
      </div>
    </motion.div>
  );
}

