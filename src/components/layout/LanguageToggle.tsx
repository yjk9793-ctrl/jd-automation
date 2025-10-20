'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  language: 'ko' | 'en';
  onLanguageChange: (lang: 'ko' | 'en') => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex rounded-lg border border-border overflow-hidden">
        <Button
          variant={language === 'ko' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('ko')}
          className="rounded-none border-0"
        >
          한국어
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onLanguageChange('en')}
          className="rounded-none border-0"
        >
          English
        </Button>
      </div>
    </div>
  );
}
