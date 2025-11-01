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
  X
} from 'lucide-react';
import { AnalysisResult, TaskItem, Language } from '@/types';
import { useTranslation } from '@/lib/i18n';
import { AutomationChart } from './AutomationChart';
import { ShareModal } from './ShareModal';
import { usePDFGenerator } from '@/hooks/usePDFGenerator';
import { AuthModal } from './auth/AuthModal';

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
              onClick={() => router.push('/')}
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
              <a
                href="/"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.home}
              </a>
              <a
                href="/#analysis"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.enterprise}
              </a>
              <a
                href="/#analysis"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.personal}
              </a>
              <a
                href="/#process"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.process}
              </a>
              <a
                href="/#consulting"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.consulting}
              </a>
              <a
                href="/#contact"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.contact}
              </a>
              {currentUser && (
                <a href="/mypage" className="text-gray-300 hover:text-white transition-colors duration-300">내 기록</a>
              )}
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
              <a
                href="/"
                className="block text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.home}
              </a>
              <a
                href="/#analysis"
                className="block text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.enterprise}
              </a>
              <a
                href="/#analysis"
                className="block text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.personal}
              </a>
              <a
                href="/#process"
                className="block text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.process}
              </a>
              <a
                href="/#consulting"
                className="block text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.consulting}
              </a>
              <a
                href="/#contact"
                className="block text-gray-300 hover:text-white transition-colors duration-300"
              >
                {t.nav.contact}
              </a>
              {currentUser && (
                <a href="/mypage" className="block text-gray-300 hover:text-white transition-colors duration-300">내 기록</a>
              )}
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
              <a
                href="/mypage"
                className="btn-secondary flex items-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>마이페이지</span>
              </a>
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

        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg mb-8">
          {[
            { id: 'overview', label: '개요', icon: BarChart3 },
            { id: 'detailed', label: '상세 분석', icon: PieChart },
            { id: 'recommendations', label: '권장사항', icon: Lightbulb },
            { id: 'implementation', label: '구현 계획', icon: Rocket },
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

            {/* Task List */}
            <div className="space-y-4">
              {filteredTasks.map((task, index) => {
                const IconComponent = getCategoryIcon(task.category);
                const isExpanded = expandedTasks.has(task.id);
                
                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card-hover cursor-pointer"
                    onClick={() => toggleTaskExpansion(task.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${getCategoryColor(task.category)}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold">{task.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                              {task.category}
                            </span>
                          </div>
                          <p className="text-gray-400 mb-4 line-clamp-2">{task.sourceText}</p>
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
                                {getDifficultyStars(task.difficulty)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Reasoning */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                              <Lightbulb className="w-5 h-5 text-yellow-500" />
                              <span>분석 근거</span>
                            </h4>
                            <p className="text-gray-300 leading-relaxed">{task.reasoning}</p>
                          </div>

                          {/* Tools */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                              <Settings className="w-5 h-5 text-blue-500" />
                              <span>필요 도구</span>
                            </h4>
                            <div className="space-y-2">
                              {task.tools.map((tool, toolIndex) => (
                                <div key={toolIndex} className="p-3 bg-dark-700 rounded-lg">
                                  <div className="font-medium text-white mb-1">{tool.name}</div>
                                  <div className="text-sm text-gray-400 mb-2">{tool.purpose}</div>
                                  <div className="text-xs text-gray-500">
                                    대안: {tool.alternatives.join(', ')}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Risks and Safeguards */}
                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                              <AlertCircle className="w-5 h-5 text-red-500" />
                              <span>위험 요소</span>
                            </h4>
                            <div className="space-y-2">
                              {task.risks.map((risk, riskIndex) => (
                                <div key={riskIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{risk}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span>안전장치</span>
                            </h4>
                            <div className="space-y-2">
                              {task.safeguards.map((safeguard, safeguardIndex) => (
                                <div key={safeguardIndex} className="flex items-start space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-sm text-gray-300">{safeguard}</span>
                                </div>
                              ))}
                            </div>
                          </div>
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
    </div>
  );
}
