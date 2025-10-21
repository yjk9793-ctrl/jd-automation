'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Wrench, 
  Lightbulb, 
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useTranslation, Language } from '@/lib/i18n';

interface AgentAdviceProps {
  language: Language;
  jobRole?: string;
}

export function AgentAdvice({ language, jobRole }: AgentAdviceProps) {
  const t = useTranslation(language);

  const getRoleSpecificAdvice = (role?: string) => {
    if (!role) return null;

    const roleAdvice = {
      'HR': {
        ko: {
          skills: ['채용 프로세스 자동화', '면접 질문 생성', '인사 데이터 분석'],
          tools: ['ATS 시스템', 'LinkedIn Recruiter', 'Calendly'],
          focus: '인재 채용과 관리의 효율성 극대화'
        },
        en: {
          skills: ['Recruitment Process Automation', 'Interview Question Generation', 'HR Data Analysis'],
          tools: ['ATS Systems', 'LinkedIn Recruiter', 'Calendly'],
          focus: 'Maximize efficiency in talent acquisition and management'
        }
      },
      'Marketing': {
        ko: {
          skills: ['콘텐츠 자동 생성', '소셜미디어 관리', '캠페인 분석'],
          tools: ['Hootsuite', 'Canva', 'Google Analytics'],
          focus: '창의적 콘텐츠와 데이터 기반 마케팅 전략'
        },
        en: {
          skills: ['Content Auto-Generation', 'Social Media Management', 'Campaign Analysis'],
          tools: ['Hootsuite', 'Canva', 'Google Analytics'],
          focus: 'Creative content and data-driven marketing strategies'
        }
      },
      'Sales': {
        ko: {
          skills: ['리드 자동화', '고객 분석', '영업 보고서 생성'],
          tools: ['Salesforce', 'HubSpot', 'Zoom'],
          focus: '영업 프로세스 최적화와 고객 관계 관리'
        },
        en: {
          skills: ['Lead Automation', 'Customer Analysis', 'Sales Report Generation'],
          tools: ['Salesforce', 'HubSpot', 'Zoom'],
          focus: 'Sales process optimization and customer relationship management'
        }
      },
      'Developer': {
        ko: {
          skills: ['코드 자동 생성', '버그 분석', '문서화 자동화'],
          tools: ['GitHub Copilot', 'ChatGPT', 'Jira'],
          focus: '개발 생산성 향상과 코드 품질 관리'
        },
        en: {
          skills: ['Code Auto-Generation', 'Bug Analysis', 'Documentation Automation'],
          tools: ['GitHub Copilot', 'ChatGPT', 'Jira'],
          focus: 'Development productivity enhancement and code quality management'
        }
      }
    };

    return roleAdvice[role as keyof typeof roleAdvice]?.[language] || null;
  };

  const roleAdvice = getRoleSpecificAdvice(jobRole);

  const sections = [
    {
      key: 'skills',
      icon: Brain,
      color: 'bg-blue-500',
      title: t.advice.sections.skills.title,
      description: t.advice.sections.skills.description,
      items: roleAdvice?.skills || t.advice.sections.skills.items
    },
    {
      key: 'tools',
      icon: Wrench,
      color: 'bg-green-500',
      title: t.advice.sections.tools.title,
      description: t.advice.sections.tools.description,
      items: roleAdvice?.tools || t.advice.sections.tools.items
    },
    {
      key: 'mindset',
      icon: Lightbulb,
      color: 'bg-purple-500',
      title: t.advice.sections.mindset.title,
      description: t.advice.sections.mindset.description,
      items: t.advice.sections.mindset.items
    },
    {
      key: 'nextSteps',
      icon: Target,
      color: 'bg-orange-500',
      title: t.advice.sections.nextSteps.title,
      description: t.advice.sections.nextSteps.description,
      items: t.advice.sections.nextSteps.items
    }
  ];

  return (
    <Card className="dark-card animate-fade-in dark-glow">
      <CardHeader>
        <CardTitle className="text-gradient dark-text-glow text-xl">
          {t.advice.title}
        </CardTitle>
        <p className="text-muted-foreground">
          {t.advice.subtitle}
        </p>
        {roleAdvice && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg dark-glow">
            <p className="text-sm font-medium text-primary">
              {language === 'ko' ? '직무별 특화 조언' : 'Role-Specific Advice'}:
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {roleAdvice.focus}
            </p>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.key} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${section.color} text-white`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gradient dark-text-glow">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-2 ml-12">
                {section.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg dark-glow">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-gradient dark-text-glow">
              {language === 'ko' ? '시작하기' : 'Get Started'}
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === 'ko' 
              ? '위의 조언을 바탕으로 에이전트 활용 역량을 단계적으로 개발해보세요. 작은 것부터 시작하여 점진적으로 확장하는 것이 핵심입니다.'
              : 'Based on the advice above, gradually develop your agent utilization capabilities. The key is to start small and expand progressively.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
