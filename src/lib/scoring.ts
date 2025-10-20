import { TaskCategory, DifficultyLevel, ScoringWeights, AutomationCriteria } from '@/types';

// 기본 가중치 설정
export const DEFAULT_WEIGHTS: ScoringWeights = {
  repeatability: 0.25,      // 반복성
  ruleBased: 0.20,          // 규칙 기반
  structuredData: 0.15,     // 정형 데이터
  apiAccess: 0.15,          // API 접근성
  qualityCriteria: 0.10,    // 품질 기준
  securityCompliance: -0.10, // 보안/규정 준수 (제약 요소)
  uniqueContext: -0.15,     // 고유 맥락 의존도 (제약 요소)
};

// 키워드 기반 자동화 가능성 힌트
export const AUTOMATION_KEYWORDS = {
  high: [
    '자동', '반복', '규칙', '스케줄', '배치', '정기', '월간', '주간', '일간',
    '알림', '리포트', '데이터', '엑셀', '스프레드시트', '이메일', '문서',
    '업로드', '다운로드', '동기화', '백업', '복사', '이동', '변환',
    '검증', '확인', '체크', '매칭', '비교', '정렬', '필터링'
  ],
  medium: [
    '분석', '검토', '평가', '분류', '카테고리', '태그', '라벨',
    '통계', '집계', '요약', '정리', '정제', '가공', '처리',
    '전송', '공유', '배포', '발송', '알림', '통지'
  ],
  low: [
    '판단', '결정', '선택', '추천', '조언', '컨설팅', '전략',
    '계획', '설계', '개발', '창작', '혁신', '연구', '탐색',
    '협상', '소통', '상담', '교육', '훈련', '멘토링'
  ]
};

// 제약 요소 키워드
export const CONSTRAINT_KEYWORDS = {
  security: [
    '보안', '암호', '인증', '권한', '승인', '검토', '감사',
    '개인정보', '민감', '기밀', '비공개', '내부', '제한'
  ],
  compliance: [
    '규정', '법규', '정책', '가이드라인', '절차', '프로세스',
    '검증', '확인', '검토', '승인', '단계', '절차'
  ],
  context: [
    '상황', '맥락', '컨텍스트', '경험', '판단', '직감', '노하우',
    '전문성', '창의', '혁신', '유연', '적응', '대응'
  ]
};

export class AutomationScorer {
  private weights: ScoringWeights;

  constructor(weights: ScoringWeights = DEFAULT_WEIGHTS) {
    this.weights = weights;
  }

  /**
   * 휴리스틱 기반 자동화 점수 계산
   */
  calculateScore(criteria: AutomationCriteria): {
    score: number;
    category: TaskCategory;
    confidence: number;
  } {
    // 가중합 계산
    const weightedScore = 
      criteria.repeatability * this.weights.repeatability +
      criteria.ruleBased * this.weights.ruleBased +
      criteria.structuredData * this.weights.structuredData +
      criteria.apiAccess * this.weights.apiAccess +
      criteria.qualityCriteria * this.weights.qualityCriteria +
      criteria.securityCompliance * this.weights.securityCompliance +
      criteria.uniqueContext * this.weights.uniqueContext;

    // 0-100 범위로 정규화
    const normalizedScore = Math.max(0, Math.min(100, weightedScore * 100));

    // 카테고리 결정
    const category = this.determineCategory(normalizedScore, criteria);

    // 신뢰도 계산 (제약 요소가 적을수록 높음)
    const constraints = criteria.securityCompliance + criteria.uniqueContext;
    const confidence = Math.max(0.5, 1 - (constraints / 200));

    return {
      score: Math.round(normalizedScore),
      category,
      confidence,
    };
  }

  /**
   * 카테고리 결정
   */
  private determineCategory(score: number, criteria: AutomationCriteria): TaskCategory {
    // 제약 요소가 높으면 Human-critical
    if (criteria.securityCompliance > 70 || criteria.uniqueContext > 70) {
      return 'Human-critical';
    }

    // 점수 기반 분류
    if (score >= 70) {
      return 'Automate';
    } else if (score >= 40) {
      return 'Co-pilot';
    } else {
      return 'Human-critical';
    }
  }

