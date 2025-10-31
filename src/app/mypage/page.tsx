'use client';

import { useEffect, useState } from 'react';
import { User, FileText, CreditCard, Settings, Save, Edit2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type TabType = 'profile' | 'analyses' | 'payment';

export default function MyPage() {
  const router = useRouter();
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

  useEffect(() => {
    // 사용자 정보 가져오기
    (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        const json = await res.json();
        if (!json.authenticated || !json.user) {
          router.push('/');
          return;
        }
        setUser(json.user);
        setProfileForm({ name: json.user.name || '', email: json.user.email, password: '', confirmPassword: '' });
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
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
        <p>불러오는 중...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <p className="text-red-400">{error || '사용자 정보를 불러올 수 없습니다.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white">
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
                    return (
                      <div key={item.id} className="p-4 border border-dark-700 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors">
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
  );
}



