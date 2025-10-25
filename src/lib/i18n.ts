import { Language } from '@/types';

export const translations = {
  ko: {
    nav: {
      home: '홈',
      enterprise: '기업 분석',
      personal: '개인 분석',
      process: '분석 과정',
      consulting: '컨설팅',
      contact: '문의하기',
      language: '언어',
    },
    hero: {
      title: 'AI 에이전트로 비즈니스 혁신',
      subtitle: '직무 분석을 통해 생산성과 효율성을 극대화하세요',
      description: '기업의 직무 설명서와 개인의 이력서를 분석하여 AI 에이전트로 자동화 가능한 업무를 찾아드립니다.',
      enterpriseCta: '기업 분석 시작',
      personalCta: '개인 분석 시작',
      demoCta: '데모 체험하기',
    },
    features: {
      title: '왜 AI 에이전트 변환이 필요한가요?',
      subtitle: '기업의 지속적인 성장을 위한 생산성 혁신',
      items: [
        {
          title: '직무 자동화 분석',
          description: 'JD를 분석하여 AI 에이전트로 변환 가능한 업무를 식별합니다.',
          icon: 'Search',
        },
        {
          title: '개인 역량 분석',
          description: '이력서를 분석하여 개인의 AI 에이전트 활용 가능성을 평가합니다.',
          icon: 'User',
        },
        {
          title: '상세 분석 리포트',
          description: '변환 가능성, 기대효과, 필요 스킬을 상세히 분석합니다.',
          icon: 'FileText',
        },
        {
          title: '맞춤형 솔루션',
          description: '기업과 개인의 특성에 맞는 AI 에이전트 솔루션을 제안합니다.',
          icon: 'Target',
        },
      ],
    },
    process: {
      title: '분석 과정',
      subtitle: '데이터 수집부터 결과 도출까지의 체계적인 프로세스',
      steps: [
        {
          id: 'collect',
          title: '데이터 수집',
          description: 'JD 또는 이력서를 업로드하고 관련 정보를 수집합니다.',
          details: [
            '문서 파싱 및 텍스트 추출',
            '키워드 및 핵심 업무 식별',
            '업무 프로세스 매핑',
            '데이터 품질 검증',
          ],
        },
        {
          id: 'analyze',
          title: 'AI 분석',
          description: '고급 AI 모델을 사용하여 자동화 가능성을 분석합니다.',
          details: [
            '자연어 처리 및 의미 분석',
            '업무 복잡도 평가',
            '자동화 적합성 점수 산출',
            '위험 요소 및 제약사항 식별',
          ],
        },
        {
          id: 'transform',
          title: '변환 설계',
          description: 'AI 에이전트로 변환하기 위한 구체적인 방안을 설계합니다.',
          details: [
            'AI 에이전트 아키텍처 설계',
            '필요 기술 스택 정의',
            '구현 로드맵 수립',
            '성과 지표 설정',
          ],
        },
        {
          id: 'deliver',
          title: '결과 제공',
          description: '상세한 분석 리포트와 실행 가이드를 제공합니다.',
          details: [
            '종합 분석 리포트 생성',
            '시각화된 결과 제공',
            '이메일 발송 서비스',
            '후속 컨설팅 연결',
          ],
        },
      ],
    },
    success: {
      title: '성공 사례',
      subtitle: '다양한 업종의 기업들이 경험한 변화',
      feedback: [
        {
          company: '테크스타트업 A',
          industry: 'IT/소프트웨어',
          testimonial: 'AI 에이전트 도입으로 개발팀의 반복 업무가 70% 감소했습니다.',
          author: '김개발',
          position: 'CTO',
          metrics: {
            productivity: '+150%',
            efficiency: '+200%',
            costSavings: '60% 절감',
          },
        },
        {
          company: '제조업체 B',
          industry: '제조업',
          testimonial: '생산 계획 수립이 자동화되어 운영 효율성이 크게 향상되었습니다.',
          author: '박생산',
          position: '생산팀장',
          metrics: {
            productivity: '+120%',
            efficiency: '+180%',
            costSavings: '45% 절감',
          },
        },
        {
          company: '금융회사 C',
          industry: '금융',
          testimonial: '고객 상담 업무의 AI 에이전트화로 서비스 품질이 향상되었습니다.',
          author: '이고객',
          position: '고객서비스팀장',
          metrics: {
            productivity: '+130%',
            efficiency: '+160%',
            costSavings: '50% 절감',
          },
        },
      ],
    },
    consulting: {
      title: '맞춤형 컨설팅 서비스',
      subtitle: '기업의 특성에 맞는 AI 에이전트 전환 전략',
      services: [
        {
          title: '현황 분석',
          description: '기업의 현재 업무 프로세스를 분석하여 자동화 가능 영역을 식별합니다.',
        },
        {
          title: '전략 수립',
          description: 'AI 에이전트 도입 로드맵과 단계별 실행 계획을 수립합니다.',
        },
        {
          title: '구현 지원',
          description: 'AI 에이전트 개발 및 도입 과정을 전담 지원합니다.',
        },
        {
          title: '운영 최적화',
          description: '도입 후 성과 측정 및 지속적인 개선 방안을 제시합니다.',
        },
      ],
    },
    contact: {
      title: '문의하기',
      subtitle: 'AI 에이전트 변환에 대한 궁금한 점을 문의해주세요',
      form: {
        name: '성명',
        department: '부서',
        email: '이메일 주소',
        company: '회사명',
        inquiry: '문의 내용',
        type: '문의 유형',
        submit: '문의하기',
        types: {
          enterprise: '기업 분석 문의',
          consulting: '컨설팅 문의',
          general: '일반 문의',
        },
      },
      info: {
        title: '연락처 정보',
        email: 'contact@aiagent.com',
        phone: '+82-2-1234-5678',
        address: '서울특별시 강남구 테헤란로 123',
      },
    },
    footer: {
      company: {
        name: 'AI Agent Transformation',
        description: '기업과 개인의 생산성 혁신을 위한 AI 에이전트 솔루션',
      },
      links: {
        product: '제품',
        company: '회사',
        resources: '리소스',
        support: '지원',
      },
      legal: {
        privacy: '개인정보처리방침',
        terms: '이용약관',
        cookies: '쿠키 정책',
      },
      copyright: '© 2024 AI Agent Transformation. All rights reserved.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      enterprise: 'Enterprise Analysis',
      personal: 'Personal Analysis',
      process: 'Process',
      consulting: 'Consulting',
      contact: 'Contact',
      language: 'Language',
    },
    hero: {
      title: 'Transform Your Business with AI Agents',
      subtitle: 'Maximize productivity and efficiency through job analysis',
      description: 'Analyze job descriptions and resumes to identify tasks that can be automated with AI agents.',
      enterpriseCta: 'Start Enterprise Analysis',
      personalCta: 'Start Personal Analysis',
      demoCta: 'Try Demo',
    },
    features: {
      title: 'Why AI Agent Transformation?',
      subtitle: 'Productivity innovation for sustainable business growth',
      items: [
        {
          title: 'Job Automation Analysis',
          description: 'Analyze job descriptions to identify tasks that can be transformed into AI agents.',
          icon: 'Search',
        },
        {
          title: 'Personal Capability Analysis',
          description: 'Analyze resumes to evaluate personal potential for AI agent utilization.',
          icon: 'User',
        },
        {
          title: 'Detailed Analysis Report',
          description: 'Provide detailed analysis of transformation potential, expected effects, and required skills.',
          icon: 'FileText',
        },
        {
          title: 'Customized Solutions',
          description: 'Propose AI agent solutions tailored to the characteristics of enterprises and individuals.',
          icon: 'Target',
        },
      ],
    },
    process: {
      title: 'Analysis Process',
      subtitle: 'Systematic process from data collection to result derivation',
      steps: [
        {
          id: 'collect',
          title: 'Data Collection',
          description: 'Upload JD or resume and collect relevant information.',
          details: [
            'Document parsing and text extraction',
            'Keyword and core task identification',
            'Work process mapping',
            'Data quality validation',
          ],
        },
        {
          id: 'analyze',
          title: 'AI Analysis',
          description: 'Analyze automation potential using advanced AI models.',
          details: [
            'Natural language processing and semantic analysis',
            'Task complexity assessment',
            'Automation suitability scoring',
            'Risk factors and constraints identification',
          ],
        },
        {
          id: 'transform',
          title: 'Transformation Design',
          description: 'Design specific solutions for AI agent transformation.',
          details: [
            'AI agent architecture design',
            'Required technology stack definition',
            'Implementation roadmap establishment',
            'Performance metrics setting',
          ],
        },
        {
          id: 'deliver',
          title: 'Result Delivery',
          description: 'Provide detailed analysis reports and execution guides.',
          details: [
            'Comprehensive analysis report generation',
            'Visualized results provision',
            'Email delivery service',
            'Follow-up consulting connection',
          ],
        },
      ],
    },
    success: {
      title: 'Success Stories',
      subtitle: 'Changes experienced by companies in various industries',
      feedback: [
        {
          company: 'Tech Startup A',
          industry: 'IT/Software',
          testimonial: 'AI agent implementation reduced repetitive tasks by 70% in our development team.',
          author: 'Kim Developer',
          position: 'CTO',
          metrics: {
            productivity: '+150%',
            efficiency: '+200%',
            costSavings: '60% Reduction',
          },
        },
        {
          company: 'Manufacturing B',
          industry: 'Manufacturing',
          testimonial: 'Automated production planning significantly improved operational efficiency.',
          author: 'Park Production',
          position: 'Production Manager',
          metrics: {
            productivity: '+120%',
            efficiency: '+180%',
            costSavings: '45% Reduction',
          },
        },
        {
          company: 'Financial C',
          industry: 'Finance',
          testimonial: 'AI agent transformation of customer service tasks improved service quality.',
          author: 'Lee Customer',
          position: 'Customer Service Manager',
          metrics: {
            productivity: '+130%',
            efficiency: '+160%',
            costSavings: '50% Reduction',
          },
        },
      ],
    },
    consulting: {
      title: 'Customized Consulting Services',
      subtitle: 'AI agent transformation strategy tailored to your company',
      services: [
        {
          title: 'Current State Analysis',
          description: 'Analyze current business processes to identify automation opportunities.',
        },
        {
          title: 'Strategy Development',
          description: 'Develop AI agent implementation roadmap and phased execution plans.',
        },
        {
          title: 'Implementation Support',
          description: 'Provide dedicated support for AI agent development and implementation.',
        },
        {
          title: 'Operation Optimization',
          description: 'Present performance measurement and continuous improvement plans after implementation.',
        },
      ],
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Please inquire about AI agent transformation',
      form: {
        name: 'Name',
        department: 'Department',
        email: 'Email Address',
        company: 'Company',
        inquiry: 'Inquiry',
        type: 'Inquiry Type',
        submit: 'Submit Inquiry',
        types: {
          enterprise: 'Enterprise Analysis Inquiry',
          consulting: 'Consulting Inquiry',
          general: 'General Inquiry',
        },
      },
      info: {
        title: 'Contact Information',
        email: 'contact@aiagent.com',
        phone: '+82-2-1234-5678',
        address: '123 Teheran-ro, Gangnam-gu, Seoul',
      },
    },
    footer: {
      company: {
        name: 'AI Agent Transformation',
        description: 'AI agent solutions for productivity innovation of enterprises and individuals',
      },
      links: {
        product: 'Product',
        company: 'Company',
        resources: 'Resources',
        support: 'Support',
      },
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Policy',
      },
      copyright: '© 2024 AI Agent Transformation. All rights reserved.',
    },
  },
};

export function useTranslation(language: Language) {
  return translations[language];
}
