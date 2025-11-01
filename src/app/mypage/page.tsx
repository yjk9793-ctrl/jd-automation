'use client';

import { useEffect, useState } from 'react';
import { User, FileText, CreditCard, Settings, Save, Edit2, Brain, Menu, X, Globe, Mail, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { Language, AnalysisResult } from '@/types';
import { AnalysisDetailPage } from '@/components/AnalysisDetailPage';

type TabType = 'profile' | 'analyses' | 'payment';

export default function MyPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>('ko');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Profile edit states
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Analyses states
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisResult | null>(null);

  const t = useTranslation(language);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('jdx_user');
    router.push('/');
  };

  useEffect(() => {
    // 먼저 로컬 스토리지에서 사용자 정보 확인 (쿠키 문제 대비)
    const cachedUser = localStorage.getItem('jdx_user');
    if (cachedUser) {
      try {
        const userData = JSON.parse(cachedUser);
        console.log('Found cached user, showing page immediately:', userData.email);
        setUser(userData);
        setProfileForm({ name: userData.name || '', email: userData.email, password: '', confirmPassword: '' });
        setLoading(false); // 캐시가 있으면 즉시 페이지 표시
      } catch (e) {
        console.error('Failed to parse cached user:', e);
      }
    }
    
    // 사용자 정보 가져오기 - 여러 번 재시도 (백그라운드에서 계속 시도)
    let retryCount = 0;
    const maxRetries = 15;
    
    const checkAuth = async (): Promise<void> => {
      try {
        console.log(`Checking auth (attempt ${retryCount + 1}/${maxRetries})...`);
        const res = await fetch('/api/auth/me', { 
          credentials: 'include',
          cache: 'no-store' 
        });
        const json = await res.json();
        console.log('Auth check result:', json);
        
        if (json.authenticated && json.user) {
          console.log('User authenticated from server:', json.user.email);
          // 로컬 스토리지에 사용자 정보 저장 및 업데이트
          localStorage.setItem('jdx_user', JSON.stringify(json.user));
          setUser(json.user);
          setProfileForm({ name: json.user.name || '', email: json.user.email, password: '', confirmPassword: '' });
          setLoading(false);
          return;
        }
        
        // 인증 실패 시 재시도 (백그라운드에서 계속 시도)
        retryCount++;
        if (retryCount < maxRetries) {
          console.log(`Auth failed, retrying in ${retryCount * 300}ms...`);
          setTimeout(checkAuth, retryCount * 300);
        } else {
          console.error('Auth failed after max retries');
          // 캐시된 사용자 정보가 있으면 그것 사용 (서버 인증 실패해도)
          if (cachedUser) {
            console.log('Using cached user data - server auth failed but cache exists');
            // 페이지는 이미 표시되어 있음 (로딩 상태가 false)
          } else {
            // 캐시도 없고 서버 인증도 실패하면 에러
            setError('로그인이 필요합니다.');
            setLoading(false);
            setTimeout(() => {
              router.push('/');
            }, 2000);
          }
        }
      } catch (e: any) {
        console.error('Auth check error:', e);
        retryCount++;
        if (retryCount < maxRetries) {
          setTimeout(checkAuth, retryCount * 300);
        } else {
          // 캐시된 사용자 정보가 있으면 그것 사용
          if (cachedUser) {
            console.log('Using cached user data after error');
            // 페이지는 이미 표시되어 있음
          } else {
            setError(e.message || '인증 확인에 실패했습니다.');
            setLoading(false);
          }
        }
      }
    };
    
    // 백그라운드에서 서버 인증 확인 (캐시가 있어도 최신 정보 확인)
    checkAuth();
  }, [router]);

  useEffect(() => {
    // 분석 결과 가져오기 (analyses 탭일 때만)
    if (activeTab === 'analyses') {
      setLoadingAnalyses(true);
      (async () => {
        try {
          const res = await fetch('/api/analysis/my');
          const json = await res.json();
          if (!json.success) throw new Error(json.error || 'Unauthorized');
          setAnalyses(json.data || []);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoadingAnalyses(false);
        }
      })();
    }
  }, [activeTab]);

  const handleProfileSave = async () => {
    setSavingProfile(true);
    setProfileError('');
    
    try {
      if (profileForm.password && profileForm.password !== profileForm.confirmPassword) {
        setProfileError('비밀번호가 일치하지 않습니다.');
        setSavingProfile(false);
        return;
      }

      const updateData: any = {};
      if (profileForm.name !== user?.name) updateData.name = profileForm.name;
      if (profileForm.email !== user?.email) updateData.email = profileForm.email;
      if (profileForm.password) updateData.password = profileForm.password;

      if (Object.keys(updateData).length === 0) {
        setEditingProfile(false);
        setSavingProfile(false);
        return;
      }

      const res = await fetch('/api/auth/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || '업데이트 실패');
      }

      setUser(json.data);
      setProfileForm({ ...profileForm, password: '', confirmPassword: '' });
      setEditingProfile(false);
      
      // 페이지 새로고침하여 최신 상태 반영
      window.location.reload();
    } catch (e: any) {
      setProfileError(e.message || '정보 변경에 실패했습니다.');
    } finally {
      setSavingProfile(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>사용자 정보를 확인하는 중...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <p className="text-gray-400 text-sm">곧 홈으로 이동합니다...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">사용자 정보를 불러올 수 없습니다.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  }

  // 상세 페이지 표시
  if (selectedAnalysis) {
    return (
      <AnalysisDetailPage
        result={selectedAnalysis}
        language={language}
        onBack={() => setSelectedAnalysis(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Navigation */}
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
            </div>

            {/* Language Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-dark-800 rounded-lg p-1">
                <button
                  onClick={() => handleLanguageChange('ko')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                    language === 'ko' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  KO
                </button>
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                    language === 'en' ? 'bg-primary-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Auth */}
              {user ? (
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
                <a href="/" className="px-3 py-1 rounded-md bg-primary-600 text-white">로그인</a>
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
            </div>
          </motion.div>
        )}
      </nav>

      {/* Content with padding for fixed nav */}
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">마이페이지</h1>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-dark-700">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span>내 정보 변경</span>
          </button>
          <button
            onClick={() => setActiveTab('analyses')}
            className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
              activeTab === 'analyses'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>나의 분석 결과</span>
          </button>
          <button
            onClick={() => setActiveTab('payment')}
            className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
              activeTab === 'payment'
                ? 'border-b-2 border-primary-600 text-primary-600'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>유료 결제</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {/* 내 정보 변경 */}
          {activeTab === 'profile' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center space-x-2">
                  <Settings className="w-6 h-6" />
                  <span>내 정보</span>
                </h2>
                {!editingProfile && (
                  <button
                    onClick={() => setEditingProfile(true)}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-md flex items-center space-x-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>수정</span>
                  </button>
                )}
              </div>

              {profileError && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-md text-red-400">
                  {profileError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">이름</label>
                  {editingProfile ? (
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:border-primary-600"
                      placeholder="이름을 입력하세요"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-dark-700 rounded-md">{user.name || '미입력'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">이메일</label>
                  {editingProfile ? (
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:border-primary-600"
                      placeholder="이메일을 입력하세요"
                    />
                  ) : (
                    <p className="px-4 py-2 bg-dark-700 rounded-md">{user.email}</p>
                  )}
                </div>

                {editingProfile && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">새 비밀번호 (변경 시에만 입력)</label>
                      <input
                        type="password"
                        value={profileForm.password}
                        onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                        className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:border-primary-600"
                        placeholder="8자 이상"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-2">비밀번호 확인</label>
                      <input
                        type="password"
                        value={profileForm.confirmPassword}
                        onChange={(e) => setProfileForm({ ...profileForm, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-md text-white focus:outline-none focus:border-primary-600"
                        placeholder="비밀번호 재입력"
                      />
                    </div>
                  </>
                )}

                {editingProfile && (
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleProfileSave}
                      disabled={savingProfile}
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-md flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Save className="w-4 h-4" />
                      <span>{savingProfile ? '저장 중...' : '저장'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingProfile(false);
                        setProfileForm({ name: user.name || '', email: user.email, password: '', confirmPassword: '' });
                        setProfileError('');
                      }}
                      className="px-6 py-2 bg-dark-700 hover:bg-dark-600 rounded-md"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 나의 분석 결과 */}
          {activeTab === 'analyses' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                <FileText className="w-6 h-6" />
                <span>나의 분석 결과</span>
              </h2>

              {loadingAnalyses && <p className="text-gray-400">불러오는 중...</p>}
              
              {!loadingAnalyses && analyses.length === 0 && (
                <p className="text-gray-400 text-center py-8">저장된 분석 결과가 없습니다.</p>
              )}

              {!loadingAnalyses && analyses.length > 0 && (
                <div className="space-y-4">
                  {analyses.map((item: any) => {
                    const data = typeof item.data === 'string' ? JSON.parse(item.data) : item.data;
                    const analysisResult: AnalysisResult = {
                      id: item.id,
                      type: item.type as 'enterprise' | 'personal',
                      jobRole: data.jobRole || '',
                      summary: data.summary || {
                        total: 0,
                        automate: 0,
                        copilot: 0,
                        humanCritical: 0,
                        averageScore: 0,
                        estimatedROI: 0,
                        automationPotential: 0,
                      },
                      tasks: data.tasks || [],
                      recommendations: data.recommendations || [],
                      nextSteps: data.nextSteps || [],
                      createdAt: item.createdAt,
                      aiSummary: data.aiSummary || '',
                    };
                    
                    return (
                      <div 
                        key={item.id} 
                        onClick={() => setSelectedAnalysis(analysisResult)}
                        className="p-4 border border-dark-700 rounded-lg bg-dark-700 hover:bg-dark-600 hover:border-primary-500 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-sm text-gray-400">
                            {new Date(item.createdAt).toLocaleString('ko-KR')}
                          </div>
                          <div className="text-xs px-2 py-1 bg-primary-900 text-primary-300 rounded">
                            {item.type === 'enterprise' ? '기업 JD' : '개인 이력서'}
                          </div>
                        </div>
                        {data.summary && (
                          <div className="space-y-2">
                            <div className="flex space-x-4 text-sm">
                              <span className="text-gray-400">총 작업 수:</span>
                              <span className="text-white">{data.summary.total || 0}</span>
                            </div>
                            <div className="flex space-x-4 text-sm">
                              <span className="text-gray-400">자동화 가능:</span>
                              <span className="text-green-400">{data.summary.automate || 0}</span>
                            </div>
                            <div className="flex space-x-4 text-sm">
                              <span className="text-gray-400">AI 협업:</span>
                              <span className="text-blue-400">{data.summary.copilot || 0}</span>
                            </div>
                            <div className="flex space-x-4 text-sm">
                              <span className="text-gray-400">예상 ROI:</span>
                              <span className="text-yellow-400">{data.summary.estimatedROI || 0}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* 유료 결제 */}
          {activeTab === 'payment' && (
            <div className="bg-dark-800 rounded-lg p-6 border border-dark-700">
              <h2 className="text-2xl font-semibold mb-6 flex items-center space-x-2">
                <CreditCard className="w-6 h-6" />
                <span>유료 결제</span>
              </h2>

              <div className="text-center py-12">
                <CreditCard className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400 mb-4">결제 기능은 준비 중입니다.</p>
                <p className="text-sm text-gray-500">곧 다양한 플랜을 제공할 예정입니다.</p>
              </div>

              {/* 결제 플랜 예시 (추후 구현) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 border border-dark-700 rounded-lg bg-dark-700">
                  <h3 className="text-xl font-semibold mb-2">기본 플랜</h3>
                  <div className="text-3xl font-bold mb-4">무료</div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>✓ 월 5회 분석</li>
                    <li>✓ 기본 리포트</li>
                  </ul>
                </div>
                <div className="p-6 border border-primary-600 rounded-lg bg-dark-700 relative">
                  <div className="absolute top-0 right-0 bg-primary-600 text-white text-xs px-2 py-1 rounded-bl">
                    추천
                  </div>
                  <h3 className="text-xl font-semibold mb-2">프로 플랜</h3>
                  <div className="text-3xl font-bold mb-4">₩29,000<span className="text-sm">/월</span></div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>✓ 무제한 분석</li>
                    <li>✓ 상세 리포트</li>
                    <li>✓ 우선 지원</li>
                  </ul>
                </div>
                <div className="p-6 border border-dark-700 rounded-lg bg-dark-700">
                  <h3 className="text-xl font-semibold mb-2">엔터프라이즈</h3>
                  <div className="text-3xl font-bold mb-4">문의</div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>✓ 맞춤 솔루션</li>
                    <li>✓ 전담 지원</li>
                    <li>✓ API 접근</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-900 border-t border-dark-800 py-12 mt-16">
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
    </div>
  );
}



