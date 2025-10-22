export type Language = 'ko' | 'en';

export interface Translations {
  common: {
    analyze: string;
    loading: string;
    error: string;
    success: string;
    cancel: string;
    confirm: string;
    download: string;
    share: string;
    export: string;
    email: string;
    save: string;
    back: string;
    next: string;
    close: string;
  };
  hero: {
    title: string;
    subtitle: string;
    titleHighlight: string;
    description: string;
    demoButton: string;
    startButton: string;
    features: {
      automation: {
        title: string;
        description: string;
      };
      roi: {
        title: string;
        description: string;
      };
      guide: {
        title: string;
        description: string;
      };
    };
  };
  input: {
    title: string;
    subtitle: string;
    textPlaceholder: string;
    uploadLabel: string;
    uploadDescription: string;
    supportedFormats: string;
    analyzeButton: string;
    clearButton: string;
    sampleButton: string;
  };
  analysis: {
    title: string;
    overview: string;
    tasks: string;
    details: string;
    selectTask: string;
    noTaskSelected: string;
    demoMode: string;
    demoModeDescription: string;
  };
  summary: {
    title: string;
    totalTasks: string;
    automateTasks: string;
    copilotTasks: string;
    humanCriticalTasks: string;
    averageROI: string;
    highImpactTasks: string;
    automationScore: string;
    agentizationScore: string;
  };
  task: {
    category: {
      automate: string;
      copilot: string;
      humanCritical: string;
    };
    score: string;
    roi: string;
    difficulty: string;
    risks: string;
    safeguards: string;
    tools: string;
    reasoning: string;
    estimatedTime: string;
    generateRecipe: string;
    agentType: string;
    keyFeatures: string;
    expectedEffects: string;
  };
  agent: {
    types: {
      dataProcessing: string;
      customerService: string;
      contentGeneration: string;
      analysis: string;
      monitoring: string;
      workflow: string;
    };
    description: string;
    features: string;
    effects: string;
  };
  export: {
    title: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    sendButton: string;
    sending: string;
    success: string;
    error: string;
    format: string;
    includeTasks: string;
    includeRecipes: string;
    includeCode: string;
  };
  stats: {
    analyzed: string;
    averageROI: string;
    analysisTime: string;
    available: string;
  };
  advice: {
    title: string;
    subtitle: string;
    sections: {
      skills: {
        title: string;
        description: string;
        items: string[];
      };
      tools: {
        title: string;
        description: string;
        items: string[];
      };
      mindset: {
        title: string;
        description: string;
        items: string[];
      };
      nextSteps: {
        title: string;
        description: string;
        items: string[];
      };
    };
  };
}

