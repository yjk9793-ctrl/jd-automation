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
      title: '당신의 JD,',
      subtitle: 'AI 에이전트화 관점에서 다시 보기',
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
      title: 'Your JD,',
      subtitle: 'Reimagined from an AI Agentization Perspective',
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
