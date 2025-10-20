export const SAMPLE_JDS = {
  hr: `채용담당자 (HR Manager)

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
• 스타트업 근무 경험`,

  marketing: `디지털 마케팅 매니저

회사: 이커머스 플랫폼 ABC
부서: 마케팅팀
근무지: 서울 서초구

주요 업무
• SEO/SEM 캠페인 기획 및 실행
• 소셜미디어 마케팅 전략 수립
• 이메일 마케팅 캠페인 설계 및 운영
• 웹사이트 트래픽 분석 및 개선안 도출
• 광고 성과 분석 및 ROI 최적화
• 콘텐츠 마케팅 전략 수립
• 인플루언서 마케팅 협업 관리
• 마케팅 자동화 도구 구축 및 운영
• 경쟁사 분석 및 벤치마킹
• 마케팅 예산 관리 및 집행
• 월간/분기별 마케팅 리포트 작성

자격 요건
• 마케팅 관련 학과 학사 이상
• 디지털 마케팅 경험 5년 이상
• Google Analytics, Facebook Ads 사용 경험
• Excel, PowerPoint 활용 능력
• 데이터 분석 능력

우대 사항
• Google Ads, Facebook Ads 인증
• 마케팅 자동화 플랫폼 사용 경험 (HubSpot, Marketo)
• A/B 테스트 설계 및 실행 경험
• 웹사이트 개선 및 UX 최적화 경험
• 이커머스 마케팅 경험`,

  finance: `재무관리자 (Financial Manager)

회사: 제조업체 DEF
부서: 재무팀
근무지: 경기 성남시

주요 업무
• 월별/분기별 재무보고서 작성
• 예산 편성 및 관리
• 현금흐름 분석 및 관리
• 세무 신고 및 납부 업무
• 회계장부 관리 및 결산 업무
• 비용 분석 및 절감 방안 도출
• 투자 분석 및 자금 조달
• 재무 위험 관리
• 내부 회계 관리
• 외부 감사 대응
• 재무 데이터 분석 및 시각화

자격 요건
• 회계/재무 관련 학과 학사 이상
• 회계/재무 업무 경험 5년 이상
• K-IFRS, 세법 관련 지식
• Excel 고급 활용 능력
• ERP 시스템 사용 경험

우대 사항
• CPA, 세무사 자격증 보유
• 제조업 재무 경험
• Power BI, Tableau 등 데이터 분석 도구 사용 경험
• SAP, Oracle 등 ERP 시스템 운영 경험
• IPO 관련 업무 경험`,

  sales: `영업관리자 (Sales Manager)

회사: B2B SaaS 기업 GHI
부서: 영업팀
근무지: 서울 종로구

주요 업무
• 신규 고객 발굴 및 영업 기회 창출
• 고객 상담 및 제안서 작성
• 계약 협상 및 영업 프로세스 관리
• CRM 시스템 관리 및 영업 데이터 분석
• 월간/분기별 영업 실적 보고서 작성
• 영업팀 멤버 관리 및 교육
• 고객 만족도 조사 및 개선
• 경쟁사 분석 및 차별화 전략 수립
• 영업 목표 설정 및 달성 계획 수립
• 고객 온보딩 프로세스 관리

자격 요건
• 대학 졸업 이상
• B2B 영업 경험 5년 이상
• CRM 시스템 사용 경험
• PowerPoint, Excel 활용 능력
• 강한 커뮤니케이션 스킬

우대 사항
• SaaS 영업 경험
• Salesforce, HubSpot 등 CRM 운영 경험
• 데이터 분석 및 리포팅 경험
• 영업팀 리더십 경험
• 기술적 이해도가 높은 영업 경험`
};