export const translations: Record<Language, Translations> = {
  ko: {
    common: {
      analyze: '분석하기',
      loading: '처리 중...',
      error: '오류',
      success: '성공',
      cancel: '취소',
      confirm: '확인',
      download: '다운로드',
      share: '공유',
      export: '내보내기',
      email: '이메일',
      save: '저장',
      back: '뒤로',
      next: '다음',
      close: '닫기',
    },
    hero: {
      title: 'JDX',
      subtitle: '당신의 직무, 에이전트가 가능한지 확인해보세요',
      titleHighlight: '에이전트화',
      description: '반복 업무는 자동화로, 판단이 필요한 일은 더 똑똑하게.\nJob Description을 분석하여 AI 에이전트화 기회를 발견하세요.',
      demoButton: '데모 체험하기',
      startButton: '바로 시작하기',
      features: {
        automation: {
          title: '에이전트화 평가',
          description: 'AI가 각 업무의 에이전트화 가능성을 정확히 평가합니다',
        },
        roi: {
          title: 'ROI 분석',
          description: '시간 절감 효과와 투자 대비 수익을 계산합니다',
        },
        guide: {
          title: '구현 가이드',
          description: '단계별 레시피와 코드 예시를 제공합니다',
        },
      },
    },
    input: {
      title: 'JD 입력',
      subtitle: '텍스트를 직접 입력하거나 파일을 업로드하세요',
      textPlaceholder: '채용공고 내용을 입력하거나 붙여넣으세요...',
      uploadLabel: '파일 업로드',
      uploadDescription: '클릭하여 파일 선택 또는 드래그 앤 드롭',
      supportedFormats: '지원 형식: TXT, MD, PDF, DOCX',
      analyzeButton: 'AI 분석 시작',
      clearButton: '초기화',
      sampleButton: '샘플 데이터 사용',
    },
    analysis: {
      title: '분석 결과',
      overview: '요약',
      tasks: '작업 목록',
      details: '상세 정보',
      selectTask: '작업을 선택하세요',
      noTaskSelected: '좌측 목록에서 자동화하고 싶은 작업을 클릭하면 상세 정보를 확인할 수 있습니다.',
      demoMode: '데모 모드',
      demoModeDescription: '현재 HR 채용담당자 JD의 샘플 분석 결과를 보고 있습니다. 실제 JD를 입력하여 분석해보세요!',
    },
    summary: {
      title: '분석 요약',
      totalTasks: '총 작업 수',
      automateTasks: '자동화 가능',
      copilotTasks: 'AI 협업',
      humanCriticalTasks: '인간 중심',
      averageROI: '평균 ROI',
      highImpactTasks: '고효과 작업',
      automationScore: '자동화 점수',
      agentizationScore: '에이전트화 점수',
    },
    task: {
      category: {
        automate: '자동화 가능',
        copilot: 'AI 협업',
        humanCritical: '인간 중심',
      },
      score: '자동화 점수',
      roi: 'ROI',
      difficulty: '구현 난이도',
      risks: '리스크',
      safeguards: '안전장치',
      tools: '필요 도구',
      reasoning: '평가 근거',
      estimatedTime: '예상 구현 시간',
      generateRecipe: '레시피 생성',
      agentType: '에이전트 유형',
      keyFeatures: '주요 기능',
      expectedEffects: '기대 효과',
    },
    agent: {
      types: {
        dataProcessing: '데이터 처리 에이전트',
        customerService: '고객 서비스 에이전트',
        contentGeneration: '콘텐츠 생성 에이전트',
        analysis: '분석 에이전트',
        monitoring: '모니터링 에이전트',
        workflow: '워크플로우 에이전트',
      },
      description: '에이전트 설명',
      features: '주요 기능',
      effects: '기대 효과',
    },
    export: {
      title: 'PDF 내보내기',
      subtitle: '분석 결과를 PDF로 변환하여 이메일로 전송합니다',
      emailLabel: '이메일 주소',
      emailPlaceholder: 'example@company.com',
      sendButton: '전송하기',
      sending: '전송 중...',
      success: '이메일이 성공적으로 전송되었습니다!',
      error: '이메일 전송에 실패했습니다. 다시 시도해주세요.',
      format: '형식',
      includeTasks: '작업 포함',
      includeRecipes: '레시피 포함',
      includeCode: '코드 포함',
    },
    stats: {
      analyzed: '분석된 JD',
      averageROI: '평균 ROI',
      analysisTime: '분석 시간',
      available: '사용 가능',
    },
    advice: {
      title: '에이전트 활용을 위한 조언',
      subtitle: '당신의 직무에 맞는 에이전트 활용 전략을 확인하세요',
      sections: {
        skills: {
          title: '필수 스킬',
          description: '에이전트와 효과적으로 협업하기 위해 필요한 핵심 역량',
          items: [
            '프롬프트 엔지니어링: AI에게 명확하고 구체적인 지시를 내리는 기술',
            '데이터 분석: 에이전트의 출력을 검증하고 개선점을 찾는 능력',
            '워크플로우 설계: 반복 작업을 체계적으로 구조화하는 사고방식',
            '품질 관리: 자동화된 결과의 정확성과 일관성을 모니터링하는 능력'
          ]
        },
        tools: {
          title: '추천 도구',
          description: '에이전트 개발과 관리에 유용한 플랫폼과 도구들',
          items: [
            'OpenAI API: GPT 모델을 활용한 텍스트 처리 에이전트',
            'Zapier/Make: 비즈니스 프로세스 자동화 플랫폼',
            'LangChain: 복잡한 AI 애플리케이션 구축 프레임워크',
            'Microsoft Power Automate: 엔터프라이즈 워크플로우 자동화'
          ]
        },
        mindset: {
          title: '마인드셋 전환',
          description: '에이전트 시대에 적응하기 위한 사고방식의 변화',
          items: [
            '협업 중심: 에이전트를 경쟁 상대가 아닌 업무 파트너로 인식',
            '지속적 학습: AI 기술 발전에 맞춰 끊임없이 새로운 기능을 습득',
            '창의적 활용: 기존 업무 방식을 혁신적으로 재구성하는 시각',
            '윤리적 고려: AI 사용 시 프라이버시와 편향성 문제를 고려한 판단'
          ]
        },
        nextSteps: {
          title: '다음 단계',
          description: '에이전트 활용 역량을 키우기 위한 구체적인 실행 계획',
          items: [
            '1주차: 현재 업무 중 반복적인 부분을 식별하고 목록화',
            '2주차: 간단한 자동화 도구(Zapier 등)로 첫 번째 워크플로우 구축',
            '3주차: AI 도구를 활용해 업무 효율성 개선 실험',
            '4주차: 팀원들과 에이전트 활용 경험을 공유하고 피드백 수집'
          ]
        }
      }
    },
  },
  en: {
    common: {
      analyze: 'Analyze',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      download: 'Download',
      share: 'Share',
      export: 'Export',
      email: 'Email',
      save: 'Save',
      back: 'Back',
      next: 'Next',
      close: 'Close',
    },
    hero: {
      title: 'JDX',
      subtitle: 'Check if your job can be automated with agents',
      titleHighlight: 'Agentization',
      description: 'Automate repetitive tasks, make judgment calls smarter.\nAnalyze Job Descriptions to discover AI agentization opportunities.',
      demoButton: 'Try Demo',
      startButton: 'Get Started',
      features: {
        automation: {
          title: 'Agentization Assessment',
          description: 'AI accurately evaluates the agentization potential of each task',
        },
        roi: {
          title: 'ROI Analysis',
          description: 'Calculates time savings and return on investment',
        },
        guide: {
          title: 'Implementation Guide',
          description: 'Provides step-by-step recipes and code examples',
        },
      },
    },
    input: {
      title: 'JD Input',
      subtitle: 'Enter text directly or upload a file',
      textPlaceholder: 'Enter or paste job description...',
      uploadLabel: 'Upload File',
      uploadDescription: 'Click to select file or drag and drop',
      supportedFormats: 'Supported formats: TXT, MD, PDF, DOCX',
      analyzeButton: 'Start AI Analysis',
      clearButton: 'Clear',
      sampleButton: 'Use Sample Data',
    },
    analysis: {
      title: 'Analysis Results',
      overview: 'Overview',
      tasks: 'Task List',
      details: 'Details',
      selectTask: 'Select a task',
      noTaskSelected: 'Click on a task from the left list to view detailed information.',
      demoMode: 'Demo Mode',
      demoModeDescription: 'You are currently viewing sample analysis results for an HR Recruiter JD. Enter your actual JD to analyze!',
    },
    summary: {
      title: 'Analysis Summary',
      totalTasks: 'Total Tasks',
      automateTasks: 'Automate',
      copilotTasks: 'AI Co-pilot',
      humanCriticalTasks: 'Human-Critical',
      averageROI: 'Average ROI',
      highImpactTasks: 'High Impact Tasks',
      automationScore: 'Automation Score',
      agentizationScore: 'Agentization Score',
    },
    task: {
      category: {
        automate: 'Automate',
        copilot: 'AI Co-pilot',
        humanCritical: 'Human-Critical',
      },
      score: 'Automation Score',
      roi: 'ROI',
      difficulty: 'Implementation Difficulty',
      risks: 'Risks',
      safeguards: 'Safeguards',
      tools: 'Required Tools',
      reasoning: 'Evaluation Reasoning',
      estimatedTime: 'Estimated Time',
      generateRecipe: 'Generate Recipe',
      agentType: 'Agent Type',
      keyFeatures: 'Key Features',
      expectedEffects: 'Expected Effects',
    },
    agent: {
      types: {
        dataProcessing: 'Data Processing Agent',
        customerService: 'Customer Service Agent',
        contentGeneration: 'Content Generation Agent',
        analysis: 'Analysis Agent',
        monitoring: 'Monitoring Agent',
        workflow: 'Workflow Agent',
      },
      description: 'Agent Description',
      features: 'Key Features',
      effects: 'Expected Effects',
    },
    export: {
      title: 'Export to PDF',
      subtitle: 'Convert analysis results to PDF and send via email',
      emailLabel: 'Email Address',
      emailPlaceholder: 'example@company.com',
      sendButton: 'Send',
      sending: 'Sending...',
      success: 'Email sent successfully!',
      error: 'Failed to send email. Please try again.',
      format: 'Format',
      includeTasks: 'Include Tasks',
      includeRecipes: 'Include Recipes',
      includeCode: 'Include Code',
    },
    stats: {
      analyzed: 'Analyzed JDs',
      averageROI: 'Average ROI',
      analysisTime: 'Analysis Time',
      available: 'Available',
    },
    advice: {
      title: 'Agent Utilization Advice',
      subtitle: 'Discover agent utilization strategies tailored to your role',
      sections: {
        skills: {
          title: 'Essential Skills',
          description: 'Core competencies needed to effectively collaborate with agents',
          items: [
            'Prompt Engineering: The art of giving clear and specific instructions to AI',
            'Data Analysis: Ability to validate agent outputs and identify improvements',
            'Workflow Design: Systematic thinking for structuring repetitive tasks',
            'Quality Management: Monitoring accuracy and consistency of automated results'
          ]
        },
        tools: {
          title: 'Recommended Tools',
          description: 'Platforms and tools useful for agent development and management',
          items: [
            'OpenAI API: Text processing agents using GPT models',
            'Zapier/Make: Business process automation platforms',
            'LangChain: Framework for building complex AI applications',
            'Microsoft Power Automate: Enterprise workflow automation'
          ]
        },
        mindset: {
          title: 'Mindset Shift',
          description: 'Changes in thinking required to adapt to the agent era',
          items: [
            'Collaboration Focus: View agents as work partners, not competitors',
            'Continuous Learning: Constantly acquire new skills as AI technology advances',
            'Creative Application: Innovative perspective on restructuring existing workflows',
            'Ethical Consideration: Judgment considering privacy and bias issues in AI use'
          ]
        },
        nextSteps: {
          title: 'Next Steps',
          description: 'Concrete action plan to develop agent utilization capabilities',
          items: [
            'Week 1: Identify and list repetitive parts of current work',
            'Week 2: Build first workflow using simple automation tools (Zapier, etc.)',
            'Week 3: Experiment with AI tools to improve work efficiency',
            'Week 4: Share agent utilization experiences with team members and collect feedback'
          ]
        }
      }
    },
  },
};

export function useTranslation(lang: Language) {
  return translations[lang];
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return typeof value === 'string' ? value : key;
}
