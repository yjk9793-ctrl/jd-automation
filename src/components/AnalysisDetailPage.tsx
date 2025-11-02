'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
  Rocket,
  ArrowLeft,
  Share2,
  FileText,
  Calendar,
  Building2,
  User,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Copy,
  Eye,
  Settings,
  Filter,
  Search,
  Home,
  Menu,
  X,
  Globe,
  Phone,
  Code,
  FileCode,
  Wrench
} from 'lucide-react';
import { AnalysisResult, TaskItem, Language } from '@/types';
import { useTranslation } from '@/lib/i18n';
import { AutomationChart } from './AutomationChart';
import { ShareModal } from './ShareModal';
import { usePDFGenerator } from '@/hooks/usePDFGenerator';
import { AuthModal } from './auth/AuthModal';
import { AgentDevelopmentModal } from './AgentDevelopmentModal';

interface AnalysisDetailPageProps {
  result: AnalysisResult;
  language: Language;
  onBack: () => void;
}

export function AnalysisDetailPage({ result, language, onBack }: AnalysisDetailPageProps) {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'detailed' | 'recommendations' | 'implementation'>('overview');
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'roi' | 'difficulty' | 'time'>('score');
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [selectedDevTask, setSelectedDevTask] = useState<TaskItem | null>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; name?: string } | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  
  const { generatePDF, isGenerating, error } = usePDFGenerator({ result });
  const t = useTranslation(currentLanguage);

  // 사용자 정보 확인
  useEffect(() => {
    const checkUser = async () => {
      try {
        const cachedUser = localStorage.getItem('jdx_user');
        if (cachedUser) {
          try {
            const userData = JSON.parse(cachedUser);
            setCurrentUser(userData);
          } catch (e) {
            console.error('Failed to parse cached user:', e);
          }
        }

        const res = await fetch('/api/auth/me', { 
          credentials: 'include',
          cache: 'no-store' 
        });
        const json = await res.json();
        
        if (json.authenticated && json.user) {
          setCurrentUser(json.user);
          localStorage.setItem('jdx_user', JSON.stringify(json.user));
        }
      } catch (e) {
        console.error('User check error:', e);
      }
    };

    checkUser();
    
    // 주기적으로 사용자 상태 확인
    const intervalId = setInterval(() => {
      checkUser();
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    localStorage.removeItem('jdx_user');
    router.push('/');
  };

  const handleAuthSuccess = async (user: { id: string; email: string; name?: string }) => {
    setCurrentUser(user);
    localStorage.setItem('jdx_user', JSON.stringify(user));
  };

  const scrollToSection = (sectionId: string) => {
    router.push(`/#${sectionId}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automate': return 'text-green-500 bg-green-500/20 border-green-500/30';
      case 'AI-Copilot': return 'text-yellow-500 bg-yellow-500/20 border-yellow-500/30';
      case 'Human-Critical': return 'text-red-500 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-500 bg-gray-500/20 border-gray-500/30';
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

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  const filteredTasks = result.tasks.filter(task => 
    filterCategory === 'all' || task.category === filterCategory
  ).sort((a, b) => {
    switch (sortBy) {
      case 'score': return b.score - a.score;
      case 'roi': return b.roiEstimate - a.roiEstimate;
      case 'difficulty': return a.difficulty - b.difficulty;
      case 'time': return a.estimatedTime.localeCompare(b.estimatedTime);
      default: return 0;
    }
  });

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Toast notification could be added here
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => window.location.href = '/'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">JDX</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => window.location.href = '/'}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => window.location.href = '/#analysis'}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.enterprise}
              </button>
              <button
                onClick={() => window.location.href = '/#analysis'}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.personal}
              </button>
              <button
                onClick={() => window.location.href = '/#process'}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => window.location.href = '/#consulting'}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.consulting}
              </button>
              <button
                onClick={() => window.location.href = '/#contact'}
                className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-dark-800 rounded-lg p-1">
                <button
                  onClick={() => setCurrentLanguage('ko')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                    currentLanguage === 'ko' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => setCurrentLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                    currentLanguage === 'en' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Auth */}
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <a 
                    href="/mypage" 
                    className="text-sm text-gray-300 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded-md hover:bg-dark-700"
                  >
                    마이페이지
                  </a>
                  <button onClick={handleLogout} className="px-3 py-1 rounded-md bg-dark-700 hover:bg-dark-600 text-gray-200">로그아웃</button>
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="px-3 py-1 rounded-md bg-primary-600 text-white">로그인</button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-t border-dark-700"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => window.location.href = '/'}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => window.location.href = '/#analysis'}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.enterprise}
              </button>
              <button
                onClick={() => window.location.href = '/#analysis'}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.personal}
              </button>
              <button
                onClick={() => window.location.href = '/#process'}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.process}
              </button>
              <button
                onClick={() => window.location.href = '/#consulting'}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.consulting}
              </button>
              <button
                onClick={() => window.location.href = '/#contact'}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Page Header */}
      <div className="sticky top-16 z-40 glass-effect border-b border-dark-700">
        <div className="container-custom px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>뒤로가기</span>
              </button>
              <div className="h-6 w-px bg-dark-600" />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">분석 결과 상세</h1>
                  <p className="text-sm text-gray-400">
                    {result.type === 'enterprise' ? '기업 직무 분석' : '개인 역량 분석'} • {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                className="btn-secondary flex items-center space-x-2"
                onClick={() => setShowShareModal(true)}
              >
                <Share2 className="w-4 h-4" />
                <span>공유</span>
              </button>
              <button 
                className="btn-primary flex items-center space-x-2"
                onClick={generatePDF}
                disabled={isGenerating}
              >
                <Download className="w-4 h-4" />
                <span>{isGenerating ? '생성 중...' : 'PDF 다운로드'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 py-8 pt-24">
        {/* AI Summary Section */}
        {/* AI Summary Display */}
        {result.aiSummary && result.aiSummary.trim() !== '' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="card bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <h3 className="text-lg font-semibold text-white">Summary Report</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-white/10 text-white rounded-full">
                      AI에이전트로 생산성을 높이세요
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap break-words">
                    {result.aiSummary}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs - 상단으로 이동하여 더 눈에 띄게 */}
        <div className="sticky top-24 z-30 mb-8 bg-dark-900/95 backdrop-blur-sm py-4 -mx-4 px-4 rounded-xl border-y border-dark-700">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-primary-400" />
                <span>분석 섹션 탐색</span>
              </h3>
              <span className="text-xs text-gray-400 px-3 py-1 bg-dark-800 rounded-full border border-dark-700">
                {activeTab === 'overview' ? '📊 개요' : activeTab === 'detailed' ? '🔍 상세 분석' : activeTab === 'recommendations' ? '💡 권장사항' : '🚀 구현 계획'}
              </span>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[
                { id: 'overview', label: '개요', icon: BarChart3, description: '전체 요약 및 차트' },
                { id: 'detailed', label: '상세 분석', icon: PieChart, description: '에이전트별 상세 정보' },
                { id: 'recommendations', label: '권장사항', icon: Lightbulb, description: 'AI 최적화 가이드' },
                { id: 'implementation', label: '구현 계획', icon: Rocket, description: '단계별 실행 로드맵' },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex flex-col items-start space-y-1 px-4 py-3 rounded-lg transition-all duration-300 min-w-[120px] border-2 ${
                      activeTab === tab.id
                        ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                        : 'bg-dark-800 border-dark-700 text-gray-400 hover:bg-dark-700 hover:border-primary-500/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="font-semibold">{tab.label}</span>
                    </div>
                    <span className="text-xs opacity-80">{tab.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="card-hover text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-500 mb-2">{result.summary.total}</div>
            <div className="text-gray-400">총 분석 작업</div>
          </div>

          <div className="card-hover text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-500 mb-2">{result.summary.automate}</div>
            <div className="text-gray-400">완전 자동화 가능</div>
          </div>

          <div className="card-hover text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">{result.summary.copilot}</div>
            <div className="text-gray-400">AI 협업 가능</div>
          </div>

          <div className="card-hover text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-purple-500 mb-2">{result.summary.automationPotential}%</div>
            <div className="text-gray-400">자동화 잠재력</div>
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Chart Area */}
            <div className="lg:col-span-2">
              <AutomationChart result={result} />
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
                <h3 className="text-lg font-semibold mb-4">분석 정보</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-300">
                      {new Date(result.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {result.type === 'enterprise' ? (
                      <Building2 className="w-4 h-4 text-gray-500" />
                    ) : (
                      <User className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm text-gray-300">
                      {result.type === 'enterprise' ? '기업 분석' : '개인 분석'}
                    </span>
                  </div>
                  {result.jobRole && (
                    <div className="flex items-center space-x-3">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-300">{result.jobRole}</span>
                    </div>
                  )}
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
            {/* Header Section */}
            <div className="card bg-gradient-to-r from-primary-500/10 to-blue-500/10 border border-primary-500/30">
              <div className="flex items-center space-x-3 mb-2">
                <Brain className="w-6 h-6 text-primary-500" />
                <h2 className="text-2xl font-bold">AI 에이전트 개발 가능 항목</h2>
              </div>
              <p className="text-gray-400 text-sm">
                {result.jobRole || '분석된 직무'}에서 자동화 및 AI 협업이 가능한 업무 항목입니다. 각 항목을 클릭하면 상세 정보를 확인할 수 있습니다.
              </p>
            </div>

            {/* Filters and Sorting */}
            <div className="card">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">필터:</span>
                  </div>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-md text-sm"
                  >
                    <option value="all">전체</option>
                    <option value="Automate">완전 자동화</option>
                    <option value="AI-Copilot">AI 협업</option>
                    <option value="Human-Critical">인간 중심</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">정렬:</span>
                  </div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-md text-sm"
                  >
                    <option value="score">점수순</option>
                    <option value="roi">ROI순</option>
                    <option value="difficulty">난이도순</option>
                    <option value="time">소요시간순</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Agent List - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTasks.map((task, index) => {
                const IconComponent = getCategoryIcon(task.category);
                const isExpanded = expandedTasks.has(task.id);
                const priorityBadge = task.priority === 'high' ? '높음' : task.priority === 'medium' ? '중간' : '낮음';
                const priorityColor = task.priority === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 
                                     task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 
                                     'bg-gray-500/20 text-gray-400 border-gray-500/30';
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`card-hover cursor-pointer ${isExpanded ? 'md:col-span-2' : ''}`}
                    onClick={() => toggleTaskExpansion(task.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center border-2 ${getCategoryColor(task.category)}`}>
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2 flex-wrap">
                            <h3 className="text-lg font-bold text-white">
                              <span className="text-primary-400">Agent </span>
                              {task.title}
                            </h3>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
                              {task.category === 'Automate' ? '완전 자동화' : task.category === 'AI-Copilot' ? 'AI 협업' : '인간 중심'}
                            </span>
                            {task.priority && (
                              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityColor}`}>
                                우선순위: {priorityBadge}
                              </span>
                            )}
                          </div>
                          {/* 에이전트 역할과 기대 효과 설명 - 항상 표시 */}
                          {(() => {
                            let description = '';
                            
                            // 1순위: shortDescription
                            if (task.shortDescription) {
                              description = task.shortDescription;
                            }
                            // 2순위: expectedEffects 첫 번째 항목
                            else if (task.expectedEffects && task.expectedEffects.length > 0) {
                              description = task.expectedEffects[0];
                            }
                            // 3순위: reasoning의 앞부분
                            else if (task.reasoning) {
                              description = task.reasoning;
                            }
                            // 4순위: sourceText
                            else {
                              description = task.sourceText;
                            }
                            
                            // 100자로 제한
                            const truncatedDescription = description.length > 100 
                              ? description.substring(0, 100) + '...' 
                              : description;
                            
                            return (
                              <p className="text-gray-300 mb-3 text-sm leading-relaxed bg-dark-700/50 rounded-lg p-3 border-l-2 border-primary-500/50">
                                {truncatedDescription}
                              </p>
                            );
                          })()}
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            <div className="flex items-center space-x-1.5">
                              <Target className="w-3.5 h-3.5 text-primary-400" />
                              <span className="text-gray-400">점수</span>
                              <span className="font-bold text-primary-400">{task.score}/100</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <DollarSign className="w-3.5 h-3.5 text-green-400" />
                              <span className="text-gray-400">ROI</span>
                              <span className="font-bold text-green-400">{task.roiEstimate}%</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <Clock className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-gray-400">기간</span>
                              <span className="font-semibold text-blue-400">{task.estimatedTime}</span>
                            </div>
                            {task.conversionPotential && (
                              <div className="flex items-center space-x-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                                <span className="text-gray-400">전환가능성</span>
                                <span className={`font-semibold ${
                                  task.conversionPotential === '높음' ? 'text-green-400' :
                                  task.conversionPotential === '중간' ? 'text-yellow-400' : 'text-gray-400'
                                }`}>
                                  {task.conversionPotential}
                              </span>
                            </div>
                            )}
                          </div>
                          
                          {/* 개발하기 버튼 */}
                          <div className="mt-4 pt-4 border-t border-dark-700">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDevTask(task);
                                setShowDevModal(true);
                              }}
                              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                              <Wrench className="w-5 h-5" />
                              <span>개발하기</span>
                            </button>
                        </div>
                      </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-dark-700"
                      >
                        <div className="space-y-6">
                          {/* 핵심 정보 - 카드 그리드 */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                              <Target className="w-5 h-5 text-primary-500" />
                              <span>에이전트 전환 핵심 정보</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {/* 전환 가능성 */}
                              <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                <div className="text-xs text-gray-400 mb-2">전환 가능성</div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    (task.conversionPotential || (task.category === 'Automate' ? '높음' : task.category === 'AI-Copilot' ? '중간' : '낮음')) === '높음' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                    (task.conversionPotential || (task.category === 'Automate' ? '높음' : task.category === 'AI-Copilot' ? '중간' : '낮음')) === '중간' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                  }`}>
                                    {task.conversionPotential || (task.category === 'Automate' ? '높음' : task.category === 'AI-Copilot' ? '중간' : '낮음')}
                                  </span>
                                </div>
                              </div>

                              {/* 우선순위 */}
                              <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                <div className="text-xs text-gray-400 mb-2">우선순위</div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    (task.priority === 'high' || (!task.priority && task.score >= 70)) ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                    (task.priority === 'medium' || (!task.priority && task.score >= 50)) ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                                    'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                  }`}>
                                    {task.priority === 'high' || (!task.priority && task.score >= 70) ? '높음' :
                                     task.priority === 'medium' || (!task.priority && task.score >= 50) ? '중간' : 
                                     task.priority === 'low' || (!task.priority && task.score < 50) ? '낮음' : '중간'}
                                  </span>
                                </div>
                              </div>

                              {/* ROI */}
                              <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                <div className="text-xs text-gray-400 mb-2">예상 ROI</div>
                                <div className="text-xl font-bold text-green-400">{task.roiEstimate}%</div>
                              </div>

                              {/* 구축 기간 */}
                              <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                <div className="text-xs text-gray-400 mb-2">구축 기간</div>
                                <div className="text-sm font-semibold text-gray-200">{task.estimatedBuildPeriod || task.estimatedTime}</div>
                              </div>

                              {/* 도입 비용 */}
                              {task.estimatedAdoptionCost && (
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                  <div className="text-xs text-gray-400 mb-2">예상 도입 비용</div>
                                  <div className="text-sm font-semibold text-gray-200">{task.estimatedAdoptionCost}</div>
                                </div>
                              )}

                              {/* 운영 비용 */}
                              {task.estimatedOperatingCost && (
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                  <div className="text-xs text-gray-400 mb-2">운영 비용 (월간)</div>
                                  <div className="text-sm font-semibold text-gray-200">{task.estimatedOperatingCost}</div>
                                </div>
                              )}

                              {/* 절감 비용 */}
                              {task.estimatedSavingsCost && (
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 hover:border-primary-500/50 transition-colors">
                                  <div className="text-xs text-gray-400 mb-2">절감 비용 (연간)</div>
                                  <div className="text-sm font-semibold text-green-400">{task.estimatedSavingsCost}</div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 분석 근거 */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                              <Lightbulb className="w-5 h-5 text-yellow-500" />
                              <span>분석 근거</span>
                            </h4>
                            <div className="bg-dark-700 rounded-lg p-4 border-l-2 border-yellow-500/50">
                              <p className="text-gray-300 leading-relaxed text-sm">{task.reasoning}</p>
                            </div>
                          </div>

                          {/* 기대 효과 및 전환 저해 요인 - 컴팩트하게 */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* 기대 효과 */}
                            {task.expectedEffects && task.expectedEffects.length > 0 && (
                          <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-green-400">
                                  <TrendingUp className="w-4 h-4" />
                                  <span>전환 시 기대 효과</span>
                                </h4>
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 space-y-2">
                                  {task.expectedEffects.map((effect, effectIndex) => (
                                    <div key={effectIndex} className="flex items-start space-x-2 text-xs">
                                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                      <span className="text-gray-300 leading-relaxed">{effect}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* 전환 저해 요인 */}
                            {task.conversionBarriers && task.conversionBarriers.length > 0 && (
                              <div>
                                <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-orange-400">
                                  <AlertCircle className="w-4 h-4" />
                                  <span>전환 저해 요인</span>
                                </h4>
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600 space-y-2">
                                  {task.conversionBarriers.map((barrier, barrierIndex) => (
                                    <div key={barrierIndex} className="flex items-start space-x-2 text-xs">
                                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                                      <span className="text-gray-300 leading-relaxed">{barrier}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* 기술 요구사항 */}
                          {task.technicalRequirements && task.technicalRequirements.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-blue-400">
                                <Settings className="w-4 h-4" />
                                <span>기술 요구사항</span>
                              </h4>
                              <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {task.technicalRequirements.map((requirement, reqIndex) => (
                                    <div key={reqIndex} className="flex items-center space-x-2 text-xs">
                                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                                      <span className="text-gray-300">{requirement}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* 샘플 프롬프트 */}
                          {task.samplePrompt && (
                            <div>
                              <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-blue-400">
                                <Code className="w-4 h-4" />
                                <span>샘플 명령어 프롬프트</span>
                              </h4>
                              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs text-gray-400 font-mono">Agent Development Prompt</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigator.clipboard.writeText(task.samplePrompt || '');
                                    }}
                                    className="text-xs text-primary-500 hover:text-primary-400 flex items-center space-x-1 transition-colors"
                                  >
                                    <Copy className="w-3 h-3" />
                                    <span>복사</span>
                                  </button>
                                </div>
                                <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap break-words overflow-x-auto">
                                  <code>{task.samplePrompt}</code>
                                </pre>
                              </div>
                            </div>
                          )}

                          {/* Tools, Risks, Safeguards - 컴팩트한 형태 */}
                          {(task.tools.length > 0 || task.risks.length > 0 || task.safeguards.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Tools */}
                              {task.tools.length > 0 && (
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                                  <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-blue-400">
                                    <Settings className="w-4 h-4" />
                              <span>필요 도구</span>
                            </h4>
                            <div className="space-y-2">
                              {task.tools.map((tool, toolIndex) => (
                                      <div key={toolIndex} className="text-xs">
                                        <div className="font-medium text-white mb-0.5">{tool.name}</div>
                                        <div className="text-gray-400">{tool.purpose}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                              )}

                              {/* Risks */}
                              {task.risks.length > 0 && (
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                                  <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-red-400">
                                    <AlertCircle className="w-4 h-4" />
                              <span>위험 요소</span>
                            </h4>
                            <div className="space-y-2">
                              {task.risks.map((risk, riskIndex) => (
                                      <div key={riskIndex} className="flex items-start space-x-2 text-xs">
                                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                                        <span className="text-gray-300 leading-relaxed">{risk}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                              )}

                              {/* Safeguards */}
                              {task.safeguards.length > 0 && (
                                <div className="bg-dark-700 rounded-lg p-4 border border-dark-600">
                                  <h4 className="text-sm font-semibold mb-3 flex items-center space-x-2 text-green-400">
                                    <CheckCircle className="w-4 h-4" />
                              <span>안전장치</span>
                            </h4>
                            <div className="space-y-2">
                              {task.safeguards.map((safeguard, safeguardIndex) => (
                                      <div key={safeguardIndex} className="flex items-start space-x-2 text-xs">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                                        <span className="text-gray-300 leading-relaxed">{safeguard}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
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

        {activeTab === 'implementation' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="card">
              <h3 className="text-2xl font-semibold mb-6 flex items-center space-x-3">
                <Rocket className="w-6 h-6 text-blue-500" />
                <span>구현 로드맵</span>
              </h3>
              <div className="space-y-6">
                {[
                  { phase: 'Phase 1', title: '기초 인프라 구축', duration: '2-4주', description: 'AI 에이전트 개발 환경 구축 및 기본 프레임워크 설정' },
                  { phase: 'Phase 2', title: '핵심 기능 개발', duration: '4-6주', description: '자동화 가능한 업무에 대한 AI 에이전트 개발' },
                  { phase: 'Phase 3', title: '테스트 및 최적화', duration: '2-3주', description: '성능 테스트 및 사용자 피드백 반영' },
                  { phase: 'Phase 4', title: '배포 및 모니터링', duration: '1-2주', description: '프로덕션 환경 배포 및 지속적 모니터링' },
                ].map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-dark-700 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold">{phase.title}</h4>
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-500 rounded-full text-xs font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-gray-400">{phase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">필요 기술 스택</h3>
                <div className="space-y-3">
                  {['Python/Node.js', 'OpenAI API', 'Vector Database', 'Container (Docker)', 'CI/CD Pipeline'].map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-300">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-4">예상 비용</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">개발 비용</span>
                    <span className="text-white">₩50,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">운영 비용 (월)</span>
                    <span className="text-white">₩5,000,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">예상 ROI</span>
                    <span className="text-green-500">{result.summary.estimatedROI}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Share Modal */}
      <ShareModal 
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        result={result}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authOpen} 
        onClose={() => setAuthOpen(false)} 
        onAuthSuccess={handleAuthSuccess} 
      />

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">{t.footer.company.name}</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                {t.footer.company.description}
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-300 cursor-pointer">
                  <Phone className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.links.product}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/#analysis" className="hover:text-white transition-colors duration-300">기업 분석</a></li>
                <li><a href="/#analysis" className="hover:text-white transition-colors duration-300">개인 분석</a></li>
                <li><a href="/#process" className="hover:text-white transition-colors duration-300">분석 리포트</a></li>
                <li><a href="/#contact" className="hover:text-white transition-colors duration-300">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">{t.footer.links.company}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/#consulting" className="hover:text-white transition-colors duration-300">회사 소개</a></li>
                <li><a href="/#consulting" className="hover:text-white transition-colors duration-300">팀</a></li>
                <li><a href="/#contact" className="hover:text-white transition-colors duration-300">채용</a></li>
                <li><a href="/#consulting" className="hover:text-white transition-colors duration-300">뉴스</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dark-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/#contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t.footer.legal.privacy}
              </a>
              <a href="/#contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t.footer.legal.terms}
              </a>
              <a href="/#contact" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                {t.footer.legal.cookies}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Development Modal */}
      {selectedDevTask && (
        <AgentDevelopmentModal
          isOpen={showDevModal}
          onClose={() => {
            setShowDevModal(false);
            setSelectedDevTask(null);
          }}
          task={selectedDevTask}
        />
      )}
    </div>
  );
}
