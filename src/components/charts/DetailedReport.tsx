'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnalysisResult, TaskItem } from '@/types';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Zap, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Gauge
} from 'lucide-react';

interface DetailedReportProps {
  result: AnalysisResult;
  selectedTasks?: TaskItem[];
}

const COLORS = {
  automate: '#10b981',
  copilot: '#3b82f6',
  humanCritical: '#f59e0b',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
};

export function DetailedReport({ result, selectedTasks = [] }: DetailedReportProps) {
  const { summary, tasks, metadata } = result;

  // Prepare data for charts
  const categoryData = [
    { name: 'Automate', value: summary.automate, color: COLORS.automate },
    { name: 'Co-pilot', value: summary.copilot, color: COLORS.copilot },
    { name: 'Human-Critical', value: summary.humanCritical, color: COLORS.humanCritical },
  ];

  const roiData = tasks
    .filter(t => t.category === 'Automate' || t.category === 'Co-pilot')
    .sort((a, b) => b.roiEstimate - a.roiEstimate)
    .slice(0, 10)
    .map(t => ({
      name: t.title.length > 20 ? t.title.substring(0, 20) + '...' : t.title,
      roi: t.roiEstimate,
      score: t.score,
    }));

  const difficultyData = [
    { level: '1', count: tasks.filter(t => t.difficulty === 1).length },
    { level: '2', count: tasks.filter(t => t.difficulty === 2).length },
    { level: '3', count: tasks.filter(t => t.difficulty === 3).length },
    { level: '4', count: tasks.filter(t => t.difficulty === 4).length },
    { level: '5', count: tasks.filter(t => t.difficulty === 5).length },
  ];

  const automationScore = calculateAutomationScore(tasks);
  const agentizationScore = calculateAgentizationScore(tasks);

  return (
    <div className="space-y-6">
      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Automation Score</p>
                <p className="text-3xl font-bold text-green-600">{automationScore}%</p>
              </div>
              <Zap className="h-12 w-12 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Agentization Score</p>
                <p className="text-3xl font-bold text-blue-600">{agentizationScore}%</p>
              </div>
              <Activity className="h-12 w-12 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average ROI</p>
                <p className="text-3xl font-bold text-purple-600">{summary.averageROI.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Task Distribution by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top 10 High ROI Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="roi" fill="#10b981" name="ROI %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Difficulty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              Implementation Difficulty Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="level" label={{ value: 'Difficulty Level', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Automation Score vs ROI */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Automation Score vs ROI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={roiData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" name="Automation Score" />
                <Line type="monotone" dataKey="roi" stroke="#10b981" name="ROI %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* High Impact Tasks Detail */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            High Impact Tasks - Detailed Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {summary.highImpactTasks.map((task, idx) => (
              <Card key={task.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{idx + 1}. {task.title}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">{task.category}</Badge>
                        <Badge variant="outline" className="text-green-600">
                          Score: {task.score}/100
                        </Badge>
                        <Badge variant="outline" className="text-blue-600">
                          ROI: {task.roiEstimate}%
                        </Badge>
                        <Badge variant="outline" className="text-purple-600">
                          Difficulty: {task.difficulty}/5
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Source Text:</p>
                      <p className="text-sm text-muted-foreground">{task.sourceText}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Evaluation Reasoning:</p>
                      <p className="text-sm text-muted-foreground">{task.reasoning}</p>
                    </div>
                  </div>

                  {(task.category === 'Automate' || task.category === 'Co-pilot') && (
                    <div className="border-t pt-4 mt-4">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        AI Agent Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Agent Type:</p>
                          <Badge variant="secondary">{getAgentType(task)}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Key Features:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Automated execution</li>
                            <li>• Error handling</li>
                            <li>• Real-time monitoring</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Expected Effects:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• {task.roiEstimate}% time savings</li>
                            <li>• Cost reduction</li>
                            <li>• Quality improvement</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        Risks:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {task.risks.map((risk, i) => (
                          <li key={i}>• {risk}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        Safeguards:
                      </p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {task.safeguards.map((safeguard, i) => (
                          <li key={i}>• {safeguard}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Estimated Implementation Time: {task.estimatedTime}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">{summary.automate}</p>
              <p className="text-sm text-muted-foreground">Automation Tasks</p>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <Activity className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{summary.copilot}</p>
              <p className="text-sm text-muted-foreground">AI Co-pilot Tasks</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
              <p className="text-2xl font-bold">{summary.humanCritical}</p>
              <p className="text-sm text-muted-foreground">Human-Critical</p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold">{summary.total}</p>
              <p className="text-sm text-muted-foreground">Total Tasks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function calculateAutomationScore(tasks: TaskItem[]): number {
  const totalScore = tasks.reduce((sum, task) => sum + task.score, 0);
  return Math.round(totalScore / tasks.length);
}

function calculateAgentizationScore(tasks: TaskItem[]): number {
  const agentizableTasks = tasks.filter(t => t.category === 'Automate' || t.category === 'Co-pilot');
  return Math.round((agentizableTasks.length / tasks.length) * 100);
}

function getAgentType(task: TaskItem): string {
  const title = task.title.toLowerCase();
  
  if (title.includes('data') || title.includes('process') || title.includes('extract')) {
    return 'Data Processing Agent';
  }
  if (title.includes('customer') || title.includes('support') || title.includes('inquiry')) {
    return 'Customer Service Agent';
  }
  if (title.includes('content') || title.includes('write') || title.includes('generate')) {
    return 'Content Generation Agent';
  }
  if (title.includes('analysis') || title.includes('analyze') || title.includes('report')) {
    return 'Analysis Agent';
  }
  if (title.includes('monitor') || title.includes('track') || title.includes('alert')) {
    return 'Monitoring Agent';
  }
  
  return 'Workflow Automation Agent';
}
