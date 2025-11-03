import { Language } from '@/types';

export const translations = {
  ko: {
    nav: {
      home: '홈',
      enterprise: 'JD 직무분석',
      personal: '개인 이력분석',
      process: '분석 과정',
      consulting: '컨설팅',
      contact: '문의하기',
      language: '언어',
    },
    hero: {
      title: 'AI 에이전트로 비즈니스 혁신',
      subtitle: '직무 분석을 통해 생산성과 효율성을 극대화하세요',
      description: '기업의 직무 설명서와 개인의 이력서를 분석하여 AI 에이전트로 자동화 가능한 업무를 찾아드립니다.',
      enterpriseCta: 'JD 직무분석',
      personalCta: '개인 이력분석',
      demoCta: '데모 체험하기',
    },
    features: {
      title: '왜 AI 에이전트 변환이 필요한가요?',
      subtitle: 'AI 에이전트로 비즈니스 패러다임을 전환하세요',
      items: [
        {
          title: '생산성 극대화 및 업무 자동화',
          subtitle: 'Productivity & Automation',
          description: 'AI 에이전트는 반복적이고 정형화된 업무를 자율적으로 처리하여 직원들이 더 전략적이고 창의적인 업무에 집중할 수 있도록 시간을 확보해 줍니다. 에이전트가 고객 지원, 데이터 분석, 보고서 작성, 공급망 최적화 등의 업무를 24시간 일관되게 수행함으로써 업무 처리 속도가 획기적으로 개선되고 인적 오류가 최소화되어 전사적인 생산성이 극대화됩니다.',
          icon: 'Zap',
        },
        {
          title: '성과 중심 조직문화 정착',
          subtitle: 'Performance-Driven Culture',
          description: '에이전트 도입은 일 중심의 문화로 조직을 재편하는 핵심 도구입니다. 사람이 아닌 AI 에이전트가 일(Task) 자체를 수행하게 되면서, 조직의 초점은 "누가 일했는가"에서 "일의 결과(성과)"로 이동합니다. 또한 최적화된 조직모델을 만들 수 있습니다. 직원은 에이전트에게 명확한 목표와 계획을 수립하고 결과를 감독하는 전략적 파트너 역할을 수행합니다. 이는 곧 데이터 기반의 정확한 성과 측정과 객관적인 평가를 가능하게 하여 성과 중심 문화를 정착시킵니다.',
          icon: 'Target',
        },
        {
          title: '운영 비용 절감 및 최적화',
          subtitle: 'Cost Reduction & Optimization',
          description: 'AI 에이전트는 시간당 비용이 발생하지 않고, 대규모의 반복 작업을 빠르게 처리함으로써 인건비를 포함한 운영 비용을 대폭 절감합니다. 에이전트가 전체 직원의 30% 이상의 인력 대체 효과를 가져올 수 있으며, 최소한 "AI를 잘 활용하는 1인"이 채용할 2~3인분의 일을 처리할 수 있는 수준으로 업무 자동화가 가능해집니다.',
          icon: 'TrendingDown',
        },
        {
          title: '신속한 의사결정 및 경쟁력 확보',
          subtitle: 'Agile Decision-Making & Competitiveness',
          description: 'AI 에이전트는 실시간으로 수많은 데이터를 수집, 분석, 추론하고, 그 결과를 바탕으로 자율적인 의사결정 및 행동 실행까지 가능하게 합니다. 인간이 처리하기 어려운 방대한 양의 정보를 바탕으로 정확도 높은 예측 분석을 제공하여 경영진의 의사결정 속도를 획기적으로 단축시킵니다. 이는 급변하는 시장 환경에 신속하게 대응할 수 있는 민첩성(Agility)을 기업에 부여하여 선도 기업과의 격차를 벌리거나 후발 기업이 빠르게 추격할 수 있는 핵심 경쟁력이 됩니다.',
          icon: 'TrendingUp',
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
      title: '기업 맞춤형 컨설팅 서비스',
      subtitle: '단계별 체계적인 AI 에이전트 전환 프로세스',
      steps: [
        {
          step: '1단계',
          title: '현황 진단 및 전략 로드맵 수립',
          icon: 'SearchCheck',
          details: [
            {
              title: '업무 비효율 진단',
              description: '조직 내 반복적/정형화된 비효율 업무를 식별하고, 에이전트 도입 시 가장 큰 개선 효과를 가져올 핵심 영역을 분석합니다.',
            },
            {
              title: 'AI 잠재력 평가',
              description: '고객사의 기술 인프라 및 데이터 환경을 평가하여 에이전트 시스템 통합 가능성을 진단하고, ROI 목표를 설정합니다.',
            },
            {
              title: '로드맵 설계',
              description: '단기 파일럿(Pilot) 목표부터 장기 전사 통합 목표까지, 단계별 전환 로드맵과 거버넌스 체계를 수립합니다.',
            },
          ],
        },
        {
          step: '2단계',
          title: '파일럿 에이전트 설계 및 PoC',
          icon: 'FlaskConical',
          details: [
            {
              title: '핵심 Use Case 선정',
              description: '성공 가능성이 높고 측정 용이한 파일럿 프로젝트를 선정하고, 수행할 에이전트의 구체적인 역할(Goal)과 기능(Tool)을 정의합니다.',
            },
            {
              title: 'PoC 실행 및 검증',
              description: '실제 데이터 환경에서 에이전트를 구축하고 제한적으로 테스트하여 기술적 실현 가능성과 업무 목표 달성 여부를 중점적으로 검증합니다.',
            },
            {
              title: '성과 분석',
              description: '파일럿 결과를 바탕으로 정량적/정성적 KPI를 측정하고, 초기 모델의 개선점을 도출하여 확장 모델의 완성도를 높입니다.',
            },
          ],
        },
        {
          step: '3단계',
          title: '전사적 확장 및 통합 아키텍처 구축',
          icon: 'Network',
          details: [
            {
              title: '확산 및 통합 전략',
              description: '파일럿 모델을 다른 부서 및 유사 업무로 순차적으로 확장하고, 다양한 에이전트들을 관리할 중앙 집중식 플랫폼을 구축합니다.',
            },
            {
              title: '시스템 연동',
              description: '에이전트의 자율적 업무 수행을 위해 ERP, CRM 등 핵심 기간 시스템과의 API 연동을 완료하고 데이터 흐름을 최적화합니다.',
            },
            {
              title: '조직 개편 및 교육',
              description: '에이전트 도입에 따른 조직 역할 변화(Role Transformation) 방안을 제시하고, 직원들이 에이전트와 협업하는 방식을 익히도록 맞춤형 교육을 제공합니다.',
            },
          ],
        },
        {
          step: '4단계',
          title: '운영 관리 및 지속적 성능 최적화',
          icon: 'BarChart3',
          details: [
            {
              title: '운영 모니터링',
              description: '에이전트의 성능, 오류율, 비용 효율 등을 실시간으로 감시하는 대시보드를 구축하고, 운영 거버넌스를 확립합니다.',
            },
            {
              title: '지속적 성능 고도화',
              description: '실제 운영 데이터를 바탕으로 에이전트의 프롬프트, 로직, 도구 연동을 정기적으로 개선하여 최적의 성과를 유지합니다.',
            },
            {
              title: '피드백 및 업그레이드',
              description: '사용자 피드백을 수집하여 에이전트 개선에 반영하는 선순환 구조를 확립하고, 최신 AI 기술을 반영한 시스템 업그레이드를 제안합니다.',
            },
          ],
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
        name: 'JDX Transformation',
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
      copyright: '© 2024 JDX Transformation. All rights reserved.',
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
      title: 'Why JDX Transformation?',
      subtitle: 'Transform Your Business Paradigm with AI Agents',
      items: [
        {
          title: 'Productivity Maximization & Automation',
          subtitle: 'Productivity & Automation',
          description: 'AI agents autonomously handle repetitive and standardized tasks, freeing up time for employees to focus on more strategic and creative work. By consistently performing tasks such as customer support, data analysis, report writing, and supply chain optimization 24/7, processing speed improves dramatically and human errors are minimized, maximizing overall productivity.',
          icon: 'Zap',
        },
        {
          title: 'Performance-Driven Culture',
          subtitle: 'Performance-Driven Culture',
          description: 'Agent adoption is a key tool for reorganizing the organization into a task-centered culture. As AI agents, rather than people, perform the tasks themselves, the organizational focus shifts from "who did the work" to "the results of the work." This enables data-based accurate performance measurement and objective evaluation, establishing a performance-driven culture.',
          icon: 'Target',
        },
        {
          title: 'Cost Reduction & Optimization',
          subtitle: 'Cost Reduction & Optimization',
          description: 'AI agents do not incur hourly costs and can handle large-scale repetitive tasks quickly, significantly reducing operational costs including labor costs. Agents can replace 30% or more of the total workforce, enabling automation to the level where one person good at utilizing AI can do the work of 2-3 people.',
          icon: 'TrendingDown',
        },
        {
          title: 'Agile Decision-Making & Competitiveness',
          subtitle: 'Agile Decision-Making & Competitiveness',
          description: 'AI agents can collect, analyze, and reason from vast amounts of data in real time, and based on the results, make autonomous decisions and execute actions. By providing highly accurate predictive analysis based on overwhelming amounts of information difficult for humans to process, they dramatically shorten decision-making speed for management, becoming a key competitive advantage.',
          icon: 'TrendingUp',
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
      title: 'Enterprise Custom Consulting Services',
      subtitle: 'Systematic step-by-step AI Agent transformation process',
      steps: [
        {
          step: 'Step 1',
          title: 'Current State Diagnosis & Strategic Roadmap',
          icon: 'SearchCheck',
          details: [
            {
              title: 'Work Inefficiency Diagnosis',
              description: 'Identify repetitive and standardized inefficient tasks within the organization and analyze key areas that will bring the greatest improvement effect when introducing agents.',
            },
            {
              title: 'AI Potential Assessment',
              description: 'Evaluate the customer\'s technology infrastructure and data environment to diagnose the feasibility of agent system integration and set ROI goals.',
            },
            {
              title: 'Roadmap Design',
              description: 'Establish a phased transformation roadmap and governance system from short-term pilot goals to long-term enterprise-wide integration goals.',
            },
          ],
        },
        {
          step: 'Step 2',
          title: 'Pilot Agent Design & PoC',
          icon: 'FlaskConical',
          details: [
            {
              title: 'Key Use Case Selection',
              description: 'Select pilot projects with high success potential and easy measurement, and define specific roles (Goal) and functions (Tool) of agents to be performed.',
            },
            {
              title: 'PoC Execution & Validation',
              description: 'Build and test agents in a real data environment to verify technical feasibility and achievement of business goals.',
            },
            {
              title: 'Performance Analysis',
              description: 'Measure quantitative and qualitative KPIs based on pilot results and identify improvement points for the initial model to increase the completeness of the expansion model.',
            },
          ],
        },
        {
          step: 'Step 3',
          title: 'Enterprise-wide Expansion & Integration Architecture',
          icon: 'Network',
          details: [
            {
              title: 'Spread & Integration Strategy',
              description: 'Sequentially expand the pilot model to other departments and similar tasks, and build a centralized platform to manage various agents.',
            },
            {
              title: 'System Integration',
              description: 'Complete API integration with core legacy systems such as ERP and CRM for autonomous agent task execution and optimize data flow.',
            },
            {
              title: 'Organizational Restructuring & Training',
              description: 'Present organizational role transformation plans following agent introduction and provide customized training for employees to learn how to collaborate with agents.',
            },
          ],
        },
        {
          step: 'Step 4',
          title: 'Operations Management & Continuous Performance Optimization',
          icon: 'BarChart3',
          details: [
            {
              title: 'Operations Monitoring',
              description: 'Build dashboards to monitor agent performance, error rates, and cost efficiency in real time and establish operational governance.',
            },
            {
              title: 'Continuous Performance Enhancement',
              description: 'Regularly improve agent prompts, logic, and tool integration based on actual operational data to maintain optimal performance.',
            },
            {
              title: 'Feedback & Upgrade',
              description: 'Establish a virtuous cycle structure that collects user feedback and reflects it in agent improvements, and propose system upgrades incorporating the latest AI technology.',
            },
          ],
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
        name: 'JDX Transformation',
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
      copyright: '© 2024 JDX Transformation. All rights reserved.',
    },
  },
};

export function useTranslation(language: Language) {
  return translations[language];
}
