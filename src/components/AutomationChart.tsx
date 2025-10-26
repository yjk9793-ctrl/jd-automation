'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AnalysisResult } from '@/types';

interface AutomationChartProps {
  result: AnalysisResult;
}

const COLORS = {
  automate: '#10b981',      // green-500
  copilot: '#f59e0b',       // yellow-500
  humanCritical: '#ef4444', // red-500
};

export function AutomationChart({ result }: AutomationChartProps) {
  const { summary } = result;

  // Pie Chart Data
  const pieData = [
    { 
      name: '완전 자동화', 
      value: summary.automate, 
      color: COLORS.automate,
      percentage: Math.round((summary.automate / summary.total) * 100)
    },
    { 
      name: 'AI 협업', 
      value: summary.copilot, 
      color: COLORS.copilot,
      percentage: Math.round((summary.copilot / summary.total) * 100)
    },
    { 
      name: '인간 중심', 
      value: summary.humanCritical, 
      color: COLORS.humanCritical,
      percentage: Math.round((summary.humanCritical / summary.total) * 100)
    },
  ];

  // Bar Chart Data
  const barData = [
    {
      category: '완전 자동화',
      count: summary.automate,
      percentage: Math.round((summary.automate / summary.total) * 100),
      color: COLORS.automate,
    },
    {
      category: 'AI 협업',
      count: summary.copilot,
      percentage: Math.round((summary.copilot / summary.total) * 100),
      color: COLORS.copilot,
    },
    {
      category: '인간 중심',
      count: summary.humanCritical,
      percentage: Math.round((summary.humanCritical / summary.total) * 100),
      color: COLORS.humanCritical,
    },
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-dark-800 border border-dark-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.name}</p>
          <p className="text-gray-300">
            <span className="font-semibold">{data.value}개</span> ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Label for Pie Chart
  const renderLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  return (
    <div className="space-y-6">
      {/* Pie Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">자동화 분포 (원형 차트)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: '#e5e7eb' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">자동화 분포 (막대 차트)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#e5e7eb' }}
                axisLine={{ stroke: '#6b7280' }}
              />
              <YAxis 
                tick={{ fill: '#e5e7eb' }}
                axisLine={{ stroke: '#6b7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="count" 
                fill={(entry) => entry.color}
                radius={[4, 4, 0, 0]}
              >
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">자동화 가능성 진행률</h3>
        <div className="space-y-4">
          {pieData.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">{item.name}</span>
                <span className="text-sm font-semibold" style={{ color: item.color }}>
                  {item.value}개 ({item.percentage}%)
                </span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">요약 통계</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-dark-700 rounded-lg">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {summary.automationPotential}%
            </div>
            <div className="text-sm text-gray-400">자동화 잠재력</div>
          </div>
          <div className="text-center p-4 bg-dark-700 rounded-lg">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {summary.averageScore}
            </div>
            <div className="text-sm text-gray-400">평균 점수</div>
          </div>
          <div className="text-center p-4 bg-dark-700 rounded-lg">
            <div className="text-2xl font-bold text-purple-500 mb-1">
              {summary.estimatedROI}%
            </div>
            <div className="text-sm text-gray-400">예상 ROI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