  /**
   * 키워드 기반 휴리스틱 점수
   */
  calculateKeywordScore(text: string): {
    automation: number;
    constraints: number;
    keywords: string[];
  } {
    const words = text.toLowerCase().split(/\s+/);
    let automationScore = 0;
    let constraintScore = 0;
    const foundKeywords: string[] = [];

    // 자동화 가능성 키워드
    for (const keyword of AUTOMATION_KEYWORDS.high) {
      if (words.some(word => word.includes(keyword))) {
        automationScore += 3;
        foundKeywords.push(keyword);
      }
    }

    for (const keyword of AUTOMATION_KEYWORDS.medium) {
      if (words.some(word => word.includes(keyword))) {
        automationScore += 2;
        foundKeywords.push(keyword);
      }
    }

    for (const keyword of AUTOMATION_KEYWORDS.low) {
      if (words.some(word => word.includes(keyword))) {
        automationScore += 1;
        foundKeywords.push(keyword);
      }
    }

    // 제약 요소 키워드
    for (const category of Object.values(CONSTRAINT_KEYWORDS)) {
      for (const keyword of category) {
        if (words.some(word => word.includes(keyword))) {
          constraintScore += 2;
          foundKeywords.push(keyword);
        }
      }
    }

    return {
      automation: Math.min(100, automationScore * 5),
      constraints: Math.min(100, constraintScore * 5),
      keywords: [...new Set(foundKeywords)],
    };
  }

  /**
   * ROI 추정
   */
  estimateROI(criteria: AutomationCriteria, category: TaskCategory): number {
    let baseROI = 0;

    switch (category) {
      case 'Automate':
        baseROI = 70 + (criteria.repeatability * 0.3);
        break;
      case 'Co-pilot':
        baseROI = 40 + (criteria.repeatability * 0.2);
        break;
      case 'Human-critical':
        baseROI = 10 + (criteria.repeatability * 0.1);
        break;
    }

    // 제약 요소로 인한 ROI 감소
    const constraintPenalty = (criteria.securityCompliance + criteria.uniqueContext) * 0.3;
    
    return Math.max(0, Math.min(100, baseROI - constraintPenalty));
  }

  /**
   * 구현 난이도 추정
   */
  estimateDifficulty(criteria: AutomationCriteria, category: TaskCategory): DifficultyLevel {
    let difficulty = 1;

    // API 접근성이 낮으면 난이도 증가
    if (criteria.apiAccess < 50) difficulty += 1;

    // 정형 데이터 비율이 낮으면 난이도 증가
    if (criteria.structuredData < 40) difficulty += 1;

    // 보안/규정 준수 요구사항이 높으면 난이도 증가
    if (criteria.securityCompliance > 60) difficulty += 1;

    // 고유 맥락 의존도가 높으면 난이도 증가
    if (criteria.uniqueContext > 60) difficulty += 1;

    // 카테고리별 기본 난이도
    switch (category) {
      case 'Automate':
        difficulty += 0;
        break;
      case 'Co-pilot':
        difficulty += 1;
        break;
      case 'Human-critical':
        difficulty += 2;
        break;
    }

    return Math.min(5, Math.max(1, difficulty)) as DifficultyLevel;
  }

  /**
   * 리스크 평가
   */
  assessRisks(criteria: AutomationCriteria, category: TaskCategory): string[] {
    const risks: string[] = [];

    if (criteria.securityCompliance > 60) {
      risks.push('보안 위반 위험');
      risks.push('규정 준수 실패 가능성');
    }

    if (criteria.uniqueContext > 60) {
      risks.push('맥락 이해 부족으로 인한 오류');
      risks.push('예외 상황 처리 실패');
    }

    if (criteria.apiAccess < 40) {
      risks.push('시스템 통합 복잡성');
      risks.push('데이터 동기화 문제');
    }

    if (criteria.qualityCriteria < 40) {
      risks.push('품질 기준 모호성');
      risks.push('결과 검증 어려움');
    }

    if (category === 'Co-pilot') {
      risks.push('인간-AI 협업 조율 필요');
    }

    return risks;
  }

  /**
   * 가드레일 제안
   */
  suggestSafeguards(criteria: AutomationCriteria, category: TaskCategory): string[] {
    const safeguards: string[] = [];

    if (criteria.securityCompliance > 40) {
      safeguards.push('다단계 승인 프로세스');
      safeguards.push('감사 로그 기록');
      safeguards.push('접근 권한 제어');
    }

    if (criteria.uniqueContext > 40) {
      safeguards.push('예외 상황 처리 로직');
      safeguards.push('인간 검토 단계');
      safeguards.push('롤백 메커니즘');
    }

    if (category === 'Co-pilot') {
      safeguards.push('AI 추천 표시');
      safeguards.push('사용자 확인 필수');
      safeguards.push('수동 오버라이드 옵션');
    }

    safeguards.push('정기적인 성능 모니터링');
    safeguards.push('오류 알림 시스템');

    return safeguards;
  }
}

// 기본 스코어러 인스턴스
export const defaultScorer = new AutomationScorer();