export const DEMO_RESULTS = {
  hr: {
    tasks: [
      {
        id: 'task_1',
        title: '지원자 서류 스크리닝',
        sourceText: '지원자 서류 스크리닝 및 1차 필터링',
        category: 'Automate' as const,
        score: 85,
        roiEstimate: 75,
        difficulty: 2 as const,
        risks: ['잘못된 필터링으로 인한 우수 인재 누락'],
        safeguards: ['다단계 검증 프로세스', '인간 검토 단계', '필터링 기준 정기 업데이트'],
        tools: [
          { name: 'ATS 시스템', purpose: '자동 서류 스크리닝', alt: ['Workday', 'Greenhouse'] },
          { name: 'AI 스크리닝 도구', purpose: '키워드 매칭 및 점수 계산', alt: ['HireVue', 'Pymetrics'] }
        ],
        reasoning: '명확한 자격 요건과 키워드 기반으로 자동화 가능하며, 규칙 기반 필터링이 효과적입니다.',
        estimatedTime: '1주일 이내',
        recipe: {
          inputs: [
            { name: '이력서', type: 'PDF/DOCX', source: '지원자 업로드' },
            { name: '자격 요건', type: 'JSON', source: 'JD 파싱' }
          ],
          outputs: [
            { name: '스크리닝 결과', type: 'JSON', source: 'ATS 시스템' },
            { name: '점수 리포트', type: 'PDF', source: '채용 담당자' }
          ],
          flowMermaid: `graph TD
    A[이력서 업로드] --> B[문서 파싱]
    B --> C[키워드 추출]
    C --> D[자격 요건 매칭]
    D --> E[점수 계산]
    E --> F[임계값 확인]
    F --> G{합격?}
    G -->|Yes| H[1차 통과]
    G -->|No| I[불합격 처리]
    H --> J[인간 검토 큐]
    I --> K[결과 저장]`,
          steps: [
            '이력서 문서를 텍스트로 변환',
            '자격 요건 키워드 추출',
            '이력서 내용과 키워드 매칭',
            '가중치 기반 점수 계산',
            '임계값 기준으로 합격/불합격 결정',
            '결과를 ATS 시스템에 저장'
          ],
          codeSamples: [
            {
              lang: 'ts',
              label: 'TypeScript 예시',
              code: `interface ResumeScreening {
  resume: string;
  requirements: string[];
  weights: Record<string, number>;
}

function screenResume(screening: ResumeScreening): ScreeningResult {
  const keywords = extractKeywords(screening.resume);
  const matches = findMatches(keywords, screening.requirements);
  const score = calculateScore(matches, screening.weights);
  
  return {
    score,
    passed: score >= 70,
    matchedKeywords: matches,
    recommendations: generateRecommendations(score)
  };
}`
            },
            {
              lang: 'py',
              label: 'Python 예시',
              code: `import re
from typing import List, Dict

def screen_resume(resume_text: str, requirements: List[str]) -> Dict:
    keywords = extract_keywords(resume_text)
    matches = find_keyword_matches(keywords, requirements)
    score = calculate_weighted_score(matches)
    
    return {
        'score': score,
        'passed': score >= 70,
        'matched_keywords': matches,
        'confidence': calculate_confidence(score, len(matches))
    }`
            }
          ],
          tests: [
            '자격 요건 100% 매칭 시 100점 확인',
            '자격 요건 50% 매칭 시 50점 확인',
            '빈 이력서 처리 확인',
            '잘못된 파일 형식 처리 확인'
          ],
          monitoring: [
            '스크리닝 정확도',
            '처리 시간',
            '인간 검토 비율',
            '최종 채용 성공률'
          ]
        }
      },
      {
        id: 'task_2',
        title: '면접 일정 조율',
        sourceText: '면접 일정 조율 및 면접관 배정',
        category: 'Automate' as const,
        score: 80,
        roiEstimate: 60,
        difficulty: 3 as const,
        risks: ['이중 예약', '면접관 일정 충돌', '시간대 오류'],
        safeguards: ['실시간 캘린더 동기화', '충돌 검사', '자동 알림 시스템'],
        tools: [
          { name: 'Google Calendar API', purpose: '일정 관리', alt: ['Outlook Calendar', 'Calendly'] },
          { name: 'Slack Bot', purpose: '면접관 알림', alt: ['Microsoft Teams', 'Discord'] }
        ],
        reasoning: '캘린더 API와 알림 시스템을 통해 자동화 가능하며, 충돌 방지 로직으로 안전하게 처리할 수 있습니다.',
        estimatedTime: '2주일 이내',
        recipe: {
          inputs: [],
          outputs: [],
          flowMermaid: '',
          steps: [],
          codeSamples: [],
          tests: [],
          monitoring: []
        }
      }
    ],
    summary: {
      total: 2,
      automate: 2,
      copilot: 0,
      humanCritical: 0,
      averageROI: 67.5,
      highImpactTasks: [] as any[]
    },
    metadata: {
      analyzedAt: new Date().toISOString(),
      jdLength: 1200,
      processingTime: 2500
    }
  }
};

export function getSampleJD(type: keyof typeof SAMPLE_JDS): string {
  return SAMPLE_JDS[type];
}

export function getDemoResult(type: keyof typeof DEMO_RESULTS) {
  return DEMO_RESULTS[type];
}
