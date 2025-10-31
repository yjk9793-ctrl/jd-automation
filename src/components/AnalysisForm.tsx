'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  DollarSign,
  TrendingUp,
  Brain,
  Target,
  Zap,
  Users,
  Building2,
  ArrowRight,
  Download,
  Mail
} from 'lucide-react';
import { AnalysisType, AnalysisResult } from '@/types';
import { useTranslation } from '@/lib/i18n';

interface AnalysisFormProps {
  type: AnalysisType;
  language: 'ko' | 'en';
  onAnalyze: (type: AnalysisType, content: string, email: string) => Promise<void>;
  isAnalyzing: boolean;
  currentUser?: { id: string; email: string; name?: string } | null;
}

export function AnalysisForm({ type, language, onAnalyze, isAnalyzing, currentUser }: AnalysisFormProps) {
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const t = useTranslation(language);

  // 로그인된 사용자의 이메일을 자동으로 채우기
  useEffect(() => {
    if (currentUser?.email) {
      // 이메일이 비어있거나 placeholder 상태일 때만 자동 채우기
      if (!email || email === 'analysis@company.com') {
        setEmail(currentUser.email);
      }
    }
  }, [currentUser?.email]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const extractedContent = await extractFileContent(file);
      setContent(extractedContent);
    } catch (error) {
      console.error('File upload error:', error);
      alert('파일을 읽는 중 오류가 발생했습니다. 텍스트를 직접 입력해주세요.');
    } finally {
      setIsUploading(false);
    }
  };

  const extractFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      if (file.type === 'application/pdf') {
        // PDF는 간단한 텍스트 추출만 시도
        // 실제 프로덕션에서는 pdf-parse 같은 라이브러리 사용 권장
        reader.readAsText(file);
      } else {
        // TXT, DOC, DOCX는 텍스트로 읽기
        reader.readAsText(file, 'UTF-8');
      }
    });
  };

  const handleFileUploadOld = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Simulate file processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock file content extraction
      const mockContent = type === 'enterprise' 
        ? `채용담당자 (HR Manager)

회사: 테크스타트업 XYZ
부서: 인사팀
근무지: 서울 강남구

주요 업무
• 지원자 서류 스크리닝 및 1차 필터링
• 면접 일정 조율 및 면접관 배정
• 면접 평가서 작성 및 점수 집계
• 채용 제안서 작성 및 협상
• 신입사원 온보딩 체크리스트 관리
• 월별 채용 현황 리포트 작성
• 채용 채널별 성과 분석 및 ROI 측정
• 인사 데이터베이스 관리 및 업데이트
• 채용 공고 작성 및 배포
• 지원자 이력서 파싱 및 키워드 매칭

자격 요건
• 관련 학과 학사 학위 이상
• HR 업무 경험 3년 이상
• Excel, PowerPoint 활용 능력
• 기본적인 영어 의사소통 능력
• 커뮤니케이션 스킬

우대 사항
• ATS(Applicant Tracking System) 사용 경험
• 데이터 분석 도구 (Tableau, Power BI) 사용 경험
• 인사관리시스템(HRIS) 구축/운영 경험
• 채용 마케팅 경험
• 스타트업 근무 경험`
        : `김개발 (Software Developer)

경력: 5년
전문분야: Full-stack Development

주요 경력
• 웹 애플리케이션 개발 및 유지보수
• React, Node.js를 활용한 프론트엔드/백엔드 개발
• 데이터베이스 설계 및 최적화 (MySQL, MongoDB)
• RESTful API 설계 및 구현
• 클라우드 서비스 활용 (AWS, Azure)
• CI/CD 파이프라인 구축 및 관리
• 코드 리뷰 및 품질 관리
• 팀 협업 및 프로젝트 관리
• 고객 요구사항 분석 및 기술적 솔루션 제안
• 성능 최적화 및 보안 강화

기술 스택
• Frontend: React, Vue.js, TypeScript, HTML/CSS
• Backend: Node.js, Python, Java, Spring Boot
• Database: MySQL, PostgreSQL, MongoDB, Redis
• Cloud: AWS, Azure, Docker, Kubernetes
• Tools: Git, Jenkins, Jira, Confluence

프로젝트 경험
• 전자상거래 플랫폼 개발 (사용자 수 10만+)
• 실시간 채팅 시스템 구축
• 데이터 분석 대시보드 개발
• 모바일 앱 백엔드 API 개발`;

      setContent(mockContent);
    } catch (error) {
      console.error('File upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('=== Form Submit Started ===');
    console.log('Content:', content.substring(0, 50));
    console.log('Email:', email);
    console.log('Content trimmed:', !!content.trim());
    console.log('Email trimmed:', !!email.trim());
    
    if (!content.trim() || !email.trim()) {
      console.log('❌ Form validation failed');
      return;
    }
    
    console.log('✅ Form validation passed, calling onAnalyze...');
    await onAnalyze(type, content, email);
    console.log('✅ Form submit completed');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            {type === 'enterprise' ? (
              <Building2 className="w-8 h-8 text-white" />
            ) : (
              <Users className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="text-3xl font-bold mb-2 gradient-text">
            {type === 'enterprise' ? '기업 직무 분석' : '개인 역량 분석'}
          </h2>
          <p className="text-gray-400">
            {type === 'enterprise' 
              ? '직무 설명서를 업로드하여 AI 에이전트 변환 가능성을 분석합니다.'
              : '이력서를 업로드하여 개인의 AI 에이전트 활용 가능성을 평가합니다.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {type === 'enterprise' ? '직무 설명서 업로드' : '이력서 업로드'}
            </label>
            <div className="border-2 border-dashed border-dark-600 rounded-lg p-8 text-center hover:border-primary-500 transition-colors duration-300">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={isUploading}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">
                  {isUploading ? '파일 처리 중...' : '파일을 드래그하거나 클릭하여 업로드'}
                </p>
                <p className="text-sm text-gray-500">
                  PDF, DOC, DOCX, TXT 파일 지원
                </p>
              </label>
            </div>
          </div>

          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              또는 직접 입력
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={type === 'enterprise' 
                ? '직무 설명서 내용을 입력하세요...'
                : '이력서 내용을 입력하세요...'
              }
              rows={12}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              결과 수신 이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analysis@company.com"
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-400 mt-1">
              분석 결과가 이메일로 발송됩니다.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAnalyzing || isUploading || !content.trim() || !email.trim()}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>분석 중...</span>
                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 animate-pulse"
                     style={{
                       animation: 'progress 3s infinite',
                       width: '100%'
                     }} />
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                <span>AI 분석 시작</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

        {/* Analysis Progress Card */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-dark-800 border border-primary-500/30 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">AI 분석 진행 중</h4>
                  <p className="text-sm text-gray-400">잠시만 기다려주세요...</p>
                </div>
              </div>
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-dark-700 rounded-full h-2.5 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
              />
            </div>
            
            {/* Progress Steps */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-400">데이터 준비</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-primary-400">AI 분석 중</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600">결과 생성</span>
              </div>
            </div>
          </motion.div>
        )}
        </form>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>상세 분석 리포트</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>이메일 자동 발송</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>맞춤형 솔루션 제안</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
