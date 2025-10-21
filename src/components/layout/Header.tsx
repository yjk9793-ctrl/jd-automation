'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageToggle } from './LanguageToggle';
import { Settings, Github, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Language } from '@/lib/i18n';

interface HeaderProps {
  onSettingsClick?: () => void;
  showSettings?: boolean;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

export function Header({ 
  onSettingsClick, 
  showSettings = true,
  language = 'ko',
  onLanguageChange
}: HeaderProps) {
  const translations = {
    ko: {
      title: 'JD 자동화 분석기',
      subtitle: '당신의 JD, 자동화 관점에서 다시 보기',
    },
    en: {
      title: 'JD Automation Analyzer',
      subtitle: 'Your JD, reimagined from an automation perspective',
    },
  };

  const t = translations[language];

  return (
    <header className="sticky top-0 z-50 w-full nav-modern">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* 로고 및 제목 */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 micro-interaction">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center floating">
              <span className="text-white font-bold text-sm">JD</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gradient">{t.title}</h1>
              <p className="text-xs text-muted-foreground">{t.subtitle}</p>
            </div>
          </Link>
        </div>

        {/* 우측 액션 버튼들 */}
        <div className="flex items-center gap-2">
          {/* 언어 전환 */}
          {onLanguageChange && (
            <LanguageToggle language={language} onLanguageChange={onLanguageChange} />
          )}

          {/* 도움말 */}
          <Button variant="ghost" size="sm" asChild className="micro-interaction">
            <Link href="/help" aria-label="도움말">
              <HelpCircle className="h-4 w-4" />
            </Link>
          </Button>

          {/* GitHub 링크 */}
          <Button variant="ghost" size="sm" asChild className="micro-interaction">
            <a 
              href="https://github.com/your-username/jd-automation" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub 저장소"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>

          {/* 설정 */}
          {showSettings && onSettingsClick && (
            <Button variant="ghost" size="sm" onClick={onSettingsClick} aria-label="설정" className="micro-interaction">
              <Settings className="h-4 w-4" />
            </Button>
          )}

          {/* 테마 토글 */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
